import { getMemberDettails } from '@/actions/member-actions'
import AccountCardItem from '@/components/account-card-item'
import AddAccountModal from '@/components/add-account-modal'
import AddMemberModal from '@/components/add-member-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import MemberDownlineList from '@/components/member-downline-list'
import MemberItem from '@/components/member-item'
import { Avatar, Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { ArrowRight, EyeIcon, Filter, MoreHorizontal, PlusCircle } from 'lucide-react'
import React from 'react'




const MemberDetails = async ({
    params
}: {
    params: { memberId: string }
}) => {

    const member = await getMemberDettails({ memberId: params.memberId })

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
                            <Avatar size='lg' fallback={<>NK</>
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
                            <AddAccountModal />
                        </div>
                    </div>

                    <ScrollShadow orientation='horizontal' className='flex flex-1 py-2 gap-6 items-center'>
                        {
                            member?.accounts?.map((account: any) => (
                                <AccountCardItem key={account?.id}
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
                            <Button radius="sm" variant='light' color='warning' endContent={
                                <ArrowRight />
                            }
                            >
                                Détails du compte
                            </Button>
                            <Button radius="sm" variant='flat' startContent={
                                <EyeIcon />
                            }
                            >
                                Transactions
                            </Button>
                            <Button radius="sm" startContent={
                                <Filter />
                            }>Filtrer</Button>
                        </div>
                    </div>

                    {/* Member downline list */}
                    <MemberDownlineList />

                    <Pagination showControls total={5} />
                </div>
            </main>
        </ContentLayout>
    )
}

export default MemberDetails