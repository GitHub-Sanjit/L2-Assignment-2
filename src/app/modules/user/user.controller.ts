import { Request, Response } from 'express'
import { UserServices } from './user.service'
import userValidationSchema from './user.validation'
import { UserModel } from '../user.model'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const { error } = userValidationSchema.validate(userData)
    const result = await UserServices.createUserIntoDB(userData)

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error: error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Something went wrong',
      },
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'User are retrieved successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Something went wrong',
      },
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'A Single User is retrieved successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Something went wrong',
      },
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId)
    // check use exist or not
    const userExist = await UserModel.isUserExist((userId))
    // if user exists
    if (!userExist) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      const userData = req.body
      // update user data
      const result = await UserServices.updateUser(userId, userData)
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Something went wrong',
      },
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
