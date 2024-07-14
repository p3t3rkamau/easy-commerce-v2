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
  const topBrands = footer?.topbrands || []
  const Information = footer?.information || []
  // console.log(topBrands, Information)

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
            <div className={classes.footerLogo}>
              <Link href="/">
                <Image
                  src="https://ik.imagekit.io/6cga8hi9z/All_Products/Easy_bake_supplies_Logo_The_Easy_Way_1_9sawEYJgS.webp"
                  alt="logo"
                  width={100}
                  height={50}
                />
              </Link>
            </div>
            <div className={classes.footerWrapper}>
              <div>
                <h3>Contact Us</h3>
                <ul>
                  <li>
                    <span className={classes.footerLabel}>Address: </span>Anna's Arcade First Floor
                    Room 29c
                  </li>
                  <li>
                    <span className={classes.footerLabel}>Phone No: </span>0789993396 || 0717730005
                  </li>
                  <li>
                    <span className={classes.footerLabel}>Email: </span>hello@easybake.co.ke
                  </li>
                  <li>
                    <span className={classes.footerLabel}>Working Days/Hours: </span>Mon-Fri /
                    8:30Am-6Pm | Sat 9:00-5Pm
                  </li>
                </ul>
                <div className={classes.Socials}>
                  <p>Follow US On</p>
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
                </div>
              </div>
              <div className={classes.Footercategories}>
                <h3>Categories</h3>
                {categories.map((category: Category, index: number) => (
                  <li className={classes.footerlist} key={index}>
                    <Link className={classes.title} href={`/${category?.CustomUrl}`} passHref>
                      {' '}
                      {category.title}
                    </Link>
                  </li>
                ))}
              </div>
              <div className={classes.Topbrands}>
                <h3>Top Brands</h3>
                {topBrands.map((category: Category, index: number) => (
                  <li className={classes.footerlist} key={index}>
                    <Link className={classes.title} href={`/${category?.CustomUrl}`} passHref>
                      {' '}
                      {category.title}
                    </Link>
                  </li>
                ))}
              </div>
              <div className={classes.InformationSection}>
                <h3>Information</h3>
                {Information.map((category: Category, index: number) => (
                  <li className={classes.footerlist} key={index}>
                    <Link className={classes.title} href={`/${category?.CustomUrl}`} passHref>
                      {' '}
                      {category.title}
                    </Link>
                  </li>
                ))}
              </div>
              {/* <div className={classes.paymentMethod}>
                <p>Payment Method</p>
                <Image src={'/mpesa-image.png'} alt={'mpesa image'} width={50} height={20} />
              </div> */}
            </div>
            <div className={classes.copyright}>
              <p>{footer?.copyright}</p>
            </div>
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
