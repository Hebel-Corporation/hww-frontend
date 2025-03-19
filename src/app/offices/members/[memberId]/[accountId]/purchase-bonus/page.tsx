import { getMemberAccountMatchings, getMemberAccountpayments, getMemberAccountPurchases, getMemberAccountReferrals } from '@/actions/member-actions'
import PurchaseBonusModal from '@/components/modals/add-purchase-bonus'
import PurchaseBonusTable from '@/components/purchase-bonus-table'
import { constantVars } from '@/lib/constants'
import { notFound } from 'next/navigation'

async function PurchasePage({
    params,
    searchParams
}: {
    params: { memberId: string, accountId: string },
    searchParams: { [key: string]: string | undefined }
}) {

    const accountId: string = params?.accountId

  const search = searchParams?.search || ''
  const page = Number(searchParams?.page) || constantVars.INIT_PAGINATION_PAGE
  const limit = Number(searchParams?.limit) || constantVars.LIMIT_PAGINATION

    const purchaseBonuses = await getMemberAccountPurchases({
        accountId: accountId,
        page: page,
        limit: limit,
        search: search
    })
    if (purchaseBonuses == undefined)
        notFound()


    return (
        <main className='flex flex-col flex-1 gap-3'>
            <div className='flex gap-4 items-center justify-between'>
                <h1>Bonus sur achat des produits</h1>

            </div>

            <PurchaseBonusTable purchaseBonuses={purchaseBonuses?.results}
                page={page}
                pages={purchaseBonuses?.total_pages}
            />
        </main>
    )
}

export default PurchasePage