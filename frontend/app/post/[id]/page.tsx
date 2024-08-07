import Navbar from '@/components/Navbar'
import BottomNav from '@/components/feed/BottomNav'
import FeedLeftDiv from '@/components/feed/FeedLeftDiv'
import SinglePost from '@/components/post/[id]/SinglePost'
import React from 'react'

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv/>
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 max-h-screen overflow-y-scroll no-scrollbar bg-feedBg">
          <SinglePost/>
        </div>
        <div className="relative flex-1 hidden md:block bg-feedBg">
        </div>
      </div>
      <BottomNav/>
    </div>
  )
}

export default page
