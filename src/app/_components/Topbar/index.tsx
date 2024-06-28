import React from 'react'
import { IoIosMail } from 'react-icons/io'
import { IoCall } from 'react-icons/io5'
import { MdPhoneCallback } from 'react-icons/md'

import classes from './index.module.scss'
const TopBar = () => {
  return (
    <div className={classes.TopBarContainer}>
      <div className={classes.CurrencyWrapper}>
        {/* <IoCall /> */}
        <span>MegaSale: Season SALE With discout upto 50%</span>
      </div>
      <div className={classes.callFLex}>
        <div>
          <span>
            <IoIosMail />
          </span>
          <span>info@easybake.co.ke</span>
        </div>
        <div className={classes.phoneIcon}>
          <span>
            <MdPhoneCallback />
          </span>
          <span className={classes.callback}>Track Order</span>
        </div>
      </div>
    </div>
  )
}

export default TopBar
