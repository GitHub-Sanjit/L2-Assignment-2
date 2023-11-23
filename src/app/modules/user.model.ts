import { Schema, model } from 'mongoose'
import { Order, User } from './user/user.interface'

const orderSchema = new Schema<Order>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<User>({
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
  orders: [orderSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
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

export const UserModel = model<User>('User', userSchema)
