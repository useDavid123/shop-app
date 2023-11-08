import React,{useState} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import "../styles/global.css"



import { Navbar, Search , Products , ProductDetail , Category } from '../component';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/category/:categoryId" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail  />} />
          
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="*" element={<div className='flex  flex-col justify-center items-center h-full bg-gray-50 2xl:text-xl'>
            <h1>Page Not Found</h1>
            <Link to="/products" className='underline font-[50px]  text-red-600'>return to products page</Link>
          </div>} />
        </Routes>
      </div>
      
    </div>
  )
}

export default Store