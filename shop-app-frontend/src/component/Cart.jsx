import React, { useRef } from 'react';
import {Link , useNavigate}  from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/context';
import { urlFor } from '../utils/client';



;

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove  , toggleQuantity , checkOut} = useStateContext();
//  const router = useRouter();
const navigate = useNavigate()
  const handleCheckout = () =>{
     checkOut();
      navigate('/success')
  }


const btn = {
  width:'100%',
  maxWwidth: '400px',
  padding: '10px 12px',
  borderRadius: '15px',
  border: 'none',
  fontSize: '20px',
  marginTop: '10px',
   textTransform: 'uppercase',
  backgroundColor: '#f02d34',
  color: '#fff',
  cursor: 'pointer'
}


  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button"
        className='cart-heading'
        onClick={()=>setShowCart(false)}
        >
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>{totalQuantities} items</span>
        </button>
        {!cartItems.length  && (
          <div
         className='empty-cart ' 
         >
          <AiOutlineShopping size={150} className="bag" />
          <h3>Your shopping bag is empty</h3>
          <Link to="/">
           <button
           type='button'
           onClick={()=>setShowCart(false)}
           className='btn'
           >
            Go back
           </button>

          </Link>
         </div>
        )}
        <div className="product-container">
        {!!cartItems.length  && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus"onClick={()=>toggleQuantity(item._id,'dec')} >
                    <AiOutlineMinus />
                    </span>
                    <span className="num" >{item.quantity}</span>
                    <span className="plus" onClick={()=>toggleQuantity(item._id,'inc')}><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}

             {!!cartItems.length  && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button"   style={btn} className="btn" onClick={handleCheckout} >
                Checkout
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
      
      </div>
  )
}

export default Cart