import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})

export const PORT = process.env.PORT || 3002
export const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || '8feae4b0-081c-4408-967e-01e3cdc38d98'
export const API_LINK = process.env.API_LINK
export const API_KEY = process.env.API_KEY
export const NEXT_BUILD = process.env.NEXT_BUILD
export const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
export const RESEND_API_KEY = process.env.RESEND_API_KEY
