import React from 'react'
import { IoIosMail } from 'react-icons/io'
import { IoCall } from 'react-icons/io5'
import { MdPhoneCallback } from 'react-icons/md'

import classes from './index.module.scss'
const SalesTopBar = () => {
  return (
    <div className={classes.TopBarContainer}>
      <div className={classes.CurrencyWrapper}>
        <IoCall />
        <span>Free Shipping On All Orders Above 10k</span>
      </div>
      <div className={classes.CurrencyWrapper}>
        <IoCall />
        <span>24/7 Dedicated Support</span>
      </div>
      <div className={classes.callFLex}>
        <div>
          <span>
            <IoIosMail />
          </span>
          <span>1 on 1 Return & 30 Days Money Back</span>
        </div>
        <div className={classes.phoneIcon}>
          <span>
            <MdPhoneCallback />
          </span>
          <span className={classes.callback}>100% Security Online Payment</span>
        </div>
      </div>
    </div>
  )
}

export default SalesTopBar
