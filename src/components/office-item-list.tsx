import { ScrollShadow } from '@nextui-org/react'
import EmptyData from './common/empty-data'
import LocationItem from './location-item'
import { Office } from '@/types'
import OfficeItem from './office-item'
import { getOffices } from '@/actions/office-actions'

const OfficeItemList = async () => {

    const offices: Office[] = await getOffices()

    return (
        <ScrollShadow className="flex flex-col flex-1 h-[calc(100vh-37vh)]">
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