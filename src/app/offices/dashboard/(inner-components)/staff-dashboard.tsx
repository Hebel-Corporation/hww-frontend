"use client"

import { getOfficeStats } from '@/actions/office-actions'
import GlobalLoader from '@/components/common/global-loader'
import OfficeFilter from '@/components/common/office-filter'
import { useQuery } from '@tanstack/react-query'
import { Award, BadgeCheck, TrendingUp, UsersRound } from 'lucide-react'
import StatisticChart from './statistic-chart'
import { getClientSession, hasOfficeAuthorization } from '@/utils/client-utils'
import { SessionType } from '@/types'



function StaffDashboard({ officeId, officeFilter }: { officeId: string, officeFilter: string }) {

    const session = getClientSession() as SessionType | null;

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['officeStats', officeId, officeFilter],
        queryFn: () => getOfficeStats({ officeId: officeId, officeFilter:officeFilter }),
        enabled: !!officeId
    })



    if (isLoading) return <GlobalLoader />;
    if (isError) return <div className='flex flex-1 justify-center items-center'><p className='text-lg font-medium'>Error: {(error as Error).message}</p></div>;

    return (
        <div className='flex flex-col'>
            <section className="flex flex-col pb-3 pt-1.5">
                <div className="flex flex-wrap gap-5 md:gap-6 place-items-center w-full">
                    <div
                        className="flex flex-col flex-1 gap-2.5 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
                        <div className="flex flex-row justify-center items-center">
                            <Award size={45} className="text-[#f37c54]" />
                            <p className="font-medium text-xl sm:text-2xl lg:text-3xl leading-6 text-primary ml-2">
                                {data?.rewards}
                            </p>
                        </div>
                        <p className="text-base leading-6 text-center">
                            Recompenses
                        </p>
                    </div>
                    <div
                        className="flex flex-col flex-1 gap-2.5 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
                        <div className="flex flex-row justify-center items-center">
                            <UsersRound size={42} className="text-[#f37c54]" />
                            <p className="font-medium text-xl sm:text-2xl lg:text-3xl leading-6 text-primary ml-2">
                                {data?.accounts}
                            </p>
                        </div>
                        <p className="text-base leading-6 text-center">
                            Enregistrements
                        </p>
                    </div>
                    <div
                        className="flex flex-col flex-1 gap-2.5 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
                        <div className="flex flex-row justify-center items-center">
                            <BadgeCheck size={42} className="text-[#f37c54]" />
                            <p className="font-medium text-xl sm:text-2xl lg:text-3xl leading-6 text-primary ml-2">
                                {data?.matchings}
                            </p>
                        </div>
                        <p className="text-base leading-6 text-center">Equilibres total</p>
                    </div>
                    <div
                        className="flex flex-col flex-1 gap-2.5 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
                        <div className="flex flex-row justify-center items-center">
                            <TrendingUp size={45} className="text-[#f37c54]" />
                            <p className="font-medium text-xl sm:text-2xl lg:text-3xl leading-6 text-primary ml-2">
                                {data?.purchase_bonus}
                            </p>
                        </div>
                        <p className="text-base leading-6 text-center">Vente des produits total</p>
                    </div>
                </div>
            </section>

            <div className='flex justify-between items-center py-2'>
                <h2 className="text-sm sm:text-lg text-gray-700 dark:text-slate-100 font-medium">
                    Graphique de l&apos;année {new Date().getFullYear()}
                </h2>
                {
                    hasOfficeAuthorization({
                        authorizedOffices: ['head_office'],
                        userOffice: session?.user?.office
                    }) && (
                        <OfficeFilter officeFilter={officeFilter} />
                    )
                }
            </div>

            <StatisticChart data={data?.stat_data || []} />
        </div>
    )
}

export default StaffDashboard