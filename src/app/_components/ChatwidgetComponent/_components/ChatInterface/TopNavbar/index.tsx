import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { LuRefreshCcw } from 'react-icons/lu'
import { MdCloseFullscreen } from 'react-icons/md'
import { useRouter } from 'next/navigation'

import styles from './index.module.scss'
const TopNavBar = ({ onClose }) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.avatarColumn}>
          <div className={styles.BackIcon} onClick={handleBackClick}>
            <FaChevronLeft className="icon" />
          </div>
        </div>
        <div className={styles.avatarFlex}>
          <div className={styles.RefreshBtn}>
            <LuRefreshCcw />
          </div>
          <div className={styles.CloseBtn}>
            <MdCloseFullscreen onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNavBar
