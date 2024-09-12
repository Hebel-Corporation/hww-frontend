import { Badge } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const AccountCardItem = ({
    accountId,
    currentAccountId,
    ownerFullName,
    downlineCount,
    companyId,
    accountBalance
} : {
    accountId: string,
    currentAccountId: string,
    ownerFullName: string,
    downlineCount: number,
    companyId: string,
    accountBalance: number
}) => {
    return (
        <Badge content={`$ ${accountBalance}`} color='primary' >
            <Link href={`?account=${accountId}`} className={`z-2 border ${accountId===currentAccountId ? 'border-blue-500' : ''} duration-500 select-none overflow-hidden w-max sm:odd:last:max-w-sm min-w-80 h-max rounded-xl p-3 flex flex-col flex-1 gap-3 cursor-pointer bg-zinc-100 dark:bg-zinc-800`}>

                <div className={`${accountId===currentAccountId ? 'text-blue-500' : ''} duration-500 whitespace-nowrap text-lg font-semibold font-mono`} >
                    {/* 4242&nbsp;4242&nbsp;4242&nbsp;4242 */}
                    {companyId}
                </div>

                <div className="flex gap-8 justify-between">
                    <div className="owner flex flex-col w-max">
                        <span className="text-sm">Proprietaire</span>
                        <span className="whitespace-nowrap text-base">
                            {ownerFullName}
                        </span>
                    </div>
                    <div className="cvc flex flex-col w-max">
                        <span className="text-sm">Downline{downlineCount > 1 ? 's': ''}</span>
                        <span className="whitespace-nowrap text-base">
                            {downlineCount}
                        </span>
                    </div>
                </div>
            </Link>
        </Badge>
    )
}

export default AccountCardItem