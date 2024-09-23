import { getOffices } from '@/actions/office-actions'
import { Office } from '@/types'
import { ScrollShadow } from '@nextui-org/react'
import EmptyData from './common/empty-data'
import ServerPaginationControls from './common/server-pagination-controls'
import OfficeItem from './office-item'


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
            <ScrollShadow className="flex flex-col flex-1 min-h-[calc(100vh-35.5vh)] max-h-[calc(100vh-35.5vh)]">
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
                offices?.count > 0 &&
                <ServerPaginationControls page={page} limit={limit} total_pages={offices?.total_pages} />
            }
        </div>
    )
}

export default OfficeItemList