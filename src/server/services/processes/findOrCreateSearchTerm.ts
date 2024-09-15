import payload from 'payload'

export const findOrCreateSearchTerm = async term => {
  try {
    const existingTerm = await payload.find({
      collection: 'searchTerms',
      where: {
        term: {
          equals: term,
        },
      },
    })

    if (existingTerm.totalDocs > 0) {
      await payload.update({
        collection: 'searchTerms',
        id: existingTerm.docs[0].id,
        data: {
          count: existingTerm.docs[0].count + 1,
          lastSearched: new Date(),
        },
      })
    } else {
      await payload.create({
        collection: 'searchTerms',
        data: {
          term,
          count: 1,
          lastSearched: new Date(),
        },
      })
    }
  } catch (error: unknown) {
    console.error('Error finding or creating search term:', error)
    throw error
  }
}
