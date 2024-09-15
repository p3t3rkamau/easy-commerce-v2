import payload from 'payload'

import { retryTransaction } from '../../utils/retryTransaction'

export const findOrCreateFeedback = async feedbackResponses => {
  try {
    await retryTransaction(async () => {
      await Promise.all(
        feedbackResponses.map(async response => {
          const existingResponse = await payload.find({
            collection: 'feedbackform',
            where: {
              questionId: response.questionId,
              response: response.response,
            },
          })

          if (existingResponse.totalDocs > 0) {
            const existingDoc = existingResponse.docs[0]
            await payload.update({
              collection: 'feedbackform',
              id: existingDoc.id,
              data: {
                count: existingDoc.count + 1,
              },
            })
          } else {
            await payload.create({
              collection: 'feedbackform',
              data: {
                ...response,
                count: 1,
              },
            })
          }
        }),
      )
    })
  } catch (error: unknown) {
    console.error('Error finding or creating feedback:', error)
    throw error
  }
}
