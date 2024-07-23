import React from 'react'

import Accordion from '../Accordion'

import styles from './index.module.scss'

interface QuestionListProps {
  category: string
  topNav: string
}

const content = {
  'Pay for Your Order': {
    title: 'How to pay for your order',
    content:
      'Jumia offers multiple payment options. Pay for the item on delivery by using your card, bank transfer, or USSD via our JumiaPay secure platform. You can also pay for your order using a voucher.',
  },
  // Add other top navigation content here
}

const questions = {
  Payments: [
    { question: 'What payment methods are available?', answer: '...' },
    { question: 'How do I pay with a credit card?', answer: '...' },
    // Add more questions for Payments
  ],
  Delivery: [
    { question: 'How can I track my delivery?', answer: '...' },
    { question: 'What if I am not available to receive my delivery?', answer: '...' },
    // Add more questions for Delivery
  ],
  // Add more categories and questions here
}

const QuestionList: React.FC<QuestionListProps> = ({ category, topNav }) => {
  if (content[topNav]) {
    return (
      <div className={styles.contentArea}>
        <h3>{content[topNav].title}</h3>
        <p>{content[topNav].content}</p>
      </div>
    )
  }

  return (
    <div className={styles.questionList}>
      {questions[category]?.map((item, index) => (
        <Accordion key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}

export default QuestionList
