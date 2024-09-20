import { getMemberAccountMatchings } from '@/actions/member-actions'
import MatchingTable from '@/components/matching-table'
import { notFound } from 'next/navigation'

async function MatchingPage ({
    params,
    searchParams
  }: {
    params: { memberId: string, accountId: string },
    searchParams: { [key: string]: string | undefined }
  }) {
  
    const accountId: string = params?.accountId
    
    const matchings = await getMemberAccountMatchings({ accountId: accountId })
    if (matchings == undefined)
      notFound()
  
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10
    const pages = matchings?.length ? Math.ceil(matchings.length / limit) : 0;


    return (
        <main className='flex flex-col flex-1 gap-3'>
            <h1>Bonus d&apos;équilibre</h1>

            <MatchingTable matchings={matchings}
                page={page}
                pages={pages}
            />
        </main>
    )
}

export default MatchingPage