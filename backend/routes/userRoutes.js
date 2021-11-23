import express from 'express'
const router = express.Router()
import { admin, protect } from '../middleware/authMiddleware.js'

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserByID,
} from './controllers/userController.js'

router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile) //放入路由守衛
  .put(protect, updateUserProfile) //放入路由守衛
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser)

export default router
