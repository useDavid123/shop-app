import React,{useEffect} from 'react';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import {AiOutlineShopping} from "react-icons/ai";
import { useStateContext } from '../context/context';
import Cart from "./Cart"

const Navbar = ({searchTerm , setSearchTerm}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {user , showCart , setShowCart , totalQuantities} = useStateContext()
// console.log(location.pathname)
 useEffect(()=>{
if(location.pathname != "/search"){
  setSearchTerm('')
}


 },[location.pathname])





  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
          </Link>
          
         
        </div>
        <div className="flex gap-3 ">
        <button type='button'
    className='cart-icon' onClick={()=>setShowCart(true)}>
      <AiOutlineShopping/>
      <span className='cart-item-qty'>{totalQuantities}</span>

    </button>
    {showCart && <Cart/>}
          
         
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;