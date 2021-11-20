import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
  addOrder,
  getOrderByID,
} from '../routes/controllers/orderController.js'

router.route('/').post(protect, addOrder)
router.route('/:id').get(protect, getOrderByID)

export default router
