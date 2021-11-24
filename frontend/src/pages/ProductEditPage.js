import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { detailProduct, updateProduct } from '../redux/actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants'

const ProductEditPage = ({ match }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const [uploading, setUploading] = useState(false)

  const productID = match.params.id

  const { loading, product, error } = useSelector(
    (state) => state.productDetail,
  )

  const { updateSuccess, updateError } = useSelector(
    (state) => state.productUpdate,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (!product || product._id !== productID) {
      dispatch(detailProduct(productID))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setRating(product.rating)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [dispatch, product, productID])

  useEffect(() => {
    if (updateSuccess) {
      dispatch(detailProduct(productID))
    }
  }, [dispatch, updateSuccess, productID])

  useEffect(() => {
    dispatch({ type: PRODUCT_UPDATE_RESET })
  }, [dispatch]) //*進入畫面就要重置狀態 //*寫多台useEffect

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct(productID, {
        name,
        price,
        image,
        brand,
        category,
        rating,
        countInStock,
        description,
      }),
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true) //讓loader作用

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data) //設定axios返回的路徑為圖片
      setUploading(false) //上傳完成就將loader關閉
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  return (
    <div>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Control
                type="file"
                size="sm"
                onChange={uploadFileHandler}
              />
            </Form.Group>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand" className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="rating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock" className="mb-3">
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row className="m10">
            <Col md={3} className="m10">
              <Button type="submit" variant="info" className="m10">
                Update
              </Button>
            </Col>
            <Col md={9} className="m10">
              {updateSuccess && (
                <Message variant="info">Update Successfully</Message>
              )}
              {updateError && <Message variant="danger">Update Fail</Message>}
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ProductEditPage
