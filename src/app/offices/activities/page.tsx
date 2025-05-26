import { getOfficeActivities } from "@/actions/office-actions";
import ActivityTable from "@/components/activity-table";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { Button, Link } from '@nextui-org/react';
import { notFound } from "next/navigation";

import React from 'react';

const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Activités',
    path: ''
  }
]

const filters = [
  {
    label: "Aujourd'hui",
    value: "dayly"
  },
  {
    label: "Cette semaine",
    value: "weekly"
  },
  {
    label: "Ce mois",
    value: "monthly"
  },
  {
    label: "Tous",
    value: "all"
  },
];

export default async function ActivityPage({
  searchParams
}: {
    searchParams: { [key: string]: string | undefined }
}) {

  const filterSlug = searchParams?.filter || 'dayly'

  const session = await getServerSession({raw: false}) as SessionType | null
  if(!session) notFound()

  const data = await getOfficeActivities({
    officeId: session?.user?.office?.id,
    filterSlug: filterSlug
  })


  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="flex flex-col flex-1 justify-center items-center">
        <div className="flex flex-col flex-1 gap-6 p-2 max-w-full w-full mx-auto">
          {/* Header */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-slate-200">📝 Activités</h1>
            <div className="flex flex-wrap gap-3.5 items-center">
              {/* <input
                type="text"
                placeholder="Rechercher..."
                className="border border-gray-300 px-4 py-2 rounded-xl text-sm shadow-sm"
              /> */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Link key={filter?.value} href={`?filter=${filter?.value}`}
                    className={`px-3 py-1.5 rounded-full hover:bg-opacity-50 text-sm ${filterSlug === filter?.value ? 'bg-primary text-slate-50 dark:text-zinc-800' : 'border border-zinc-500 dark:border-zinc-400'}`}
                  >
                    {filter?.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Section Aujourd'hui */}
          <ActivitySection title={filters?.find(fl => fl.value === filterSlug)?.label as string} titleSize="xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActivityCard
                key={"purchase"}
                title="Bonus achat produits"
                description="Récompenses cumulées grâce à tes achats de produits."
                amount={data?.purchase_bonus}
              />
              <ActivityCard
                key={"matching"}
                title="Bonus d'équilibres"
                description="Bonus généré automatiquement grâce aux équilibres"
                amount={data?.matchings}
              />
              <ActivityCard
                key={"refferal"}
                title="Bonus de parrainage"
                description="Gains obtenus en invitant d'autres utilisateurs."
                amount={data?.referrals}
              />
            </div>
          </ActivitySection>

          <div className="flex flex-col sm:flex-row gap-7">
            {/* Section timeline */}
            {/* <div className="w-full sm:w-2/5 border-r">
              <ActivitySection title="Mes activités reçentes" titleSize="lg">
                <div className="relative border-l border-gray-200 pl-6 space-y-6 dark:border-gray-700">
                  <TimelineItem
                    title="Export des données"
                    user="Sarah M."
                    date="Lundi, 09:15"
                    status="Terminé"
                  />
                  <TimelineItem
                    title="Synchronisation API Amadeus"
                    user="Nelson"
                    date="Mercredi, 14:30"
                    status="Échec"
                  />
                  <TimelineItem
                    title="Vérification de paiement"
                    user="Admin"
                    date="Jeudi, 11:00"
                    status="En attente"
                  />
                </div>
              </ActivitySection>
            </div> */}


            <div className="w-full">
              <ActivityTable officeId={session?.user?.office?.id} filterSlug={filterSlug} />
            </div>
          </div>
        </div>
      </main>

    </ContentLayout>
  )
}


function ActivitySection({ title, titleSize, children }: {
  title: string,
  titleSize: "sm" | "base" | "lg" | "xl" | "2xl",
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <h2 className={`text-${titleSize} font-medium text-gray-700 dark:text-slate-200`}>{title}</h2>
      {children}
    </div>
  );
}

function ActivityCard({ title, description, amount }: {
  title: string,
  description: string,
  amount: string
}) {
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition dark:bg-zinc-800 border-gray-700">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-200">{title}</h3>
      <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{description}</div>
      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full bg-primary text-white dark:text-black `}>
        $ {amount}
      </span>
    </div>
  );
}

function TimelineItem({ title, user, date, status }: {
  title: string,
  user: string,
  date: string,
  status: string
}) {
  return (
    <div className="relative pl-4">
      <div className="absolute -left-1 top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
      <div className="text-sm text-gray-800 font-medium dark:text-slate-200">{title}</div>
      <div className="text-xs text-gray-500 dark:text-slate-400">{user} • {date}</div>
      <span className="text-xs inline-block mt-1 text-blue-600">{status}</span>
    </div>
  );
}
