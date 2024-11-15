import React, { useEffect, useState } from 'react'
import { Banner } from 'payload/components'

import Dashboard from '../DashBoard/Dashboard'

// import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  // Initialize state from local storage or default to true
  const [showDashboard, setShowDashboard] = useState(() => {
    const savedState = localStorage.getItem('showDashboard')
    return savedState ? JSON.parse(savedState) : true
  })

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('showDashboard', JSON.stringify(showDashboard))
  }, [showDashboard])

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard)
  }
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome To Easy Bake Admin DashBoard</h4>
      </Banner>
      <button onClick={toggleDashboard} className={`${baseClass}__toggle-button`}>
        {showDashboard ? 'Hide' : 'Show'} Dashboard
      </button>
      <div className={`${baseClass}__dashboard ${showDashboard ? 'visible' : 'hidden'}`}>
        <Dashboard />
      </div>
    </div>
  )
}

export default BeforeDashboard
