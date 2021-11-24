import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

//初始化設置
const storage = multer.diskStorage({
  //目的
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  //檔名
  filename(req, file, cb) {
    cb(
      null,
      //預防上傳檔名相同的檔案
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`, //規範附檔名
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    //如果檢查結果為true
    return cb(null, true)
  } else {
    //檢查結果為false
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  //限制上傳檔案類型
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb) //檢查檔案類型是否為圖片
  },
})

//上傳圖片的路由(single為一次上傳一張)
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`) //返回圖片路徑
})

export default router
