import Navbar from '@/components/Navbar'
import FeedLeftDiv from '@/components/feed/FeedLeftDiv'
import FeedRightDiv from '@/components/feed/FeedRightDiv'
import React from 'react'
import UserFeed from '@/components/feed/UserFeed'
import Feed from '@/components/page/PublicFeed'
import Bookmarks from '@/components/[username]/bookmarks/Bookmarks'

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
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <Bookmarks/>
        </div>
        {/* RightDiv */}
        <div className="relative flex-1 hidden md:block bg-feedBg">
          {/* <FeedRightDiv /> */}
        </div>
      </div>
    </div>
  )
}

export default page
