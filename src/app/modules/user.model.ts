import { Schema, model } from 'mongoose'
import { IOrder, User, IUserModel } from './user/user.interface'
import bcrypt from 'bcrypt'
import config from '../config'

const orderSchema = new Schema<IOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<User>(
  {
    userId: { type: Number, required: true },
    username: { type: String },
    password: { type: String, required: true },
    fullName: {
      firstName: { type: String },
      lastName: { type: String },
    },
    age: { type: Number },
    email: { type: String, required: true },
    isActive: Boolean,
    hobbies: { type: Array<string> },
    address: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
    },
    orders: { type: [orderSchema], default: [] },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform: function (document, tDocument) {
        delete tDocument.password
        return tDocument
      },
    },
  },
)

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

userSchema.statics.isUserExist = async function (userId) {
  const result = await UserModel.findOne({ userId: userId })
  return result !== null ? true : false
}

userSchema.statics.addAOrder = async function (userId, order) {
  const user = await UserModel.findOne({ userId })
  if (user) {
    user.orders = user.orders || []
    user.orders.push(order)
    await user.save()
  }
}

userSchema.statics.calculateTotalPrice = async function (userId) {
  const result = await UserModel.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: '$userId',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ])
  return result[0]?.totalPrice || 0
}

export const UserModel = model<User, IUserModel>('User', userSchema)
