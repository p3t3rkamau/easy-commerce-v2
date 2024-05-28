import React from 'react'
import { Link } from 'react-router-dom'
import { Banner } from 'payload/components'
import { text } from 'stream/consumers'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome To Easy Bake Admin DashBoard</h4>
      </Banner>
      {/* <p className="text-red-400">Let's get started!</p> */}
      {/* <TableDemo /> */}
    </div>
  )
}

export default BeforeDashboard
