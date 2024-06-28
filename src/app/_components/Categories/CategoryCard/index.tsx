import React from 'react'
import NextImage, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const getImageUrl = (media: Media): string | undefined => {
  if (!media || typeof media === 'string') {
    return undefined
  }

  const imagekitUrl = media?.imagekit?.url

  return imagekitUrl || undefined
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media
  const { setCategoryFilters } = useFilter()

  const imageUrl = getImageUrl(media) || ''

  return (
    <Link href="/products" onClick={() => setCategoryFilters([category.id])}>
      <div className={`${classes.card} ${classes.cardWithBackground}`}>
        <NextImage alt={'category image'} src={imageUrl} width={500} height={500} />
      </div>
      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
