import { ScrollShadow } from '@nextui-org/react'
import EmptyData from './common/empty-data'
import LocationItem from './location-item'
import { Location } from '@/types'
import { getLocations } from '@/actions/location-actions'
import ServerPaginationControls from './common/server-pagination-controls'

type locationResultType = {
    count: number,
    total_pages: number,
    next: string,
    previous: string,
    results: Location[]
}

const LocationItemList = async ({
    page,
    limit
}: { page: number, limit: number }) => {

    const locations: locationResultType = await getLocations({ page: page, limit: limit })

    return (
        <div className='flex flex-col flex-1 gap-2'>
            <ScrollShadow className="flex flex-col flex-1 min-h-[calc(100vh-35.5vh)] max-h-[calc(100vh-35.5vh)]">
                {
                    locations?.count ?
                        <div className='flex flex-wrap gap-5'>
                            {
                                locations?.results?.map((location: Location) => (
                                    <LocationItem key={location?.id} location={location} />
                                ))
                            }
                        </div>
                        :
                        <EmptyData description="Aucun emplacement n'est encore enregistrer pour le moment." />
                }
            </ScrollShadow>
            {
                locations?.count > 0 &&
                <ServerPaginationControls page={page} limit={limit} total_pages={locations?.total_pages} />
            }
        </div>
    )
}

export default LocationItemList