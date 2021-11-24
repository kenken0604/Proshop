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

// @func    delete single product
// @route   delete /api/products/:id
// @access  private
const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed.' })
  } else {
    res.status(404)
    throw new Error('Product not found...')
  }
})

// @func    create a product
// @route   post /api/products
// @access  private/admin
const createProduct = AsyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'smaple brand',
    category: 'sample cate',
    countInStock: 0,
    numReviews: 0,
    description: 'sample',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @func    update a product info
// @route   put /api/products/:id
// @access  private/admin
const updateProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = req.body.name || product.name //*//*如果沒有頁面資料就使用原來的資料
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image
    product.brand = req.body.brand || product.brand
    product.category = req.body.category || product.category
    product.rating = req.body.rating || product.rating
    product.countInStock = req.body.countInStock || product.countInStock
    product.description = req.body.description || product.description

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})

export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
}
