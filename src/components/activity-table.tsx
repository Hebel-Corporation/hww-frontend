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

  return (
    <>
      <Table
        isStriped
        aria-label="bonus records"
        shadow="none"
        radius="sm"
        isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "min-h-[56dvh] max-h-[56dvh] p-0",
          thead: "rounded-sm",
        }}
        bottomContent={
          data?.total_pages > 0 ? (
            <div className="flex w-full justify-start">
              <Pagination
                radius="sm"
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={data?.total_pages}
                onChange={(newPage) => handlePagination({ pageValue: newPage })}
                className="p-2 -m-3"
              />
            </div>
          ) : null
        }
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
          <TableColumn key="status">Actions</TableColumn>
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
                {item?.grantee__office__name ||
                  `${item?.grantee__office__location__name} - ${item?.grantee__office__office_code}`}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Chip size="sm" variant="bordered">
                  {item?.count} {item?.bonus_type}
                </Chip>
              </TableCell>
              <TableCell>$ {item?.total_bonus}</TableCell>
              <TableCell className="px-0 sm:px-3">
                <Button size="sm" onPress={() => openDrawer(item)}>
                  Payer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaymentDrawer
        isOpen={isDrawerOpen}
        onOpenChange={(open) => {
          if (!open) closeDrawer();
        }}
        item={selectedItem}
        periodFilter={filterObj?.value}
      />
    </>
  );
}
