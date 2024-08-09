import React from 'react'

import MessageInterface from './chat'
import EmailInterface from './Email'

const CustomMessageComponent = () => <MessageInterface field={undefined} />
const CustomEmailComponent = () => <EmailInterface field={undefined} />

export { CustomEmailComponent, CustomMessageComponent }
