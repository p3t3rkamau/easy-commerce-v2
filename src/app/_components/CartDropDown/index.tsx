import React from 'react'
import { IoTrashBin } from 'react-icons/io5'
import { MdCloseFullscreen } from 'react-icons/md'

import { useCart } from '../../_providers/Cart' // Adjust the import path as needed
import { Media } from '../Media'

import classes from './index.module.scss'

const CartDropDown = () => {
  const { cart, cartTotal, deleteItemFromCart } = useCart()

  return (
    <div className={classes.cartContainer}>
      <div className={classes.dummyDataContainer}>
        {cart.items?.map(item => {
          // Ensure product is of type Product
          if (typeof item.product === 'string' || !item.product) {
            return null // Skip rendering if product is not fully loaded
          }

          return (
            <div className={classes.card} key={item.product.id}>
              <div className={classes.mediaWrapper}>
                <Media imgClassName={classes.image} resource={item.product.image} />
              </div>
              <div className={classes.content}>
                <div
                  className={classes.closeIconBtn}
                  onClick={() => deleteItemFromCart(item.product)}
                >
                  <IoTrashBin />
                </div>
                <span className={classes.title}>{item.product.title}</span>
                <div className={classes.price}>Ksh {item.product.price}</div>
              </div>
            </div>
          )
        })}
        <div className={classes.ButtonComponent}>
          <div className={classes.ButtonContainer}>
            <div>
              <div className={classes.Subtotal}>SubTotal:</div>
            </div>
            <div>{cartTotal.formatted}</div>
          </div>
          <div className={classes.ButtonContainer}>
            <div className={classes.BtnWrapper}>
              <button>View Cart</button>
            </div>
            <div className={classes.BtnWrapper}>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDropDown
