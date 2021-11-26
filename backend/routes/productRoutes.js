import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProduct,
} from './controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get(getTopProduct)
router.route('/:id/review').post(protect, createProductReview)
router
  .route('/:id')
  .get(getProductByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
