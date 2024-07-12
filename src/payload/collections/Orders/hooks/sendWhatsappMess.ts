import axios, { isAxiosError } from 'axios'
import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import { generateClientWhatsAppMessage } from '../../../utilities/clientWhatsappMessage'
import { generateWhatsAppMessage } from '../../../utilities/generateWhatsAppMessage'

const sendOrderToWhatsApp: AfterChangeHook = async ({ doc, operation }) => {
  if (operation === 'create') {
    console.log('Sending WhatsApp message for order')

    // Send message to sales team
    const salesTeamPhoneNumber = '+254795820643'
    const salesTeamMessage = generateWhatsAppMessage(doc)
    const messageType = 'text'

    try {
      const response = await axios.post(
        `https://api.apiwap.com/api/v1/whatsapp/send-message`,
        {
          phoneNumber: salesTeamPhoneNumber,
          message: salesTeamMessage,
          type: messageType,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.APIWAPP_API_KEY}`,
          },
        },
      )
      console.log('WhatsApp message sent to sales team successfully:', response.data)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error(
          'Error sending WhatsApp message to sales team:',
          error.response ? error.response.data : error.message,
        )
      } else {
        console.error('Error sending WhatsApp message to sales team:', error)
      }
    }

    // Send message to client
    let clientPhoneNumber = doc.phoneNumber
    if (!clientPhoneNumber.startsWith('+254')) {
      if (clientPhoneNumber.startsWith('0')) {
        clientPhoneNumber = '+254' + clientPhoneNumber.slice(1)
      } else {
        clientPhoneNumber = '+254' + clientPhoneNumber
      }
    }

    // Ensure the phone number has exactly 13 characters including the prefix
    if (clientPhoneNumber.length !== 13) {
      console.error('Invalid phone number length after formatting:', clientPhoneNumber)
      return
    }

    const clientMessage = generateClientWhatsAppMessage(doc)

    try {
      const response = await axios.post(
        `https://api.apiwap.com/api/v1/whatsapp/send-message`,
        {
          phoneNumber: clientPhoneNumber,
          message: clientMessage,
          type: messageType,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.APIWAPP_API_KEY}`,
          },
        },
      )
      console.log('WhatsApp message sent to client successfully:', response.data)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error(
          'Error sending WhatsApp message to client:',
          error.response ? error.response.data : error.message,
        )
      } else {
        console.error('Error sending WhatsApp message to client:', error)
      }
    }
  }
}

export default sendOrderToWhatsApp
