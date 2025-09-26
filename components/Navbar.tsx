import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Navbar() {
  return (
   <header className='header'>
    <nav>
        <Link href="/">
          <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
          <h1>SnapCast</h1>
        </Link>
    </nav>

   </header>
  )
}

export default Navbar
