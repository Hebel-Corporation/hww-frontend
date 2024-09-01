import { Inbox } from 'lucide-react'
import React from 'react'

const EmptyData = ({
    description
}: { description: string }) => {
    return (
        <div className='max-w-lg mx-auto flex flex-col gap-2 flex-1 items-center justify-center text-gray-300 dark:text-zinc-600'>
            <Inbox size={60} />
            <p className='text-lg'>{description}</p>
        </div>
    )
}

export default EmptyData