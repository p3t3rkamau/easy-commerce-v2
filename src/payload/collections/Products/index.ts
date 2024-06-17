import { NumberField } from '@nouance/payload-better-fields-plugin'
import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { beforeProductChange } from './hooks/beforeChange'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'

const calculateDiscountedPrice = ({
  data,
}: {
  data: { price: number; discount: number }
}): number => {
  const { price, discount } = data
  if (typeof price === 'number' && typeof discount === 'number') {
    return price - (price * discount) / 100
  }
  return price
}

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'stripeProductID', '_status'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [beforeProductChange],
    afterChange: [revalidateProduct],
    afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
        {
          label: 'Product Details',
          fields: [
            {
              type: 'row',
              fields: [
                ...NumberField(
                  {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                    required: true,
                    admin: {
                      readOnly: false,
                      hidden: false,
                    },
                  },
                  {
                    prefix: 'Ksh ',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
                ...NumberField(
                  {
                    name: 'discount',
                    label: 'Discount',
                    type: 'number',
                    admin: {
                      readOnly: false,
                      hidden: false,
                    },
                  },
                  {
                    suffix: ' %',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
                {
                  name: 'discountedPrice',
                  label: 'Discounted Price',
                  type: 'number',
                  admin: {
                    readOnly: true, // Make this field read-only to prevent manual edits
                  },
                  hooks: {
                    beforeValidate: [
                      ({ data, siblingData }) => {
                        // Use siblingData for real-time updates
                        const updatedData = {
                          ...data,
                          ...siblingData,
                        }
                        // @ts-expect-error
                        data.discountedPrice = calculateDiscountedPrice({ data: updatedData })
                      },
                    ],
                    beforeChange: [
                      ({ data, siblingData }) => {
                        // Use siblingData for real-time updates
                        const updatedData = {
                          ...data,
                          ...siblingData,
                        }
                        // @ts-expect-error
                        data.discountedPrice = calculateDiscountedPrice({ data: updatedData })
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'FlashSalesItems',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ProductsAttributes',
      type: 'relationship',
      relationTo: 'attributesCollection',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    slugField(),
    {
      name: 'OtherImages',
      label: 'Other Images',
      labels: {
        singular: 'image',
        plural: 'Images',
      },
      type: 'array',
      minRows: 4,
      maxRows: 6,
      fields: [
        {
          type: 'upload',
          name: 'media',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'OutOfStock',
      label: 'Out Of Stock',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        // readOnly: true,
        // hidden: true,
      },
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'brands', // required
      type: 'select', // required
      // hasMany: true,
      admin: {
        isClearable: true,
        position: 'sidebar',
        isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
      },
      options: [
        { label: 'Americolor', value: 'Americolor' },
        { label: 'BakeKing', value: 'BakeKing' },
        { label: 'Bakeland', value: 'Bakeland' },
        { label: 'Bakels', value: 'Bakels' },
        { label: "Baker's Delight", value: "Baker's Delight" },
        { label: 'Bakeware', value: 'Bakeware' },
        { label: 'Blossoms', value: 'Blossoms' },
        { label: 'Candy', value: 'Candy' },
        { label: 'Caroline Cupcakes', value: 'Caroline Cupcakes' },
        { label: 'Clovers', value: 'Clovers' },
        { label: 'Collata', value: 'Collata' },
        { label: 'Dairyland', value: 'Dairyland' },
        { label: 'Dr Gusto', value: 'Dr Gusto' },
        { label: 'Easy Bake Supplies Limited', value: 'Easy Bake Supplies Limited' },
        { label: "Elly's", value: "Elly's" },
        { label: 'Essence', value: 'Essence' },
        { label: 'Eurocas', value: 'Eurocas' },
        { label: 'Europea', value: 'Europea' },
        { label: 'Flour', value: 'Flour' },
        { label: 'Hamilworth', value: 'Hamilworth' },
        { label: 'Kenafric Industries', value: 'Kenafric Industries' },
        { label: 'KSL', value: 'KSL' },
        { label: 'Lato', value: 'Lato' },
        { label: 'Lyons', value: 'Lyons' },
        { label: 'Maimun', value: 'Maimun' },
        { label: 'Nestle', value: 'Nestle' },
        { label: 'Pradip', value: 'Pradip' },
        { label: 'Pristine', value: 'Pristine' },
        { label: 'Puratos', value: 'Puratos' },
        { label: 'Rainbow dust', value: 'Rainbow dust' },
        { label: 'Strawberries', value: 'Strawberries' },
        { label: 'Sugarflair', value: 'Sugarflair' },
        { label: 'Top Lure', value: 'Top Lure' },
        { label: 'Tri Clover', value: 'Tri Clover' },
        { label: 'Ustam', value: 'Ustam' },
        { label: 'Wilton', value: 'Wilton' },
        { label: 'Zeelandia', value: 'Zeelandia' },
        { label: 'Zesta', value: 'Zesta' },
      ],
    },
    {
      name: 'colors', // required
      type: 'select', // required
      hasMany: true,
      admin: {
        isClearable: true,
        position: 'sidebar',
        isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
      },
      options: [
        { label: 'Red', value: 'rgb(255, 0, 0)' },
        { label: 'Blue', value: 'rgb(0, 0, 255)' },
        { label: 'Orange', value: 'rgb(255, 165, 0)' },
        { label: 'Gold', value: 'rgb(255, 215, 0)' },
        { label: 'White', value: 'rgb(255, 255, 255)' },
        { label: 'Black', value: 'rgb(0, 0, 0)' },
        { label: 'Green', value: 'rgb(0, 128, 0)' },
        { label: 'Yellow', value: 'rgb(255, 255, 0)' },
        { label: 'Purple', value: 'rgb(128, 0, 128)' },
        { label: 'Pink', value: 'rgb(255, 192, 203)' },
        { label: 'Cyan', value: 'rgb(0, 255, 255)' },
        { label: 'Magenta', value: 'rgb(255, 0, 255)' },
        { label: 'Lime', value: 'rgb(0, 255, 0)' },
        { label: 'Teal', value: 'rgb(0, 128, 128)' },
        { label: 'Brown', value: 'rgb(165, 42, 42)' },
        { label: 'Navy', value: 'rgb(0, 0, 128)' },
        { label: 'Turquoise', value: 'rgb(64, 224, 208)' },
        { label: 'Salmon', value: 'rgb(250, 128, 114)' },
        { label: 'Indigo', value: 'rgb(75, 0, 130)' },
        { label: 'SlateGray', value: 'rgb(112, 128, 144)' },
        { label: 'Olive', value: 'rgb(128, 128, 0)' },
        { label: 'SteelBlue', value: 'rgb(70, 130, 180)' },
        { label: 'Peru', value: 'rgb(205, 133, 63)' },
        { label: 'Tomato', value: 'rgb(255, 99, 71)' },
        { label: 'DarkOliveGreen', value: 'rgb(85, 107, 47)' },
        { label: 'SkyBlue', value: 'rgb(135, 206, 235)' },
        { label: 'Chocolate', value: 'rgb(210, 105, 30)' },
        { label: 'Sienna', value: 'rgb(160, 82, 45)' },
        { label: 'DarkSlateGray', value: 'rgb(47, 79, 79)' },
        { label: 'DarkCyan', value: 'rgb(0, 139, 139)' },
        { label: 'Maroon', value: 'rgb(128, 0, 0)' },
        { label: 'DarkOrange', value: 'rgb(255, 140, 0)' },
        { label: 'RoyalBlue', value: 'rgb(65, 105, 225)' },
        { label: 'PaleVioletRed', value: 'rgb(219, 112, 147)' },
        { label: 'Lavender', value: 'rgb(230, 230, 250)' },
        { label: 'MediumSpringGreen', value: 'rgb(0, 250, 154)' },
        { label: 'DarkGoldenrod', value: 'rgb(184, 134, 11)' },
        { label: 'MediumPurple', value: 'rgb(147, 112, 219)' },
        { label: 'IndianRed', value: 'rgb(205, 92, 92)' },
        { label: 'DarkTurquoise', value: 'rgb(0, 206, 209)' },
        { label: 'Rose Gold', value: 'rgb(183, 110, 121)' },
        { label: 'Lime Green', value: 'rgb(50, 205, 50)' },
        { label: 'Hot Pink', value: 'rgb(255, 105, 180)' },
        { label: 'Grey', value: 'rgb(128, 128, 128)' },
        { label: 'Silver', value: 'rgb(192, 192, 192)' },
        { label: 'Ivory', value: 'rgb(255, 255, 240)' },
        { label: 'Cream', value: 'rgb(255, 253, 208)' },
        { label: 'Turquoise', value: 'rgb(64, 224, 208)' },
        { label: 'Blue', value: 'rgb(0, 0, 255)' },
        { label: 'Light Pink', value: 'rgb(255, 182, 193)' },
        { label: 'Fuschia', value: 'rgb(255, 0, 255)' },
        { label: 'White Plain', value: 'rgb(255, 255, 255)' },
        { label: 'Pink Polka', value: 'rgb(255, 192, 203)' }, // Light Pink
        { label: 'Red Polka', value: 'rgb(255, 0, 0)' }, // Red
        { label: 'Beyaz White Velvet', value: 'rgb(255, 255, 255)' }, // White
        { label: 'Kirmizi Red Velvet', value: 'rgb(255, 0, 0)' }, // Red
        { label: 'Sari Yellow Velvet', value: 'rgb(255, 255, 0)' }, // Yellow
        { label: 'Siyah Black Velvet', value: 'rgb(0, 0, 0)' }, // Black
        { label: 'Yesil Green Velvet', value: 'rgb(0, 128, 0)' }, // Green
        { label: 'Turuncu Orange Velvet', value: 'rgb(255, 165, 0)' }, // Orange
        { label: 'Pembe Pink Roz', value: 'rgb(255, 192, 203)' }, // Light Pink
      ],
    },
    {
      name: 'size', // required
      type: 'select', // required
      hasMany: true,
      admin: {
        isClearable: true,
        position: 'sidebar',
        isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
      },
      options: [
        { label: '25cm', value: '25cm' },
        { label: '30cm', value: '30cm' },
        { label: '50mm', value: '50mm' },
        { label: '100mm', value: '100mm' },
        { label: '150mm', value: '150mm' },
        { label: '200mm', value: '200mm' },
        { label: '250mm', value: '250mm' },
        { label: '300mm', value: '300mm' },
        { label: '350mm', value: '350mm' },
        { label: '400mm', value: '400mm' },
        { label: '450mm', value: '450mm' },
        { label: '500mm', value: '500mm' },
        { label: '550mm', value: '550mm' },
        { label: '600mm', value: '600mm' },
        { label: '650mm', value: '650mm' },
        { label: '700mm', value: '700mm' },
        { label: '750mm', value: '750mm' },
        { label: '800mm', value: '800mm' },
        { label: '850mm', value: '850mm' },
        { label: '900mm', value: '900mm' },
        { label: '950mm', value: '950mm' },
        { label: '1000mm', value: '1000mm' },
        { label: '850mm', value: '850mm' },
        { label: '900mm', value: '900mm' },
        { label: '950mm', value: '950mm' },
        { label: '1000mm', value: '1000mm' },
        //types
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        //stencils types
        { label: 'Forever Leaves (No 10)', value: 'Forever_Leaves_10' },
        { label: 'Forever Leaves (No A)', value: 'Forever_Leaves_A' },
        { label: 'Forever Leaves (No FID - 5687)', value: 'Forever_Leaves_FID_5687' },
        { label: 'ST - 5687', value: 'ST_5687' },
        { label: 'ST - 5685', value: 'ST_5685' },
        { label: 'ST - 5691', value: 'ST_5691' },
        { label: 'Bohemian Pattern (No 06)', value: 'Bohemian_Pattern_06' },
        { label: 'Harvest (No 1)', value: 'Harvest_1' },
        { label: 'No 8', value: 'No_8' },
        { label: 'No 5', value: 'No_5' },
        { label: 'No 7', value: 'No_7' },
        { label: 'No 17', value: 'No_17' },
        { label: 'No 18', value: 'No_18' },
        //pieces
        { label: '50 Pcs', value: '50pcs' },
        { label: '100 Pcs', value: '100pcs' },
        { label: '500 Pcs', value: '500pcs' },
        { label: '1000 pcs', value: '1000 pcs' },
        //cupcakes container
        { label: '4 Hole Plastic Cupcake Containers', value: '4_Hole_Plastic_Cupcake_Containers' },
        {
          label: '12 Hole Plastic Cupcake Containers',
          value: '12_Hole_Plastic_Cupcake_Containers',
        },
        { label: '6 Hole Plastic Cupcake Containers', value: '6_Hole_Plastic_Cupcake_Containers' },
        {
          label: '24 Hole Plastic Cupcake Containers',
          value: '24_Hole_Plastic_Cupcake_Containers',
        },
        //
        { label: '10 cm * 15 cm', value: '10x15' },
        { label: '12 cm * 20 cm', value: '12x20' },
        { label: '14 cm * 20 cm', value: '14x20' },
        { label: '17 cm * 24 cm', value: '17x24' },
        { label: '18 cm * 26 cm', value: '18x26' },
        { label: '20 cm * 30 cm', value: '20x30' },
        //
        { label: '0.1 Inch', value: '0.1 Inch' },
        { label: '1 Inch', value: '1 Inch' },
        { label: '4 Inch', value: '4 Inch' },
        { label: '5 Inch', value: '5 Inch' },
        { label: '6 Inch', value: '6 Inch' },
        { label: '8 Inch', value: '8 Inch' },
        { label: '10 Inch', value: '10 Inch' },
        { label: '12 Inch', value: '12 Inch' },
        { label: '14 Inch', value: '14 Inch' },
        { label: '16 Inch', value: '16 Inch' },
        { label: '18 Inch', value: '18 Inch' },
        { label: '20 Inch', value: '20 Inch' },
        //
        { label: 'White 10 Inch', value: 'White_10_Inch' },
        { label: 'Peach 10 Inch', value: 'Peach_10_Inch' },
        { label: 'Turquoise 10 Inch', value: 'Turquoise_10_Inch' },
        { label: 'Black 10 Inch', value: 'Black_10_Inch' },
        { label: 'White 12 Inch', value: 'White_12_Inch' },
        { label: 'Turquoise 12 Inch', value: 'Turquoise_12_Inch' },
        //
        { label: '8 * 4', value: '8x4' },
        { label: '10 * 4', value: '10x4' },
        { label: '10 * 5', value: '10x5' },
        { label: '12 * 4', value: '12x4' },
        { label: '12 * 5', value: '12x5' },
        //
        //cake boxes fold
        { label: '4.5 * 4.5 * 2', value: '4.5x4.5x2' },
        { label: '4.5 * 4.5 * 3', value: '4.5x4.5x3' },
        { label: '5 * 5 * 4', value: '5x5x4' },
        { label: '6 * 6 * 4', value: '6x6x4' },
        { label: '8 * 8 * 4', value: '8x8x4' },
        { label: '10 * 10 * 4', value: '10x10x4' },
        { label: '10 * 10 * 5', value: '10x10x5' },
        { label: '11 * 11 * 4', value: '11x11x4' },
        { label: '12 * 12 * 4', value: '12x12x4' },
        { label: '12 * 12 * 5', value: '12x12x5' },
        { label: '14 * 14 * 4', value: '14x14x4' },
        { label: '14 * 14 * 5', value: '14x14x5' },
        { label: '16 * 16 * 4 (Fold 2)', value: '16x16x4_Fold_2' },
        { label: '16 * 16 * 5 (Fold 1)', value: '16x16x5_Fold_1' },
        //
        { label: '10 * 10', value: '10x10' },
        { label: '12 * 12', value: '12x12' },
        { label: '14 * 14', value: '14x14' },
        { label: '16 * 16', value: '16x16' },
        { label: '18 * 18', value: '18x18' },
        { label: '20 * 20', value: '20x20' },
        //Craft cake boxes
        { label: '10 * 10 * 10 Window', value: '10x10x10_Window' },
        { label: '10 * 10 * 10 Plain', value: '10x10x10_Plain' },
        { label: '12 * 12 * 12 Window', value: '12x12x12_Window' },
        { label: '12 * 12 * 12 Plain', value: '12x12x12_Plain' },
        //
        { label: '10 * 10 * 12 (1 kg)', value: '10x10x12_1kg' },
        { label: '12 * 12 * 12 (2 kg)', value: '12x12x12_2kg' },
        { label: '14 * 14 * 14 (3 kg)', value: '14x14x14_3kg' },
        //plain Cake Boxes
        { label: '12 * 12 * 5 Blue', value: '12x12x5_Blue' },
        { label: '12 * 12 * 5 Pink', value: '12x12x5_Pink' },
        { label: '12 * 12 * 5 Green', value: '12x12x5_Green' },
        //Colored Cake Boxes
        { label: '10 * 10 * 5 Polka Green', value: '10x10x5_Polka_Green' },
        { label: '10 * 10 * 5 Polka Blue', value: '10x10x5_Polka_Blue' },
        { label: '10 * 10 * 5 Polka Pink', value: '10x10x5_Polka_Pink' },
        //tall cake boxes
        { label: '10.5 * 10.5 * 10', value: '10.5x10.5x10' },
        { label: '12.5 * 12.5 * 12', value: '12.5x12.5x12' },
        { label: '14 * 14 * 16', value: '14x14x16' },
        { label: '15 * 15 * 16', value: '15x15x16' },
        { label: '18 * 18 * 18', value: '18x18x18' },
        //
        { label: '10 * 10 * 5', value: '10x10x5' },
        { label: '12 * 12 * 5', value: '12x12x5' },
        { label: '14 * 14 * 5', value: '14x14x5' },
        { label: '16 * 16 * 5', value: '16x16x5' },
        { label: '18 * 18 * 5', value: '18x18x5' },
        //dummy sizes
        { label: '4 * 4 inches', value: '4x4x4' },
        { label: '6 * 4 inches', value: '6x4x4' },
        { label: '8 * 4 inches', value: '8x4x4' },
        { label: '10 * 4 inches', value: '10x4x4' },
        { label: '12 * 4 inches', value: '12x4x4' },
        { label: '14 * 4 inches', value: '14x4x4' },
        { label: '16 * 4 inches', value: '16x4x4' },
      ],
    },
    {
      name: 'volumeAndWeight', // required
      type: 'select', // required
      hasMany: true,
      admin: {
        isClearable: true,
        position: 'sidebar',
        isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
      },
      options: [
        { label: '50ml', value: '50ml' },
        { label: '100ml', value: '100ml' },
        { label: '150ml', value: '150ml' },
        { label: '200ml', value: '200ml' },
        { label: '250ml', value: '250ml' },
        { label: '300ml', value: '300ml' },
        { label: '350ml', value: '350ml' },
        { label: '400ml', value: '400ml' },
        { label: '450ml', value: '450ml' },
        { label: '500ml', value: '500ml' },
        { label: '550ml', value: '550ml' },
        { label: '600ml', value: '600ml' },
        { label: '650ml', value: '650ml' },
        { label: '700ml', value: '700ml' },
        { label: '750ml', value: '750ml' },
        { label: '800ml', value: '800ml' },
        { label: '850ml', value: '850ml' },
        { label: '900ml', value: '900ml' },
        { label: '950ml', value: '950ml' },
        { label: '1000ml', value: '1000ml' },
        { label: '100g', value: '100g' },
        { label: '120g', value: '120g' },
        { label: '15g', value: '15g' },
        { label: '1kg', value: '1kg' },
        { label: '2.5kg', value: '2.5kg' },
        { label: '250g', value: '250g' },
        { label: '38g', value: '38g' },
        { label: '40g', value: '40g' },
        { label: '45g', value: '45g' },
        { label: '5kg', value: '5kg' },
        { label: '500g', value: '500g' },
        { label: '80g', value: '80g' },
        { label: '90g', value: '90g' },
        { label: '1kg', value: '1kg' },
        { label: '2kg', value: '2kg' },
        { label: '3kg', value: '3kg' },
        { label: '4kg', value: '4kg' },
        { label: '5kg', value: '5kg' },
        { label: '10kg', value: '10kg' },
        { label: '15kg', value: '15kg' },
        { label: '20kg', value: '20kg' },
        { label: 'Orange Emulsion (50 ml)', value: 'Orange Emulsion (50 ml)' },
        { label: 'Orange Emulsion (240 ml)', value: 'Orange Emulsion (240 ml)' },
        { label: 'Red Velvet (50 ml)', value: 'Red Velvet (50 ml)' },
        { label: 'Red Velvet (240 ml)', value: 'Red Velvet (240 ml)' },
        { label: 'Blueberry (240 ml)', value: 'Blueberry (240 ml)' },
        { label: 'Hot Pink (50 ml)', value: 'Hot Pink (50 ml)' },
        { label: 'Royal Blue (50 ml)', value: 'Royal Blue (50 ml)' },
        { label: 'Fondant Black (50 ml)', value: 'Fondant Black (50 ml)' },
        { label: 'Orange Liquid Food Color (50 ml)', value: 'Orange Liquid Food Color (50 ml)' },
      ],
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 5,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'number_reviews',
      label: 'Number of Reviews',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'Reviews',
      type: 'relationship',
      relationTo: 'Reviews',
      hasMany: true,
      admin: {
        condition: () => false,
      },
    },
  ],
}

export default Products
