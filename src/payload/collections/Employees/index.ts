import type { CollectionConfig } from 'payload/types'

export const Employees: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'paymentAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'deductions',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'deductionReasons',
      type: 'text',
    },
    {
      name: 'tax',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
