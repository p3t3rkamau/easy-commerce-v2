'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaCaretRight } from 'react-icons/fa'
import Link from 'next/link'

import { Category, Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import CartDropDown from '../../CartDropDown'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'
import MobileNav from '../MobileNav'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const [openItem, setOpenItem] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredMiniCategoryIndex, setHoveredMiniCategoryIndex] = useState(null)
  const dropdownRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleItemClick = index => {
    if (openItem === index) {
      setOpenItem(null)
    } else {
      setOpenItem(index)
    }
  }

  const handleOutsideClick = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTimeout(() => {
        setOpenItem(null)
        setHoveredMiniCategoryIndex(null)
      }, 6000)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleMouseEnterMiniCategory = index => {
    setHoveredMiniCategoryIndex(index)
  }

  const handleMouseLeaveMiniCategory = () => {
    setHoveredMiniCategoryIndex(null)
  }

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      <div className={classes.desktopNav} ref={dropdownRef}>
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="none" />
        })}
      </div>
      {user && <Link href="/account">Account</Link>}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="secondary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      {user && <CartLink />}
      {/* <CartDropDown /> */}
      <MobileNav navItems={navItems} toggleMobileMenu={toggleMobileMenu} />
    </nav>
  )
}
