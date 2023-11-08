import React, { useState } from 'react'
import { useEffect } from 'react'
import { FooterBanner, HeroBanner, Product, Spinner } from '../component'
import Layout from '../component/Layout'
import { client } from '../utils/client'





const Landing = () => {

    const [loading , setLoading] = useState(true)
    const [products , setProducts] = useState([])
    const [bannerData , setBannerData] = useState({})


    const fetchData = async()=>{
        const query = '*[_type =="product"]| order(_createdAt desc)[0..5]';
        const bannerQuery = '*[_type == "banner"]';
        const products = await client.fetch(query);
         const bannerData = await client.fetch(bannerQuery);
         setProducts(products)
         setBannerData(bannerData)
         setLoading(false)


    }



    useEffect(()=>{
     fetchData()   
    },[])

    console.log(bannerData)
    console.log(products)
if(loading) return <Spinner/>


  return (
    <Layout>
    <HeroBanner bannerData={!!bannerData?.length && bannerData[0]}/>


<div className="products-heading">
<h2>Best Seller Products</h2>
<p>speaker There are many variations passages</p>
</div>

<div className="products-container">
{products?.map((product) => <Product key={product._id} product={product} />)}
</div>

<FooterBanner bannerData={!!bannerData?.length && bannerData[0]}  /> 
    </Layout>
  
  )
}

export default Landing