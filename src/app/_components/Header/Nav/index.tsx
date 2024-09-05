import React, { useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import CartDropDown from '../../CartDropDown'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'
import SearchView from '../../SearchView'
import MobileNav from '../MobileNav'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartHovered, setIsCartHovered] = useState(false)
  const [isSearchViewOpen, setIsSearchViewOpen] = useState(false) // State for toggling search view

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const openSearchView = () => {
    setIsSearchViewOpen(true)
  }

  const closeSearchView = () => {
    setIsSearchViewOpen(false)
  }

  if (isSearchViewOpen) {
    return <SearchView closeSearchView={closeSearchView} />
  }
  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      <div className={classes.desktopNav} ref={dropdownRef}>
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="none" />
        })}
      </div>
      <div className={classes.searchIcon} onClick={openSearchView}>
        <FaSearch />
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
