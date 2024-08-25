import React, { useState } from 'react'
import Image from 'next/image'

import { Media as MediaType } from '../../../../payload/payload-types'
import FavoriteButton from '../../../_components/Favourite'
import { Media } from '../../../_components/Media'

import classes from './index.module.scss'

interface ProductImageProps {
  mainImage: MediaType | null
  otherImages: MediaType[]
  onImageClick: (image: MediaType) => void
  productName: string
  productPrice: string
  productUrl: string
}

const ProductImage: React.FC<ProductImageProps> = ({
  mainImage,
  otherImages,
  onImageClick,
  productName,
  productPrice,
  productUrl,
}) => {
  const [fade, setFade] = useState(false)

  const handleImageClick = (image: MediaType) => {
    setFade(true)
    setTimeout(() => {
      onImageClick(image)
      setFade(false)
    }, 300)
  }

  return (
    <div className={classes.imageSection}>
      <div className={classes.imageContainer}>
        <div className={classes.thumbnailColumn}>
          {otherImages?.map((imageData, index) => (
            <div key={index} className={classes.thumbnailWrapper}>
              <Image
                className={classes.thumbnail}
                src={imageData.media.imagekit.url}
                width={60}
                height={60}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageClick(imageData.media)}
              />
            </div>
          ))}
        </div>
        <div className={`${classes.mainImageWrapper} ${fade ? classes.fadeOut : classes.fadeIn}`}>
          <Media className={classes.mainImage} resource={mainImage} alt="Main Product Image" />
          <FavoriteButton
            productName={productName}
            productPrice={productPrice}
            productUrl={productUrl}
            mainImage={mainImage}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductImage
