import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getTopProduct } from '../redux/actions/productAction'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const { loading, products, error } = useSelector((state) => state.getTop)

  useEffect(() => {
    dispatch(getTopProduct())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-light mb-5">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h4>{product.name}</h4>
              <p>{product.descriptionr}</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
