import Navbar from '@/components/Navbar'
import FeedLeftDiv from '@/components/feed/FeedLeftDiv'
import Feed from '@/components/feed/UserFeed'
import React from 'react'

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="max-h-screen flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv/>
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <Feed/>
        </div>
        <div className="relative flex-1 hidden md:block bg-feedBg">
        </div>
      </div>
    </div>
  )
}

export default page
