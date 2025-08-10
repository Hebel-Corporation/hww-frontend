"use client";

import { Chip, CircularProgress, Progress, Skeleton } from "@heroui/react";
import { Plus, ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import RewardsTable from "./table";
import { formatDateTime } from "@/utils/utils-fonctions";
import { PromotionType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getOfficePromotions } from "@/actions/office-actions";

export function Promotions({ officeId }: { officeId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["promotions"],
    queryFn: () => getOfficePromotions({ officeId: officeId }),
  });

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl">Promotions</h1>
        {isLoading ? (
          <div className="w-full flex gap-4 overflow-x-auto">
            <Skeleton className="w-full flex gap-2 items-center sm:w-80 h-[10.22rem] relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl" />
            <Skeleton className="w-full flex gap-2 items-center sm:w-80 h-[10.22rem] relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl" />
            <Skeleton className="w-full flex gap-2 items-center sm:w-80 h-[10.22rem] relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl" />
            <Skeleton className="w-full flex gap-2 items-center sm:w-80 h-[10.22rem] relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl" />
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto">
            {data?.map((promotion: PromotionType) => (
              <PromotionItem key={promotion.id} promotion={promotion} />
            ))}
            <div className="w-full flex gap-2 items-center justify-center sm:w-80 relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl">
              <Plus className="w-6 h-6 text-gray-500 dark:text-slate-400 group-hover:text-blue-500 duration-500" />
              <span className="text-sm text-gray-500 dark:text-slate-400 group-hover:text-blue-500 duration-500">
                Ajouter une promotion
              </span>
            </div>
          </div>
        )}
      </div>
      {/* <RewardsTable /> */}
    </div>
  );
}

function PromotionItem({ promotion }: { promotion: PromotionType }) {
  return (
    <div
      // href={`/offices/rewards/promotions/${promotion.id}`}
      className="w-72 sm:w-80 relative group hover:scale-95 duration-500 dark:bg-zinc-900 bg-zinc-100 flex flex-col gap-3 border p-4 rounded-xl"
    >
      <div className="w-full flex gap-4 items-center justify-between">
        <h2 className="w-full truncate group-hover:text-blue-500 duration-500">
          {promotion.title}
        </h2>
        <Chip
          size="sm"
          radius="full"
          color={promotion.is_active ? "success" : "danger"}
          variant="flat"
        >
          {promotion.is_active ? "En cours" : "Terminée"}
        </Chip>
      </div>

      <div className="flex justify-between items-center">
        <Progress
          className="w-full"
          color="warning"
          formatOptions={{ style: "decimal" }}
          label="Bonus ayant qualifies"
          maxValue={promotion.total_bonus_concerned}
          showValueLabel={true}
          size="sm"
          value={promotion.qualification_count}
          valueLabel={`${promotion.qualification_count} / ${promotion.total_bonus_concerned}`}
          classNames={{
            label: "text-xs font-extralight",
            value: "text-xs font-extralight",
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Link href={`/offices/rewards/promotions/${promotion.id}`}>
          <Chip size="sm" radius="none" color="default" variant="flat" classNames={{base: "hover:underline"}}
            endContent={<ArrowRight size={16} className="ml-2" />}
          >
            Voir les {promotion.account_qualification_count} comptes qualifiés
          </Chip>
        </Link>
      </div>

      <p className="w-full text-xs text-gray-500 dark:text-slate-400">
        Du {formatDateTime(promotion.start_date)} au{" "}
        {formatDateTime(promotion.end_date)}
      </p>
    </div>
  );
}
