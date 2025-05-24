"use client"

import { getOfficeStats } from '@/actions/office-actions'
import { Award, BadgeCheck, ChevronDown, TrendingUp, UsersRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import StatisticChart from './statistic-chart'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Selection } from "@nextui-org/react";
import { useRouter } from 'next/navigation'



function StaffDashboard({ officeId, officeFilter }: { officeId: string, officeFilter: string }) {

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['officeStats', officeId, officeFilter],
        queryFn: () => getOfficeStats({ officeId: officeId, officeFilter:officeFilter }),
        enabled: !!officeId
    })


    const [selectedKeys, setSelectedKeys] = React.useState(new Set([officeFilter]));

    const router = useRouter()


    const items: any[] = [
        {
            name: "Tous les bureaux",
            id: "all"
        },
        ...(data?.offices || []).map((office: any) => ({
            name: office.name,
            id: office.id,
            office_code: office.office_code,
            location: office.location__name
        }))
    ]
    

    const selectedKey = Array.from(selectedKeys)[0];

    const selectedLabel = React.useMemo(() => {
      const found = items.find((item: any) => item.id === selectedKey);
      return found ? (found.name || found?.location + ' - ' + found.office_code) : "Sélectionner";
    }, [selectedKey]);


    if (isLoading) return <div className='flex flex-1 justify-center items-center'><p>Chargement...</p></div>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

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
                    Graphique de l'année {new Date().getFullYear()}
                </h2>
                {
                items.length > 1 &&
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="capitalize " variant="flat" radius='sm' 
                            endContent={<ChevronDown size={16} />}
                        >
                            {selectedLabel}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Single selection example"
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={(keys: Selection) => setSelectedKeys(keys as Set<string>)}
                    >
                        {items?.map((item: any) => (
                        <DropdownItem key={item?.id} onClick={() => router.push(`/offices/dashboard/?office=${item?.id}`)}>
                            {item.name || item.location + ' - ' + item.office_code}
                        </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                }
            </div>

            <StatisticChart data={data?.stat_data || []} />
        </div>
    )
}

export default StaffDashboard