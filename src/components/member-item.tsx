import { User } from '@/types'
import { Avatar, Button } from '@nextui-org/react'
import { ChevronRight, PenSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MemberItem = ({ member }: { member: User }) => {
    return (
        <Link href={`/offices/members/${member?.id}`} className="flex items-center justify-between text-sm py-2 border-b duration-500 hover:bg-gray-100 dark:hover:bg-gray-950">
            <div className="flex gap-3 items-center">
                <Avatar fallback={<>NK</>
                } className='h-[3.1rem] w-[3.1rem]' />
                <div>
                    <h1 className="text-base font-medium">
                        {member?.first_name} {member?.last_name}
                    </h1>
                    <span className="font-extralight text-small">
                        {member?.company_id}
                    </span>
                </div>
            </div>
            <div className='hidden sm:block'>
                <h1 className="text-base font-medium">
                    Downlines
                </h1>
                <h2 className='font-extralight'>{member?.downline_count}</h2>
            </div>
            <div className='hidden sm:block'>
                <h1 className="text-base font-medium">
                    Téléphone
                </h1>
                <h2 className='font-extralight'>
                    {member?.phone || '-'}
                </h2>
            </div>
            <div className="flex items-center gap-5">
                <Button radius='sm' className='min-w-0 p-1.5'>
                    <PenSquare size={22} />
                </Button>
                <Button radius='sm' variant='light' className='min-w-0 p-1.5'>
                    <ChevronRight size={25} />
                </Button>
            </div>
        </Link>
    )
}

export default MemberItem