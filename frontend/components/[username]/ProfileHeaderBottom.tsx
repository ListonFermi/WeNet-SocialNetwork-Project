import React from 'react'

function ProfileHeaderBottom() {
    const followingCount=25
    const followersCount= '6.5M'

  return (
    <div className=' h-24 w-full pt-2 bg-secColor'>
        {/* Follower Following Count  */}
        <div className='h-full flex justify-around'>
            <div className='flex flex-col items-center'>
                <h1 className='text-4xl font-bold text-white' >{followingCount}</h1>
                <p className='font-semibold text-white'>Following</p>
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='text-4xl font-bold text-white' >{followersCount}</h1>
                <p className='font-semibold text-white'>Followers</p>
            </div>
        </div>
    </div>
  )
}

export default ProfileHeaderBottom
