import { getInitialChar } from '@/utils/utils-fonctions'
import { Avatar } from '@nextui-org/react'

const DownlineItem = ({ downline }: { downline: any }) => {
    return (
        <div className="flex items-center justify-between text-sm py-2 border-b duration-500 hover:bg-gray-100 dark:hover:bg-gray-950">
            <div className="flex gap-3 items-center">
                <Avatar fallback={<>{getInitialChar({first_name: downline?.member?.first_name, last_name: downline?.member?.last_name})}</>
                } className='h-[3.1rem] w-[3.1rem]' />
                <div className='sm:min-w-60'>
                    <h1 className="text-base font-medium">
                        Proprietaire
                    </h1>
                    <span className="font-extralight text-small">
                        {downline?.member?.first_name} {downline?.member?.last_name}
                    </span>
                </div>
            </div>
            <div className='hidden sm:block'>
                <h1 className="text-base font-medium">
                    Compte
                </h1>
                <h2 className='font-extralight'>{downline?.company_id}</h2>
            </div>
            <div className='hidden sm:block'>
                <h1 className="text-base font-medium">
                    Downlines
                </h1>
                <h2 className='font-extralight'>
                {downline?.downline_count}
                </h2>
            </div>
        </div>
    )
}

export default DownlineItem