'use client'
import React, { useEffect, useState } from 'react'

import { ShadCnSelect }from '../../../components/Shadcn-ui/select'
import { AttributesCollection, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import BreadcrumbItemNextUi from '../../NextUi_components/breadcrumbs'
import MultipleSelectNextUI from '../../NextUi_components/MultipleSelect'
import TabsUi from '../../NextUi_components/tabs'
import { AttributeSelector } from './AttributesSelector'
import ProductDescription from './ProductDescription'
import { ProductDetails } from './ProductDetail'
import ProductImage from './ProductImage'
import { QuantitySelector } from './QuantitySelector'
import Review from './Reviews'

import classes from './index.module.scss'

export const ProductHero: React.FC<{ product: Product }> = ({ product }) => {
  const {
    meta: { title, image: metaImage, description, url },
    OtherImages,
    ProductsAttributes,
    slug,
  } = product

  const [mainImage, setMainImage] = useState(metaImage)
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: { value: string; quantity: number }[]
  }>({})
  const [quantity, setQuantity] = useState(1)
  const [minAttributePrice, setMinAttributePrice] = useState<number | null>(null)
  const [maxAttributePrice, setMaxAttributePrice] = useState<number | null>(null)
  const [selectedAttributePrice, setSelectedAttributePrice] = useState<number | null>(null)

  useEffect(() => {
    if (ProductsAttributes && ProductsAttributes.length > 0) {
      const prices = ProductsAttributes.flatMap(attr =>
        // @ts-ignore
        attr.Attribute_Property?.map(prop => prop.price).filter(price => price !== undefined),
      ).filter(price => price !== undefined) as number[]

      if (prices.length > 0) {
        setMinAttributePrice(Math.min(...prices))
        setMaxAttributePrice(Math.max(...prices))
      }
    }
  }, [ProductsAttributes])

  const handleSmallImageClick = (image: any) => {
    setMainImage(image)
  }

  const handleAttributeSelect = (attributeName: string, value: string, quantity: number) => {
    setSelectedAttributes(prevAttributes => {
      const currentAttributes = prevAttributes[attributeName] || []
      const attributeIndex = currentAttributes.findIndex(attr => attr.value === value)
      let newAttributes

      if (attributeIndex >= 0) {
        newAttributes = currentAttributes.map((attr, idx) =>
          idx === attributeIndex ? { ...attr, quantity } : attr,)
      } else {
        newAttributes = [...currentAttributes, { value, quantity }]
      }

      const attribute = ProductsAttributes.find(
        // @ts-expect-error
        attr => attr.Attribute_Name === attributeName,
      ) as AttributesCollection

      const selectedProperties = attribute?.Attribute_Property?.filter(prop =>
        newAttributes.map(attr => attr.value).includes(prop.Value),)

      if (selectedProperties && selectedProperties.length > 0) {
        const totalSelectedPrice = selectedProperties.reduce(
          (total, prop) =>
            total +
            (prop.price || 0) *
              (newAttributes.find(attr => attr.value === prop.Value)?.quantity || 0),
          0,
        )
        setSelectedAttributePrice(totalSelectedPrice)
      } else {
        setSelectedAttributePrice(null)
      }

      return {
        ...prevAttributes,
        [attributeName]: newAttributes,
      }
    })
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    } else {
      setQuantity(1) // Ensure quantity doesn't go below 1
    }
  }

  const handleWhatsAppCheckout = () => {
    let formattedMessage = `Hello EasyBake, I want to order ${quantity} of ${title}`
    if (selectedAttributes && Object.keys(selectedAttributes).length > 0) {
      const selectedAttrs = Object.entries(selectedAttributes)
        .map(([attrName, values]) => {
          const attrValues = values.map(attr => `${attr.value} (${attr.quantity})`).join(', ')
          return `${attrName}: ${attrValues}`
        })
        .join(' ')
      formattedMessage += ` ${selectedAttrs}`
    }
    if (selectedAttributePrice) {
      formattedMessage += ` @ KES ${selectedAttributePrice}`
    } else if (minAttributePrice !== null && maxAttributePrice !== null) {
      formattedMessage += ` @ KES ${minAttributePrice} - ${maxAttributePrice}`
    }
    formattedMessage += ` ( ${url} )`

    // Assuming you have a function to send this message via WhatsApp API
    sendWhatsAppMessage(formattedMessage)
  }

  const sendWhatsAppMessage = (message: string) => {
    // Replace with your actual WhatsApp API integration logic
    console.log('Sending WhatsApp message:', message)
    // Example of how you might open a link with WhatsApp URL scheme
    window.open(
      `https://api.whatsapp.com/send?phone=0795820643&text=${encodeURIComponent(message)}`,
      '_blank',
    )
  }

  return (
    <Gutter className={classes.productHero}>
      <div className=" text-red-500">hello</div>
      <BreadcrumbItemNextUi productname={slug} />
      <div>
        <ProductImage
          mainImage={mainImage}
          otherImages={OtherImages}
          onImageClick={handleSmallImageClick}
        />
      </div>
      <div>
        <ProductDetails
          product={product}
          selectedAttributePrice={selectedAttributePrice}
          minAttributePrice={minAttributePrice}
          maxAttributePrice={maxAttributePrice}
        />

        <div className={classes.flexMain}>
          <div className={classes.AttributeFlex}>
            <AttributeSelector
              ProductsAttributes={ProductsAttributes}
              selectedAttributes={selectedAttributes}
              handleAttributeSelect={handleAttributeSelect}
            />
          </div>
          <div className={classes.priceFlex}>
            <QuantitySelector quantity={quantity} setQuantity={handleQuantityChange} />
            <AddToCartButton
              product={product}
              quantity={quantity}
              className={classes.addToCartButton}
              selectedAttributes={selectedAttributes} // Pass selected attributes here
            />
            <button className={classes.whatsappButton} onClick={handleWhatsAppCheckout}>
              Checkout via WhatsApp
            </button>
            <button className={classes.whatsappButton}>Buy Now</button>
          </div>
        </div>
        {/* <ShadCnSelect /> */}
        <ProductDescription description={description} />
        <TabsUi />
      </div>
    </Gutter>
  )
}

export default ProductHero
