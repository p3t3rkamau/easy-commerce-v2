import React from 'react'
import { StaticImageData } from 'next/image'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'contentMedia' }> & {
  staticImage?: StaticImageData
  id?: string
}
export const ContentMediaBlock: React.FC<Props> = props => {
  const { media, mediaPosition, richText, staticImage } = props

  return (
    <Gutter>
      <div className={classes.contentMediaBlock}>
        <div
          className={`${classes.contentWrapper} ${
            mediaPosition === 'right' ? classes.mediaRight : classes.mediaLeft
          }`}
        >
          <div className={classes.richTextContainer}>
            <RichText content={richText} />
          </div>
          <div className={classes.mediaContainer}>
            <Media resource={media} src={staticImage} imgClassName={classes.image} />
          </div>
        </div>
      </div>
    </Gutter>
  )
}
