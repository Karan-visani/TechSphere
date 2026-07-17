import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div>
      <Link to={'/products/add'}>Add Prods</Link>
    </div>
  )
}

export default Products
