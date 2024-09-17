import { ContentLayout } from '@/components/admin-panel/content-layout'
import PageTitle from '@/components/common/page-title'
import SearchBar from '@/components/common/search-bar'
import SuspenseFallback from '@/components/common/suspense-fallback'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import AddOfficeModal from '@/components/modals/add-office-modal'
import OfficeItemList from '@/components/office-item-list'
import { SessionType } from '@/types'
import { getServerSession } from '@/utils/server-auth-utils'
import { Button, Pagination } from '@nextui-org/react'
import { Filter, PlusCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Points de ventes',
    path: ''
  }
]

export default async function OfficePage() {

  const session: SessionType = await getServerSession({ raw: false })
  if(!session)
    redirect('/login')

  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="relative flex flex-col flex-1 gap-[19px]">

        <PageTitle
          title='Gestion des bureaux'
          description='Complétez les informations sur les bureaux ou points de vente'
        />

        {/* 
          * Search section
         */}
        <div className="flex gap-3 flex-wrap justify-between items-center">
          <div className="sm:w-2/4 w-full flex items-center">
            <SearchBar />
          </div>
          <div className="flex gap-3 items-center">
            <AddOfficeModal>
              <span className="flex items-center gap-3">
                <PlusCircle />
                Ajouter un point de vente
              </span>
            </AddOfficeModal>
            <Button radius="sm" startContent={
              <Filter />
            }>Filtrer</Button>
          </div>
        </div>

        {/* Office list */}
        <Suspense fallback={
          <SuspenseFallback />
        } >
          <OfficeItemList />
        </Suspense>

        <Pagination showControls total={5} />

      </main>

    </ContentLayout>
  )
}


