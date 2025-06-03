import { ScrollShadow } from '@heroui/react'
import EmptyData from './common/empty-data'
import LocationItem from './location-item'
import { Location } from '@/types'
import { getLocations } from '@/actions/location-actions'
import PaginationControls from './common/pagination-controls'

type locationResultType = {
    count: number,
    total_pages: number,
    next: string,
    previous: string,
    results: Location[]
}

const LocationItemList = async ({
    page,
    limit, search
}: { page: number, limit: number, search: string }) => {

    const locations: locationResultType = await getLocations({ page: page, limit: limit, search: search })

    return (
        <div className='flex flex-col flex-1 gap-2'>
            <ScrollShadow className="flex flex-col flex-1 min-h-[72dvh] max-h-[72dvh]">
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
                <PaginationControls page={page} limit={limit} total_pages={locations?.total_pages} />
            }
        </div>
    )
}

export default LocationItemList