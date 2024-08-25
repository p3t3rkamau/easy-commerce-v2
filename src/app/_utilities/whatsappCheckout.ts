export const handleWhatsAppCheckout = ({
  hasAttributes,
  isAtLeastOneAttributeSelected,
  selectedAttributes,
  title,
  quantity,
  selectedAttributePrice,
  minAttributePrice,
  maxAttributePrice,
  url,
}: {
  hasAttributes: boolean
  isAtLeastOneAttributeSelected: () => boolean
  selectedAttributes: { [key: string]: Array<{ value: string; quantity: number }> }
  title: string
  quantity: number
  selectedAttributePrice: number | null
  minAttributePrice: number | null
  maxAttributePrice: number | null
  url: string
}): void => {
  if (hasAttributes && !isAtLeastOneAttributeSelected()) {
    alert('Please select at least one attribute before checking out.')
    return
  }

  let formattedMessage = `Hello EasyBake, I want to order `
  if (hasAttributes) {
    const selectedAttrs = Object.entries(selectedAttributes)
      .map(([attrName, values]) => {
        const attrValues = values.map(attr => `${attr.value} (${attr.quantity})`).join(', ')
        return `${attrName}: ${attrValues}`
      })
      .join(' ')
    formattedMessage += `${selectedAttrs} of ${title}`
  } else {
    formattedMessage += `${quantity} of ${title}`
  }

  if (selectedAttributePrice) {
    formattedMessage += ` @ KES ${selectedAttributePrice}`
  } else if (minAttributePrice !== null && maxAttributePrice !== null) {
    formattedMessage += ` @ KES ${minAttributePrice} - ${maxAttributePrice}`
  }
  formattedMessage += ` ( ${url} )`

  window.open(
    `https://api.whatsapp.com/send?phone=0795820643&text=${encodeURIComponent(formattedMessage)}`,
    '_blank',
  )
}
