import React, { useEffect, useState } from 'react'
import { CgDanger } from 'react-icons/cg'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

import styles from './index.module.scss'

interface StatusBarProps {
  initialStatus?: string
  initialUpdatedAt?: string
}

const StatusBar: React.FC<StatusBarProps> = ({ initialStatus, initialUpdatedAt }) => {
  const [status, setStatus] = useState(initialStatus || 'Loading...')
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt || new Date().toLocaleString())

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/test')
        const data = await response.text()
        setStatus(data)
        setUpdatedAt(new Date().toLocaleString())
      } catch (error) {
        console.error('Error fetching status:', error)
        setStatus('Error fetching status')
      }
    }

    fetchStatus()

    const interval = setInterval(fetchStatus, 60000) // Fetch status every minute
    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [])

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
