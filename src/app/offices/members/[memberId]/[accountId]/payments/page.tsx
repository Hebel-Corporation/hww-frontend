import { getMemberAccountBonus, getMemberAccountpayments } from '@/actions/member-actions'
import PaymentModal from '@/components/modals/payment/payment-modal'
import PaymentTable from '@/components/payment-table'
import HasOfficePermission from '@/components/wrappers/auth/has-office-permission'
import { constantVars } from '@/lib/constants'
import { SessionType } from '@/types'
import { hasGroupAuthorization, hasOfficeAuthorization } from '@/utils/client-utils'
import { getServerSession } from '@/utils/server-auth-utils'
import { notFound } from 'next/navigation'

async function PaymentPage({
  params,
  searchParams
}: {
  params: { memberId: string, accountId: string },
  searchParams: { [key: string]: string | undefined }
}) {

  const accountId: string = params?.accountId
  const currentTab = searchParams?.tab || 'referral'
  const search = searchParams?.search || ''
  const page = Number(searchParams?.page) || constantVars.INIT_PAGINATION_PAGE
  const limit = Number(searchParams?.limit) || constantVars.LIMIT_PAGINATION

  const payments = await getMemberAccountpayments({
    accountId: accountId,
    page: page,
    limit: limit,
    search: search
  })

  const session = await getServerSession({raw: false}) as SessionType | null

  if (payments == undefined || !session)
    notFound()



  let bonuses: any;

  switch (currentTab) {
    case 'matching':
      bonuses = await getMemberAccountBonus({
        accountId: accountId,
        page: page,
        limit: limit,
        search: search,
        is_paid: false,
        bonusType: 'matching_bonus'
      })
      break;
    case 'referral':
      bonuses = await getMemberAccountBonus({
        accountId: accountId,
        page: page,
        limit: limit,
        search: search,
        is_paid: false,
        bonusType: 'referral_bonus'
      })
      break;
    case 'purchase':
      bonuses = await getMemberAccountBonus({
        accountId: accountId,
        page: page,
        limit: limit,
        search: search,
        is_paid: false,
        bonusType: 'purchase_bonus'
      })
      break;

    default:
      break;
  }

  return (
    <main className='flex flex-col flex-1 gap-3'>
      <div className='flex gap-4 items-center justify-between'>
        <h1>Liste des transactions</h1>

        <HasOfficePermission 
          offices={['head_office']}
        >
          <PaymentModal currentTab={currentTab} bonusItems={bonuses?.results} accountId={accountId} />
        </HasOfficePermission>

      </div>

      <PaymentTable payments={payments?.results}
        page={page}
        pages={payments?.total_pages}
        forMember={true}
      />
    </main>
  )
}

export default PaymentPage