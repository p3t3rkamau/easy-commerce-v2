import React from 'react'
import { RxAvatar } from 'react-icons/rx'
import Image from 'next/image'

import styles from './index.module.scss'

const HeroComponent: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <span className={styles.mongoDBLogo}>EasyBake</span>
      </div>
      <div className={styles.iconsContainer}>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
          data-tooltip="Sabina"
        >
          <RxAvatar />
        </a>
        <a
          href="https://wa.me/0987654321"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
          data-tooltip="Sharon"
        >
          <RxAvatar />
        </a>
        <a
          href="https://wa.me/1122334455"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icon}
          data-tooltip="Virginia"
        >
          <RxAvatar />
        </a>
      </div>
    </div>
  )
}

export default HeroComponent
