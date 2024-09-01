import { User, UserGroup } from '@/types'
import { getInitialChar, toCapitalize } from '@/utils/utils-fonctions'
import { Avatar, Button } from '@nextui-org/react'
import { ChevronRight, PenSquare } from 'lucide-react'
import React from 'react'

const StaffItem = ({
    staff
}: { staff: User }) => {
    return (
        <div className="flex items-center justify-between text-sm py-2 border-b duration-500 hover:bg-gray-100 dark:hover:bg-zinc-800">
            <div className="flex gap-3 items-center">
                <Avatar fallback={
                    <>
                        {
                            getInitialChar({
                                first_name: staff?.first_name,
                                last_name: staff?.last_name
                            })
                        }
                    </>
                } className='h-[3.1rem] w-[3.1rem]' />
                <div>
                    <h1 className="text-base font-normal">
                        {staff?.first_name || '-'} {staff?.last_name || '-'}
                    </h1>
                    <span className="font-extralight text-small">
                        ID : {staff?.company_id || '-'}
                    </span>
                </div>
            </div>
            <div className='hidden sm:block'>
                <h2>{staff?.office?.location?.name} - {staff?.office?.office_code}</h2>
            </div>
            <div className='hidden sm:flex sm:gap-2'>
                {
                    staff.groups.map((group: UserGroup) => (
                        <h2 key={group.id} className='px-2.5 text-small rounded-full font-light bg-slate-300 dark:bg-gray-500 '>
                            {toCapitalize(group.name)}
                        </h2>
                    ))
                }
            </div>
            <div className="flex items-center gap-5">
                <Button radius='sm' className='min-w-0 p-1.5'>
                    <PenSquare size={22} />
                </Button>
                <Button radius='sm' variant='light' className='min-w-0 p-1.5'>
                    <ChevronRight size={25} />
                </Button>
            </div>
        </div>
    )
}

export default StaffItem