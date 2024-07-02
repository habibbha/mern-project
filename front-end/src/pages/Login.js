import React,{ useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom";
import { LoginUser} from "../redux/slices/UserSlice"


export default function Login() {
  const {isAuth} = useSelector((state)=> state.user)
  const navigate = useNavigate()
    useEffect(()=>{
      if(isAuth){
        navigate("/home")
      }
    },[isAuth,navigate] )
  
  const dispatch = useDispatch()
// register , handlesubmit 
// the register is a hook form don't change it to login
// its refers to the form hook ...register below the code
  const { register , handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    dispatch (LoginUser(data))
  }
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="password" placeholder="Password" {...register("password", {required: true, max: 0, maxLength: 12})} />

      <input type="submit" />
    </form>
  );
}