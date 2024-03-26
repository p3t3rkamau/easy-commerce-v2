'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Category, Footer, Media } from '../../../../payload/payload-types'
import { inclusions, noHeaderFooterUrls, profileNavItems } from '../../../constants'
import { Button } from '../../Button'
import { Gutter } from '../../Gutter'

import classes from './index.module.scss'

type FooterComponentProps = {
  footer: Footer
  categories: Category[] // Specify that categories is an array of Category objects
}
// const FooterComponent = ({ footer, categories }: FooterComponentProps) => {
//   const pathname = usePathname()
//   const navItems = footer?.navItems || []
//   const category = footer?.Categories || []
//   console.log('cate', category)

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []
  const categories = footer?.Categories || []
  console.log(categories)

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map(inclusion => (
            <li key={inclusion.title}>
              <Image
                src={inclusion.icon}
                alt={inclusion.title}
                width={36}
                height={36}
                className={classes.icon}
              />

              <h5 className={classes.title}>{inclusion.title}</h5>
              <p>{inclusion.description}</p>
            </li>
          ))}
        </ul>
      </Gutter>

      <div className={classes.footer}>
        <Gutter>
          <div className={classes.wrap}>
            <Link href="/">
              <Image src="/Easy-logo.svg" alt="logo" width={80} height={50} />
            </Link>

            <p>Categories</p>
            {categories.map((category: Category, index: number) => (
              <li key={index}>
                <span>{category.title}</span>
              </li>
            ))}
            <div>
              <p>Contact Us</p>
              <ul>
                <li>0795820643 || 0795820643</li>
              </ul>
            </div>
            <div className={classes.socialLinks}>
              {navItems.map(item => {
                const icon = item?.link?.icon as Media

                return (
                  <Button
                    key={item.link.label}
                    el="link"
                    href={item.link.url}
                    newTab={true}
                    className={classes.socialLinkItem}
                  >
                    <Image
                      src={icon?.imagekit?.url}
                      alt={item.link.label}
                      width={24}
                      height={24}
                      className={classes.socialIcon}
                    />
                  </Button>
                )
              })}
            </div>
            <p>{footer?.copyright}</p>
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
