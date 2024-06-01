'use client'
import React from 'react'
import '@/assets/styles/globals.css'
import Link from 'next/link'

function Navbar() {
  return (
    <div className={`h-14 bg-rootBg flex items-center justify-center`}>
      <h1 className='text-4xl font-sans font-bold cursor-pointer' onClick={()=><Link href={'/'}/>}>WeNet</h1>
    </div>
  )
}

export default Navbar
