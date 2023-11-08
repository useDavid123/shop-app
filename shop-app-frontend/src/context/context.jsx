import React ,{createContext , useContext , useState , useEffect} from 'react';
import {toast} from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { client , urlFor } from '../utils/client';
import { userSavedProductQuery } from '../utils/data';

const Context = createContext()

export const StateContext = ({children}) =>{



 const [user , setUser] = useState(localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear())
 const [showCart , setShowCart] = useState(false)
 const [savedProducts , setSavedProducts] = useState([]);
 const [cartItems ,setCartItems] = useState(()=>{

  let list =  localStorage.getItem("cart")
  if(list){
   return  JSON.parse(localStorage.getItem("cart"))

  }
  else{
    return []
  }
 });

const [totalPrice , setTotalPrice] = useState(0);
const [totalQuantities , setTotalQuantities] = useState(0);
const [qty , setQty] = useState(1)




const IncQty = () =>{
  setQty((prev)=> prev + 1)
}

const DecQty = () =>{
  
  setQty((prev)=>{
      if(prev - 1 < 1) return 1

      return prev -1
  })
}
useEffect(()=>{
  localStorage.setItem('cart' , JSON.stringify(cartItems))
  let {total , quantity} = cartItems.reduce((cartTotal,cartItem)=>{
    const {price,quantity} = cartItem
   const itemTotal = price * quantity;
   cartTotal.total += itemTotal;
    cartTotal.quantity += quantity
    return cartTotal
    },{
    total:0 ,
    quantity :0
    }

    )
   setTotalPrice(total)
   setTotalQuantities(quantity)
    
},[cartItems])



const onAdd = (product , quantity) =>{


  const checkProductInCart = cartItems.find((item) => item._id === product._id);
  
  // setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
  // setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);


   console.log(checkProductInCart)
  
  
  if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) {
          return {...cartProduct,quantity: cartProduct.quantity + quantity}
        }
        return cartProduct
      })
      
      setCartItems([...updatedCartItems]);
    } else {
  //   product.quantity = quantity;
    
    // setCartItems([...cartItems,{...product,quantity:quantity}]);
    setCartItems((prevCartItems)=>[...prevCartItems,{...product,quantity:quantity}])
   
   
  }

  toast.success(`${qty} ${product.name} added to the cart.`);
}




const onRemove = (product) => {
let  foundProduct = cartItems.find((item) => item._id === product._id);
  const newCartItems = cartItems.filter((item) => item._id !== product._id);

  // setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
  // setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
  setCartItems(newCartItems);
}

 const toggleQuantity = (id , value) =>{
 let foundProduct = cartItems.find((item)=>item._id === id)
  // index = cartItems.indexOf((product)=>product._id === id)

  if(value === "inc"){
      const updatedCart = cartItems.map((item)=>{
          if(item._id === id){
            return  {...item,quantity:item.quantity+1}
          }
          return item
      })
      setCartItems(updatedCart)
      // setTotalPrice((prev)=>prev + foundProduct.price)
      // setTotalQuantities((prev)=>prev + 1)
  }
  else{
      if(foundProduct.quantity > 1){
          const updatedCart = cartItems.map((item)=>{
              if(item._id === id){
                return  {...item,quantity:item.quantity-1}
              }
              return item
          })
          setCartItems(updatedCart)
          // setTotalPrice((prev)=>prev - foundProduct.price)
          // setTotalQuantities((prev)=>prev - 1)
      }
  
 }



 }

 const checkOut = () =>{
  const doc = {
    _type: 'checkout',
   totalPrice:totalPrice,
   
    userId: user._id,
    postedBy: {
      _type: 'postedBy',
      _ref: user._id,
    },
    products: cartItems.map((item)=>{
      
      let newProduct ={
        productId:uuidv4(),
        title:item.name,
        price:item.price,
        quantity:item.quantity,
        image:item.image[0],
      }
      return newProduct;
    })

   
  };

 

  client.create(doc).then(() => {
    console.log("success")
  }).catch((error)=> console.log(error));
  

 }



 useEffect(()=>{
   const fetchSavedProduct = async() =>{
    const savedProduct = userSavedProductQuery(user._id)
    await client.fetch(savedProduct).then((data)=>{
      setSavedProducts(data)
    }
    ).catch((error)=>{console.log(error)});
   }

   fetchSavedProduct()
 

 },[user?._id])

const saveProduct = (product) => {
 
  setSavedProducts((prevSavedProducts)=>{
    return [...prevSavedProducts,product]
  })

}















   
    return(
        <Context.Provider
        value={{user , setUser  , cartItems, totalPrice ,totalQuantities ,qty ,showCart, setShowCart, IncQty , DecQty , 
          onAdd , toggleQuantity , onRemove , setCartItems , setTotalPrice , setTotalQuantities , setQty , checkOut , saveProduct , savedProducts}}
        
        >
          {children}
        </Context.Provider>
    )
    
    
    
    }

    export const useStateContext = () =>useContext(Context)