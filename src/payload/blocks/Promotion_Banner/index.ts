import link from '../../fields/link';
import { Block } from 'payload/types';

const PromoBanners: Block = {
  slug: 'promo-banners',
  
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__16__qMMz7QG8C.png',
  fields: [
    {
      name: 'discountPercentage',
      type: 'number',
      required: true,
    },
    {
      name: 'productTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'productDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'originalPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'discountedPrice',
      type: 'number',
      required: true,
    },
    link({}),
    {
      name: 'productImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};

export default PromoBanners;