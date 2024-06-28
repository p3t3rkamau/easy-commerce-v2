import React from 'react'
import { GoHomeFill } from 'react-icons/go'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { MdOutlineMessage } from 'react-icons/md'

import styles from './index.module.scss'

interface BottomNavBarProps {
  setActiveView: (view: string) => void
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ setActiveView }) => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.bottomIcon} onClick={() => setActiveView('home')}>
        <GoHomeFill />
      </div>
      <div className={styles.bottomIcon} onClick={() => setActiveView('messages')}>
        <MdOutlineMessage />
      </div>
      <div className={styles.bottomIcon} onClick={() => setActiveView('help')}>
        <IoMdHelpCircleOutline />
      </div>
    </nav>
  )
}

export default BottomNavBar
