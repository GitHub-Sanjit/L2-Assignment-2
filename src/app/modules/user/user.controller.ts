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
    const userId = parseInt(req.params.userId)
    const userExist = await UserModel.isUserExist(userId)

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
      const result = await UserServices.getSingleUserFromDB(userId)
      res.status(200).json({
        success: true,
        message: 'A Single User is retrieved successfully!',
        data: result,
      })
    }
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
    const userId = parseInt(req.params.userId)
    const userExist = await UserModel.isUserExist(userId)
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
    const userId = parseInt(req.params.userId)
    const userExist = await UserModel.isUserExist(userId)

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
      const result = await UserServices.deleteUserFromDB(userId)
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      })
    }
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

const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId)
    // check user exist or not
    const userExist = await UserModel.isUserExist(userId)

    // if user not exist
    if (!userExist) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return
    }

    // if user exist
    const result = await UserServices.getUserOrders(userId)
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserOrders,
}
