import React from 'react'

import './budget.scss'

interface BudgetFilterProps {
  value: { min: number; max: number }
  onChange: (value: { min: number; max: number }) => void
}

const BudgetFilter: React.FC<BudgetFilterProps> = ({ value, onChange }) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      min: parseInt(e.target.value, 10),
    })
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      max: parseInt(e.target.value, 10),
    })
  }

  return (
    <div>
      <h6 className="headerFilter">Price</h6>
      <div>
        <input
          type="number"
          className="input"
          placeholder="Min"
          min={0}
          value={value.min}
          onChange={handleMinChange}
        />
        <input
          type="number"
          className="input"
          placeholder="Max"
          min={0}
          value={value.max}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  )
}

export default BudgetFilter
