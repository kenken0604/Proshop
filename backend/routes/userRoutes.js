import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from './controllers/userController.js'

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile) //放入路由守衛
  .put(protect, updateUserProfile) //放入路由守衛

export default router
