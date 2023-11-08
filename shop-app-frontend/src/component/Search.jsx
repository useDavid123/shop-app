import React,{ useEffect, useState } from 'react'
import MasonryLayout from './Masonry'
import { client } from '../utils/client'
import { searchedQuery, useDebounced } from '../utils/data'

import Spinner from './Spinner'


const Search = ({searchTerm}) => {
  const [products , setProducts] = useState(null)
  const [loading , setLoading] = useState(false)
 console.log(searchTerm)
  const debouncedvalue = useDebounced(searchTerm , 400)
 
  const searchProducts = () => {
    if(searchTerm.length > 0){
      setLoading(true)
      let query = searchedQuery(searchTerm)

      client
      .fetch(query)
      .then((data)=>{
        console.log(data)
        setProducts(data)
        setLoading(false)
      })
    }

    else{
      setProducts([])
    }
   
  }

   
  useEffect(()=>{
   
    console.log(`value is ${debouncedvalue}`)
   searchProducts()
   

  },[debouncedvalue])

   if(loading){
    return  <Spinner message='loading pins'/>
   }

   if(!products?.length){
    return  <h2 className="text-center font-bold text-2xl mt-8 mb-4">
    No Related Product
  </h2>
   }
  return (
    <>
        {!!products?.length ? (
        <MasonryLayout products={products} />
      ) : null}
      </>
  )
}

export default Search