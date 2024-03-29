'use client'
import React, { ChangeEvent, Fragment, useState } from 'react'
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
    size,
    colors,
    volumeAndWeight,
    OutOfStock,
    OtherImages,
  } = product // Destructure price, size, and colors from product
  const [mainImage, setMainImage] = useState(metaImage)

  const alternativeImageUrl = '/Easy-logo.svg'

  const handleSmallImageClick = image => {
    setMainImage(image)
  }
  // State to manage selected colors
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  // Function to toggle selection of a color
  const toggleColorSelection = (color: string) => {
    if (selectedColors.includes(color)) {
      // If color is already selected, remove it
      setSelectedColors(selectedColors.filter(selectedColor => selectedColor !== color))
    } else {
      // If color is not selected, add it
      setSelectedColors([...selectedColors, color])
      console.log(color)
    }
  }
  // Initialize state for selected volume and weight options
  const [selectedVolumeAndWeight, setSelectedVolumeAndWeight] = useState<string[]>([])

  // Event handler for volume and weight selection
  const handleVolumeAndWeightSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value)
    setSelectedVolumeAndWeight(selectedOptions)
  }
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  // Event handler for size selection
  const handleSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value
    if (selectedSizes.includes(selectedOption)) {
      // If size is already selected, remove it
      setSelectedSizes(selectedSizes.filter(size => size !== selectedOption))
    } else {
      // If size is not selected, add it
      setSelectedSizes([...selectedSizes, selectedOption])
    }
  }
  // Function to convert RGB values to color names
  const rgbToColorName = rgbString => {
    // Define a mapping of common color names to their RGB values
    const colorNames = {
      rgb_255_255_255_: 'White',
      rgb_255_0_0_: 'Red',
      rgb_0_255_0_: 'Green',
      rgb_0_0_255_: 'Blue',
      rgb_255_165_0_: 'Orange',
      rgb_255_215_0_: 'Gold',
      rgb_0_0_0_: 'Black',
      rgb_128_128_128_: 'Gray',
      rgb_128_0_128_: 'Purple',
      rgb_255_192_203_: 'Pink',
      rgb_0_255_255_: 'Cyan',
      rgb_255_0_255_: 'Magenta',
      rgb_0_128_0_: 'Lime',
      rgb_0_128_128_: 'Teal',
      rgb_165_42_42_: 'Brown',
      rgb_0_0_128_: 'Navy',
      rgb_64_224_208_: 'Turquoise',
      rgb_250_128_114_: 'Salmon',
      rgb_75_0_130_: 'Indigo',
      rgb_112_128_144_: 'SlateGray',
      rgb_128_128_0_: 'Olive',
      rgb_70_130_180_: 'SteelBlue',
      rgb_205_133_63_: 'Peru',
      rgb_255_99_71_: 'Tomato',
      rgb_85_107_47_: 'DarkOliveGreen',
      rgb_135_206_235_: 'SkyBlue',
      rgb_210_105_30_: 'Chocolate',
      rgb_160_82_45_: 'Sienna',
      rgb_47_79_79_: 'DarkSlateGray',
      rgb_0_139_139_: 'DarkCyan',
      rgb_219_112_147_: 'PaleVioletRed',
      rgb_230_230_250_: 'Lavender',
      rgb_0_250_154_: 'MediumSpringGreen',
      rgb_184_134_11_: 'DarkGoldenrod',
      rgb_147_112_219_: 'MediumPurple',
      rgb_205_92_92_: 'IndianRed',
      rgb_183_110_121_: 'RoseGold',
      rgb_50_205_50_: 'LimeGreen',
      rgb_255_105_180_: 'HotPink',
      rgb_192_192_192_: 'Silver',
      rgb_255_255_240_: 'Ivory',
      rgb_255_253_208_: 'Cream',
      rgb_255_255_0_: 'Yellow',
      rgb_255_182_193_: 'LightPink',
    }

    // Check if the RGB string exists in the colorNames mapping
    if (colorNames.hasOwnProperty(rgbString)) {
      // Return the corresponding color name
      return colorNames[rgbString]
    } else {
      // If no matching color name found, return the RGB string without 'rgb_' suffix
      return rgbString.replace('rgb_', '').replace(/_/g, ', ') // Convert underscores to commas
    }
  }

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.imageSection}>
        <div className={classes.mediaWrapper}>
          {!mainImage && (
            <Image
              className={classes.alternativeImage}
              width={300}
              height={250}
              src={alternativeImageUrl}
              alt="Alternative Image"
            />
          )}
          {mainImage && typeof mainImage !== 'string' && (
            <Media
              imgClassName={`${classes.image} ${classes.zoomEffect}`}
              resource={mainImage}
              fill
            />
          )}
        </div>

        <div className={classes.smallImagesWrapper}>
          {OtherImages && OtherImages.length > 0 && (
            <div className={classes.otherImagesContainer}>
              {OtherImages.map((imageData, index) => (
                <div key={index} className={classes.otherImageItems}>
                  <div className={classes.otherImageItem}>
                    <Image
                      className={classes.SmallImages}
                      /* @ts-expect-error */
                      src={imageData.media.imagekit.url}
                      width={100}
                      height={100}
                      alt="Image"
                      onClick={() => handleSmallImageClick(imageData.media)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
                  {titleToUse}
                </p>
              )
            })}
          </div>
        </div>
        <p className={`${classes.stock} ${OutOfStock ? classes.outOfStock : classes.inStock}`}>
          {OutOfStock ? 'Out of stock' : 'In stock'}
        </p>

        <Price product={product} button={false} />
        {size && size.length > 0 && (
          <div className={classes.sizeSelect}>
            <label htmlFor="sizeSelect">Sizes:</label>
            <select id="sizeSelect" onChange={handleSizeSelect} value={selectedSizes}>
              {size.map((sizeOption, index) => (
                <option key={index} value={sizeOption}>
                  {sizeOption}
                </option>
              ))}
            </select>
            <p>Order: {selectedSizes.join(', ')}</p>
          </div>
        )}

        {/* Render Colors as Comma-Separated Boxes */}
        {colors && colors.length > 0 && (
          <div className={classes.colorContainer}>
            <label htmlFor="colorSelect">Colors:</label>
            <div className={classes.colorBoxes}>
              {colors &&
                colors.length > 0 &&
                colors.map((colorOption, index) => {
                  // Extract RGB values from the color option
                  const rgbValues = colorOption.match(/\d+/g)
                  // Construct the RGB string
                  const rgbString = `rgb(${rgbValues.join(', ')})`

                  return (
                    <div
                      key={index}
                      className={`${classes.colorBox} ${
                        selectedColors.includes(colorOption) ? classes.selected : ''
                      }`}
                      style={{ backgroundColor: rgbString }}
                      title={rgbString}
                      onClick={() => toggleColorSelection(colorOption)}
                    ></div>
                  )
                })}
            </div>
            <p>Order: {selectedColors.map(rgbToColorName).join(', ')}</p>
          </div>
        )}

        {/* Render Volume and Weight as a Select Component */}
        {volumeAndWeight && volumeAndWeight.length > 0 && (
          <div className={classes.volumeAndWeightSelect}>
            <label htmlFor="volumeAndWeightSelect">Volume and Weight:</label>
            <select id="volumeAndWeightSelect" onChange={handleVolumeAndWeightSelect}>
              {volumeAndWeight.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p>Order: {selectedVolumeAndWeight.join(', ')}</p>
          </div>
        )}

        {/* TODO: limit the number of words that can be shown in desscription add reasdd more feature 
        especially in mobile */}
        <div className={classes.description}>
          <h6>Description</h6>
          <p>{description}</p>
        </div>

        <AddToCartButton product={product} className={classes.addToCartButton} />
      </div>
    </Gutter>
  )
}
