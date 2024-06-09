import React from 'react'

function DashboardCard() {
  return (
    <div className="bg-secColor p-4 rounded-lg flex items-center">
    <div className="bg-rootBg rounded-full w-12 h-12 flex items-center justify-center mr-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
    </div>
    <div>
      <h2 className="text-lg font-bold text-white">1000</h2>
      <p className="text-sm text-gray-400">Total Users</p>
    </div>
  </div>
  )
}

export default DashboardCard
