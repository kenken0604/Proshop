import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  addOrder,
  getOrderByID,
  updateToPaid,
  getMyOrder,
  getAllOrders,
  updatetoDelivered,
} from './controllers/orderController.js'

router.route('/').post(protect, addOrder).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrder) //指定路由要往前排
router.route('/:id').get(protect, getOrderByID) //:id之類的非特定路由要往後排，從簡單到嚴格依序
router.route('/:id/pay').put(protect, updateToPaid)
router.route('/:id/deliver').put(protect, admin, updatetoDelivered)

export default router
