import dotenv from 'dotenv'
import connectDB from './config/db.js'

//資料
import users from './data/user.js'
import products from './data/products.js'

//資料庫
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

dotenv.config()
connectDB()

//資料庫上傳
const importData = async () => {
  try {
    //上傳資料時先清空所有資料，避免重複
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    //上傳使用者
    const createUsers = await User.insertMany(users)

    const adminUser = createUsers[0]._id

    //遍歷商品並加入管理者id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    //上傳商品
    await Product.insertMany(sampleProducts)

    console.log('Data Successfully Imported'.bgCyan)
    process.exit()
  } catch (error) {
    console.error(`${error.message}`.bgRed)
    process.exit(1)
  }
}

//資料庫清空
const destoryData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Successfully Destoryed'.bgYellow)
    process.exit()
  } catch (error) {
    console.error(`${error.message}`.bgRed)
    process.exit(1)
  }
}

//node流程控制
//如果在終端收到的指令的index為node backend/seeder -d
//意即索引[2]為-d
if (process.argv[2] === '-d') {
  destoryData()
} else {
  importData()
}
