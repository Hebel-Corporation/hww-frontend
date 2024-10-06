import { getMemberDettails } from '@/actions/member-actions'
import AccountCardItem from '@/components/account-card-item'
import AddAccountModal from '@/components/modals/add-account-modal'
import AddMemberModal from '@/components/modals/add-member-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import MemberDownlineList from '@/components/member-downline-list'
import MemberItem from '@/components/member-item'
import { getInitialChar } from '@/utils/utils-fonctions'
import { Avatar, Button, Chip, Pagination, ScrollShadow, Spinner } from '@nextui-org/react'
import { ArrowRight, EyeIcon, Filter, MoreHorizontal, PlusCircle } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { SessionType } from '@/types'
import { getServerSession } from '@/utils/server-auth-utils'
import { checkOfficeRegisterCodeValidity } from '@/actions/office-actions'
import SuspenseFallback from '@/components/common/suspense-fallback'
import Link from 'next/link'
import { constantVars } from '@/lib/constants'




const MemberDetails = async ({
    params,
    searchParams
}: {
    params: { memberId: string },
    searchParams: { [key: string]: string | undefined }
}) => {

    const session: SessionType = await getServerSession({ raw: false })
    const hasRegisterCodeValid = await checkOfficeRegisterCodeValidity({ officeId: session?.user?.office?.id })

    const currentAccountId: string = searchParams.account || ''
    const memberId: string = params.memberId || ''
    const member = await getMemberDettails({ memberId: memberId })
    if (!member)
        notFound()
    if (!currentAccountId)
        redirect(`?account=${member?.accounts[0].id}`)


    const page = Number(searchParams?.page) || constantVars.INIT_PAGINATION_PAGE
    const limit = Number(searchParams?.limit) || constantVars.LIMIT_PAGINATION
    const search = searchParams?.search || ''


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
        }
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
                                <>{getInitialChar({ first_name: member?.first_name, last_name: member?.last_name })}</>
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
                                member?.accounts?.map((acc: any) => { return acc.company_id })
                            }
                                hasRegisterCodeValid={hasRegisterCodeValid}
                            />
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
                                    pvs={account?.pvs}
                                />
                            ))
                        }
                    </ScrollShadow>
                </div>

                <div className='flex flex-col flex-1 gap-3'>
                    <div className="flex gap-2.5 flex-wrap justify-between items-center">
                        <h1>Réseau</h1>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Button radius="sm" variant='flat' color='warning'
                                className="!p-0 !min-w-0 h-max"
                            >
                                <Link href={`/offices/members/${memberId}/${currentAccountId}`}
                                    className="flex flex-1 gap-2 items-center px-4 py-2">
                                    <EyeIcon />
                                    <span>Détails du compte</span>
                                </Link>
                            </Button>
                            {/* <Button radius="sm" startContent={
                                <Filter />
                            }
                            >Filtrer</Button> */}
                        </div>
                    </div>

                    {/* Member network */}
                    <div className='flex flex-col sm:flex-row flex-1 gap-5 justify-between'>
                        <div className='flex flex-col flex-1 gap-4 border rounded-lg p-4 md:p-5 bg-zinc-100 dark:bg-zinc-800'>
                            <h2>Parrents</h2>
                            <div className="flex gap-2 items-center border rounded-lg border-zinc-300 dark:border-zinc-700 p-2">
                                <Avatar fallback={<>NK</>
                                } className='h-[3.5rem] w-[3.5rem]' />
                                <div className='w-5/6 flex items-center justify-between'>
                                    <div className='sm:min-w-60'>
                                        <h1 className="text-base font-medium">
                                            Nelson Kayisirirya
                                        </h1>
                                        <span className="font-extralight text-small">
                                            ID : HWW-HEA01-M01-ACC01
                                        </span>
                                    </div>
                                    <Chip>Parrain</Chip>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col flex-1 border rounded-lg p-4 bg-zinc-100 dark:bg-zinc-800'>
                            <h2>Enfants direct</h2>
                        </div>
                    </div>
                </div>
            </main>
        </ContentLayout>
    )
}

export default MemberDetails