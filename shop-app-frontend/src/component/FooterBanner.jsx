import React from 'react';
import {Link} from "react-router-dom"

import { urlFor } from '../utils/client';

const FooterBanner = ({ bannerData: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{desc}</p>
          <p>{saleTime}</p>
         
        
          <Link to={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>


        <div className="right">
        <img 
          src={urlFor(image)} className="footer-banner-image"
          // width={200}
        />
        </div>

       
      </div>
    </div>
  )
}

export default FooterBanner;