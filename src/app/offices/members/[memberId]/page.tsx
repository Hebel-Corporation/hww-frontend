import {
  getMemberAccountNetwork,
  getMemberDettails,
} from "@/actions/member-actions";
import { checkOfficeRegisterCodeValidity } from "@/actions/office-actions";
import AccountCardItem from "@/components/account-card-item";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import EmptyData from "@/components/common/empty-data";
import NetworkPvsDisplay from "@/components/common/network-pvs-display";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import AddAccountModal from "@/components/modals/add-account-modal";
import AddMemberModal from "@/components/modals/add-member-modal";
import PurchaseBonusModal from "@/components/modals/add-purchase-bonus";
import NetworkNodeItem from "@/components/network-node-item";
import HasOfficePermission from "@/components/wrappers/auth/has-office-permission";
import { constantVars } from "@/lib/constants";
import { SessionType } from "@/types";
import { getServerSession } from "@/utils/server-auth-utils";
import { getInitialChar, toCapitalize } from "@/utils/utils-fonctions";
import { Avatar, ScrollShadow } from "@heroui/react";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const MemberDetails = async ({
  params,
  searchParams,
}: {
  params: { memberId: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = (await getServerSession({
    raw: false,
  })) as SessionType | null;
  const hasRegisterCodeValid = await checkOfficeRegisterCodeValidity({
    officeId: session?.user?.office?.id as string,
  });

  const currentAccountId = searchParams.account ?? "";
  const memberId = params.memberId;
  const member = await getMemberDettails({ memberId: memberId });
  if (!member) notFound();
  if (!currentAccountId) redirect(`?account=${member?.accounts[0].id}`);

  const page = Number(searchParams?.page) || constantVars.INIT_PAGINATION_PAGE;
  const limit = Number(searchParams?.limit) || constantVars.LIMIT_PAGINATION;
  const search = searchParams?.search || "";

  const network = await getMemberAccountNetwork({
    accountId: currentAccountId,
  });

  const breadcrumbItems = [
    {
      label: "Accueil",
      path: "/offices/dashboard",
    },
    {
      label: "Membres",
      path: "/offices/members",
    },
    {
      label: `${member?.first_name} ${member?.last_name}`,
      path: "",
    },
  ];

  return (
    <ContentLayout
      breadcrumb={<CustomBreadcrumb breadcrumbItems={breadcrumbItems} />}
    >
      <main className="flex flex-col flex-1 gap-3 sm:pb-0 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-3 items-center">
              <Avatar
                size="lg"
                fallback={
                  <>
                    {getInitialChar({
                      first_name: member?.first_name,
                      last_name: member?.last_name,
                    })}
                  </>
                }
              />
              <div>
                <h1 className="text-lg font-normal">
                  {member?.first_name} {member?.last_name}
                </h1>
                <span className="font-extralight text-small">
                  ID: {member?.company_id}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <HasOfficePermission offices={["sub_office"]}>
                <>
                  <PurchaseBonusModal
                    accounts={member?.accounts?.map((acc: any) => {
                      return acc.company_id;
                    })}
                  />
                  <AddAccountModal
                    memberId={member?.id}
                    accounts={member?.accounts?.map((acc: any) => {
                      return acc.company_id;
                    })}
                    referralAccounts={member?.accounts}
                    hasRegisterCodeValid={hasRegisterCodeValid}
                  />
                </>
              </HasOfficePermission>
            </div>
          </div>

          <ScrollShadow
            orientation="horizontal"
            className="flex flex-1 py-2 gap-6 items-center"
          >
            {member?.accounts?.map((account: any) => (
              <AccountCardItem
                key={account?.id}
                accountId={account?.id}
                currentAccountId={currentAccountId}
                companyId={account?.company_id}
                ownerFullName={`${member?.first_name} ${member?.last_name}`}
                downlineCount={account?.downline_count}
                accountBalance={account?.balance}
                pvs={account?.pvs}
              />
            ))}
          </ScrollShadow>
        </div>

        <div className="flex flex-col flex-1 gap-3">
          <div className="flex gap-2.5 flex-wrap justify-between items-center">
            <h1>Réseau</h1>
            <div className="max-w-max flex flex-wrap gap-3 justify-between items-center">
              <Link
                href={`/offices/members/${memberId}/${currentAccountId}`}
                className="flex flex-1 gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded-md text-sm duration-500 items-center px-2 sm:px-4 py-2"
              >
                <EyeIcon />
                <p className="max-w-max truncate">Détails du compte</p>
              </Link>

              {/* <Button radius="sm" variant='flat' color='warning'
                                className="!p-0 !min-w-0 h-max"
                            >
                                <a href={`/offices/members/${memberId}/${currentAccountId}`}
                                    className="flex flex-1 gap-2 items-center px-4 py-2">
                                    <EyeIcon />
                                    <span>Détails du compte</span>
                                </a>
                            </Button> */}
              <HasOfficePermission offices={["sub_office"]}>
                <AddMemberModal
                  isFirstNode={false}
                  hasRegisterCodeValid={hasRegisterCodeValid}
                  referralAccounts={member?.accounts}
                />
              </HasOfficePermission>
            </div>
          </div>

          {/* Member network */}
          <div className="flex flex-col sm:flex-row flex-1 gap-5 pb-4 justify-between overflow-x-auto">
            <div className="flex flex-col flex-1 gap-5 border rounded-lg p-4 md:p-7 bg-zinc-100 dark:bg-zinc-800">
              <h2 className="border-b pb-2">Parrents</h2>
              <NetworkNodeItem account={network?.referral} tag="Parrain" />
              <NetworkNodeItem account={network?.sponsor} tag="Sponsor" />
            </div>
            <div className="flex flex-col flex-1 gap-5 md:gap-8 border rounded-lg p-4 md:p-7 bg-zinc-100 dark:bg-zinc-800">
              <div className="flex flex-col gap-2">
                <h2 className="border-b pb-2">Enfants direct</h2>
                {network?.children?.length > 0 ? (
                  network?.children?.map((downline: any) => (
                    <NetworkNodeItem
                      key={downline.id}
                      account={downline}
                      tag={toCapitalize(downline?.position)}
                    />
                  ))
                ) : (
                  <EmptyData description="Aucun enfant direct enregistrer pour le momnent !" />
                )}
              </div>

              {network?.children?.length > 0 && (
                <NetworkPvsDisplay
                  accountId={currentAccountId}
                  mode="DISPLAY"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </ContentLayout>
  );
};

export default MemberDetails;
