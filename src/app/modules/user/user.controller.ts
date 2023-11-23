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

export const UserControllers = {
  createUser,
}
