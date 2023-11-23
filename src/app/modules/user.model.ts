import { Schema, model } from 'mongoose'
import { User } from './user/user.interface'

const userSchema = new Schema<User>({
  userId: { type: String, required: true },
  username: { type: String },
  password: { type: Number, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String, required: true },
  isActive: true,
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
})

export const UserModel = model<User>('User', userSchema)
