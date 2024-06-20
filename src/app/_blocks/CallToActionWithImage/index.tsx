import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { VerticalPadding } from '../../_components/VerticalPadding'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'CtaWithImage' }>

const CallToActionWithImageBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links, richText, invertBackground, media }) => {
  return (
    <VerticalPadding
      className={[classes.callToAction, invertBackground && classes.invert]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={classes.wrap}>
        <div className={classes.ImageContainer}>
          <Media resource={media} imgClassName={classes.Image} />
        </div>
        <div className={classes.content}>
          {/* Hello How are You am Test Block */}
          <RichText className={classes.richText} content={richText} />
        </div>
        <div className={classes.linkGroup}>
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} {...link} invert={invertBackground} />
          })}
          {/* <Button el="link" href="/products" label="Explore" appearance="secondary" />
          <Button el="link" href="/products" label="Shop Now" appearance="primary" /> */}
        </div>
      </div>
    </VerticalPadding>
  )
}
export default CallToActionWithImageBlock
