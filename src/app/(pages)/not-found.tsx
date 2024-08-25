import React from 'react'
import Link from 'next/link'

import { Gutter } from '../_components/Gutter'
import SearchBar from '../_components/SearchBar/searchBar' // Adjust the import path as needed

import styles from './NotFound.module.scss'

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <Gutter>
        <div className={styles.content}>
          <h1 className={styles.errorCode}>404</h1>
          <div className={styles.errorMessage}>
            <h2>
              <span className={styles.warningIcon}>⚠</span> Oops! Page not found.
            </h2>
            <p>The page you are looking for was not found.</p>
            <p>
              You may return to{' '}
              <Link href="/" className={styles.link}>
                home page
              </Link>{' '}
              or try using the search form.
            </p>
          </div>
        </div>
      </Gutter>
    </div>
  )
}
