
import AddMemberModal from "@/components/add-member-modal";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PageTitle from "@/components/common/page-title";
import SearchBar from "@/components/common/search-bar";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import MemberItem from "@/components/member-item";
import { Input } from "@/components/ui/input";
import { Button, Pagination, ScrollShadow } from "@nextui-org/react";
import { Filter, PlusCircle, Search } from "lucide-react";

const breadcrumbItems = [
  {
    label: 'Accueil',
    path: '/offices/dashboard'
  },
  {
    label: 'Membres',
    path: ''
  },
]

export default function MembersPage() {
  return (
    <ContentLayout breadcrumb={
      <CustomBreadcrumb breadcrumbItems={breadcrumbItems} />
    }>

      <div className="relative flex flex-col flex-1 gap-[19px]">

        <PageTitle
          title='Enregistrement des membres'
          description='Enregistrez les informations des membres de votre société.'
        />

        {/* 
          * Search section
         */}
        <div className="flex gap-3 flex-wrap justify-between items-center">
          <div className="sm:w-2/4 w-full flex items-center">
            <SearchBar />
          </div>
          <div className="flex gap-3 items-center">
            <AddMemberModal />
            <Button radius="sm" startContent={
              <Filter />
            }>Filtrer</Button>
          </div>
        </div>

        <ScrollShadow className="flex flex-col h-[calc(100vh-37vh)]">
          <MemberItem />
        </ScrollShadow>

        <Pagination showControls total={5} />
      </div>
    </ContentLayout>
  );
}
