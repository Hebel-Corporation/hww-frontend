import { ContentLayout } from "@/components/admin-panel/content-layout";
import CommingSoon from "@/components/common/comming-soon";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { Rewards } from "./rewards";
import { Promotions } from "./promotions";
import { notFound } from "next/navigation";
import { getServerSession } from "@/utils/server-auth-utils";
import { SessionType } from "@/types";

const breadcrumbItems = [
  {
    label: "Accueil",
    path: "/offices/dashboard",
  },
  {
    label: "Récompenses",
    path: "",
  },
];

export default async function RewardsPage() {

  const session = (await getServerSession({
    raw: false,
  })) as SessionType | null;

  if (!session) notFound();

  return (
    <ContentLayout
      breadcrumb={<CustomBreadcrumb breadcrumbItems={breadcrumbItems} />}
    >
      <main className="flex flex-col flex-1 justify-center items-center">
        <Promotions officeId={session?.user?.office?.id}/>
        <Rewards officeId={session?.user?.office?.id}/>
        {/* <CommingSoon /> */}
      </main>
    </ContentLayout>
  );
}
