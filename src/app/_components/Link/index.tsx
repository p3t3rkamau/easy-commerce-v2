'use client'

import React, { useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Page } from '../../../payload/payload-types'
import { useLoader } from '../../_providers/LoaderContext'
import { useToast } from '../../_providers/Toast/ToastContext'
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
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()
  const { addToast } = useToast()

  // Resolve href based on type and reference
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

  // Handle link click with async navigation
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault() // Prevent default link behavior
      addToast(`Navigating to ${label || 'page'}`, 'info') // Show toast message
      showLoader() // Show loading spinner

      // Use setTimeout to simulate async operation
      setTimeout(() => {
        router.push(href) // Navigate using router.push
        hideLoader() // Hide loader after navigation
      }, 0)
    },
    [href, addToast, showLoader, hideLoader, label, router],
  )

  if (!appearance) {
    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    return (
      <Link {...newTabProps} href={href || url} className={className} onClick={handleLinkClick}>
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
      onClick={handleLinkClick} // Updated to pass the event handler
    />
  )
}
