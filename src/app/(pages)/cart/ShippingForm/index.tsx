import React, { useEffect, useState } from 'react'

import CouponForm from '../CouponForm'

import classes from './index.module.scss'

interface DeliveryOption {
  id: string
  label: string
  value: string
}

interface Props {
  onDeliveryCostChange: (cost: number) => void
  onDeliveryTypeChange: (type: string) => void
  onLocationChange: (locId: string, locLabel: string) => void
  onDeliveryNoteChange: (note: string) => void
  onCustomLocationChange: (location: string) => void
}

const ShippingForm: React.FC<Props> = ({
  onDeliveryCostChange,
  onDeliveryTypeChange,
  onLocationChange,
  onDeliveryNoteChange,
  onCustomLocationChange,
}) => {
  const [deliveryType, setDeliveryType] = useState<string>('')
  const [locationId, setLocationId] = useState<string>('')
  const [locationLabel, setLocationLabel] = useState<string>('')
  const [customLocation, setCustomLocation] = useState<string>('')
  const [deliveryNote, setDeliveryNote] = useState<string>('')
  const [riderOptions, setRiderOptions] = useState<DeliveryOption[]>([])
  const [matatuOptions, setMatatuOptions] = useState<DeliveryOption[]>([])

  useEffect(() => {
    if (deliveryType === 'rider') {
      fetchRiderOptions()
    } else if (deliveryType === 'matatu') {
      fetchMatatuOptions()
    }
    onDeliveryTypeChange(deliveryType)
  }, [deliveryType])

  useEffect(() => {
    const selectedOption = getSelectedOption()
    if (selectedOption) {
      onLocationChange(selectedOption.id, selectedOption.label)
    }
  }, [locationId, deliveryType])

  useEffect(() => {
    const cost = calculateDeliveryCost()
    onDeliveryCostChange(cost)
  }, [deliveryType, locationId])

  useEffect(() => {
    onDeliveryNoteChange(deliveryNote)
  }, [deliveryNote])

  useEffect(() => {
    onCustomLocationChange(customLocation)
  }, [customLocation])

  const fetchRiderOptions = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/65fe8a2a2e728c6fcb994223`)
      .then(response => response.json())
      .then((data: { fields: { options: DeliveryOption[] }[] }) => {
        setRiderOptions(data.fields[0].options)
      })
      .catch(error => console.error('Error fetching rider options:', error))
  }

  const fetchMatatuOptions = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/6686884b54645faa14f5bc62`)
      .then(response => response.json())
      .then((data: { fields: { options: DeliveryOption[] }[] }) => {
        setMatatuOptions(data.fields[0].options)
      })
      .catch(error => console.error('Error fetching matatu options:', error))
  }

  const calculateDeliveryCost = (): number => {
    const selectedOption = getSelectedOption()
    return selectedOption ? parseFloat(selectedOption.value) : 0
  }

  const getSelectedOption = (): DeliveryOption | undefined => {
    if (deliveryType === 'rider') {
      return riderOptions.find(option => option.id === locationId)
    }
    if (deliveryType === 'matatu') {
      return matatuOptions.find(option => option.id === locationId)
    }
    return undefined
  }

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const loc = `${position.coords.latitude},${position.coords.longitude}`
          setCustomLocation(loc)
          setLocationId(loc)
          setLocationLabel(loc)
        },
        error => {
          console.error('Error getting location:', error)
        },
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = getSelectedOptionById(e.target.value)
    if (selectedOption) {
      setLocationId(selectedOption.id)
      setLocationLabel(selectedOption.label)
    }
  }

  const getSelectedOptionById = (id: string): DeliveryOption | undefined => {
    if (deliveryType === 'rider') {
      return riderOptions.find(option => option.id === id)
    }
    if (deliveryType === 'matatu') {
      return matatuOptions.find(option => option.id === id)
    }
    return undefined
  }

  const renderDeliveryOptions = () => {
    switch (deliveryType) {
      case 'rider':
        return (
          <>
            <select
              className={classes.deliveryDropdown}
              value={locationId}
              onChange={handleLocationChange}
            >
              <option value="">Select Delivery Location</option>
              {riderOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* <button className={classes.locationButton} onClick={handleLocationShare}>
              Share Current Location
            </button> */}
            <textarea
              className={classes.textarea}
              placeholder="Delivery Note"
              value={deliveryNote}
              onChange={e => setDeliveryNote(e.target.value)}
            />
          </>
        )
      case 'matatu':
        return (
          <>
            <select
              className={classes.deliveryDropdown}
              value={locationId}
              onChange={handleLocationChange}
            >
              <option value="">Select Delivery Location</option>
              {matatuOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <textarea
              className={classes.textarea}
              placeholder="Delivery Note"
              value={deliveryNote}
              onChange={e => setDeliveryNote(e.target.value)}
            />
          </>
        )
      case 'pickup':
        return (
          <p className={classes.paragraph}>
            Pick up available at Our Shop Annas arcade Room 29c, Pick before 6 PM or the next day.
          </p>
        )
      default:
        return null
    }
  }

  return (
    <div className={classes.shippingForm}>
      <h6>Delivery Method</h6>
      <select
        className={classes.deliveryDropdown}
        value={deliveryType}
        onChange={e => setDeliveryType(e.target.value)}
      >
        <option value="">Select Delivery Method</option>
        <option value="rider">Delivery By Rider</option>
        <option value="matatu">Delivery By Matatu</option>
        <option value="pickup">Pickup</option>
      </select>

      {renderDeliveryOptions()}

      <br />
    </div>
  )
}

export default ShippingForm
