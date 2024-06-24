'use client'
import React, { useEffect, useState } from 'react'

import { AttributesCollection, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { AttributeSelector } from './AttributesSelector'
import ProductDescription from './ProductDescription'
import { ProductDetails } from './ProductDetail'
import ProductImage from './ProductImage'
import { QuantitySelector } from './QuantitySelector'
import Review from './Reviews'

import classes from './index.module.scss'

export const ProductHero: React.FC<{ product: Product }> = ({ product }) => {
  const {
    meta: { image: metaImage, description },
    OtherImages,
    ProductsAttributes,
  } = product

  const [mainImage, setMainImage] = useState(metaImage)
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({})
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

  const handleAttributeSelect = (attributeName: string, value: string) => {
    // console.log(`Attribute selected: ${attributeName}, Value: ${value}`)

    setSelectedAttributes(prevAttributes => {
      const newAttributes = {
        ...prevAttributes,
        [attributeName]: value,
      }
      // console.log('Updated selectedAttributes:', newAttributes)
      return newAttributes
    })

    const attribute = ProductsAttributes.find(
      // @ts-ignore
      attr => attr.Attribute_Name === attributeName,
    ) as AttributesCollection

    const selectedProperty = attribute?.Attribute_Property?.find(prop => prop.Value === value)

    if (selectedProperty?.price !== undefined) {
      setSelectedAttributePrice(selectedProperty.price)
      // console.log(`Selected attribute price: ${selectedProperty.price}`)
    } else {
      setSelectedAttributePrice(null)
      // console.log('No price found for selected attribute')
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    } else {
      setQuantity(1) // Ensure quantity doesn't go below 1
    }
  }

  return (
    <Gutter className={classes.productHero}>
      <div>
        <ProductImage
          // @ts-ignore
          mainImage={mainImage}
          // @ts-ignore
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
              // @ts-ignore
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
              selectedAttributes={selectedAttributes}
            />
          </div>
        </div>
        {/* TODO:if a product has a attributes dont just add cart without selecting attributes */}
        <ProductDescription description={description} />
        <Review />
      </div>
    </Gutter>
  )
}

export default ProductHero
