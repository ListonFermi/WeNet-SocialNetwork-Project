import Navbar from '@/components/Navbar'
import FeedLeftDiv from '@/components/feed/FeedLeftDiv'
import SinglePost from '@/components/post/[id]/SinglePost'
import React from 'react'

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* LeftDiv */}
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv/>
        </div>
        {/* Feed */}
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 max-h-screen overflow-y-scroll no-scrollbar bg-feedBg">
          <SinglePost/>
        </div>
        {/* RightDiv */}
        <div className="relative flex-1 hidden md:block bg-feedBg">
        </div>
      </div>
    </div>
  )
}

export default page
