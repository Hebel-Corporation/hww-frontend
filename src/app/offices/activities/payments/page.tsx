import { getOfficePayments } from "@/actions/office-actions";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import PaymentTable from "@/components/payment-table";
import PeriodicFilter from "@/components/common/periodic-filter";
import OfficeFilter from "@/components/common/office-filter";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { notFound } from "next/navigation";

const breadcrumbItems = [
  {
    label: "Accueil",
    path: "/offices/dashboard",
  },
  {
    label: "Activités",
    path: "/offices/activities",
  },
  {
    label: "Paiements",
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

export default async function ActivityPaymentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filterSlug = searchParams?.filter || "daily";
  const officeFilter = searchParams?.office || "all";
  const page = Number(searchParams?.page) || 1;

  breadcrumbItems[1].path = `/offices/activities?filter=${filterSlug}&office=${officeFilter}&page=${page}`;

  const session = (await getServerSession({
    raw: false,
  })) as SessionType | null;

  if (!session) notFound();
  const isHeadOffice = session?.user?.office?.office_type === "head_office";

  // Récupérer les données de paiements
  const paymentsData = await getOfficePayments({
    officeId: session?.user?.office?.id,
    filterSlug: filterSlug,
    officeFilter: officeFilter,
    page: page,
  });

  return (
    <ContentLayout
      breadcrumb={<CustomBreadcrumb breadcrumbItems={breadcrumbItems} />}
    >
      <main className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 gap-6 max-w-full w-full mx-auto">
          {/* Header */}
          <div className="flex flex-wrap gap-5 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-full shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-gray-800 dark:text-slate-200">
                    Paiements de {filters?.find((fl) => fl.value === filterSlug)?.label.toLowerCase()}
                </h1>
                <p className="text-gray-500 dark:text-slate-400 text-sm font-extralight">
                  Historique des paiements effectués
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3.5 items-center">
              <PeriodicFilter filters={filters} filterSlug={filterSlug} />
              {isHeadOffice && <OfficeFilter officeFilter={officeFilter} />}
            </div>
          </div>

          {/* Tableau des paiements */}
          <div className="flex flex-col flex-1">
            <PaymentTable
              payments={paymentsData?.results || []}
              page={page}
              pages={paymentsData?.total_pages || 1}
              forMember={false}
            />
          </div>
        </div>
      </main>
    </ContentLayout>
  );
}