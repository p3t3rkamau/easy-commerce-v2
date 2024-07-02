import richText from '../../fields/richText';
import { ColourTextField } from '@nouance/payload-better-fields-plugin';
import { Block } from 'payload/types';

const HolidayBanners: Block = {
  slug: 'holiday-banners',
  imageURL: 'https://ik.imagekit.io/6cga8hi9z/All_Products/Home__17__-PdUvpyMF.png',
 
  fields: [
    {
        name: 'HolidayBanners',
        type: 'array',
        maxRows: 2,
        fields: [
            {
                name: 'title',
                type: 'text',
                required: true,
              },
              richText(),
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
              ...ColourTextField({
                name: 'BackgroundColor',
                required: true,
                
              }),
        ],
      },
   
  ],
};

export default HolidayBanners;