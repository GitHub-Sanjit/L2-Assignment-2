import { Schema, model } from 'mongoose'
import { User } from './user/user.interface'

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String, required: true },
  isActive: Boolean,
  hobbies: ['reading', 'traveling'],
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
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
