import React, { useState } from 'react'

import { deposit } from '../../../../payload/Mpesa/index' // Update the path accordingly

import styles from './index.module.scss'

const DepositForm: React.FC = () => {
  const [amount, setAmount] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleDeposit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await deposit({ amount: parseFloat(amount), accountNumber, phone })
      setSuccessMessage('Deposit request initiated successfully!')
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('An error occurred, please try again later')
    }
  }

  return (
    <div className={styles.container}>
      {successMessage && <p className={`${styles.message} ${styles.success}`}>{successMessage}</p>}
      {errorMessage && <p className={`${styles.message} ${styles.error}`}>{errorMessage}</p>}
      <form onSubmit={handleDeposit} className={styles.form}>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className={styles.input}
        />
        <input
          type="text"
          value={accountNumber}
          onChange={e => setAccountNumber(e.target.value)}
          placeholder="Account Number"
          required
          className={styles.input}
        />
        <input
          type="number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
          className={styles.input}
        />
        <input type="submit" className={styles.button} value="Deposit" />
      </form>
    </div>
  )
}

export default DepositForm
