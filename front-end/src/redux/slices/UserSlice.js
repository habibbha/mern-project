import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk("Register", async (data,{rejectWithValue}) => {
 try{
 const res = await axios.post("http://localhost:5000/api/user/register", data);
  return res.data;
 }
 catch(error){
  rejectWithValue(error.response.data.msg)
 }
});

export const LoginUser = createAsyncThunk("Login", async (data,{rejectWithValue}) => {
  try{
  const res = await axios.post("http://localhost:5000/api/user/login", data);
   return res.data;
  }
  catch(error){
   rejectWithValue(error.response.data.msg)
  }
 });

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    token: localStorage.getItem("token") || null,
    error: false,
    isAuth:Boolean(localStorage.getItem("isAuth"))||false
  },
  reducers:{
    logout:(state)=>{
      localStorage.removeItem("token")
      localStorage.removeItem("isAuth")
      state.isAuth=false
      state.token=null
    }
  },
  extraReducers:{
    [RegisterUser.pending]:(state)=>{state.isLoading=true},
    [RegisterUser.fulfilled]:(state,action)=>{
        state.token=action.payload.token
        state.error=null
        state.isAuth=true
        localStorage.setItem("token",state.token)
        localStorage.setItem("isAuth",state.isAuth)

    },
    [RegisterUser.rejected]:(state,action)=>{
        state.error=action.payload.error
        state.isAuth=false
    },
    [LoginUser.pending]:(state)=>{state.isLoading=true},
    [LoginUser.fulfilled]:(state,action)=>{
        state.token=action.payload.token
        state.error=null
        state.isAuth=true
        localStorage.setItem("token",state.token)
        localStorage.setItem("isAuth",state.isAuth)
    },
    [LoginUser.rejected]:(state,action)=>{
        state.error=action.payload.error
        state.isAuth=false
    }
  }
});

export default UserSlice.reducer;
export const {logout}=UserSlice.actions
