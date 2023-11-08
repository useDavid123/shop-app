import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../utils/client';
import { useStateContext } from '../context/context';




const Product = ({product}) => {
    // console.log(product)
    // scroll to top javascript?  
 



    const [postHovered , setPostHovered] = useState(false)
    const [savingPost , setSavingPost] = useState(false) 
    const {user , saveProduct} = useStateContext();
    const {name , image , save , price , slug , _id} = product
    
    
    const [alreadySaved , seetAlreadySaved] = useState( !!(save?.filter((item) => item?.userId === user?._id))?.length)
  
    const navigate = useNavigate()
   
    //  console.log(alreadySaved)
    //  console.log(userInfo)

    const savePin = (id) => {
        if (!alreadySaved) {
          setSavingPost(true);
    
          client
            .patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
              _key: uuidv4(),
              userId: user?._id,
              postedBy: {
                _type: 'postedBy',
                _ref: user._id,
              },
            }])
            .commit()
            .then(() => {
            //   window.location.reload();
             seetAlreadySaved(true)
              setSavingPost(false);
              saveProduct(product)
            });
        }
      };

const chnagePage = () =>{
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    // behavior: "instant", // Optional if you want to skip the scrolling animation
  });
  if(!user) {
    navigate(`/login`)
  }
  navigate(`/product/${slug.current}`)
}
   


  return (
    <div  onMouseOver={()=>setPostHovered(true)}  onMouseLeave={()=>setPostHovered(false)} onClick={()=>chnagePage(_id)} >
        <div className="product-card mt-4 relative">
       
            <div className='absolute top-0 w-[80spx] flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
             style={{height:"100%"}}
             >
             
                  {
                    postHovered ?
                    alreadySaved ?
                    (
                        <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                        {save?.length}  Saved
                      </button>
                    ):
                    ( 
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            savePin(_id);
                        }}
                        type="button"
                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                      >
                      {savingPost ? 'Saving' : 'Save'}
                      </button>
                    )
                    : null
                 }
                   

                  </div>
                  {/* <Link  to={`/product/${slug.current}`} onClick={()=>window.scrollTo(0, 0)}>    */}
          <img 
            src={urlFor(image && image[0])}
          
            className="product-image"
          />
          <div className='flex justify-between p-4'>
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
         
          </div>
          {/* </Link> */}
        </div>
      </div>
    
  )
}

export default Product