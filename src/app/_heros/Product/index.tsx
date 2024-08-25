'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import CustomerFeedback from '../../_components/Reviews/index'
import { ReviewsSummary } from '../../_components/Reviews/ReviewSummary'
import { useAttributeHandler } from '../../_utilities/attributeHandler'
import { handleWhatsAppCheckout } from '../../_utilities/whatsappCheckout'
import { demoProductData } from '../../constants/index'
import BreadcrumbItemNextUi from '../../NextUi_components/breadcrumbs'
import TabsUi from '../../NextUi_components/tabs'
import { AttributeSelector } from './AttributesSelector'
import DeliveryInfo from './DeliveryInfor'
import ProductDescription from './ProductDescription'
import { ProductDetails } from './ProductDetail'
import ProductImage from './ProductImage'
import { QuantitySelector } from './QuantitySelector'

import classes from './index.module.scss'

export const ProductHero: React.FC<{ product: Product }> = ({ product }) => {
  const {
    meta: { image: metaImage, description, url },
    OtherImages,
    ProductsAttributes,
    slug,
  } = product

  const [mainImage, setMainImage] = useState(metaImage) // Initially set to the main image
  const { selectedAttributes, selectedAttributePrice, handleAttributeSelect } =
    useAttributeHandler(ProductsAttributes)
  const [quantity, setQuantity] = useState(1) // Initialize quantity to 1
  const [minAttributePrice, setMinAttributePrice] = useState<number | null>(null)
  const [maxAttributePrice, setMaxAttributePrice] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | null>(null) // New state for total price

  const hasAttributes = ProductsAttributes && ProductsAttributes.length > 0

  // Calculate min and max attribute prices
  useEffect(() => {
    if (hasAttributes) {
      const prices = ProductsAttributes.flatMap(attr =>
        attr.Attribute_Property?.map(prop => prop.price).filter(price => price !== undefined),
      ).filter(price => price !== undefined) as number[]

      if (prices.length > 0) {
        setMinAttributePrice(Math.min(...prices))
        setMaxAttributePrice(Math.max(...prices))
      } else {
        setMinAttributePrice(null)
        setMaxAttributePrice(null)
      }
    }
  }, [ProductsAttributes, hasAttributes])

  // Update total price when quantity or attribute price changes
  useEffect(() => {
    if (!hasAttributes) {
      const price = selectedAttributePrice || minAttributePrice || 0
      setTotalPrice(price * quantity)
    }
  }, [selectedAttributePrice, quantity, minAttributePrice, hasAttributes])

  const handleSmallImageClick = (image: any) => {
    setMainImage(image) // Update the main image state when small image is clicked
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(newQuantity, 1)) // Ensure quantity is always 1 or more
  }

  const isAtLeastOneAttributeSelected = () => {
    return Object.values(selectedAttributes).some(attrs => attrs.length > 0)
  }

  const handleEnterPostalCode = (code: string) => {
    console.log('Entered postal code:', code)
    // Handle postal code logic here
  }

  // Extract demo data values
  const { title, price, OutOfStock, averageRating, totalReviews, ratingCounts, reviews } =
    demoProductData

  return (
    <Gutter className={classes.productHero}>
      <BreadcrumbItemNextUi productname={slug} />
      <div className={classes.productContainer}>
        <div className={classes.productImageSection}>
          <ProductImage
            mainImage={mainImage}
            otherImages={OtherImages}
            onImageClick={handleSmallImageClick}
            productName={title}
            productPrice={totalPrice?.toString() || ''}
            productUrl={url}
          />
        </div>
        <div className={classes.productDetailsSection}>
          <ProductDetails
            product={product}
            selectedAttributePrice={null}
            minAttributePrice={null}
            maxAttributePrice={null}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
          <div className={classes.attributesAndQuantity}>
            {hasAttributes && (
              <AttributeSelector
                ProductsAttributes={ProductsAttributes}
                selectedAttributes={selectedAttributes}
                handleAttributeSelect={handleAttributeSelect}
              />
            )}
            {!hasAttributes && (
              <QuantitySelector quantity={quantity} setQuantity={handleQuantityChange} />
            )}
          </div>
          <div className={classes.actionButtons}>
            <AddToCartButton
              product={product}
              quantity={quantity}
              className={classes.addToCartButton}
              selectedAttributes={selectedAttributes}
            />
            <button className={classes.buyNowButton}>Buy Now</button>
            <button
              className={classes.whatsappButton}
              onClick={() =>
                handleWhatsAppCheckout({
                  hasAttributes,
                  isAtLeastOneAttributeSelected,
                  selectedAttributes,
                  title,
                  quantity,
                  selectedAttributePrice,
                  minAttributePrice,
                  maxAttributePrice,
                  url,
                })
              }
            >
              Checkout with WhatsApp
            </button>
          </div>
          <DeliveryInfo onEnterPostalCode={handleEnterPostalCode} />
        </div>
      </div>
      <div className={classes.productTabs}>
        <TabsUi description={description} />
      </div>
      <div className={classes.reviewsSection}>
        <CustomerFeedback
          productName={title}
          averageRating={averageRating}
          totalRatings={totalReviews}
          ratingCounts={ratingCounts}
          reviews={reviews}
        />
      </div>
    </Gutter>
  )
}
