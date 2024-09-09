import AccountCardItem from '@/components/account-card-item'
import AddAccountModal from '@/components/add-account-modal'
import AddMemberModal from '@/components/add-member-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import MemberItem from '@/components/member-item'
import { Avatar, Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { ArrowRight, EyeIcon, Filter, MoreHorizontal, PlusCircle } from 'lucide-react'
import React from 'react'


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
        label: 'Nom du membre',
        path: ''
    },
]

const MemberDetails = ({
    params
}: {
    params: { memberId: string }
}) => {
    return (
        <ContentLayout breadcrumb={
            <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
        }>
            <main className='flex flex-col gap-3'>
                <div className='flex flex-wrap gap-4 justify-between items-center'>
                    <div className="flex gap-3 items-center">
                        <Avatar size='lg' fallback={<>NK</>
                        } />
                        <div>
                            <h1 className="text-lg font-normal">Nelson Kayisirirya</h1>
                            <span className="font-extralight text-small">nelsonkayisirirya5@gmail.com</span>
                        </div>
                    </div>
                    <div>
                        <AddAccountModal />
                    </div>
                </div>

                <ScrollShadow orientation='horizontal' className='flex flex-1 py-2 gap-6 items-center'>
                    <AccountCardItem />
                    <AccountCardItem />
                    <AccountCardItem />
                    <AccountCardItem />
                    <AccountCardItem />
                </ScrollShadow>

                <div className='flex flex-col gap-3'>
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
                    <ScrollShadow className="flex flex-col flex-1 h-[calc(100vh-62vh)]">
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                        <MemberItem />
                    </ScrollShadow>

                    <Pagination showControls total={5} />
                </div>
            </main>
        </ContentLayout>
    )
}

export default MemberDetails