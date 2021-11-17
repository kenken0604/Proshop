import AsyncHandler from 'express-async-handler'
import Product from '../../models/productModel.js'

// @func    fetch all products
// @route   GET /api/products
// @access  public
const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({})
  // throw new Error('We have problems here...') //測試前端錯誤流程
  res.json(products)
})

// @func    fetch single product
// @route   GET /api/products/:id
// @access  public
const getProductByID = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    //   res.status(404).json({ message: 'Product not found...' })
    throw new Error('Product not found...')
  }
})

export { getProducts, getProductByID }