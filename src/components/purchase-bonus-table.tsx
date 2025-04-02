'use client'

import React from 'react'
import EmptyData from '@/components/common/empty-data';
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils/utils-fonctions';

function PurchaseBonusTable({
    purchaseBonuses,
    page,
    pages,
    forPayment
}: {
    purchaseBonuses: any[],
    page: number,
    pages: number,
    forPayment: boolean
}) {

    const router = useRouter()

    return (
        <>
            <Table isStriped aria-label="Purchase Bonus table" shadow='none' radius='sm'
                isHeaderSticky
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: `${forPayment ? 'min-h-[calc(100dvh-56dvh)] max-h-[calc(100dvh-56dvh)]' : 'min-h-[calc(100dvh-46dvh)] max-h-[calc(100dvh-46dvh)]'} p-0`,
                    thead: 'rounded-sm'
                }}
                bottomContent={
                    pages > 0 && !forPayment ? (
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
                    <TableColumn key="downline" className={`${forPayment ? 'hidden' : 'table-cell'}`}>Downline</TableColumn>
                    <TableColumn key="account" className={`${forPayment ? 'hidden' : 'hidden sm:table-cell'} `}>ID du Compte</TableColumn>
                    <TableColumn key="date" className='hidden sm:table-cell'>Date d&apos;achat</TableColumn>
                    <TableColumn key="amount">Montant</TableColumn>
                    <TableColumn key="amount_to_be_pay" className='text-yellow-500'>Montant restant à payer</TableColumn>
                    <TableColumn key="status" className={`${forPayment ? 'hidden' : 'table-cell'}`}>Statut</TableColumn>
                </TableHeader>
                <TableBody emptyContent={
                    <EmptyData description="Aucun bonus sur achat des produits n'est enregistrer pour le moment." />
                } >
                    {
                        purchaseBonuses?.map((item: any) => (
                            <TableRow key={item?.id}>
                                <TableCell className={`${forPayment ? 'hidden' : 'table-cell'} px-0 sm:px-3`}>
                                    <div className='flex flex-col gap-1'>
                                        <h1>{item?.sale_detail?.member_account?.member?.first_name} {item?.sale_detail?.member_account?.member?.last_name}</h1>
                                        <span className='block sm:hidden text-tiny font-extralight'>
                                            {item?.sale_detail?.member_account?.company_id}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className={`${forPayment ? 'hidden' : 'hidden sm:table-cell'} `}>
                                    {item?.sale_detail?.member_account?.company_id}
                                </TableCell>
                                <TableCell className='hidden sm:table-cell'>
                                    {formatDateTime(item?.created_at)}
                                </TableCell>
                                <TableCell>
                                    $ {item?.amount}
                                </TableCell>
                                <TableCell className='text-yellow-500'>
                                    $ {item?.amount_to_be_paid}
                                </TableCell>
                                <TableCell className={`${forPayment ? 'hidden' : 'table-cell'} px-0 sm:px-3`}>
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