import { getMemberAccountReferrals } from '@/actions/member-actions'
import { notFound } from 'next/navigation'
import React from 'react'

const AccountPage = async ({
    params,
    searchParams
}: {
    params: { memberId: string, accountId: string },
    searchParams: { [key: string]: string | undefined }
}) => {

    const accountId: string = params?.accountId
    const accountDetails = await getMemberAccountReferrals({accountId: accountId})
    if (!accountDetails)
        notFound()

  return (
    <div>Account Page : {accountId} </div>
  )
}

export default AccountPage