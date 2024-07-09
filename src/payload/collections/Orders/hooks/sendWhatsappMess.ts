import axios, { isAxiosError } from 'axios'
import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import { generateWhatsAppMessage } from '../../../utilities/generateWhatsAppMessage'

const sendOrderToWhatsApp: AfterChangeHook = async ({ doc, operation }) => {
  if (operation === 'create') {
    console.log('Sending WhatsApp message for order')

    // const phoneNumber = doc.phoneNumber
    const phoneNumber = '+254795820643'
    const message = generateWhatsAppMessage(doc)
    const messageType = 'text'

    try {
      const response = await axios.post(
        `https://api.apiwap.com/api/v1/whatsapp/send-message`,
        {
          phoneNumber,
          message,
          type: messageType,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.APIWAPP_API_KEY}`,
          },
        },
      )
      console.log('WhatsApp message sent successfully:', response.data)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error(
          'Error sending WhatsApp message:',
          error.response ? error.response.data : error.message,
        )
      } else {
        console.error('Error sending WhatsApp message:', error)
      }
    }
  }
}

export default sendOrderToWhatsApp
