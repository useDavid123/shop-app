import React from 'react'
import {Link , useNavigate} from "react-router-dom"
import {CgProfile} from "react-icons/cg"
import { useStateContext } from '../context/context'

const HomeNavbar = () => {
    const navigate = useNavigate()
    const {user} = useStateContext()

  const goHome = () =>{
    if(!user){
        navigate("/login")
    }

    navigate("/products")
  }

  return (

    <>


    <div className='navbar-container'>
 
     <p className="logo">
 
       <Link to="/">E-Commerce</Link>
     </p>
 
 
     <button type='button'
     className='cart-icon'>
       <CgProfile onClick={goHome}/>
       {/* <span className='cart-item-qty'>0</span> */}
 
     </button>
    
 
    </div>
 
     </>
  )
}

export default HomeNavbar