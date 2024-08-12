
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/custom-breadcrumb";


const breadcrumbItems = [
  {
    label: 'Accueil',
    path: ''
  },
]

export default function DashboardPage() {
  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems}/>
    }>
      <h1>Content</h1>
    </ContentLayout>
  );
}
