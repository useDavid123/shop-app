import React,{useState , useEffect , useRef} from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
// import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStateContext } from '../context/context'
import { client, urlFor } from '../utils/client'
import ScrollToTop from '../utils/ScrollToTop'
import Product from './Product'
import Spinner from './Spinner'

const ProductDetail = () => {
const [product , setProduct] = useState({})
const [products , setProducts] = useState([])
const [loading , setLoading] = useState(true)
const [index , setIndex] = useState(0)
const {productId} = useParams()
const myRef = useRef(null)
// console.log(productId)


const { qty , IncQty , DecQty , onAdd , setShowCart , setQty} = useStateContext();



// scroll to top after a Page loads react?





useEffect(()=>{
  const getProduct= async ()=> {

    const query = `*[_type == "product" && slug.current == '${productId}'][0]`;
    const product = await client.fetch(query);
    setProduct(product)
   
      setLoading(false)
  }
   getProduct()
  setQty(1)
},[productId])


useEffect(()=>{
  const getProducts = async ()=> {

    
    const productsQuery = `*[_type == "product" && category == '${product.category}' && _id != '${product._id}']`
    const products = await client.fetch(productsQuery);
    setProducts(products)
    
  }
   getProducts()
  
},[ product.category , product._id]  )


useEffect(()=>{
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant", // Optional if you want to skip the scrolling animation
  });
},[productId])



const handleBuyNow = () =>{
     setShowCart(true)
     onAdd(product , qty)
}

console.log(products)

const {name , image , details , price , category , _id} = product


if(loading) return <Spinner message='Getting Product'/>



  return (
    <>
    <ScrollToTop pathname={productId}/>
    <div className="product-detail-container " ref={myRef}>
    <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          < div className="small-images-container" >
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div className='flex gap-1'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
            <span className="minus" onClick={DecQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={IncQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={()=>onAdd(product , qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={()=>handleBuyNow()}>Buy Now</button>
          </div>
        </div>
      </div>

      
    </div>
    
    <div className="maylike-products-wrapper" >
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
      
     
    </>
  )
}

export default ProductDetail