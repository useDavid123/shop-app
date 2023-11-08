import React,{useState , useRef , useEffect} from 'react'
import {HiMenu} from "react-icons/hi"
import { AiFillCloseCircle,AiOutlineShopping } from 'react-icons/ai';
import {Link , Route , Routes , useNavigate} from 'react-router-dom'; 

import logo from '../assets/logo.png'
import Sidebar from "../component/Sidebar"
import { useStateContext } from '../context/context';
import { fetchUser, userQuery } from '../utils/data';
import Login from '../component/Login';
import Store from './Store';
import { client } from '../utils/client';
import { UserProfile } from '../component';



const Home = () => { 
  const [toggle , setToggle] = useState(false)
  const {user , setUser , showCart , setShowCart } = useStateContext()
 
 const scrollRef = useRef(null)
 const navigate = useNavigate()
  const userInfo = fetchUser();
 
useEffect(()=>{
  const query = userQuery(userInfo?.googleId)

  if(!query){
     navigate('/login')
  }
  
client.fetch(query).then((data)=>{
     setUser(data[0])
})
},[]) 
 
useEffect(() => {
  scrollRef.current.scrollTo(0, 0);
},[]);
 
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
    <div className="hidden md:flex h-screen flex-initial">
    
     <Sidebar />
    </div>
    <div className='flex md:hidden flex-row'>
      <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
      <HiMenu fontSize={40} className="cursor-pointer" onClick={()=>setToggle(true)}/>
     
      <Link to ={`user-profile/${user?._id}`}>
        <img src ={user?.image} alt='user-pic' className='w-9 h-9 rounded-full'/>
      </Link>
      {/* <button type='button'
    className='cart-icon' onClick={()=>setShowCart(true)}>
      <AiOutlineShopping/>
      <span className='cart-item-qty'>0</span>

    </button> */}
  
      </div>
      {toggle && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggle(false)} />
          </div>
          <Sidebar   closeToggle={setToggle} />
        </div>
        )}

    </div>
     
       <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Store  />} />
        </Routes>
      </div>
      </div>
   
  )
}

export default Home