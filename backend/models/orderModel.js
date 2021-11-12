import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    //訂購人
    user: {
      type: mongoose.Schema.Types.ObjectId, //*
      required: true,
      ref: 'User',
    },
    //定購商品(陣列儲存)
    orderItem: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        //*
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    //固定不會再增加的資料用物件格式
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    //來自於金流系統
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    //*付款日期
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    //*運送日期
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.model('Order', orderSchema)

export default Order
