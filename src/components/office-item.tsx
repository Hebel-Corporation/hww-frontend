import { Office } from '@/types'
import { Divider } from '@nextui-org/react'
import { StoreIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const OfficeItem = ({
  office
}: {
  office: Office
}) => {
  return (
    <Link href={`/offices/point-of-sale/${office.id}`} className='flex flex-col gap-3 w-full min-w-[19rem] flex-1 h-max border rounded-md py-2.5 px-3.5 bg-zinc-100 dark:bg-zinc-800'>
      <StoreIcon size={35} />
      <div className='flex gap-4 items-center'>
        <div>
          <h1>{office.location.name}-{office.office_code}</h1>
          <span className='text-small font-light'>
            Taux d&apos;inscription : {office.subscription_rate}%
          </span>
        </div>
        <Divider orientation='vertical' />
        <div>
          <h1 className='text-xl font-semibold'>{office.members_count}</h1>
          <span className='text-small font-light'>Inscription{office.members_count > 1 ? 's' : ''}</span>
        </div>
      </div>
    </Link>
  )
}

export default OfficeItem