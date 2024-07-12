import React from 'react'
import Image from 'next/image'
import Link from 'next/link' // Ensure to import Link from next/link

import classes from './index.module.scss'
const EmptyCartMessage = ({ cartIsEmpty, productsPage, user }) => (
  <div className={classes.empty}>
    {cartIsEmpty ? (
      <>
        <div className={classes.emptyImage}>
          <Image
            src="https://ik.imagekit.io/6cga8hi9z/All_Products/neon-online-shopping-cart-with-products_6NCOYGndc.png"
            alt="Empty Cart"
            width={400}
            height={400}
          />
        </div>
        <p>Your cart is empty.</p>
        {typeof productsPage === 'object' && productsPage?.slug && (
          <p>
            <Link href={`/${productsPage.slug}`}>
              <span className={classes.link}>Click here to shop.</span>
            </Link>
          </p>
        )}
        {!user && (
          <p>
            <Link href={`/login?redirect=%2Fcart`}>
              <span className={classes.link}>Log in to view a saved cart.</span>
            </Link>
          </p>
        )}
      </>
    ) : null}
  </div>
)

export default EmptyCartMessage
