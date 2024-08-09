// components/PaymentList.tsx
import React, { useState } from 'react'
import payload from 'payload'
import { Button } from 'payload/components'
import { useConfig } from 'payload/components/utilities'

import { darajaAPI } from '../../../utilities/darajaApi'
import { Card } from './Card'
import { TextField } from './Textfied'
export const PaymentList: React.FC = () => {
  const config = useConfig()
  const [bossPhoneNumber, setBossPhoneNumber] = useState('')
  const [paymentInterval, setPaymentInterval] = useState(30)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleMakePayments = async () => {
    setIsProcessing(true)
    try {
      // @ts-ignore
      const employees = await config.serverURL.find({
        collection: 'employees',
      })

      for (const employee of employees.docs) {
        try {
          const result = await darajaAPI.initiateSTKPush(
            bossPhoneNumber,
            employee.paymentAmount - employee.deductions,
            `Payment for ${employee.name}`,
          )
          // @ts-ignore
          await config.serverURL.create({
            collection: 'payments',
            data: {
              paymentDate: new Date(),
              status: 'pending',
              employee: employee.id,
              amount: employee.paymentAmount - employee.deductions,
            },
          })

          payload.logger.info('STK Push initiated', { employee: employee.name, result })

          await new Promise(resolve => setTimeout(resolve, paymentInterval * 1000))
        } catch (error) {
          payload.logger.error('STK Push failed', { employee: employee.name, error })
        }
      }
    } catch (error) {
      payload.logger.error('Payment process failed', { error })
    } finally {
      setIsProcessing(false)
    }
  }

  // if (config.user?.role !== 'admin') {
  //   return <Card>You don't have permission to access this page.</Card>
  // }

  return (
    <Card>
      <TextField
        label="Boss Phone Number"
        value={bossPhoneNumber}
        onChange={e => setBossPhoneNumber(e.target.value)}
      />
      <TextField
        type="number"
        label="Payment Interval (seconds)"
        value={paymentInterval}
        onChange={e => setPaymentInterval(Number(e.target.value))}
      />
      <Button onClick={handleMakePayments} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Make Payments'}
      </Button>
    </Card>
  )
}
