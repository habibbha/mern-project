import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {GetProducts} from "../redux/slices/ProductSlice"
import ProductList from '../Components/ProductList'

const Home = () => {
  const dispatch = useDispatch()
  const {isLoading,error,products} = useSelector(state=>state.products) // state recoie state.products
  useEffect(()=>{
    dispatch(GetProducts())
  },[])
  return (
    <div>
      {isLoading  &&  <h1>is Loading</h1>} 
     <ProductList products={products}/>
     {console.log(error)}
    </div>
  )
}

export default Home
