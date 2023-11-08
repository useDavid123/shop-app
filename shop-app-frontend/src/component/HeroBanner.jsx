import React from 'react';
import {Link} from "react-router-dom"

import { urlFor } from '../utils/client';

const HeroBanner = ({ bannerData }) => {
  return (
    <div className="hero-banner-container">
    <div className="banner-desc">
        <div className="left">
          <p>{bannerData.discount}</p>
          <h3>{bannerData.largeText1}</h3>
          <h3>{bannerData.largeText2}</h3>
          <p>{bannerData.desc}</p>
          <p>{bannerData.saleTime}</p>
         
        
          <Link to={`/product/${bannerData.product}`}>
            <button type="button">{bannerData.buttonText}</button>
          </Link>
        </div>


        <div className="right">
        <img 
          src={urlFor(bannerData.image)} className="footer-banner-image"
          // width={200}
        />
        </div>

       
      </div>
    </div>
  )
}

export default HeroBanner