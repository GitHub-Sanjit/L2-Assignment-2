// import { Schema, model, connect } from 'mongoose'

export type User = {
  userId: string
  username: string
  password: number
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
