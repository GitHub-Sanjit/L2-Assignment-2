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
    { userId: userId },
    userData,
    { new: true },
  )
  return result
}

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true })
  return result
}

const getUserOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select({ orders: 1 })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUser,
  deleteUserFromDB,
  getUserOrders,
}
