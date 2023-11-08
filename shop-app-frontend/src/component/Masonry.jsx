import React from 'react'
import Masonry from 'react-masonry-css'
import Card from './Card'
import Product from './Product'






const MasonryLayout = ({products , checkouts}) => {

  //  console.log(pro)
    const breakpointObj = {
        default:4,
        3000:6,
        2000:5,
        1200:3,
        1000:2,
        500:1
    }

    const breakpointObj2 = {
      default:4,
      3000:4,
      2000:4,
      1200:3,
      1000:2,
      500:1
  }



    if(products){
      return  (
        <Masonry  className="flex animate-slide-fwd p-2"  breakpointCols={breakpointObj}>
         {
           products?.map((product)=> <Product key={product._id} product={product} />)
         }
        </Masonry>
    )
    }
    else{
      return  (
        <Masonry  className="flex animate-slide-fwd"  breakpointCols={breakpointObj2}>
         {
           checkouts?.map((checkout)=> <Card key={checkout._id} checkout={checkout} />)
         }
        </Masonry>
    )
    }

 
   

  
}

export default MasonryLayout