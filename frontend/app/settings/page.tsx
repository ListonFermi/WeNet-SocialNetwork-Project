import Navbar from '@/components/Navbar'
import React from 'react'
import MoreLeftDiv from '@/components/settings/MoreLeftDiv'
import SettingsBar from '@/components/settings/SettingsBar'

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* MoreLeftDiv - hidden on mobile, 1/4 width on larger screens */}
        <div className="relative hidden md:flex md:flex-1 bg-feedBg">
          <MoreLeftDiv />
        </div>
        
        {/* SettingsBar - 20% width on mobile, 1/4 width on larger screens */}
        <div className="flex-1 md:flex-1 md:w-1/4 bg-red-300 w-1/5 h-screen">
          <SettingsBar />
        </div>
        
        {/* Third Portion - 80% width on mobile, 1/4 width on larger screens */}
        <div className="flex-1 md:flex-1 md:w-1/4 w-4/5 bg-blue-300">
          {/* Content for the third portion */}
        </div>
        
        {/* Fourth Portion - hidden on mobile, 1/4 width on larger screens */}
        <div className="hidden md:block md:flex-1 lg:flex-1 xl:flex-1 bg-feedBg h-screen overflow-y-auto no-scrollbar">
          <div className="bg-green-700 h-full w-full"></div>
        </div>
      </div>
    </div>
  )
}

export default page
