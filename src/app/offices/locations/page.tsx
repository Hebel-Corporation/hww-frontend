import { getLocations } from '@/actions/location-actions'
import AddLocationModal from '@/components/add-location-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import PageTitle from '@/components/common/page-title'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import LocationItemList from '@/components/location-item-list'
import { Button, Pagination } from '@nextui-org/react'
import { Filter, PlusCircle } from 'lucide-react'


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Emplacements',
    path: ''
  },
]

const LocationPage = async () => {

  const locations = await getLocations()

  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="relative flex flex-col flex-1 gap-[19px]">

        <PageTitle
          title='Gestion des emplacements'
          description='Ces informations seront utilisées pour référencer les différentes localités de votre système.'
        />

        {/* 
          * Search section
         */}
        <div className="flex gap-3 flex-wrap justify-between items-center">
          <div className="sm:w-2/4 w-full flex items-center">
            <SearchBar />
          </div>
          <div className="flex gap-3 items-center">
            <AddLocationModal>
              <span className="flex items-center gap-3">
                <PlusCircle />
                Ajouter un emplacement
              </span>
            </AddLocationModal>
            <Button radius="sm" startContent={
              <Filter />
            }>Filtrer</Button>
          </div>
        </div>

        {/* Location list */}
        <LocationItemList locations={locations} />

        <Pagination showControls total={5} />

      </main>

    </ContentLayout>
  )
}

export default LocationPage