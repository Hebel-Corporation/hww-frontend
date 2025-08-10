import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { notFound } from "next/navigation";
import QualifiedAccountsTable from "./qualified-accounts-table";

const breadcrumbItems = [
  {
    label: "Accueil",
    path: "/offices/dashboard",
  },
  {
    label: "Récompenses",
    path: "/offices/rewards",
  },
];

export default async function PromotionsDetails({
  params,
}: {
  params: { promotionId: string };
}) {
  const session = (await getServerSession({
    raw: false,
  })) as SessionType | null;

  if (!session) notFound();

  if (!breadcrumbItems.some((item) => item.label === params.promotionId)) {
    breadcrumbItems.push({
      label: params.promotionId,
      path: `/offices/rewards/promotions/${params.promotionId}`,
    });
  }

  return (
    <ContentLayout
      breadcrumb={<CustomBreadcrumb breadcrumbItems={breadcrumbItems} />}
    >
      <main className="flex flex-col flex-1">
        <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl">Qualifications</h1>
            <p className="text-sm text-gray-500 font-extralight max-w-2xl">
              Les comptes qualifiés sont les comptes qui ont atteint le niveau
              requis pour la promotion.
            </p>
          </div>

          <QualifiedAccountsTable promotionId={params.promotionId} officeId={session?.user?.office?.id} />
        </div>
      </main>
    </ContentLayout>
  );
}
