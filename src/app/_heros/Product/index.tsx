'use client'
import React, { useEffect, useState } from 'react'

import { AttributesCollection, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import CustomerFeedback from '../../_components/Reviews/index'
import BreadcrumbItemNextUi from '../../NextUi_components/breadcrumbs'
import TabsUi from '../../NextUi_components/tabs'
import { AttributeSelector } from './AttributesSelector'
import ProductDescription from './ProductDescription'
import { ProductDetails } from './ProductDetail'
import ProductImage from './ProductImage'
import { QuantitySelector } from './QuantitySelector'

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

  const hasAttributes = ProductsAttributes && ProductsAttributes.length > 0

  useEffect(() => {
    if (hasAttributes) {
      const prices = ProductsAttributes.flatMap(attr =>
        // @ts-ignore
        attr.Attribute_Property?.map(prop => prop.price).filter(price => price !== undefined),
      ).filter(price => price !== undefined) as number[]

      if (prices.length > 0) {
        setMinAttributePrice(Math.min(...prices))
        setMaxAttributePrice(Math.max(...prices))
      }
    }
  }, [ProductsAttributes, hasAttributes])

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

  const isAtLeastOneAttributeSelected = () => {
    return Object.values(selectedAttributes).some(attrs => attrs.length > 0)
  }

  const handleWhatsAppCheckout = () => {
    if (hasAttributes && !isAtLeastOneAttributeSelected()) {
      alert('Please select at least one attribute before checking out.')
      return
    }

    let formattedMessage = `Hello EasyBake, I want to order `
    if (hasAttributes) {
      const selectedAttrs = Object.entries(selectedAttributes)
        .map(([attrName, values]) => {
          const attrValues = values.map(attr => `${attr.value} (${attr.quantity})`).join(', ')
          return `${attrName}: ${attrValues}`
        })
        .join(' ')
      formattedMessage += `${selectedAttrs} of ${title}`
    } else {
      formattedMessage += `${quantity} of ${title}`
    }

    if (selectedAttributePrice) {
      formattedMessage += ` @ KES ${selectedAttributePrice}`
    } else if (minAttributePrice !== null && maxAttributePrice !== null) {
      formattedMessage += ` @ KES ${minAttributePrice} - ${maxAttributePrice}`
    }
    formattedMessage += ` ( ${url} )`

    sendWhatsAppMessage(formattedMessage)
  }

  const sendWhatsAppMessage = (message: string) => {
    window.open(
      `https://api.whatsapp.com/send?phone=0795820643&text=${encodeURIComponent(message)}`,
      '_blank',
    )
  }

  return (
    <Gutter className={classes.productHero}>
      <div>hello</div>
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
            {hasAttributes && (
              <AttributeSelector
                ProductsAttributes={ProductsAttributes}
                selectedAttributes={selectedAttributes}
                handleAttributeSelect={handleAttributeSelect}
              />
            )}
          </div>
          <div className={classes.priceFlex}>
            {!hasAttributes && (
              <QuantitySelector quantity={quantity} setQuantity={handleQuantityChange} />
            )}
            <AddToCartButton
              product={product}
              quantity={hasAttributes ? 1 : quantity}
              className={`${classes.addToCartButton} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
              selectedAttributes={selectedAttributes}
            />
            <button
              className={`${classes.whatsappButton} bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded`}
              onClick={handleWhatsAppCheckout}
            >
              Checkout via WhatsApp
            </button>
            <button
              className={`${classes.whatsappButton} bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded`}
            >
              Buy Now
            </button>
          </div>
        </div>
        {/* <ProductDescription description={description} /> */}
        <TabsUi description={description} />
      </div>
      <div>
        <CustomerFeedback
          productName="Puratos"
          averageRating={4.6}
          totalRatings={48}
          ratingCounts={{
            5: 39,
            4: 5,
            3: 2,
            2: 0,
            1: 2,
          }}
          reviews={[
            {
              rating: 4,
              title: 'HP charger',
              content: 'Good n working I recommend anyone.',
              author: 'ERICK',
              date: '17-07-2024',
              verified: true,
            },
            {
              rating: 5,
              title: 'It is a great product',
              content: 'It is a great product',
              author: 'misogynist',
              date: '31-05-2024',
              verified: true,
            },
            {
              rating: 5,
              title: 'perfect',
              content: 'perfect',
              author: 'Anonymous',
              date: '15-06-2024',
              verified: false,
            },
          ]}
        />
      </div>
    </Gutter>
  )
}

export default ProductHero
