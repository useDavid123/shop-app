

import { useEffect , useState } from "react";
import confetti from 'canvas-confetti';


export const categories = [
    {
      name: 'red',
      image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
    },
    {
      name: 'blue',
      image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
    },
    {
      name: 'wallpaper',
      image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
    },
    {
      name: 'websites',
      image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
    },
    {
      name: 'photo',
      image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
    },
    {
      name: 'food',
      image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
    },
    {
      name: 'nature',
      image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
    },
    {
 
      name: 'art',
      image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
    }, {
      name: 'travel',
      image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
    },
    {
      name: 'quotes',
      image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
    }, {
      name: 'cats',
      image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
    }, {
      name: 'dogs',
      image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
    },
    {
      name: 'others',
      image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
    },
  ];
   
  






export const fetchUser = () =>{
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
    return userInfo
}

export const useDebounced = (searchterm , delay) =>{

  const [debouncedValue , setDebouncedValue] = useState('')
  
      useEffect(()=>{
     const timeoutId = setTimeout(()=>{
       setDebouncedValue(searchterm)
     } , delay)
     return ()=> clearTimeout(timeoutId)
      } , [searchterm])
  
     return debouncedValue
  
    }



export const userQuery = (userId) => {
    const query = `*[_type == 'user' && _id == '${userId}']`;

    return query;
  }   



  export const productQuery = `*[_type == "product"] | order(_createdAt desc)`;

  export const searchedQuery = (searchTerm) => {
    const query = `*[_type == "product" && name match '${searchTerm}*' || category match '${searchTerm}*' || details match '${searchTerm}*']`;
    return query;
  };


  export const userSavedProductQuery = (userId) => {
    const query = `*[_type == 'product' && '${userId}' in save[].userId ] | order(_createdAt desc) `;
    return query;
  };

  export const checkOuts = (id) =>{
    const checkoutQuery = `*[_type == "checkout" && userId == '${id}'] | order(_createdAt desc)`
    return checkoutQuery
  }
 
  export const runFireworks = () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
  
      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }
