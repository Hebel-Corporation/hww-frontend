import { getMemberAccountReferrals } from '@/actions/member-actions';
import ReferralTable from '@/components/referral-table';
import { notFound } from 'next/navigation';


const ReferralPage = async ({
  params,
  searchParams
}: {
  params: { memberId: string, accountId: string },
  searchParams: { [key: string]: string | undefined }
}) => {

  const accountId: string = params?.accountId
  
  const referrals = await getMemberAccountReferrals({ accountId: accountId })
  if (referrals == undefined)
    notFound()

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10
  const pages = referrals?.length ? Math.ceil(referrals.length / limit) : 0;

  return (
    <main className='flex flex-col flex-1 gap-3'>
      <h1>Bonus de Parrainage</h1>

      <ReferralTable referrals={referrals}
        page={page}
        pages={pages}
      />
    </main>
  )
}



export default ReferralPage