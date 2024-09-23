import { ScrollShadow } from '@nextui-org/react'
import React from 'react'
import DownlineItem from './downline-item'
import { getMemberAccountDownlines } from '@/actions/member-actions'
import EmptyData from './common/empty-data'
import ServerPaginationControls from './common/server-pagination-controls'

const MemberDownlineList = async ({
    accountId,
    page,
    limit
}: { accountId: string, page: number, limit: number }) => {

    const downlines = await getMemberAccountDownlines({ accountId: accountId, page: page, limit: limit })

    return (
        <div className='flex flex-col flex-1 gap-2'>
            <ScrollShadow className="flex flex-col flex-1 min-h-[calc(100vh-59vh)] max-h-[calc(100vh-59vh)]">
                {
                    downlines?.count ?
                        <div className='flex flex-col'>
                            {
                                downlines?.results?.map((downline: any) => (
                                    <DownlineItem key={downline.id} downline={downline} />
                                ))
                            }
                        </div>
                        :
                        <EmptyData description="Ce compte n'a pas encore de downline pour le moment." />
                }
            </ScrollShadow>
            {
                downlines?.count > 0 &&
                <ServerPaginationControls page={page} limit={limit} total_pages={downlines?.total_pages} />
            }
        </div>
    )
}

export default MemberDownlineList