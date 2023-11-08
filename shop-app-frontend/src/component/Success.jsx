import React,{useEffect} from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import {Link} from 'react-router-dom'
import { useStateContext } from '../context/context'
import { runFireworks } from '../utils/data'
const Success = () => {
    const {setTotalQuantities , setTotalPrice , setCartItems , setShowCart} = useStateContext()

    useEffect(()=>{
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        setShowCart(false)
        runFireworks()
        // localStorage.clear();
     
    },[])

  return (
    <div className="success-wrapper">
    <div className="success">
      <p className="icon">
        <BsBagCheckFill />
      </p>
      <h2>Thank you for your order!</h2>
      <p className="email-msg">Check your email inbox for the receipt.</p>
      <p className="description">
        If you have any questions, please email
        <a className="email" href="mailto:order@example.com">
          order@example.com
        </a>
      </p>
      <Link to="/products">
        <button type="button" width="300px" className="btn">
          Continue Shopping
        </button>
      </Link>
    </div>
  </div>
  )
}

export default Success