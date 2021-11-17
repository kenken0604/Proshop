import AsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = AsyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      //   console.log(decode) //可以得到封裝進去的_id

      req.user = await User.findById(decode._id).select('-password') //傳到controller不需要password

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Fail! Not authorized token.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Sorry, No token to authorize.')
  }
})
