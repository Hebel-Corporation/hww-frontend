import { ScrollShadow } from '@nextui-org/react'
import EmptyData from './common/empty-data'
import LocationItem from './location-item'

const LocationItemList = async ({
    locations
}: { locations: Location[] }) => {

    return (
        <ScrollShadow className="flex flex-col flex-1 h-[calc(100vh-37vh)]">
            {
                locations?.length ?
                    <div className='flex flex-wrap gap-5'>
                        {
                            locations?.map((location: Location) => (
                                <LocationItem location={location} />
                            ))
                        }
                    </div>
                    :
                    <EmptyData description="Aucun emplacement n'est encore enregistrer pour le moment." />
            }
        </ScrollShadow>
    )
}

export default LocationItemList