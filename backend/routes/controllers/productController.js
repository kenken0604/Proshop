import AsyncHandler from 'express-async-handler'
import Product from '../../models/productModel.js'

// @func    fetch all products
// @route   GET /api/product.../api/product?search=keyword
// @access  public
const getProducts = AsyncHandler(async (req, res) => {
  //以參數設定指令要顯示多少資料
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  //透過query將關鍵字從前端傳到後端
  const keyword = req.query.keyword
    ? {
        //*用product上的name對應
        name: {
          $regex: req.query.keyword, //表達式可以接受不精準的匹配
          $options: 'i', //讓表達式不區分大小寫
        },
      }
    : {} //沒有keyword就是空物件

  const count = await Product.countDocuments({ ...keyword }) //獲取項目數
  const products = await Product.find({ ...keyword }) //擴展符讓keyword可以根據資料變化
    .limit(pageSize) //limit限制顯示項目數
    .skip(pageSize * (page - 1)) //skip每次跳過多少項目

  // throw new Error('We have problems here...') //測試前端錯誤流程
  res.json({ products, page, pages: Math.ceil(count / pageSize) }) //pages代表共有幾頁，因此用ceil無條件進位
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

// @func    create reviews for product
// @route   post /api/products/:id/reviews
// @access  private
const createProductReview = AsyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    //避免重複同一人評論
    const alreadyReviewed = product.reviews.find(
      (review) => review.user._id.toString() === req.user._id.toString(),
    ) //*id要變成字串才能比較

    if (alreadyReviewed) {
      res.status(404)
      throw new Error('Product already reviewed.')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review) //將review併入資料庫而不是覆蓋

    //更新資料庫數據
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, review) => (acc += review.rating), 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added.' })
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})

// @func    fetch top rated products
// @route   GET /api/products/top
// @access  public
const getTopProduct = AsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3) //-1代表由高到低

  res.json(products)
})

export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProduct,
}
