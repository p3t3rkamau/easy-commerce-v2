import React, { useEffect, useState } from 'react'

import { AttributesCollection, Product } from '../../../payload/payload-types'
import { AttributeSelector } from '../../_heros/Product/AttributesSelector'
import { ProductDetails } from '../../_heros/Product/ProductDetail'
import { QuantitySelector } from '../../_heros/Product/QuantitySelector'
import { Button } from '../Button'

import classes from './index.module.scss'

interface AttributeModalProps {
  product: Product
  selectedAttributes: { [key: string]: string }
  setSelectedAttributes: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  onClose: () => void
  onAddToCart: () => void
}

const AttributeModal: React.FC<AttributeModalProps> = ({
  product,
  selectedAttributes,
  setSelectedAttributes,
  quantity,
  setQuantity,
  onClose,
  onAddToCart,
}) => {
  const {
    meta: { image: metaImage },
    ProductsAttributes,
  } = product

  const [mainImage, setMainImage] = useState(metaImage)
  const [minAttributePrice, setMinAttributePrice] = useState<number | null>(null)
  const [maxAttributePrice, setMaxAttributePrice] = useState<number | null>(null)
  const [selectedAttributePrice, setSelectedAttributePrice] = useState<number | null>(null)

  useEffect(() => {
    if (ProductsAttributes && ProductsAttributes.length > 0) {
      const prices = ProductsAttributes.flatMap(attr =>
        attr.Attribute_Property?.map(prop => prop.price).filter(price => price !== undefined),).filter(price => price !== undefined) as number[]

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
    setSelectedAttributes(prevAttributes => ({
      ...prevAttributes,
      [attributeName]: value,
    }))

    const attribute = ProductsAttributes.find(
      attr => attr.Attribute_Name === attributeName,
    ) as AttributesCollection

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
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <button onClick={onClose} className={classes.closeButton}>
          ×
        </button>
        <h6 className={classes.header}>Select Attributes</h6>
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
        <Button onClick={onAddToCart} label="Add to Cart" appearance="primary" />
      </div>
    </div>
  )
}

export default AttributeModal
