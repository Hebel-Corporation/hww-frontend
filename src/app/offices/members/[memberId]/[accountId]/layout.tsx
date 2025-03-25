import { getMemberAccountDetails } from '@/actions/member-actions'
import AccountSubMenu from '@/components/account-sub-menu'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import PurchaseBonusModal from '@/components/modals/add-purchase-bonus'
import PaymentModal from '@/components/modals/payment/payment-modal'
import { Chip } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'


type AccountLayoutProps = {
  children: ReactNode,
  params: {
    memberId: string,
    accountId: string,
  }
}


export default async function AccountLayout({ children, params }: AccountLayoutProps) {

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
              <div className='flex flex-wrap gap-2 font-extralight text-slate-600 dark:text-slate-300'>
                <Chip size='sm' color='default' variant='flat'>
                  {account?.pvs} PVs
                </Chip>
                <Chip size='sm' color='warning' variant='flat'>
                  {account?.downline_count} Downline{account?.downline_count > 1 ? 's' : ''}
                </Chip>
                <Chip size='sm' color='success' variant='flat'>
                  {account?.matching_count} Equilibre{account?.matching_count > 1 ? 's' : ''}
                </Chip>
                <Chip size='sm' color='primary' variant='flat'>
                  {account?.referral_count} Parrainage{account?.referral_count > 1 ? 's' : ''}
                </Chip>
                <Chip size='sm' color='default' variant='flat'>
                  {account?.puchase_bonus_count} Bonus achat produit
                </Chip>
              </div>
          </div>
          <div className='flex flex-wrap-reverse gap-3 items-center'>
            <Chip variant='flat' size='lg' radius='sm' color='success' className='p-3 h-10'>
              Balance : <span className='font-bold'>$ {account?.balance}</span>
            </Chip>
          </div>
        </div>

        <div className='flex flex-wrap gap-4 justify-between'>
          <AccountSubMenu accountId={accountId} memberId={memberId} />

          <div className="w-full max-w-sm flex flex-col sm:flex-row gap-5 items-center">
            <SearchBar />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          {children}
        </div>

      </main>
    </ContentLayout>
  )
}

