import React from 'react'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { Button, Props as ButtonProps } from '../Button'

type CMSLinkType = {
  type?: 'custom' | 'reference'
  url?: string
  newTab?: boolean
  reference?: {
    value: string | Page
    relationTo: 'pages'
  }
  label?: string
  appearance?: ButtonProps['appearance']
  children?: React.ReactNode
  className?: string
  invert?: ButtonProps['invert']
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  className,
  invert,
}) => {
  let href = url

  if (
    type === 'reference' &&
    reference?.relationTo === 'pages' &&
    typeof reference.value === 'object'
  ) {
    const slug = (reference.value as Page)?.slug

    if (slug) {
      href = `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${slug}`
    }
  }

  if (!href) return null

  if (!appearance) {
    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    return (
      <Link {...newTabProps} href={href || url} className={className}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button
      className={className}
      newTab={newTab}
      href={href}
      appearance={appearance}
      label={label}
      invert={invert}
    />
  )
}
