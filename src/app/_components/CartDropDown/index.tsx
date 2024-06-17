import React from 'react'
import { MdCloseFullscreen } from 'react-icons/md'

import CloseButton from '../Header/closeHamburger'
import { Media } from '../Media'

import classes from './index.module.scss'
const CartDropDown = () => {
  return (
    <div>
      <div className={classes.cartContainer}>
        <div className={classes.dummyDataContainer}>
          <div className={classes.card}>
            <div className={classes.mediaWrapper}>
              <Media imgClassName={classes.image} resource="" />
            </div>

            <div className={classes.content}>
              <div className={classes.closeIconBtn}>
                <MdCloseFullscreen />
              </div>
              <span className={classes.title}>Title</span>
              <div className={classes.price}>Ksh 180</div>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.mediaWrapper}>
              <Media imgClassName={classes.image} resource="" />
            </div>

            <div className={classes.content}>
              <div className={classes.closeIconBtn}>
                <MdCloseFullscreen />
              </div>
              <span className={classes.title}>Title</span>
              <div className={classes.price}>Ksh 180</div>
            </div>
          </div>
          <div>
            <div className={classes.ButtonComponent}>
              <div className={classes.ButtonContainer}>
                <div>
                  <div className={classes.Subtotal}>SubTotal:</div>
                </div>
                <div>Ksh 120</div>
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
      </div>
    </div>
  )
}

export default CartDropDown
