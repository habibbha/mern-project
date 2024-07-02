import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux'
import { RegisterUser } from '../redux/slices/UserSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {isAuth} = useSelector((state)=>state.user)
  const navigate=useNavigate()
  useEffect(()=>{
    if(isAuth){
      navigate('/home')
    }
  },[isAuth])
  const dispatch=useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
      dispatch(RegisterUser(data))
      console.log(data);
    };
    console.log(errors);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Full Name" {...register("name", {required: true})} />
      <input type="email" placeholder="Email" {...register("email", {required: true})} />
      <input type="password" placeholder="Password" {...register("password", {required: true, max: 5, min: 5, maxLength: 20, pattern: /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/i})} />
        <input type="submit" />
      </form>
    );
}

export default Register