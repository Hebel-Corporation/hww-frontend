import { getMemberDettails } from '@/actions/member-actions'
import MemberAccountCardItem from '@/components/member-account-card-item'
import { notFound } from 'next/navigation'
import React from 'react'

async function MemberDashboard({
    memberId
}: { memberId: string }) {

    const member = await getMemberDettails({ memberId: memberId })
    if (!member)
        notFound()

    return (
        <main className='flex flex-col gap-5 pb-4'>

            <div className='py-2'>
                <h1 className='text-2xl sm:text-2xl font-semibold'>
                    Salut {member?.first_name} {member?.last_name},
                </h1>
                <p className='text-base sm:text-lg font-light'>
                    Bienvenue sur la plateforme Health Winning World !
                </p>
            </div>

            <div className='flex flex-col gap-1.5'>
                <h2>Mes comptes</h2>
                <div className='flex flex-wrap gap-4'>
                    {
                        member?.accounts?.map((account: any) => (
                            <MemberAccountCardItem key={account?.id}
                                memberId={memberId}
                                accountId={account?.id}
                                companyId={account?.company_id}
                                downlineCount={account?.downline_count}
                                accountBalance={account?.balance}
                                pvs={account?.pvs}
                            />
                        ))
                    }
                </div>
            </div>

        </main>
    )
}

export default MemberDashboard