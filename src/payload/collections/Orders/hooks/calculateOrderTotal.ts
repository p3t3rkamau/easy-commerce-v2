import axios from 'axios'
import type { BeforeChangeHook } from 'payload/dist/collections/config/types'

const calculateOrderTotal: BeforeChangeHook = async ({ data }) => {
  if (!data) return data

  const { deliveryType, location, items } = data

  // API endpoint URLs
  const riderApiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/65fe8a2a2e728c6fcb994223`
  const matatuApiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/6686884b54645faa14f5bc62`

  let deliveryCost = 0

  try {
    if (deliveryType === 'rider') {
      const response = await axios.get(riderApiUrl)
      const riderOptions = response.data.fields[0].options
      const selectedOption = riderOptions.find((option: { id: string }) => option.id === location)
      deliveryCost = selectedOption ? parseFloat(selectedOption.value) : 0
    } else if (deliveryType === 'matatu') {
      const response = await axios.get(matatuApiUrl)
      const matatuOptions = response.data.fields[0].options
      const selectedOption = matatuOptions.find((option: { id: string }) => option.id === location)
      deliveryCost = selectedOption ? parseFloat(selectedOption.value) : 0
    }
  } catch (error: unknown) {
    console.error('Error fetching delivery cost:', error)
    throw new Error('Unable to fetch delivery cost')
  }

  // Calculate total cost (products total + delivery cost)
  const productsTotal = items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0,
  )
  const total = productsTotal + deliveryCost

  // Update the total and delivery cost fields
  data.total = total
  data.deliveryCost = deliveryCost

  return data
}

export default calculateOrderTotal
