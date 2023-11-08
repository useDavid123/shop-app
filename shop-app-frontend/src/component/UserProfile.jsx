import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import {   checkOuts,  userSavedProductQuery } from '../utils/data';
import { useStateContext } from '../context/context';

import MasonryLayout from './Masonry';
import Spinner from './Spinner';
import { client } from '../utils/client';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-25 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {

  const [checkouts, setCheckouts] = useState([]);
  

  const [activeBtn, setActiveBtn] = useState('saved');
  const navigate = useNavigate();

const {user , savedProducts} = useStateContext()
// console.log(user)

//   const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

//   useEffect(() => {
//     const query = userQuery(userId);
//     client.fetch(query).then((data) => {
//       setUser(data[0]);
//     });
//   }, [userId]);

  useEffect(() => {
   
    const fetchData = async () =>{
     
      
      const checkoutQuery = checkOuts(user._id)
     await  client.fetch(checkoutQuery).then((data) => {
        setCheckouts(data);
       
       
      });

    


    }  

    fetchData()
      
    
  }, [ user._id]);


  console.log(savedProducts)


  const logout = () => {
    localStorage.clear();

    navigate('/login');
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
          
              <GoogleLogout
                clientId={`${import.meta.env.VITE_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
             
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
          <button
            type="button"
            onClick={(e) => {
           
              setActiveBtn('checkout');
            }}
            className={`${activeBtn === 'checkout' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Checkouts
          </button>
        </div>

        {
          activeBtn === "saved" && (
            <>
            <div className="px-2">
          <MasonryLayout products={savedProducts} />
        </div>

        {!savedProducts?.length && (
        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
          No Products Found!
        </div>
        )}
        </>
          )
        }

        {
          activeBtn === "checkout" &&  (
            <>
              <div className="px-2">
            <MasonryLayout checkouts={checkouts} />
          </div>
  
          {!checkouts?.length && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Checkouts Found!
          </div>
          )}
          </>
          )
        }

      
      </div>

    </div>
  );
};

export default UserProfile;