import React, { useEffect, useState } from 'react'

import CouponForm from '../CouponForm'

import classes from './index.module.scss'

interface RiderOption {
  id: string
  label: string
  value: string
}

interface MatatuOption {
  id: string
  label: string
  value: string
}

interface Props {
  onDeliveryCostChange: (cost: number) => void
  onDeliveryTypeChange: (type: string) => void
  onLocationChange: (loc: string) => void
}

const ShippingForm: React.FC<Props> = ({
  onDeliveryCostChange,
  onDeliveryTypeChange,
  onLocationChange,
}) => {
  const [deliveryType, setDeliveryType] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [customLocation, setCustomLocation] = useState<string>('')
  const [deliveryNote, setDeliveryNote] = useState<string>('')
  const [riderOptions, setRiderOptions] = useState<RiderOption[]>([])
  const [matatuOptions, setMatatuOptions] = useState<MatatuOption[]>([])

  useEffect(() => {
    if (deliveryType === 'rider') {
      fetchRiderOptions()
    } else if (deliveryType === 'matatu') {
      fetchMatatuOptions()
    }
    onDeliveryTypeChange(deliveryType)
  }, [deliveryType])

  useEffect(() => {
    onLocationChange(location)
  }, [location])

  const fetchRiderOptions = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/65fe8a2a2e728c6fcb994223`)
      .then(response => response.json())
      .then((data: { fields: { options: RiderOption[] }[] }) => {
        setRiderOptions(data.fields[0].options)
      })
      .catch(error => console.error('Error fetching rider options:', error))
  }

  const fetchMatatuOptions = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/6686884b54645faa14f5bc62`)
      .then(response => response.json())
      .then((data: { fields: { options: MatatuOption[] }[] }) => {
        setMatatuOptions(data.fields[0].options)
      })
      .catch(error => console.error('Error fetching matatu options:', error))
  }

  useEffect(() => {
    // Calculate delivery cost based on selected options
    const cost = calculateDeliveryCost(deliveryType, location)
    onDeliveryCostChange(cost)
  }, [deliveryType, location])

  const calculateDeliveryCost = (type: string, selectedLocation: string): number => {
    if (type === 'rider') {
      const selectedOption = riderOptions.find(option => option.id === selectedLocation)
      return selectedOption ? parseFloat(selectedOption.value) : 0
    }
    if (type === 'matatu') {
      const selectedOption = matatuOptions.find(option => option.id === selectedLocation)
      return selectedOption ? parseFloat(selectedOption.value) : 0
    }
    return 0 // For pickup
  }

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCustomLocation(`${position.coords.latitude},${position.coords.longitude}`)
          setLocation(`${position.coords.latitude},${position.coords.longitude}`)
        },
        error => {
          console.error('Error getting location:', error)
        },
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const renderDeliveryOptions = () => {
    switch (deliveryType) {
      case 'rider':
        return (
          <>
            <select
              className={classes.deliveryDropdown}
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
              <option value="">Select Delivery Location</option>
              {riderOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <button className={classes.locationButton} onClick={handleLocationShare}>
              Share Current Location
            </button>
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
              value={location}
              onChange={e => setLocation(e.target.value)}
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
          <p className={classes.paragraph}>Pick up available at CBD before 6 PM or the next day.</p>
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
