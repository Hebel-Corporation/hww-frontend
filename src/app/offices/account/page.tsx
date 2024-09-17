
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CommingSoon from "@/components/common/comming-soon";
import CustomBreadcrumb from "@/components/custom-breadcrumb";


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Mon compte',
    path: ''
  }
]

export default function AccountPage() {
  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <main className="flex flex-col flex-1 justify-center items-center">
        <CommingSoon />
      </main>

    </ContentLayout>
  );
}
