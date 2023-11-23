// import { Schema, model, connect } from 'mongoose'

export type User = {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: true
  hobbies: 'reading' | 'traveling'
  address: {
    street: string
    city: string
    country: string
  }
  orders: [
    {
      productName: string
      price: number
      quantity: number
    },
    {
      productName: string
      price: number
      quantity: number
    },
  ]
}
