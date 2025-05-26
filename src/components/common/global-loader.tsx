import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function GlobalLoader() {
    return (
        <div className='flex flex-1 flex-col gap-2 justify-center items-center'>
            <Spinner size='lg' />
            <p className='text-gray-500'>Chargement...</p>
        </div>
    )
}
