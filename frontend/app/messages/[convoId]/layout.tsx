'use client'
import ConvoList from '@/components/messages/ConvoList'
import React from 'react'

type prop = {
    children: React.ReactNode;
  };

function layout({ children }: prop) {
  return (
    <div className="max-h-screen w-full bg-red-300 flex">
      <div className="max-h-screen w-[30%] hidden md:block">
        <ConvoList />
      </div>
      {children}
    </div>
  )
}

export default layout
