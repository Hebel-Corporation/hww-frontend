import AddMemberModal from '@/components/add-member-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import MemberItem from '@/components/member-item'
import { Avatar, Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { Filter, PlusCircle } from 'lucide-react'
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
            <main className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <div className="flex gap-3 items-center">
                        <Avatar size='lg' fallback={<>NK</>
                        } />
                        <div>
                            <h1 className="text-lg font-normal">Nelson Kayisirirya</h1>
                            <span className="font-extralight text-small">nelsonkayisirirya5@gmail.com</span>
                        </div>
                    </div>
                    <div>
                        <Button radius="sm"
                            startContent={
                                <PlusCircle />
                            }
                        >
                            Ajouter un compte
                        </Button>
                    </div>
                </div>

                <div className='flex flex-wrap justify-between items-center'>
                    <div className='h-20 w-80 rounded-md bg-red-500'></div>
                    <div className='h-20 w-80 rounded-md bg-red-500'></div>
                    <div className='h-20 w-80 rounded-md bg-red-500'></div>
                </div>

                <div className='flex flex-col gap-3'>
                    <h1>Downlines</h1>
                    <div className="flex gap-3 flex-wrap justify-between items-center">
                        <div className="sm:w-2/4 w-full flex items-center">
                            <SearchBar />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Button radius="sm" startContent={
                                <Filter />
                            }>Filtrer</Button>
                        </div>
                    </div>
                    <ScrollShadow className="flex flex-col h-[calc(100vh-56vh)]">
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