import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const result = await UserServices.createUserIntoDB(userData)

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

const getAllStudents = async (req: Request, res: Response) => {
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

const getSingleStudent = async (req: Request, res: Response) => {
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

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
  } catch (error:any) {
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
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
