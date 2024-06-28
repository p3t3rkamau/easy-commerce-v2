import React from 'react'
import { FaCommentDots, FaPhone, FaWhatsapp } from 'react-icons/fa'

import FloatingActionButton from '../FloatingActionButton'

import styles from './index.module.scss'

const FloatingActionButtonGroup: React.FC = () => {
  return (
    <div className={styles.floatingActionButtonGroup}>
      <FloatingActionButton icon={<FaPhone />} color="#E91E63" />
      <FloatingActionButton icon={<FaCommentDots />} color="#9C27B0" />
      <FloatingActionButton icon={<FaWhatsapp />} color="#4CAF50" />
    </div>
  )
}

export default FloatingActionButtonGroup
