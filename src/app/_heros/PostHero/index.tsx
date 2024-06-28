'use client'
import React, { Fragment, useState } from 'react'
import { BsDash } from 'react-icons/bs'
// import { RxAvatar } from "react-icons/rx";
// import { MdOutlineAccessTime } from "react-icons/md";
import { FaLocationDot } from 'react-icons/fa6'
import Image from 'next/image'

import { Post } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import ImageSkewHero from '../../_components/ImageHeroSection'
import { formatDateTime } from '../../_utilities/formatDateTime'

import classes from './index.module.scss'
// import { IoIosContacts } from "react-icons/io";
export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { title, categories, publishedOn, populatedAuthors } = post

  return (
    <Fragment>
      <Gutter className={classes.postHero}>
        <div className={classes.content}>
          <h2 className={classes.title}>{title}</h2>
          <div className={classes.leader}>
            <div className={classes.categories}>
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Untitled category'
                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {titleToUse}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          </div>

          <p className={classes.meta}>
            {populatedAuthors && (
              <Fragment>
                {'By '}
                {populatedAuthors.map((author, index) => {
                  const { name } = author
                  const isLast = index === populatedAuthors.length - 1
                  const secondToLast = index === populatedAuthors.length - 2

                  return (
                    <Fragment key={index}>
                      {name}
                      {secondToLast && populatedAuthors.length > 2 && <Fragment>, </Fragment>}
                      {secondToLast && populatedAuthors.length === 2 && <Fragment> </Fragment>}
                      {!isLast && populatedAuthors.length > 1 && <Fragment>and </Fragment>}
                    </Fragment>
                  )
                })}
              </Fragment>
            )}
            {publishedOn && (
              <Fragment>
                {' on '}
                {formatDateTime(publishedOn)}
              </Fragment>
            )}
          </p>
        </div>
      </Gutter>
    </Fragment>
  )
}
