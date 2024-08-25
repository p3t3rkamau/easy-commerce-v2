import React from 'react'
import { Metadata } from 'next'

import { useToast } from '../../../app/_providers/Toast/ToastContext'
import { Gutter } from '../../_components/Gutter'
import HelpCenter from '../../_components/HelpPage/index'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

export default async function Help() {
  const { addToast } = useToast()

  const showToast = () => {
    addToast('This is a toast message!')
  }
  return (
    <Gutter className={classes.logout}>
      <HelpCenter />
      <button onClick={showToast}>Show Toast</button>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Help Page',
  description: 'Easy Bake Help Page',
  openGraph: mergeOpenGraph({
    title: 'Help Page',
    url: '/help',
  }),
}
