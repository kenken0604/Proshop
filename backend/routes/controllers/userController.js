import AsyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import jwt from 'jsonwebtoken'

// @func    fetch user
// @route   GET /api/user
// @access  public
export const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    //產生token
    const tokenObject = { _id: user._id } //必須為物件
    const token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token, //攜帶token
    })
  } else {
    res.status(401).send({ message: 'Invalid email or password' })
  }
})

// @func    register a new user
// @route   GET /api/user
// @access  public
export const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const existUser = await User.findOne({ email })

  if (existUser) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  const tokenObject = { _id: user._id } //必須為物件
  const token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token, //攜帶token
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @func    get user profile
// @route   GET /api/user/profile
// @access  private
export const getUserProfile = AsyncHandler(async (req, res) => {
  console.log(req.user) //可以得到middleware設定的
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})
