import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setkeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form
      onSubmit={submitHandler}
      inline="true"
      className="d-flex justify-content-between h-25"
    >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setkeyword(e.target.value)}
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="fs-10">
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  )
}

export default SearchBox
