import React from 'react'

function Button({text}:{text: String}) {
  return (
    <button className='bg-rootBg text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-green-600'>
    {text}
  </button>
  )
}

export default Button
