import React from 'react'
import Image from 'next/image'

import { Media as MediaType } from '../../../../payload/payload-types'
import { Media } from '../../../_components/Media'

import classes from './index.module.scss'

interface ProductImageProps {
  mainImage: MediaType | null // Ensure mainImage can be null or MediaType
  otherImages: MediaType[]
  onImageClick: (image: MediaType) => void
}

const ProductImage: React.FC<ProductImageProps> = ({ mainImage, otherImages, onImageClick }) => {
  const alternativeImageUrl = '/Easy-logo.svg'

  return (
    <div className={classes.imageSection}>
      <div className={classes.mediaWrapper}>
        <Media
          className={classes.alternativeImage}
          // width={300}
          // height={250}
          imgClassName={classes.TheImage}
          resource={mainImage}
          alt="Alternative Image"
        />
      </div>

      <div className={classes.smallImagesWrapper}>
        {otherImages &&
          otherImages.length > 0 &&
          otherImages.map((imageData, index) => (
            <div key={index} className={classes.otherImageItems}>
              <div className={classes.otherImageItem}>
                <Image
                  className={classes.SmallImages}
                  // @ts-ignore
                  src={imageData.media.imagekit.url}
                  width={100}
                  height={100}
                  alt="Image"
                  // @ts-expect-error
                  onClick={() => onImageClick(imageData.media)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProductImage
