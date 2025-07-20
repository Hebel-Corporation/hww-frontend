import { getOffices } from '@/actions/office-actions'
import { Office } from '@/types'
import { ScrollShadow } from '@heroui/react'
import EmptyData from './common/empty-data'
import OfficeItem from './office-item'
import PaginationControls from './common/pagination-controls'


type oficeResultType = {
    count: number,
    total_pages: number,
    next: string,
    previous: string,
    results: Office[]
}

const OfficeItemList = async ({
    page, limit, search
}: { page: number, limit: number, search: string }) => {

    const offices: oficeResultType = await getOffices({
        page: page,
        limit: limit,
        search: search
    })

    return (
        <div className='flex flex-col flex-1 gap-2'>
            <ScrollShadow className="flex flex-col flex-1 min-h-[72dvh] max-h-[70dvh] sm:max-h-dvh">
                {
                    offices?.count ?
                        <div className='flex flex-wrap gap-5'>
                            {
                                offices?.results?.map((office: Office) => (

                                    <OfficeItem key={office.id} office={office} />

                                ))
                            }
                        </div>
                        :
                        <EmptyData description="Aucun emplacement n'est encore enregistrer pour le moment." />
                }
            </ScrollShadow>
            {
                offices?.total_pages > 1 &&
                <PaginationControls page={page} limit={limit} total_pages={offices?.total_pages} />
            }
        </div>
    )
}

export default OfficeItemList