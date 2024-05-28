import React from 'react'
import { GoHomeFill } from 'react-icons/go'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { MdOutlineMessage } from 'react-icons/md'

import styles from './index.module.scss'

const BottomNavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.bottomIcon}>
        <GoHomeFill />
      </div>
      <div className={styles.bottomIcon}>
        <MdOutlineMessage />
      </div>
      <div className={styles.bottomIcon}>
        <IoMdHelpCircleOutline />
      </div>
    </nav>
  )
}

export default BottomNavBar
