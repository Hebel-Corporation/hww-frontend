import { getMemberAccountReferrals } from '@/actions/member-actions';
import ReferralTable from '@/components/referral-table';
import { constantVars } from '@/lib/constants';
import { notFound } from 'next/navigation';


const ReferralPage = async ({
  params,
  searchParams
}: {
  params: { memberId: string, accountId: string },
  searchParams: { [key: string]: string | undefined }
}) => {

  const accountId: string = params?.accountId

  const search = searchParams?.search || ''
  const page = Number(searchParams?.page) || constantVars.INIT_PAGINATION_PAGE
  const limit = Number(searchParams?.limit) || constantVars.LIMIT_PAGINATION
  const referrals = await getMemberAccountReferrals({
    accountId: accountId,
    page: page,
    limit: limit,
    search: search
  })
  if (referrals == undefined)
    notFound()


  return (
    <main className='flex flex-col flex-1 gap-3'>
      <h1>Bonus de Parrainage</h1>

      <ReferralTable referrals={referrals?.results}
        page={page}
        pages={referrals?.total_pages}
      />
    </main>
  )
}



export default ReferralPage