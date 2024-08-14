import { Divider } from '@nextui-org/react'
import { StoreIcon } from 'lucide-react'
import React from 'react'

const OfficItem = () => {
  return (
    <div className='flex flex-col gap-3 w-full sm:odd:last:max-w-80 min-w-[19rem] flex-1 border rounded-md py-2.5 px-3.5'>
        <StoreIcon size={35} />
        <div className='flex gap-3 items-center'>
            <div>
                <h1>KIN-033</h1>
                <span className='text-small font-light'>Taux d'enregistrement: 23%</span>
            </div>
            <Divider orientation='vertical' />
            <div>
                <h1 className='text-xl font-semibold'>531</h1>
                <span className='text-small font-light'>Members</span>
            </div>
        </div>
    </div>
  )
}

export default OfficItem