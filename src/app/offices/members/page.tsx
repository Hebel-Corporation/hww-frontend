
import { getMembers } from "@/actions/member-actions";
import AddMemberModal from "@/components/add-member-modal";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import EmptyData from "@/components/common/empty-data";
import PageTitle from "@/components/common/page-title";
import SearchBar from "@/components/common/search-bar";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import MemberItem from "@/components/member-item";
import { Button, Pagination, ScrollShadow } from "@nextui-org/react";
import { Filter } from "lucide-react";

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

export default async function MembersPage() {

  const members = await getMembers()

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
            <AddMemberModal isFirstNode={members?.length > 0 ? true : false} />
            <Button radius="sm" startContent={
              <Filter />
            }>Filtrer</Button>
          </div>
        </div>

        <ScrollShadow className="flex flex-col flex-1 h-[calc(100vh-37vh)]">
          {
            members?.length ?
              <div className='flex flex-col'>
                {
                  members?.map((member: any) => (
                    <MemberItem member={member} />
                  ))
                }
              </div>
              :
              <EmptyData description='Aucun membre enregistrer pour le moment.' />
          }
        </ScrollShadow>

        <Pagination showControls total={5} />
      </div>
    </ContentLayout>
  );
}
