import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
  addOrder,
  getOrderByID,
  updateToPaid,
  getMyOrder,
} from './controllers/orderController.js'

router.route('/').post(protect, addOrder)
router.route('/myorders').get(protect, getMyOrder) //排在主路由後面
router.route('/:id').get(protect, getOrderByID) //:id之類的路由要往後排，從簡單到嚴格依序排
router.route('/:id/pay').put(protect, updateToPaid)

export default router
