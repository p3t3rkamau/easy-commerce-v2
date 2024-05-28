import React from 'react'
import { CgDanger } from 'react-icons/cg'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

import styles from './index.module.scss'

interface StatusBarProps {
  status: string
  updatedAt: string
}

const StatusBar: React.FC<StatusBarProps> = ({ status, updatedAt }) => {
  return (
    <div className={styles.container}>
      <div className={styles.statusFlex}>
        <div className={styles.statusContainer}>
          {status === 'All Systems Operational' ? (
            <span className={styles.greenIcon}>
              <RiVerifiedBadgeFill />
            </span>
          ) : (
            <span className={styles.redIcon}>
              <CgDanger />
            </span>
          )}
        </div>
        <div className={styles.Flexstyle}>
          <span className={styles.statusText}>{status}</span>
          <div className={styles.updatedAt}>Updated {updatedAt}</div>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
