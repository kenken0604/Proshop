import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword, users, products }) => {
  //傳入關鍵字變數讓link使用對應的路由
  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            products
              ? `/admin/productlist/${x + 1}`
              : users
              ? `/admin/userlist/${x + 1}`
              : keyword
              ? `/search/${keyword}/page/${x + 1}`
              : `/page/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate
