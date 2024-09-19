import { getMemberAccountDetails, getMemberAccountReferrals, getMemberDettails } from '@/actions/member-actions'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import { Chip } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import React from 'react'
import { Button, ButtonGroup } from "@nextui-org/react";

const AccountPage = async ({
  params,
  searchParams
}: {
  params: { memberId: string, accountId: string },
  searchParams: { [key: string]: string | undefined }
}) => {

  const memberId: string = params.memberId || ''
  const accountId: string = params?.accountId
  const account = await getMemberAccountDetails({ accountId: accountId })
  if (!account)
    notFound()

  const referrals = await getMemberAccountReferrals({ accountId: accountId })


  console.log("Referrals ===", account)

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

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-col gap-1'>
            <h1>{account?.company_id}</h1>
            <div className='flex gap-3 font-extralight text-slate-600 dark:text-slate-300'>
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

          <div className='flex gap-2 py-2.5 px-4 items-center rounded-sm bg-green-100 text-green-600'>
            <span>Balance :</span>
            <span className='font-bold'>$ {account?.balance}</span>
          </div>
        </div>

        <div className=''>
          <ButtonGroup radius='sm'>
            <Button>Equilibres</Button>
            <Button>Parrainages</Button>
            <Button>Payements</Button>
          </ButtonGroup>
        </div>

      </main>
    </ContentLayout>
  )
}

export default AccountPage