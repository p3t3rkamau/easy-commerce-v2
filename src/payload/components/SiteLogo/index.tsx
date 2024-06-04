import React from 'react'
import Image from 'next/image'

import styles from './index.module.scss'
const SiteLogo = () => {
  return (
    <div>
      <Image alt="logo" src="/Easy-logo.svg" width={2} height={2} className={styles.ImageLogo} />
    </div>
  )
}

export default SiteLogo
