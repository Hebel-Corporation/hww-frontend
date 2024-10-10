import { Badge, Chip } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const MemberAccountCardItem = ({
    accountId,
    memberId,
    downlineCount,
    pvs,
    companyId,
    accountBalance
}: {
    accountId: string,
    memberId: string,
    downlineCount: number,
    pvs: number,
    companyId: string,
    accountBalance: number
}) => {
    return (
        <Link href={`/offices/members/${memberId}/${accountId}`} className={`z-2 border duration-500 select-none w-full sm:odd:last:max-w-sm min-w-max h-max rounded-xl p-3 flex flex-col flex-1 gap-3 cursor-pointer bg-zinc-100 dark:bg-zinc-800`}>

            <div className={`relative flex items-center justify-between duration-500 whitespace-nowrap sm:text-lg text-base font-semibold font-mono`} >
                {companyId}
                <Chip size='sm' variant='faded' color='success' 
                className='sm:relative absolute -top-5 -right-5'
                >
                    {`$ ${accountBalance}`}
                </Chip>
            </div>

            <div className="flex gap-8 justify-between">
                <div className="owner flex flex-col w-max">
                    <span className="text-sm">Points cumulés</span>
                    <span className="whitespace-nowrap text-base">
                        {pvs} <span className='text-[12px] font-light'>PVs</span>
                    </span>
                </div>
                <div className="cvc flex flex-col w-max">
                    <span className="text-sm">Downline{downlineCount > 1 ? 's' : ''}</span>
                    <span className="whitespace-nowrap text-base">
                        {downlineCount}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default MemberAccountCardItem