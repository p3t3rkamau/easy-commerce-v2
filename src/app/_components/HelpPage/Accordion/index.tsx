import React, { useState } from 'react'

import styles from './index.module.scss'

interface AccordionProps {
  question: string
  answer: string
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
      <button className={styles.question} onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className={styles.icon}>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className={styles.answer}>{answer}</div>}
    </div>
  )
}

export default Accordion
