import React from 'react'

const ProductList = ({products}) => {
  return (
    <div>
      {products.map((el,index)=><ProductCard product={el}/>)}
    </div>
  )
}

export default ProductList
