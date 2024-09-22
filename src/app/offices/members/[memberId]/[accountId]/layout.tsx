import { getMemberAccountDetails } from '@/actions/member-actions'
import AccountSubMenu from '@/components/account-sub-menu'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import { Chip } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'


interface AccountLayoutProps {
  children: ReactNode;
  params: {
    memberId: string;
    accountId: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}


export default async function AccountLayout ({ children, params, searchParams }: AccountLayoutProps) {

  const memberId: string = params.memberId || ''
  const accountId: string = params?.accountId
  const account = await getMemberAccountDetails({ accountId: accountId })
  if (!account)
    notFound()


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
      label: `${account?.member?.first_name} ${account?.member?.last_name}`,
      path: `/offices/members/${memberId}`
    },
    {
      label: `${account?.company_id}`,
      path: ``
    }
  ]


  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>
      <main className='flex flex-col flex-1 gap-5'>

        <div className='flex flex-wrap items-center justify-between gap-4 border-b pb-4'>
          <div className='flex flex-col gap-1'>
            <h1>{account?.company_id}</h1>
            <div className='flex flex-wrap overflow-x-auto gap-3 font-extralight text-slate-600 dark:text-slate-300'>
              <Chip color='default' variant='flat'>
                {account?.pvs} PVs
              </Chip>
              <Chip color='warning' variant='flat'>
                {account?.downline_count} Downline{account?.downline_count > 1 ? 's' : ''}
              </Chip>
              <Chip color='success' variant='flat'>
                {account?.matching_count} Equilibre{account?.matching_count > 1 ? 's' : ''}
              </Chip>
              <Chip color='primary' variant='flat'>
                {account?.referral_count} Parrainage{account?.referral_count > 1 ? 's' : ''}
              </Chip>
            </div>
          </div>

          <Chip variant='flat' size='lg' radius='sm' color='success' className='p-3 h-10'>
            Balance : <span className='font-bold'>$ {account?.balance}</span>
          </Chip>
        </div>

        <div className='flex justify-between'>
          <AccountSubMenu accountId={accountId} memberId={memberId} />

          <div className="sm:w-2/4 w-full flex items-center">
            <SearchBar />
          </div>
        </div>

        <div>
          {children}
        </div>

      </main>
    </ContentLayout>
  )
}

