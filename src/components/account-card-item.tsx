import { Badge } from '@nextui-org/react'
import React from 'react'

const AccountCardItem = ({
    ownerFullName,
    downlineCount,
    companyId,
    accountBalance
} : {
    ownerFullName: string,
    downlineCount: number,
    companyId: string,
    accountBalance: number
}) => {
    return (
        <Badge content={`$ ${accountBalance}`} color='primary' >
            <div className="z-2 border first:border-blue-500 select-none overflow-hidden w-max sm:odd:last:max-w-sm min-w-80 h-max rounded-xl p-3 flex flex-col flex-1 gap-3 cursor-pointer bg-zinc-100 dark:bg-zinc-800">

                <div className="whitespace-nowrap text-lg font-semibold font-mono first:text-blue-500" >
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
            </div>
        </Badge>
    )
}

export default AccountCardItem