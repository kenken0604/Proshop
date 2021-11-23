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
router.route('/myorders').get(protect, getMyOrder) //指定路由要往前排
router.route('/:id').get(protect, getOrderByID) //:id之類的非特定路由要往後排，從簡單到嚴格依序
router.route('/:id/pay').put(protect, updateToPaid)

export default router
