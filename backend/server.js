import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import path from 'path'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB() //需要放在dot.config()後面

const app = express()

app.use(express.json()) //允許json格式

app.get('/', (req, res) => {
  res.send('API is running...')
})

//路由器
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes) //上傳圖片的路由器

//金流路由
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

//讓瀏覽器讀取uploads資料夾->使此路徑成為靜態資料(因為此資料夾默認為不可瀏覽)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//錯誤控制
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`
      .bgGreen,
  )
})
