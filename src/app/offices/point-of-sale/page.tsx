import { getOffices } from '@/actions/office-actions'
import AddOfficeModal from '@/components/add-office-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import OfficeItemList from '@/components/office-item-list'
import { Button, Pagination } from '@nextui-org/react'
import { Filter, PlusCircle } from 'lucide-react'


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Points de ventes',
    path: ''
  },
]

const PointOfSalePage = async () => {

  const offices = await getOffices()

  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="relative flex flex-col flex-1 gap-[19px]">

        <div>
          <h1 className="text-xl">Un titre</h1>
          <p className="font-extralight">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>

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
        <OfficeItemList offices={offices} />

        <Pagination showControls total={5} />

      </main>

    </ContentLayout>
  )
}

export default PointOfSalePage