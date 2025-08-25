import { getOfficeActivities } from "@/actions/office-actions";
import { ActivityTable } from "@/components/activity-table";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import OfficeFilter from "@/components/common/office-filter";
import PeriodicFilter from "@/components/common/periodic-filter";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { Avatar, Badge, Chip, Divider, Link } from "@heroui/react";
import { ArrowRightIcon } from "lucide-react";
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
        <div className="flex flex-col flex-1 gap-6 max-w-full w-full mx-auto">
          {/* Header */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h1 className="text-2xl  text-gray-800 dark:text-slate-200">
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
              filterSlug !== "all"
                ? `Bonus à Payer ${
                    filters?.find((fl) => fl.value === filterSlug)?.label || ""
                  }`
                : "Total des bonus à Payer"
            }
            subtitle="Récapitulatif des commissions"
            data={data?.balance}
            titleSize="xl"
            officeFilter={officeFilter}
          >
            <div className="w-full space-y-4">
              {/* Bonus Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 md:space-y-0 space-y-4">
                {/* Achats Produits */}
                <div className="w-full group relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-200/50 dark:border-blue-800/30 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className=" text-gray-800 dark:text-gray-200 text-sm">
                          Bonus à payer
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Commissions cumulées
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-left">
                      <Chip color="warning" variant="flat" size="sm">Achat Produit: $ {data?.purchase_bonus.toLocaleString()}</Chip>
                      <Chip color="warning" variant="flat" size="sm">Équilibre: $ {data?.matchings.toLocaleString()}</Chip>
                      <Chip color="warning" variant="flat" size="sm">Parrainage: $ {data?.referrals.toLocaleString()}</Chip>
                    </div>
                  </div>
                </div>

                <div className="w-full col-span-2 flex flex-wrap gap-7 items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border  rounded-2xl p-5">
                  <div className="flex flex-1 items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-base opacity-90">Bonus Total</h4>
                      <p className="text-sm opacity-75">À verser aux membres</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl text-blue-500">
                        ${" "}
                        {(
                          (data?.purchase_bonus || 0) +
                          (data?.matchings || 0) +
                          (data?.referrals || 0)
                        ).toLocaleString()}
                      </span>
                      <div className="text-sm text-blue-400 opacity-75 mt-1">
                        Total des bonus
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-1 w-full sm:h-14 bg-gray-600 border"></div>
                  <div className="flex flex-1 items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-base opacity-90">Montant déjà Payé</h4>
                      <Link
                        href={`/offices/activities/payments?filter=${filterSlug}&office=${officeFilter}&page=${page}`}
                        className="text-sm opacity-75 bg-gray-200 hover:underline dark:bg-gray-800 px-2 py-1 rounded-md"
                      >
                        Voir les paiements
                        <ArrowRightIcon className="inline ml-1" size={18} />
                      </Link>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl text-red-500">
                        $ {data?.total_payment.toLocaleString()}
                      </span>
                      <div className="text-sm text-red-400 opacity-75 mt-1">
                        Total des bonus
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ActivitySection>

          <div className="flex flex-1 flex-col sm:flex-row gap-7">
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

            <div className="flex flex-col flex-1 w-full">
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
  subtitle,
  titleSize,
  children,
  officeFilter,
  isHeadOffice,
  data,
}: {
  title: string;
  subtitle: string;
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
        <div className="flex items-center gap-3">
          <div>
            <h2
              className={`text-${titleSize} text-gray-700 dark:text-slate-200`}
            >
              {title}
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm font-extralight">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 my-2">
          <div className="flex gap-3">
            <Chip radius="sm" color="warning" variant="flat" className="py-5">
              Total reçu: $ {data?.total_received.toLocaleString()}
            </Chip>
            <Chip radius="sm" color="success" variant="flat" className="py-5">
              Solde: $ {data?.sold.toLocaleString()}
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
      <h3 className="text-sm text-gray-800 dark:text-slate-200">{title}</h3>
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
      <div className="text-sm text-gray-800 dark:text-slate-200">{title}</div>
      <div className="text-xs text-gray-500 dark:text-slate-400">
        {user} • {date}
      </div>
      <span className="text-xs inline-block mt-1 text-blue-600">{status}</span>
    </div>
  );
}
