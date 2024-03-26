import React, { Fragment } from 'react'
import Image from 'next/image'

import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Price } from '../../_components/Price'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    title,
    categories,
    meta: { image: metaImage, description },
    price,
    size,
    colors,
    volumeAndWeight,
    OutOfStock,
    OtherImages,
  } = product // Destructure price, size, and colors from product
  const alternativeImageUrl = '/Easy-logo.svg'
  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {/* Render the alternative image if metaImage is not available */}
        {!metaImage && (
          <Image
            className={classes.alternativeImage}
            width={300}
            height={250}
            src={alternativeImageUrl}
            alt="Alternative Image"
          />
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </div>

      {/* <div className={classes.otherImages}>
        <div className={classes.otherImageWrapper}>
          <Media imgClassName={classes.otherImage} resource="/Easy-logo.svg" fill />
        </div>
      </div> */}

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            {categories?.map((category, index) => {
              const { title: categoryTitle } = category as Category

              const titleToUse = categoryTitle || 'Generic'
              const isLast = index === categories.length - 1

              return (
                <p key={index} className={classes.category}>
                  {titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}
                  <span className={classes.separator}>|</span>
                </p>
              )
            })}
          </div>
          <p className={classes.stock}>{OutOfStock ? 'Out of stock' : 'In stock'}</p>
        </div>

        <Price product={product} button={false} />

        {/* Render Sizes as a Select Component */}
        {size && size.length > 0 && (
          <div className={classes.sizeSelect}>
            <label htmlFor="sizeSelect">Sizes:</label>
            <select id="sizeSelect">
              {size.map((sizeOption, index) => (
                <option key={index} value={sizeOption}>
                  {sizeOption}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Render Colors as Comma-Separated Boxes */}
        {colors && colors.length > 0 && (
          <div className={classes.colorContainer}>
            <label htmlFor="colorSelect">Colors:</label>
            <div className={classes.colorBoxes}>
              {colors.map((colorOption, index) => {
                // Extract RGB values from the color option
                const rgbValues = colorOption.match(/\d+/g)

                // Construct the RGB string
                const rgbString = `rgb(${rgbValues.join(', ')})`

                return (
                  <div
                    key={index}
                    className={classes.colorBox}
                    style={{ backgroundColor: rgbString }}
                    title={rgbString}
                  ></div>
                )
              })}
            </div>
          </div>
        )}

        {/* Render Volume and Weight as a Select Component */}
        {volumeAndWeight && volumeAndWeight.length > 0 && (
          <div className={classes.volumeAndWeightSelect}>
            <label htmlFor="volumeAndWeightSelect">Volume and Weight:</label>
            <select id="volumeAndWeightSelect">
              {volumeAndWeight.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={classes.description}>
          <h6>Description</h6>
          <p>{description}</p>
        </div>

        <AddToCartButton product={product} className={classes.addToCartButton} />
      </div>
    </Gutter>
  )
}
