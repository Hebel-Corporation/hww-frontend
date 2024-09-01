import { ScrollShadow } from '@nextui-org/react'
import EmptyData from './common/empty-data'
import LocationItem from './location-item'
import { Office } from '@/types'
import OfficeItem from './office-item'

const OfficeItemList = async ({
    offices
}: { offices: Office[] }) => {

    return (
        <ScrollShadow className="flex flex-col h-[calc(100vh-37vh)]">
            {
                offices?.length ?
                    <div className='flex flex-wrap gap-5'>
                        {
                            offices.map((office: Office) => (

                                <OfficeItem key={office.id} office={office} />

                            ))
                        }
                    </div>
                    :
                    <EmptyData description="Aucun emplacement n'est encore enregistrer pour le moment." />
            }
        </ScrollShadow>
    )
}

export default OfficeItemList