export default {
    name: 'checkout',
    title: 'Checkout',
    type: 'document',
    fields: [
    
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
      {
        name: 'postedBy',
        title: 'PostedBy',
        type: 'postedBy',
      },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [{ type: 'products' }],
      },
      {
        name: 'totalPrice',
        title: 'TotalPrice',
        type: 'number',
      
      },
    ],
  };