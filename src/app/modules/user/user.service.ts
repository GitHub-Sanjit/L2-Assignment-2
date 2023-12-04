import { UserModel } from '../user.model'
import { User } from './user.interface'

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await UserModel.find()
  return result
}

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId })
  return result
}

const updateUser = async (userId: number, userData: User) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true },
  ).select({
    _id: 0,
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
  })
  return result
}

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true })
  return result
}

const addOrderIntoAUserDB = async (
  userId: number,
  order: { productName: string; price: number; quantity: number },
) => {
  const { productName, price, quantity } = order
  await UserModel.findOneAndUpdate(
    { userId, orders: { $exists: true } },
    { $push: { order: { productName, price, quantity } } },
    { upsert: true, new: true },
  )
  return null
}

const getUserOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select({ orders: 1 })
  return result
}

const getTotalPrice = async (userId: number) => {
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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUser,
  deleteUserFromDB,
  addOrderIntoAUserDB,
  getUserOrders,
  getTotalPrice,
}
