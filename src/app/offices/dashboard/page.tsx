
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { Award, BadgeCheck, TrendingUp, UsersRound } from "lucide-react";
import StaffDashboard from "./(inner-components)/staff-dashboard";
import MemberDashboard from "./(inner-components)/member-dashboard";


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: ''
  }
]

export default async function DashboardPage() {

  const session = await getServerSession({raw: false}) as SessionType | null

  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      {
        session?.user?.user_type === 'staff' ? 
        <StaffDashboard />
        : session?.user?.user_type === 'member' &&
        <MemberDashboard memberId={session?.user_id} />
      }

    </ContentLayout>
  );
}
