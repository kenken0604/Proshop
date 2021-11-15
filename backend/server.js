import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB() //需要放在dot.config()後面

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

//路由器
app.use('/api/products', productRoutes)

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