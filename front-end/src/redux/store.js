import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import ProductSlice from "./slices/ProductSlice";


export default configureStore({reducer:{user:UserSlice,products:ProductSlice}})