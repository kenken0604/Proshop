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

// @func    Update user profile
// @route   PUT /api/user/profile
// @access  private
export const updateUserProfile = AsyncHandler(async (req, res) => {
  console.log(req.user) //可以得到middleware設定的
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name //*如果沒有頁面資料就使用原來的資料
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save() //儲存資料

    const tokenObject = { _id: updateUser._id } //必須為物件
    const token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: token, //攜帶token
    })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})

// @func    get all users
// @route   GET /api/user
// @access  private/admin
export const getAllUsers = AsyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const count = await User.countDocuments({})
  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ users, page, pages: Math.ceil(count / pageSize) })
})

// @func    delete an user
// @route   DELETE /api/users/:id
// @access  private/admin
export const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})

// @func    get user by ID
// @route   GET /api/users/:id
// @access  private/admin
export const getUserByID = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password') //不需要密碼資料
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})

// @func    update userInfo
// @route   PUT /api/users/:id
// @access  private/admin
export const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name //*如果沒有頁面資料就使用原來的資料
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updateInfo = await user.save()

    res.json({
      _id: updateInfo._id,
      name: updateInfo.name,
      email: updateInfo.email,
      isAdmin: updateInfo.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})
