import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types.js'
import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import CallToActionWithImage from '../../_blocks/CallToActionWithImage'
import { ContentBlock } from '../../_blocks/Content'
import EventArchiveBlock from '../../_blocks/EventArchive'
import {
  FavoriteProductsBlock,
  FavouriteProductsProps,
} from '../../_blocks/FavouriteProducts/index'
import FlashDealsArchive from '../../_blocks/FlashDeals'
import LastViewed from '../../_blocks/LastViewed'
import { MediaBlock } from '../../_blocks/MediaBlock'
import RecommededArchive from '../../_blocks/Recommended'
import { RelatedPosts, type RelatedPostsProps } from '../../_blocks/RelatedPosts'
import { RelatedProducts, type RelatedProductsProps } from '../../_blocks/RelatedProducts'
import SliderArchiveBlock from '../../_blocks/SliderArchiveBlock'
import TopDealsArchive from '../../_blocks/TopDealsArchive'
import { toKebabCase } from '../../_utilities/toKebabCase'
import { BackgroundColor } from '../BackgroundColor/index'
import FlexBanner from '../FlexBanner'
import { HolidayBannersComponent } from '../Holiday_Banner/index'
import { PromoBanner } from '../Promo_Banner/index'
import { VerticalPadding, VerticalPaddingOptions } from '../VerticalPadding/index'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  relatedProducts: RelatedProducts,
  relatedPosts: RelatedPosts,
  ctaWithImage: CallToActionWithImage,
  'products-slider': SliderArchiveBlock,
  'Deals-archive': TopDealsArchive,
  'Event-Archive': EventArchiveBlock,
  'flash-sales': FlashDealsArchive,
  recommended: RecommededArchive,
  'last-viewed': LastViewed,
  promoBanner: PromoBanner,
  holiday: HolidayBannersComponent,
  favouriteProducts: FavoriteProductsBlock,
  FlexBanner: FlexBanner,
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0] | RelatedProductsProps | RelatedPostsProps | FavouriteProductsProps)[]
  disableTopPadding?: boolean
  disableBottomPadding?: boolean
}> = props => {
  const { disableTopPadding, disableBottomPadding, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  console.log('Blocks:', blocks) // Log the blocks prop

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          // console.log(`Block ${index}:`, block) // Log each block
          // console.log(`Block Type ${index}:`, blockType) // Log block type

          if (blockType) {
            if (blockType in blockComponents) {
              const Block = blockComponents[blockType]

              // the cta block is containerized, so we don't consider it to be inverted at the block-level
              const blockIsInverted =
                'invertBackground' in block && blockType !== 'cta' && blockType !== 'CtaWithImage'
                  ? block.invertBackground
                  : false
              const prevBlock = blocks[index - 1]

              const prevBlockInverted =
                prevBlock && 'invertBackground' in prevBlock && prevBlock?.invertBackground

              const isPrevSame = Boolean(blockIsInverted) === Boolean(prevBlockInverted)

              let paddingTop: VerticalPaddingOptions = 'none'
              let paddingBottom: VerticalPaddingOptions = 'none'

              if (prevBlock && isPrevSame) {
                paddingTop = 'none'
              }

              if (index === blocks.length - 1) {
                paddingBottom = 'large'
              }

              if (disableTopPadding && index === 0) {
                paddingTop = 'none'
              }

              if (disableBottomPadding && index === 0) {
                paddingBottom = 'none'
              }

              if (Block) {
                // console.log(`Rendering Block ${index}:`, blockType) // Log rendering block
                return (
                  <BackgroundColor key={index} invert={blockIsInverted}>
                    <VerticalPadding top={paddingTop} bottom={paddingBottom}>
                      <Block
                        // @ts-ignore
                        id={toKebabCase(blockName)}
                        {...block}
                      />
                    </VerticalPadding>
                  </BackgroundColor>
                )
              }
            } else {
              console.warn(`Block Type ${blockType} not found in blockComponents`) // Log missing block type
            }
          } else {
            console.warn(`Block Type is undefined for block at index ${index}`) // Log undefined block type
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
