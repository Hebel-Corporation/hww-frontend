"use client"

import { getOfficeStats } from '@/actions/office-actions'
import { Award, BadgeCheck, TrendingUp, UsersRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import StatisticChart from './statistic-chart'



function StaffDashboard({officeId}: {officeId: string}) {

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['officeStats', officeId],
        queryFn: () => getOfficeStats({officeId: officeId}),
        enabled: !!officeId
    })


    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;


    return (
        <div>
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
                        <p className="text-base sm:text-lg leading-6 text-center">
                            Remise &amp; Recompenses
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
                        <p className="text-base sm:text-lg leading-6 text-center">Comptes actifs</p>
                    </div>
                    <div
                        className="flex flex-col flex-1 gap-2.5 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
                        <div className="flex flex-row justify-center items-center">
                            <BadgeCheck size={42} className="text-[#f37c54]" />
                            <p className="font-medium text-xl sm:text-2xl lg:text-3xl leading-6 text-primary ml-2">
                                {data?.matchings}
                            </p>
                        </div>
                        <p className="text-base sm:text-lg leading-6 text-center">Equilibres atteints</p>
                    </div>
                    <div
                        className="flex flex-col flex-1 gap-2.5 justify-center items-center bg-[#f3f2f1] dark:bg-zinc-800 dark:text-slate-100 px-4 py-2 h-[126px] w-[100%] md:w-[281px] rounded-lg justify-self-center">
                        <div className="flex flex-row justify-center items-center">
                            <TrendingUp size={45} className="text-[#f37c54]" />
                            <p className="font-medium text-xl sm:text-2xl lg:text-3xl leading-6 text-primary ml-2">
                                {data?.purchase_bonus}
                            </p>
                        </div>
                        <p className="text-base sm:text-lg leading-6 text-center">Vente des produits</p>
                    </div>
                </div>
            </section>

            <StatisticChart data={data?.stat_data || []} />
        </div>
    )
}

export default StaffDashboard