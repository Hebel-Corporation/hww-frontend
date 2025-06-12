'use client'

import { handleSearchParamChange } from "@/utils/navigation-utils";
import { Chip } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface PeriodicFilterProps {
    filters: { value: string, label: string }[];
    filterSlug: string;
}

export default function PeriodicFilter({filters, filterSlug }: PeriodicFilterProps) {


    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
                <Chip key={filter?.value} onClick={() => handleSearchParamChange({ param: 'filter', value: filter?.value, router, searchParams })}
                    className={`cursor-pointer px-1 py-1.5 rounded-full hover:bg-opacity-50 text-sm ${filterSlug === filter?.value ? 'bg-primary text-slate-50 dark:text-zinc-800' : 'border border-zinc-500 dark:border-zinc-400'}`}
                >
                    {filter?.label}
                </Chip>
            ))}
        </div>
    )
}