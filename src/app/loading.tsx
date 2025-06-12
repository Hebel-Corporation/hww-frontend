import GlobalLoader from '@/components/common/global-loader'
import React from 'react'

const loading = () => {
  return (
    <div className='h-screen flex flex-1 justify-center items-center'>
      <GlobalLoader />
    </div>
  )
}

export default loading