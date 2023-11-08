import React from 'react'
import { urlFor } from '../utils/client'
import moment from 'moment'

const Card = ({checkout}) => {
    console.log(checkout)
    const {  totalPrice , _id , products , _createdAt } = checkout
   return (
  
<div className=" max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-4">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Total</h5>
        <h5 className=" font-bold leading-none text-gray-900 dark:text-white"> ${totalPrice}</h5>
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {
                products?.map((item)=>(
                    <li className="py-3 sm:py-4" key={item?.productId}>
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={urlFor(item?.image)} alt={item.title} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.title}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Quantity: {item.quantity}
                        </p>
                        
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ${item.price}
                    </div>
                </div>
            </li>
                ))
              }

           
          
        </ul>
        <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold leading-none text-gray-900 dark:text-white">Order at</p>
        <p className=" font-bold leading-none text-gray-900 dark:text-white"> {moment(_createdAt).format('MM/DD/YYYY')}</p>
   </div>
   </div>
</div>

  )
}

export default Card