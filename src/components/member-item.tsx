import { User } from '@/types'
import { getInitialChar } from '@/utils/utils-fonctions'
import { Avatar, Button, Chip } from '@nextui-org/react'
import { ChevronRight, PenSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UpdateMemberModal from './modals/uppdate-member-modal'

const MemberItem = ({ member }: { member: User }) => {

    return (
        <div /* href={`/offices/members/${member?.id}`}*/ className="flex items-center justify-between text-sm py-2 border-b duration-500 hover:bg-gray-100 dark:hover:bg-gray-950">
            <div className="flex gap-3 items-center">
                <Avatar fallback={
                    <>{getInitialChar({ first_name: member?.first_name, last_name: member?.last_name })}</>
                } className='h-[3.1rem] w-[3.1rem]' />
                <div className='sm:min-w-60'>
                    <h1 className="text-base font-medium">
                        {member?.first_name} {member?.last_name}
                    </h1>
                    <span className="font-extralight text-small">
                        {member?.company_id}
                    </span>
                </div>
            </div>
            <div className='hidden sm:block'>
                <Chip size='sm'>{member?.accounts_number} compte{member?.accounts_number > 1 ? 's' : ''}</Chip>
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
                <UpdateMemberModal member={
                    {
                        id: member?.id,
                        first_name:  member?.first_name,
                        last_name: member?.last_name,
                        gender: member?.gender,
                        birthday: new Date(member?.birthday),
                        phone: member?.phone
                    }
                } />
                <ChevronRight size={25} className='opacity-50' />
            </div>
        </div>
    )
}

export default MemberItem