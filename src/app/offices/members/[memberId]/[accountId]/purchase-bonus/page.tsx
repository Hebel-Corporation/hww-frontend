import { getMemberAccountBonus } from '@/actions/member-actions'
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

    const purchaseBonuses = await getMemberAccountBonus({
        accountId: accountId,
        page: page,
        limit: limit,
        search: search,
        bonusType: 'purchase_bonus'
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
                forPayment={false}
                accountId={accountId}
                heightSize="min-h-[calc(100dvh-36dvh)] max-h-[calc(100dvh-36dvh)]"
                
            />
        </main>
    )
}

export default PurchasePage