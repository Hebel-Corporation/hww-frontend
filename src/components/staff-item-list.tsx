import { getOfficeStaffs } from '@/actions/office-actions'
import { User } from '@/types'
import { ScrollShadow } from '@nextui-org/react'
import React from 'react'
import StaffItem from './staff-item'

const StaffItemList = async ({
    officeID
}: { officeID: string }) => {

    const staffList = await getOfficeStaffs({ officeId: officeID })

    return (
        <ScrollShadow className="flex flex-col h-[calc(100vh-41vh)]">
            {
                staffList.map((staff: User) => (
                    <StaffItem key={staff.id} staff={staff} />
                ))
            }
        </ScrollShadow>
    )
}

export default StaffItemList