'use client'
import React, { useEffect, useState } from 'react'

import { AttributesCollection, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { AttributeSelector } from './AttributesSelector'
import { ProductDescription } from './ProductDescription'
import { ProductDetails } from './ProductDetail'
import ProductImage from './ProductImage'
import { QuantitySelector } from './QuantitySelector'

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
    setSelectedAttributes({
      ...selectedAttributes,
      [attributeName]: value,
    })

    const attribute = ProductsAttributes.find(attr => attr.Attribute_Name === attributeName) as AttributesCollection

    const selectedProperty = attribute?.Attribute_Property?.find(prop => prop.Value === value)

    if (selectedProperty?.price !== undefined) {
      setSelectedAttributePrice(selectedProperty.price)
    } else {
      setSelectedAttributePrice(null)
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
      <ProductImage
        mainImage={mainImage}
        otherImages={OtherImages}
        onImageClick={handleSmallImageClick}
      />
      <ProductDetails
        product={product}
        selectedAttributePrice={selectedAttributePrice}
        minAttributePrice={minAttributePrice}
        maxAttributePrice={maxAttributePrice}
      />
      <AttributeSelector
        ProductsAttributes={ProductsAttributes}
        selectedAttributes={selectedAttributes}
        handleAttributeSelect={handleAttributeSelect}
      />
      <QuantitySelector quantity={quantity} setQuantity={handleQuantityChange} />
      <AddToCartButton
        product={product}
        quantity={quantity}
        className={classes.addToCartButton}
        selectedAttributes={selectedAttributes}
      />
      <ProductDescription description={description} />
    </Gutter>
  )
}

export default ProductHero
