import { Model } from 'mongoose'

export type IOrder = {
  productName: string
  price: number
  quantity: number
}

export interface User {
  userId: number
  username?: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age?: number
  email: string
  isActive?: boolean
  hobbies?: string[]
  address?: {
    street?: string
    city?: string
    country?: string
  }
  orders: IOrder[]
  isDeleted: boolean
}

export interface IUserModel extends Model<User> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(userId: number): Promise<boolean>
}
