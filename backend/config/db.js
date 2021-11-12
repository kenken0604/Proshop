import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB connected: ${connect.connection.host}`.bgBlue)
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed)
    process.exit(1)
  }
}

export default connectDB
