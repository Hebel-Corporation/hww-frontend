'use client'

import React from 'react'
import EmptyData from '@/components/common/empty-data';
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

function PurchaseBonusTable({
    purchaseBonuses,
    page,
    pages
}: {
    purchaseBonuses: any[],
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
                    wrapper: "min-h-[calc(100vh-46vh)] max-h-[calc(100vh-46vh)] p-0",
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
                    <TableColumn key="downline">Downline</TableColumn>
                    <TableColumn key="account" className='hidden sm:table-cell'>ID du Compte</TableColumn>
                    <TableColumn key="date" className='hidden sm:table-cell'>Date d&apos;achat</TableColumn>
                    <TableColumn key="amount">Montant</TableColumn>
                    <TableColumn key="status">Statut</TableColumn>
                </TableHeader>
                <TableBody emptyContent={
                    <EmptyData description="Aucun bonus sur achat des produits n'est enregistrer pour le moment." />
                } >
                    {
                        purchaseBonuses?.map((item: any) => (
                            <TableRow key={item?.id}>
                                <TableCell className='px-0 sm:px-3'>
                                    <div className='flex flex-col gap-1'>
                                        <h1>{item?.sale_detail?.member_account?.member?.first_name} {item?.sale_detail?.member_account?.member?.last_name}</h1>
                                        <span className='block sm:hidden text-tiny font-extralight'>
                                            {item?.sale_detail?.member_account?.company_id}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className='hidden sm:table-cell'>
                                    {item?.sale_detail?.member_account?.company_id}
                                </TableCell>
                                <TableCell className='hidden sm:table-cell'>
                                    {item?.created_at}
                                </TableCell>
                                <TableCell>
                                    $ {item?.amount}
                                </TableCell>
                                <TableCell className='px-0 sm:px-3'>
                                    {
                                        item?.is_paid ?
                                            <Chip variant='faded' size='sm' color='danger'>Payé</Chip>
                                            :
                                            <Chip variant='faded' size='sm' color='success'>Non Payé</Chip>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default PurchaseBonusTable