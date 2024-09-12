import { getMemberDettails } from '@/actions/member-actions'
import AccountCardItem from '@/components/account-card-item'
import AddAccountModal from '@/components/add-account-modal'
import AddMemberModal from '@/components/add-member-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import MemberDownlineList from '@/components/member-downline-list'
import MemberItem from '@/components/member-item'
import { getInitialChar } from '@/utils/utils-fonctions'
import { Avatar, Button, Pagination, ScrollShadow, Spinner } from '@nextui-org/react'
import { ArrowRight, EyeIcon, Filter, MoreHorizontal, PlusCircle } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import React, { Suspense } from 'react'




const MemberDetails = async ({
    params,
    searchParams
}: {
    params: { memberId: string },
    searchParams: { [key: string]: string | undefined }
}) => {

    const currentAccountId = searchParams.account || ''
    const member = await getMemberDettails({ memberId: params.memberId })
    if (!member)
        notFound()
    if (!currentAccountId)
        redirect(`?account=${member?.accounts[0].id}`)


    const breadcrumbItems = [
        {
            label: 'Accueil',
            path: '/offices/dashboard'
        },
        {
            label: 'Membres',
            path: '/offices/members'
        },
        {
            label: `${member?.first_name} ${member?.last_name}`,
            path: ''
        },
    ]

    return (
        <ContentLayout breadcrumb={
            <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
        }>
            <main className='flex flex-col flex-1 gap-3'>

                <div className='flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-4 justify-between items-center'>
                        <div className="flex gap-3 items-center">
                            <Avatar size='lg' fallback={
                                <>{getInitialChar({first_name: member?.first_name, last_name: member?.last_name})}</>
                            } />
                            <div>
                                <h1 className="text-lg font-normal">
                                    {member?.first_name} {member?.last_name}
                                </h1>
                                <span className="font-extralight text-small">
                                    ID: {member?.company_id}
                                </span>
                            </div>
                        </div>
                        <div>
                            <AddAccountModal memberId={member?.id} accounts={
                                member?.accounts?.map((acc: any) => {return acc.company_id})
                            } />
                        </div>
                    </div>

                    <ScrollShadow orientation='horizontal' className='flex flex-1 py-2 gap-6 items-center'>
                        {
                            member?.accounts?.map((account: any) => (
                                <AccountCardItem key={account?.id}
                                    accountId={account?.id}
                                    currentAccountId={currentAccountId}
                                    companyId={account?.company_id}
                                    ownerFullName={`${member?.first_name} ${member?.last_name}`}
                                    downlineCount={account?.downline_count}
                                    accountBalance={account?.balance}
                                />
                            ))
                        }
                    </ScrollShadow>
                </div>

                <div className='flex flex-col flex-1 gap-3'>
                    <h1>Downlines</h1>
                    <div className="flex gap-3 flex-wrap justify-between items-center">
                        <div className="sm:w-2/4 w-full flex items-center">
                            <SearchBar />
                        </div>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Button radius="sm" variant='flat' color='warning' startContent={
                                <EyeIcon />
                            }
                            >
                                Détails du compte
                            </Button>
                            <Button radius="sm" startContent={
                                <Filter />
                            }
                            >Filtrer</Button>
                        </div>
                    </div>

                    {/* Member downline list */}
                    <Suspense fallback={
                        <div className='flex gap-2'>
                            <Spinner size='md' />
                            <span>Chargement...</span>
                        </div>
                    }>
                        <MemberDownlineList accountId={currentAccountId} />
                    </Suspense>

                    <Pagination showControls total={5} />
                </div>
            </main>
        </ContentLayout>
    )
}

export default MemberDetails