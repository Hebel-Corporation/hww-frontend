import { ScrollShadow } from '@nextui-org/react'
import React from 'react'
import DownlineItem from './downline-item'
import { getMemberAccountDownlines } from '@/actions/member-actions'

const MemberDownlineList = async ({
    accountId
}: {accountId: string}) => {

    const downlines = await getMemberAccountDownlines({accountId: accountId})

    return (
        <ScrollShadow className="flex flex-col flex-1 max-h-[calc(100vh-43vh)]">
            <div className='flex flex-col'>
                {
                    downlines?.map((downline: any) => (
                        <DownlineItem key={downline.id} downline={downline} />
                    ))
                }
            </div>
        </ScrollShadow>
    )
}

export default MemberDownlineList