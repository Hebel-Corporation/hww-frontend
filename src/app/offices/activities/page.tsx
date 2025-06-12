import { getOfficeActivities } from "@/actions/office-actions";
import { ActivityTable } from "@/components/activity-table";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import OfficeFilter from "@/components/common/office-filter";
import PeriodicFilter from "@/components/common/periodic-filter";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { Avatar, Badge, Chip } from "@heroui/react";
import { notFound } from "next/navigation";

import React from "react";

const breadcrumbItems = [
  {
    label: "Accueil",
    path: "/offices/dashboard",
  },
  {
    label: "Activités",
    path: "",
  },
];

const filters = [
  {
    label: "Aujourd'hui",
    value: "daily",
  },
  {
    label: "Cette semaine",
    value: "weekly",
  },
  {
    label: "Ce mois",
    value: "monthly",
  },
  {
    label: "Tous",
    value: "all",
  },
];

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filterSlug = searchParams?.filter || "daily";
  const officeFilter = searchParams?.office || "all";
  const page = searchParams?.page || 1;

  const session = (await getServerSession({
    raw: false,
  })) as SessionType | null;

  if (!session) notFound();
  const isHeadOffice = session?.user?.office?.office_type === "head_office";

  const data = await getOfficeActivities({
    officeId: session?.user?.office?.id,
    filterSlug: filterSlug,
    officeFilter: officeFilter,
    activity_type: "TOTALS",
  });

  return (
    <ContentLayout
      breadcrumb={<CustomBreadcrumb breadcrumbItems={breadcrumbItems} />}
    >
      <main className="flex flex-col flex-1 justify-center items-center">
        <div className="flex flex-col flex-1 gap-6 p-2 max-w-full w-full mx-auto">
          {/* Header */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-slate-200">
              📝 Activités
            </h1>
            <div className="flex flex-wrap gap-3.5 items-center">
              {/* <input
                type="text"
                placeholder="Rechercher..."
                className="border border-gray-300 px-4 py-2 rounded-xl text-sm shadow-sm"
              /> */}

              <PeriodicFilter filters={filters} filterSlug={filterSlug} />
            </div>
          </div>

          {/* Section Aujourd'hui */}
          <ActivitySection
            isHeadOffice={isHeadOffice}
            title={
              filters?.find((fl) => fl.value === filterSlug)?.label ||
              "Activités"
            }
            data={data?.balance}
            titleSize="xl"
            officeFilter={officeFilter}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <ActivityTable
                officeId={session?.user?.office?.id}
                filterObj={filters?.find((fl) => fl.value === filterSlug)}
                page={Number(page)}
                officeFilter={officeFilter}
              />
            </div>
          </div>
        </div>
      </main>
    </ContentLayout>
  );
}

function ActivitySection({
  title,
  titleSize,
  children,
  officeFilter,
  isHeadOffice,
  data,
}: {
  title: string;
  titleSize: "sm" | "base" | "lg" | "xl" | "2xl";
  children: React.ReactNode;
  officeFilter: string;
  isHeadOffice: boolean;
  data: {
    total_received: number;
    sold: number;
  };
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between">
        <h2
          className={`text-${titleSize} font-medium text-gray-700 dark:text-slate-200`}
        >
          {title}
        </h2>
        <div className="flex flex-wrap gap-3 my-2">
          <div className="flex gap-3">
            <Chip radius="sm" color="warning" variant="flat" className="py-5">
              Total reçu: $ {data?.total_received}
            </Chip>
            <Chip radius="sm" color="success" variant="flat" className="py-5">
              Solde: $ {data?.sold}
            </Chip>
          </div>
          {isHeadOffice && <OfficeFilter officeFilter={officeFilter} />}
        </div>
      </div>
      {children}
    </div>
  );
}

function ActivityCard({
  title,
  description,
  amount,
}: {
  title: string;
  description: string;
  amount: string;
}) {
  return (
    <div className="w-full bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition dark:bg-zinc-800 border-gray-700">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-200">
        {title}
      </h3>
      <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
        {description}
      </div>
      <div className="flex gap-2 mt-3">
        <Chip size="sm" radius="full" color="danger" variant="flat">
          Total à payer: $ {amount}
        </Chip>
      </div>
    </div>
  );
}

function TimelineItem({
  title,
  user,
  date,
  status,
}: {
  title: string;
  user: string;
  date: string;
  status: string;
}) {
  return (
    <div className="relative pl-4">
      <div className="absolute -left-1 top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
      <div className="text-sm text-gray-800 font-medium dark:text-slate-200">
        {title}
      </div>
      <div className="text-xs text-gray-500 dark:text-slate-400">
        {user} • {date}
      </div>
      <span className="text-xs inline-block mt-1 text-blue-600">{status}</span>
    </div>
  );
}
