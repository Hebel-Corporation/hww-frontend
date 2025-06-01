import SuspenseFallback from '@/components/common/suspense-fallback';
import MemberDownlineList from '@/components/member-downline-list';
import { constantVars } from '@/lib/constants';
import { Suspense } from 'react';


const DownlinePage = async ({
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


  return (
    <main className='flex flex-col flex-1 gap-3'>
      <h1>Downlines</h1>

      {/* Member downline list */}
      <Suspense fallback={
        <SuspenseFallback />
      }>
        <MemberDownlineList page={page} limit={limit} search={search} accountId={accountId} />
      </Suspense>
    </main>
  )
}



export default DownlinePage