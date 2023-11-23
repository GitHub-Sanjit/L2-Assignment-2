import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/users', UserControllers.createUser)

router.get('/users', UserControllers.getAllStudents)

router.get('/users/:userId', UserControllers.getSingleStudent)

export const UserRoutes = router
