"use client";

import { getOfficeActivities } from "@/actions/office-actions";
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import EmptyData from "./common/empty-data";
import GlobalLoader from "./common/global-loader";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentDrawer from "./modals/payment/payment-drawer";
import { useState } from "react";
import { getClientSession, hasOfficeAuthorization } from "@/utils/client-utils";
import { SessionType } from "@/types";

export function ActivityTable({
  officeId,
  filterObj,
  page,
  officeFilter,
}: {
  officeId: string;
  filterObj: any;
  page: number | undefined;
  officeFilter?: string;
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [
      "officeActivities",
      officeId,
      filterObj?.value,
      page,
      officeFilter,
    ],
    queryFn: () =>
      getOfficeActivities({
        officeId: officeId,
        filterSlug: filterObj?.value,
        activity_type: "DETAILS",
        page: page,
        officeFilter: officeFilter,
      }),
    enabled: !!officeId,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const handlePagination = ({ pageValue }: { pageValue: number }) => {
    params.set("page", String(pageValue));

    router.push(`?${params.toString()}`);
  };

  const openDrawer = (item: any) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedItem(null);
  };


  const session = getClientSession() as SessionType | null

  return (
    <div className="flex flex-col flex-1 justify-between">
      <Table
        isStriped
        aria-label="bonus records"
        shadow="none"
        radius="sm"
        isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "flex flex-col flex-1 min-h-[43dvh] p-0",
          thead: "rounded-sm",
        }}
      >
        <TableHeader>
          <TableColumn key="downline">Bénéficière</TableColumn>
          <TableColumn key="account" className="hidden sm:table-cell">
            Compte
          </TableColumn>
          <TableColumn key="office">Bureau</TableColumn>
          <TableColumn key="nbre_bonus_type" className="hidden sm:table-cell">
            Nbre des bonus / Type
          </TableColumn>
          <TableColumn key="amount">Montant</TableColumn>
          {
            hasOfficeAuthorization({
              authorizedOffices: ['head_office'], 
              userOffice: session?.user?.office
            }) ? (
              <TableColumn key="actions">Actions</TableColumn>
            ) : (
              <TableColumn key="actions"> </TableColumn>
            )
          }
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<GlobalLoader />}
          emptyContent={
            <EmptyData
              description={`Aucun bonus n'a été enregistré ${filterObj?.label}.`}
            />
          }
        >
          {data?.results?.map((item: any, i: any) => (
            <TableRow key={item?.grantee__id + i + item?.bonus_type}>
              <TableCell className="px-0 sm:px-3">
                <div className="flex flex-col gap-1">
                  <h1>
                    {item?.grantee__member__first_name}{" "}
                    {item?.grantee__member__last_name}
                  </h1>
                  <span className="block sm:hidden text-tiny font-extralight">
                    {item?.grantee__company_id}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text">
                {item?.grantee__company_id}
              </TableCell>
              <TableCell>
                {item?.office__name ||
                  `${item?.office__location__name} - ${item?.office__office_code}`}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Chip size="sm" variant="bordered">
                  {item?.count} {item?.bonus_type}
                </Chip>
              </TableCell>
              <TableCell>$ {item?.total_bonus}</TableCell>
              {hasOfficeAuthorization({
                authorizedOffices: ['head_office'],
                userOffice: session?.user?.office
              }) ? (
                <TableCell className="px-0 sm:px-3">
                  <Button size="sm" onPress={() => openDrawer(item)}>
                    Payer
                  </Button>
                </TableCell>
              ) : (
                <TableCell> </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data?.total_pages > 1 && (
        <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {data?.count > 0 && data?.results?.length > 0 ? (
              <>
                {(() => {
                  // Calculer les indices corrects basés sur la page actuelle
                  const currentPage = page || 1;
                  const pageSize = Math.ceil(data.count / data.total_pages);
                  const startItem = (currentPage - 1) * pageSize + 1;
                  const endItem = Math.min(currentPage * pageSize, data.count);

                  return `${startItem} à ${endItem}`;
                })()}{" "}
                <span className="text-xs text-gray-500 dark:text-slate-400">
                  sur {data?.count}
                </span>
              </>
            ) : (
              "Aucun résultat"
            )}
          </span>
          <Pagination
            page={page}
            total={data?.total_pages}
            onChange={(newPage) => handlePagination({ pageValue: newPage })}
            showControls
            showShadow
            color="primary"
            radius="sm"
            isCompact
          />
        </div>
      )}

      <PaymentDrawer
        isOpen={isDrawerOpen}
        onOpenChange={(open) => {
          if (!open) closeDrawer();
        }}
        item={selectedItem}
        periodFilter={filterObj?.value}
      />
    </div>
  );
}
