import React from 'react'
import { LuRefreshCcw } from 'react-icons/lu'
import { MdCloseFullscreen } from 'react-icons/md'

import styles from './index.module.scss'
const HeaderInterface = ({ onClose }) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.avatarColumn}>
          <div className={styles.avatar} />
          <div>
            <h4>EasyBot</h4>
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

export default HeaderInterface
