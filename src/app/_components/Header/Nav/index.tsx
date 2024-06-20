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
  const [openItem, setOpenItem] = useState<number | null>(null)

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartHovered, setIsCartHovered] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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
      {user && (
        <div
          className={classes.cartLink}
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
        >
          <CartLink />
          {isCartHovered && (
            <div className={classes.cartDropdown}>
              <CartDropDown />
            </div>
          )}
        </div>
      )}
      <MobileNav navItems={navItems} toggleMobileMenu={toggleMobileMenu} />
    </nav>
  )
}
