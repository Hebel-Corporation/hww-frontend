import { getInitialChar } from '@/utils/utils-fonctions'
import { Avatar, Chip } from '@nextui-org/react'
import React from 'react'

function NetworkNodeItem({
    account,
    tag
}: {account: any, tag: string}) {
    return (
        <div className="relative flex gap-2 items-center border rounded-lg border-zinc-300 dark:border-zinc-700 p-2">
            <Avatar fallback={
                <>{getInitialChar({first_name: account?.member?.first_name, last_name: account?.member?.last_name})}</>
            } className='h-[3.5rem] w-[3.5rem]' />
            <div className='w-5/6 flex items-center justify-between'>
                <div className='sm:min-w-60'>
                    <h1 className="text-base font-medium">
                        {account?.member?.first_name} {account?.member?.last_name}
                    </h1>
                    <span className="font-extralight text-small">
                        ID : {account?.company_id}
                    </span>
                </div>
                <Chip variant='faded' color='success' className='sm:relative absolute -top-3 -right-2 sm:top-0 sm:right-0'>
                    {tag}
                </Chip>
            </div>
        </div>
    )
}

export default NetworkNodeItem