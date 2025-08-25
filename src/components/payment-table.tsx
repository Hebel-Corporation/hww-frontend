"use client";

import React from "react";
import EmptyData from "@/components/common/empty-data";
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateTime } from "@/utils/utils-fonctions";

function PaymentTable({
  payments,
  page,
  pages,
  forMember,
}: {
  payments: any[];
  page: number;
  pages: number;
  forMember: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const columns = [
    <TableColumn key="date">Date</TableColumn>,
    ...(!forMember ? [<TableColumn key="member">Membre</TableColumn>] : []),
    <TableColumn key="office" className="hidden sm:table-cell">
      Bureau Charger du Paiement
    </TableColumn>,
    <TableColumn key="amount">Montant</TableColumn>,
    <TableColumn key="paymentType">Type de Paiement</TableColumn>,
  ];

  return (
    <div className="flex flex-col flex-1 justify-between">
      <Table
        isStriped
        aria-label="Referral table"
        shadow="none"
        radius="sm"
        isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "min-h-[63dvh] max-h-[63dvh] sm:max-h-dvh p-0",
          thead: "rounded-sm",
        }}
      >
        <TableHeader>{columns}</TableHeader>
        <TableBody
          emptyContent={
            <EmptyData description="Aucune transaction n'est enregistrer pour le moment." />
          }
        >
          {payments?.map((item: any) => {
            const cells = [
              <TableCell key="date">
                {formatDateTime(item?.created_at)}
              </TableCell>,
            ];

            if (!forMember) {
              cells.push(
                <TableCell key="member">
                  <div>
                    <p className="text-sm">
                      {item?.account?.member?.first_name}{" "}
                      {item?.account?.member?.last_name}
                    </p>
                    <p className="text-xs font-extralight text-zinc-500">
                      ID: {item?.account?.company_id}
                    </p>
                  </div>
                </TableCell>
              );
            }

            cells.push(
              <TableCell key="office" className="hidden sm:table-cell">
                <div>
                  <p> {item?.office?.name ? item?.office?.name +" - " : ""} {item?.office?.location?.name}</p>
                  <p className="text-xs font-extralight text-zinc-500">
                    ID: {item?.office?.office_code}
                  </p>
                </div>
              </TableCell>,
              <TableCell key="amount">$ {item?.amount}</TableCell>,
              <TableCell key="paymentType">
                {item?.payment_type_display}
              </TableCell>
            );

            return <TableRow key={item?.id}>{cells}</TableRow>;
          })}
        </TableBody>
      </Table>

      {pages > 1 ? (
        <div className="flex w-full justify-start">
          <Pagination
            radius="sm"
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(newPage) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", newPage.toString());
              router.push(`?${params.toString()}`);
            }}
            className="p-2 -m-3"
          />
        </div>
      ) : null}
    </div>
  );
}

export default PaymentTable;
