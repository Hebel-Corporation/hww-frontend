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
            <Table aria-label="Referral table" shadow='none' radius='sm'
                isHeaderSticky
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "min-h-[calc(100vh-45.5vh)] max-h-[calc(100vh-45.5vh)] p-0",
                    thead: 'rounded-sm'
                }}
                bottomContent={
                    pages > 0 ? (
                        <div className="flex w-full justify-center">
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
                            />
                        </div>
                    ) : null
                }
            >
                <TableHeader>
                    <TableColumn key="date">Date</TableColumn>
                    <TableColumn key="amount">Montant</TableColumn>
                    {/* <TableColumn key="status">Bonus</TableColumn> */}
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
                                    $ {item?.amount}
                                </TableCell>
                                {/* <TableCell>
                                    {
                                        item?.is_paid ?
                                            <Chip variant='faded' size='sm' color='danger'>Payé</Chip>
                                            :
                                            <Chip variant='faded' size='sm' color='success'>Non Payé</Chip>
                                    }
                                </TableCell> */}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default PaymentTable