import React,{useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'

import MasonryLayout from './Masonry';
import Spinner from './Spinner';
import {productQuery, searchedQuery} from '../utils/data'
import { client } from '../utils/client';
// import { client } from '../utils/client';

const Products = () => {

  const [loader , setLoader] = useState(true)   
  const [products , setProducts] = useState([]) 

  const {categoryId}= useParams()
  
 
useEffect(()=>{

setLoader(true)
if(categoryId){
  const query = searchedQuery(categoryId)
   client.fetch(query).then((data)=>{
    setProducts(data)
   
   })
}
else{
client.fetch(productQuery).then((data)=>{
  setProducts(data)
  // console.log(data[7])
  
})
}
setLoader(false)
},[categoryId])
const ideaName = categoryId || 'new'

console.log(products)

if(loader) return <Spinner message={`We are giving you ${ideaName} products`}/>

  return (  
      <>
      
      {
        !!products.length ? (
          <div>
          {products && (
            <MasonryLayout products={products} />
          )}
        </div>
        ) : (
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          No products of this Category
        </h2>
        )
      }
      
      </>
  )
}

export default Products