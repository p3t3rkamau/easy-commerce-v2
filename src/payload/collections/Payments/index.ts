import type { CollectionConfig } from 'payload/types'

import { PaymentList } from './ui/paymentList'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'paymentDate',
    components: {
      views: {
        List: PaymentList,
      },
    },
  },
  fields: [
    {
      name: 'paymentDate',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
  ],
}
