import { ScrollShadow } from '@nextui-org/react'
import React from 'react'
import DownlineItem from './downline-item'
import { getMemberAccountDownlines } from '@/actions/member-actions'
import EmptyData from './common/empty-data'

const MemberDownlineList = async ({
    accountId
}: { accountId: string }) => {

    const downlines = await getMemberAccountDownlines({ accountId: accountId })

    return (
        <ScrollShadow className="flex flex-col flex-1 min-h-[calc(100vh-60vh)] max-h-[calc(100vh-60vh)]">
            {
                downlines?.length ?
                    <div className='flex flex-col'>
                        {
                            downlines?.map((downline: any) => (
                                <DownlineItem key={downline.id} downline={downline} />
                            ))
                        }
                    </div>
                    :
                    <EmptyData description="Ce compte n'a pas encore de downline pour le moment." />
            }
        </ScrollShadow>
    )
}

export default MemberDownlineList