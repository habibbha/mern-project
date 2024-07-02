import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProducts = createAsyncThunk("Products", async (data,{rejectWithValue}) => {
 try{
 const res = await axios.get("http://localhost:5000/api/user/getproduct"); // no need , data)
  return res.data;
 }
 catch(error){
  rejectWithValue(error.response.data.msg)
 }
});



const ProductSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    // token: localStorage.getItem("token") || null,
    error: false,
    products:[],
    // isAuth:Boolean(localStorage.getItem("isAuth"))||false
  },
  reducers:{
    // logout:(state)=>{
    //   localStorage.removeItem("token")
    //   localStorage.removeItem("isAuth")
    //   state.isAuth=false
    //   state.token=null
    // }
  },
  extraReducers:{
    [GetProducts.pending]:(state)=>{state.isLoading=true},
    [GetProducts.fulfilled]:(state,action)=>{
        // state.token=action.payload.token
        state.error=null
        // 
        state.products=action.payload.Products
        state.isLoading=false
        // localStorage.setItem("token",state.token)
        // localStorage.setItem("isAuth",state.isAuth)

    },
    [GetProducts.rejected]:(state,action)=>{
        state.error=action.payload.error
        // state.isAuth=false
    },
    
  }
});

export default ProductSlice.reducer;
// export const {logout}=UserSlice.actions // no need don't have logout
