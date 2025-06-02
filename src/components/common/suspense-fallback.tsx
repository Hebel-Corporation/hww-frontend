import { Spinner } from '@heroui/react'
import React from 'react'

const SuspenseFallback = () => {
    return (
        <div className='flex flex-1 justify-center items-center gap-2'>
            <Spinner size='md' />
            <span>Chargement...</span>
        </div>
    )
}

export default SuspenseFallback