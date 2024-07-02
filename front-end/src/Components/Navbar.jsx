import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/UserSlice";

const Navbar = () => {
  const { isAuth } = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      { isAuth ? (
        <div>
          <Link to="/home">Home</Link>
          <button onClick = {() => dispatch(logout())}> Logout </button>
        </div>
      ) : 
        <div>
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      }
    </div>
  );
};

export default Navbar;
