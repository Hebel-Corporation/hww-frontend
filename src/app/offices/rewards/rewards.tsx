"use client";

import React from "react";
import { Lock, Gift, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getOfficePromotions,
  getOfficeRewards,
} from "@/actions/office-actions";
import { GiftType, RewardType } from "@/types";
import { Skeleton } from "@heroui/react";


type RewardCardProps = {
  gift?: GiftType;
  title: string;
  description: string;
  icon?: React.ReactNode;
  status: "preparation" | "active" | "paused";
  subtitle?: string;
  detail?: string;
  colorScheme: "blue" | "yellow" | "green";
  locked?: boolean;
};

const RewardCard: React.FC<RewardCardProps> = ({
  gift,
  title,
  description,
  icon,
  status,
  subtitle,
  detail,
  colorScheme,
  locked = false,
}) => {
  const statusStyles = {
    container: "bg-white dark:bg-zinc-900",
    header: "bg-gray-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-200",
    dots: "bg-zinc-900 dark:bg-zinc-200",
  }

  const statusText = {
    preparation: "Connexion en préparation",
    active: "Connexion activée",
    paused: "Connexion en pause",
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm ${
        statusStyles.container
      } ${locked ? "relative" : ""}`}
    >
      <div className={`px-4 py-3 text-center ${statusStyles.header}`}>
        {title} - {gift?.name}
      </div>

      <div className="p-6">
        {locked && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <Lock className="h-12 w-12 text-white mb-3" />
            <p className="text-white font-medium text-lg">Verrouillé</p>
            <p className="text-white/80 text-sm mt-1">
              Disponible prochainement
            </p>
          </div>
        )}

        <div className="flex justify-center gap-1 mb-5">
          <div
            className={`h-2 w-2 rounded-full ${
              status === "preparation"
                ? statusStyles.dots
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
          <div
            className={`h-2 w-2 rounded-full ${
              status === "active"
                ? statusStyles.dots
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
          <div
            className={`h-2 w-2 rounded-full ${
              status === "paused"
                ? statusStyles.dots
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
        </div>

        <div className="text-center mb-4">
          <div className="flex justify-center mb-3">
            <Gift className="h-12 w-12 text-gray-400" />
          </div>

          <p className="text-gray-600 dark:text-gray-300 font-light">
            {description}
          </p>

          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {subtitle}
            </p>
          )}

          {detail && (
            <div className="mt-2">
              <span className="text-gray-900 dark:text-gray-100">{detail}</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button className="w-full flex items-center gap-3 underline py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm">
            Voir les détails des qualifications
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export function Rewards({ officeId }: { officeId: string }) {
  
  const { data, isLoading } = useQuery({
    queryKey: ["rewards", officeId],
    queryFn: () => getOfficeRewards({ officeId }),
  });

  return (
    <div className="max-w-7xl w-full flex flex-col flex-1 py-8">
      <div className="text-left mb-8">
        <h1 className="text-xl">Récompenses exclusives</h1>
        <p className="text-gray-500 font-extralight max-w-2xl">
          Gagnez des récompenses en atteignant des niveaux de réseau
          spécifiques.
        </p>
      </div>

      {isLoading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Skeleton className="w-full flex gap-2 items-center sm:w-sm h-[23.5rem] relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl" />
          <Skeleton className="w-full flex gap-2 items-center sm:w-sm h-[23.5rem] relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl" />
          <Skeleton className="w-full flex gap-2 items-center sm:w-sm h-[23.5rem] relative group hover:scale-95 group cursor-pointer duration-500 dark:bg-zinc-900 bg-zinc-100 border border-dashed hover:border-blue-300 p-4 rounded-xl" />
        </div>
      ):(
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data?.map((reward: RewardType) => (
            <RewardCard
              key={reward.id}
              gift={reward.gift}
              title={reward.title}
              description={reward.description}
              subtitle={`🎁 ${reward.gift?.name ?? "Cadeau"} - ${
                reward.equivalent_amount
              } $`}
              detail={`Qualifiés: ${reward.qualification_count}`}
              status={reward.is_active ? "active" : "paused"}
              colorScheme={reward.is_active ? "green" : "yellow"}
              locked={!reward.is_active}
              icon={
                reward.gift?.image ? (
                  <img
                    src={reward.gift.image}
                    alt={reward.gift.name ?? "Gift"}
                    className="h-12 w-12 object-contain rounded"
                  />
                ) : (
                  <Gift className="h-12 w-12 text-gray-400" />
                )
              }
            />
          ))}

          {/* Carte promotionnelle verrouillée */}
          <RewardCard
            key="locked-exclusive"
            title="Récompense exclusive"
            description="Débloquez des avantages spéciaux"
            subtitle="Disponible au niveau supérieur"
            detail=""
            status="preparation"
            colorScheme="blue"
            locked={true}
            icon={<Lock className="h-12 w-12 text-gray-400" />}
          />
        </div>
      )}
    </div>
  );
}
