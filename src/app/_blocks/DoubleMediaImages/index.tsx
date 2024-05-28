import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'DoubleMediaContent' }>

export const DoubleMediaContent: React.FC<Props> = props => {
  const { mediaContentFields } = props

  return (
    <Gutter>
      <div className={classes.doubleMediaContent}>
        <div className={classes.contentWrapper}>
          {mediaContentFields?.MoreImages?.map(moreImages => (
            <div key={moreImages.id} className={classes.mediaContainer}>
              {moreImages.Images.TwoImages?.map(twoImages => (
                <Media key={twoImages.id} resource={twoImages.media} imgClassName={classes.image} />
              ))}
              {moreImages.Images.TrippleImages?.map(trippleImages => (
                <Media
                  key={trippleImages.id}
                  resource={trippleImages.media}
                  imgClassName={classes.image}
                />
              ))}
              {moreImages.Images.FourImages?.map(fourImages => (
                <Media
                  key={fourImages.id}
                  resource={fourImages.media}
                  imgClassName={classes.image}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Gutter>
  )
}
