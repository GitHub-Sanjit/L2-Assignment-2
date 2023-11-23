import { Schema, model, connect } from 'mongoose'
import { User} from './user/user.interface'

const userSchema = new Schema<User>({
  userId: { type: String },
  username: { type: String },
  password: { type: Number },
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


const User = model<User>('User', userSchema);