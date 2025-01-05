'use client'

import React from 'react'
import EmptyData from '@/components/common/empty-data';
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

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
                    wrapper: "min-h-[calc(100vh-48.5vh)] max-h-[calc(100vh-48.5vh)] p-0",
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
                    <TableColumn key="office">Bureau Charger du Paiement</TableColumn>
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
                                    {item?.created_at}
                                </TableCell>
                                <TableCell>
                                    {item?.office?.office_code}
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