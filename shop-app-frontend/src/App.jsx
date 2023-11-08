import React,{useEffect} from 'react'
import { useStateContext } from './context/context'
import {Route , Routes , useNavigate , ScrollRestoration} from "react-router-dom"
import Home from './containers/Home';
import Login from "./component/Login"
import { fetchUser } from './utils/data';
import Landing from './containers/Landing';
import Success from './component/Success';


const App = () => {
  const user = fetchUser();
  const navigate = useNavigate()
  // console.log(user)


useEffect(()=>{
  if(!user){
    navigate("/login")
  }
},[user])


  return (
    <Routes>
    
      <Route path='login' element={<Login/>} />
      {user &&   <Route path="/*" element={<Home/>} />}
      <Route path="/" element={<Landing/>} />
      <Route path="*" element={<Landing/>} />
      <Route path='success' element={<Success/>} />
      
    </Routes>
  )
}

export default App