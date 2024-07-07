import type { CollectionConfig } from 'payload/types'

const SearchTerms: CollectionConfig = {
  slug: 'searchTerms',
  admin: {
    useAsTitle: 'term',
  },
  fields: [
    {
      name: 'term',
      type: 'text',
      required: true,
    },
    {
      name: 'count',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'lastSearched',
      type: 'date',
    },
  ],
}

export default SearchTerms
