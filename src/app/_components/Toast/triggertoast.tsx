import React from 'react'

import { useToast } from '../../_providers/Toast/ToastContext' // Adjust the path

const TriggerToast: React.FC = () => {
  const { addToast } = useToast()

  const showActionToast = () => {
    addToast('Action toast with a button!', 'info', {
      label: 'Undo',
      onClick: () => alert('Undo action performed!'),
    })
  }

  return <button onClick={showActionToast}>Show Action Toast</button>
}

export default TriggerToast
