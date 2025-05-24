'use client'

import React from 'react'
import EmptyData from '@/components/common/empty-data';
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils/utils-fonctions';

function PaymentTable({
    payments,
    page,
    pages
}: {
    payments: any[],
    page: number,
    pages: number
}) {

    const router = useRouter()

    return (
        <>
            <Table isStriped aria-label="Referral table" shadow='none' radius='sm'
                isHeaderSticky
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "min-h-[63dvh] max-h-[63dvh] p-0",
                    thead: 'rounded-sm'
                }}
                bottomContent={
                    pages > 0 ? (
                        <div className="flex w-full justify-start">
                            <Pagination radius='sm'
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(newPage) => {
                                    router.push(`?page=${newPage}`)
                                }}
                                className='p-2 -m-3'
                            />
                        </div>
                    ) : null
                }
            >
                <TableHeader>
                    <TableColumn key="date">Date</TableColumn>
                    <TableColumn key="office" className='hidden sm:table-cell'>Bureau Charger du Paiement</TableColumn>
                    <TableColumn key="amount">Montant</TableColumn>
                    <TableColumn key="paymentType">Type de Paiement</TableColumn>
                </TableHeader>
                <TableBody emptyContent={
                    <EmptyData description="Aucune transaction n'est enregistrer pour le moment." />
                } >
                    {
                        payments?.map((item: any) => (
                            <TableRow key={item?.id}>
                                <TableCell>
                                    {formatDateTime(item?.created_at)}
                                </TableCell>
                                <TableCell className='hidden sm:table-cell'>
                                    {item?.office?.office_code} ({item?.office?.location?.name})
                                </TableCell>
                                <TableCell>
                                    $ {item?.amount}
                                </TableCell>
                                <TableCell>
                                    {item?.payment_type_display}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default PaymentTable