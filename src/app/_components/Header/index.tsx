'use client'
import React, { useState } from 'react'
import { BubbleChat } from 'flowise-embed-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { noHeaderFooterUrls } from '../../../app/constants'
import { Header } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { HeaderNav } from '../Header/Nav'
import SearchBar from '../SearchBar/searchBar'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()
  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <Link href="/">
          <Image
            src="https://ik.imagekit.io/6cga8hi9z/All_Products/Easy_bake_supplies_Logo_The_Easy_Way_1_9sawEYJgS.webp"
            alt="logo"
            width={60}
            height={40}
          />
        </Link>
        <div className={classes.searchbar}>
          <SearchBar />
        </div>

        <HeaderNav header={header} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
