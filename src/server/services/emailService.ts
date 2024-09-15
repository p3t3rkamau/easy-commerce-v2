import nodemailer from 'nodemailer'

import { sendEmail } from '../../../src/payload/utilities/sendemail.jsx'
import { RESEND_API_KEY } from '../config/enviroments'

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: RESEND_API_KEY,
  },
})

export { sendEmail, transporter }
