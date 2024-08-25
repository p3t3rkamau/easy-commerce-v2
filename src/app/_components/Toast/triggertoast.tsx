import React from 'react'

import { useToast } from '../../_providers/Toast/ToastContext' // Adjust the path

const TriggerToast: React.FC = () => {
  const { addToast } = useToast()

  const triggerToast = () => {
    console.log('toast triggered')
    addToast('This is a toast from Help page!')
  }

  return (
    <div>
      <button onClick={triggerToast}>Show Toast</button>
    </div>
  )
}

export default TriggerToast
