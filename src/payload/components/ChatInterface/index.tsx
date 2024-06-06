import React from 'react'

import MessageInterface from './chat.jsx'
import EmailInterface from './Email/index.jsx'

const CustomMessageComponent = () => <MessageInterface field={undefined} />
const CustomEmailComponent = () => <EmailInterface field={undefined} />

export { CustomEmailComponent, CustomMessageComponent }
