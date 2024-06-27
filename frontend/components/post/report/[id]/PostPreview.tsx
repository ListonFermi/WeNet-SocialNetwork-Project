import { IPost } from '@/types/types'
import Image from 'next/image'
import React from 'react'

function PostPreview({postData}:{postData: any}) {
    const {profilePicUrl,username, firstName,lastName, caption, imageUrl} =postData
  return (
    <div className="bg-secColor mb-2 mt-2 shadow-md rounded-lg">
      <div className="flex justify-evenly py-2">
        <div className="flex items-center">
          <div>
            <Image
              src={profilePicUrl}
              alt="Profile Pic"
              width={150}
              height={150}
              className="w-10 h-10 object-cover rounded-full"
            />
            <p className="text-white text-xs font-semibold">@{username}</p>
          </div>
          <div className="px-4">
            <h3 className="text-white text-sm font-bold">{`${firstName} ${lastName}`}</h3>
          </div>
        </div>
      </div>
      <p className="font-semibold px-6 py-2 text-white text-sm">{caption}</p>
      <div className="flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="Tokyo"
          width={1000}
          height={1000}
          className="w-[150px] h-[150px] object-cover  mt-4"
        />
      </div>
    </div>
  )
}

export default PostPreview
