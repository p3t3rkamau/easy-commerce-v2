import express from 'express'
import payload from 'payload'

import { PAYLOAD_SECRET } from '../config/enviroments'
import { transporter } from './emailService'

const app = express()

export const initPayload = async (): Promise<void> => {
  await payload.init({
    secret: PAYLOAD_SECRET,
    express: app,
    email: {
      transport: transporter,
      fromName: 'Easy Bake Supplies Limited',
      fromAddress: 'noreply@berleensafaris.com',
    },
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })
}
