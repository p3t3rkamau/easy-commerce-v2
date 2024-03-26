'use client'

import React, { useEffect, useRef } from 'react'

import { Props as MediaProps } from '../types'

import classes from './index.module.scss'

export const Video: React.FC<MediaProps> = props => {
  const { videoClassName, resource, onClick } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // Handle fallback or other actions if needed
        console.warn('Video was suspended.')
      })
    }
  }, [])

  if (resource && typeof resource !== 'string') {
    const { filename, imagekit } = resource
    console.log('videourl', imagekit.url)

    return (
      <>
        {imagekit && imagekit.url && (
          <video
            playsInline
            autoPlay
            muted
            loop
            controls={false}
            className={[classes.video, videoClassName].filter(Boolean).join(' ')}
            onClick={onClick}
            ref={videoRef}
          >
            <source src={imagekit.url} />
          </video>
        )}
      </>
    )
  }

  return null
}
