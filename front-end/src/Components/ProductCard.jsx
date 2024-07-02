import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div style>
     <img src={product.poster} alt="image product not found !" />
      <h3>{product.title}</h3>
      <h4>{product.price}</h4>
      <h5>{product.description}</h5>
      <button>Add to card</button>
    </div>
  )
}

export default ProductCard
