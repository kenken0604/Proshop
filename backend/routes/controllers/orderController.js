import AsyncHandler from 'express-async-handler'
import Order from '../../models/orderModel.js'

// @func    create new order
// @route   POST /api/orders
// @access  private
export const addOrder = AsyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItem,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItem && orderItem.length === 0) {
    res.status(404)
    throw new Error({ message: 'No order items' })
  } else {
    const order = new Order({
      user: req.user._id, //*從authMiddleware產生的資料
      shippingAddress,
      paymentMethod,
      orderItem,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })

    const createOrder = await order.save()

    res.status(201).json(createOrder)
  }
})

// @func    get order by ID
// @route   GET /api/orders/:id
// @access  private
export const getOrderByID = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', [
    'name',
    'email',
  ]) //*ID從前端的url串接 //拼接其他資料(必須要設定ref關聯式資料)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error({ message: 'Order not found.' })
  }
})
