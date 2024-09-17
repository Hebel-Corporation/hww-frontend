import { checkOfficeRegisterCodeValidity } from "@/actions/office-actions";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import RegisterBanner from "@/components/common/register-banner";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";

export default async function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session: SessionType = await getServerSession({ raw: false })
  const hasRegisterCodeValid = await checkOfficeRegisterCodeValidity({ officeId: session?.user?.office?.id })

  return <AdminPanelLayout>
    {children}
    {
      !hasRegisterCodeValid &&
      <RegisterBanner />
    }
  </AdminPanelLayout>;
}
