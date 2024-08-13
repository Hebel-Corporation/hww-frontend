import { Avatar, Button } from '@nextui-org/react'
import { ChevronRight, PenSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MemberItem = () => {
    return (
        <Link href={'/offices/members/23'} className="flex items-center justify-between text-sm py-2 border-b duration-500 hover:bg-gray-100 dark:hover:bg-gray-950">
            <div className="flex gap-3 items-center">
                <Avatar fallback={ <>NK</>
                } className='h-[3.1rem] w-[3.1rem]' />
                <div>
                    <h1 className="text-base font-normal">Nelson Kayisirirya</h1>
                    <span className="font-extralight text-small">nelsonkayisirirya5@gmail.com</span>
                </div>
            </div>
            <div className='hidden sm:block'>
                <h2>Kinshasa</h2>
            </div>
            <div className='hidden sm:block'>
                <h2>+243 997 057 917</h2>
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