import { getOfficeDetails, getOfficeRegisterCodes } from '@/actions/office-actions'
import AddStaffModal from '@/components/modals/add-staff-modal'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SearchBar from '@/components/common/search-bar'
import CustomBreadcrumb from '@/components/custom-breadcrumb'
import StaffItemList from '@/components/staff-item-list'
import { Office, SubscriptionCode } from '@/types'
import { Avatar, Button, Pagination, Spinner } from '@nextui-org/react'
import { Edit, Filter, View } from 'lucide-react'
import { Suspense } from 'react'
import SubscriptionCodeModal from '@/components/modals/subscription-code-modal'


const OfficeDetails = async ({
    params
}: {
    params: { officeId: string }
}) => {

    const officeID = params?.officeId
    const office: Office = await getOfficeDetails({ officeId: officeID })
    const codes = await getOfficeRegisterCodes({ officeId: officeID });

    let validCodeNumber = 0
    codes?.forEach((code: SubscriptionCode) => {
        validCodeNumber += (code?.reccords_number - code?.used_reccords_number)
    });

    const breadcrumbItems = [
        {
            label: 'Accueil',
            path: '/offices/dashboard'
        },
        {
            label: 'Bureaux',
            path: '/offices/point-of-sale'
        },
        {
            label: `${office.office_code}`,
            path: ''
        }
    ]


    return (
        <ContentLayout breadcrumb={
            <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
        }>
            <main className='flex flex-col flex-1 gap-5'>
                <div className='flex flex-wrap gap-4 justify-between items-center'>
                    <div className="flex gap-3 items-center">
                        <Avatar size='lg' radius='md' fallback={<>{office?.office_code}</>
                        } />
                        <div>
                            <h1 className="text-lg font-normal">
                                {office?.name || office?.location?.name} - {office?.office_code}
                            </h1>
                            <span className="font-extralight text-small">
                                {office?.members_count} compte{office?.members_count > 1 ? 's' : ''} inscrit ( {office?.subscription_rate}% )
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>

                        {/* Subscription codes */}
                        <SubscriptionCodeModal
                            officeId={officeID}
                            registerCodes={codes}
                            validCodeNumber={validCodeNumber}
                        />

                        <Button radius="sm" variant='flat' color='warning' startContent={
                            <Edit size={20} />
                        }
                        >
                            Modifier
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-3'>
                    <h1>Utilisateurs</h1>
                    <div className="flex gap-3 flex-wrap justify-between items-center">
                        <div className="sm:w-2/4 w-full flex items-center">
                            <SearchBar />
                        </div>
                        <div className="flex flex-wrap gap-3 items-center">
                            <AddStaffModal officeID={officeID} />
                            <Button radius="sm" startContent={
                                <Filter />
                            }>Filtrer</Button>
                        </div>
                    </div>

                    {/* Staff list */}
                    <Suspense fallback={
                        <div className='h-[calc(100vh-41vh)] flex gap-2 items-center justify-center'>
                            <Spinner size='md' />
                            <span>Chargement...</span>
                        </div>
                    }>
                        <StaffItemList officeID={officeID} />
                    </Suspense>
                </div>
            </main>
        </ContentLayout>
    )
}

export default OfficeDetails