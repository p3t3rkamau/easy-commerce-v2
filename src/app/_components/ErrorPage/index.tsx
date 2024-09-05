import React from 'react'

import styles from './index.module.scss'

const errorPage = () => {
  return (
    <div>
      <div className={styles.errorPage}>
        <h2>Oops! Something went wrong.</h2>
        <p>We're working to fix the issue. The page will reload shortly.</p>
        <p>If the problem persists, please try again later or contact support.</p>
      </div>
    </div>
  )
}

export default errorPage
