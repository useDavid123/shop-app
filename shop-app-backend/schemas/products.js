export default {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'productId',
            title: 'ProductId',
            type: 'string',
          },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'number',
      },
    
    ],
  };