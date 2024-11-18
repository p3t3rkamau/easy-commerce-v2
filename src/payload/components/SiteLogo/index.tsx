import React from 'react'
import Image from 'next/image'

const SiteLogo = () => {
  return (
    <div>
      <Image
        alt="logo"
        src="/Easy-logo.svg"
        width={2}
        height={2}
        className="max-w-16 w-full object-cover"
      />
    </div>
  )
}

export default SiteLogo
