import { getOfficeStaffs } from '@/actions/office-actions'
import { User } from '@/types'
import { ScrollShadow } from '@nextui-org/react'
import EmptyData from './common/empty-data'
import StaffItem from './staff-item'

const StaffItemList = async ({
    officeID, search
}: { officeID: string, search: string }) => {

    const staffList = await getOfficeStaffs({ officeId: officeID, search: search })

    return (
        <ScrollShadow className="flex flex-col flex-1 min-h-[calc(100vh-35vh)] max-h-[calc(100vh-35vh)]">
            {
                staffList?.length ?
                    <div className='flex flex-col'>
                        {
                            staffList?.map((staff: User) => (
                                <StaffItem key={staff.id} staff={staff} />
                            ))
                        }
                    </div>
                    :
                    <EmptyData description='Aucun utilisateur enregistrer pour le moment.' />
            }
        </ScrollShadow>
    )
}

export default StaffItemList