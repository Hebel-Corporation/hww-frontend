import { getMemberAccountMatchings } from '@/actions/member-actions'
import MatchingTable from '@/components/matching-table'
import { constantVars } from '@/lib/constants'
import { notFound } from 'next/navigation'

async function MatchingPage({
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
  const matchings = await getMemberAccountMatchings({
    accountId: accountId,
    page: page,
    limit: limit,
    search: search
  })
  if (matchings == undefined)
    notFound()


  return (
    <main className='flex flex-col flex-1 gap-3'>
      <h1>Bonus d&apos;équilibre</h1>

      <MatchingTable matchings={matchings?.results}
        page={page}
        pages={matchings?.total_pages}
      />
    </main>
  )
}

export default MatchingPage