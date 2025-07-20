'use client'

import React, { useState } from 'react'
import EmptyData from '@/components/common/empty-data';
import { Button, Chip, Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils/utils-fonctions';
import AlertModal from './modals/alert-modal';
import { getClientSession } from '@/utils/client-utils';
import { toast } from 'sonner';
import { processPurchaseBonusPayment } from '@/actions/member-actions';
import GlobalLoader from './common/global-loader';

function PurchaseBonusTable({
    purchaseBonuses,
    page,
    pages,
    forPayment,
    heightSize,
    accountId,
    isLoading,
    onClose,
}: {
    purchaseBonuses: any[],
    page: number,
    pages: number,
    heightSize?: string,
    forPayment: boolean,
    accountId: string,
    isLoading: boolean,
    onClose?: null | (() => void)
}) {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState<number | null>(null)

    const router = useRouter()

    const totalBonus = purchaseBonuses?.length > 0 ? purchaseBonuses.reduce((total, bonus) => total + parseFloat(bonus.amount_to_be_paid), 0) : 0

    async function handlePurchaseSubmit() {
        setIsSubmitting(true)

        const session = await getClientSession()

        toast.promise(
            processPurchaseBonusPayment({
                account: accountId,
                amount: paymentAmount || 0,
            }, session.user.office.id), 
            {
                loading: 'Traitement du paiement en cours...',
                success: (data) => {
                    onClose?.()
                    return data.message;
                },
                error: (err) => {
                    return err.message || "Erreur lors du traitement du paiement";
                },
                finally() {
                    setIsSubmitting(false)
                    setShowAlert(false)
                },
            }
        )
    }


    return (
        <>
            <Table isStriped aria-label="Purchase Bonus table" shadow='none' radius='md'
                isHeaderSticky
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: `${heightSize} p-0`,
                    thead: 'rounded-md'
                }}
                bottomContent={
                    pages > 1 && !forPayment ? (
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
                    ) : 
                    forPayment ? (
                        <div className="flex flex-col flex-1 relative bottom-0 gap-3">
                            <div className="w-full flex gap-3 justify-between items-start">
                                <Input
                                    label="Montant à payer"
                                    type="number"
                                    size="md"
                                    radius="sm"
                                    min={5}
                                    max={totalBonus}
                                    description={`Le minimum de retrait est de 5$ et le maximum est de ${totalBonus} !`}
                                    className="w-full"
                                    step={0.01}
                                    value={paymentAmount?.toString()}
                                    isDisabled={isSubmitting || !totalBonus}
                                    onValueChange={
                                        (value) => {
                                            setPaymentAmount(typeof(value) == "string" ? parseFloat(value) : value)
                                        }
                                    }
                                />
                            </div>
                            <Button isDisabled={isSubmitting || !paymentAmount || paymentAmount <= 0} isLoading={isSubmitting}
                                size="md"
                                radius="sm"
                                variant="flat"
                                color="success"
                                onPress={() => {
                                    if (!paymentAmount || paymentAmount < 5 || paymentAmount > totalBonus) {
                                        toast.error("Montant invalide")
                                        return
                                    }
                                    setShowAlert(true)
                                }}
                            >
                                {isSubmitting ? 'Paiement en cours...' : 'Payer maintenant'}
                            </Button>
                            <Button
                                size="md"
                                radius="sm"
                                variant="flat"
                                color="danger"
                                onPress={onClose? onClose : undefined}
                            >
                                Quitter
                            </Button>
                        </div>
                    ) : null
                }
            >
                <TableHeader>
                    <TableColumn key="downline" className={`${forPayment ? 'hidden' : 'table-cell'}`}>Downline</TableColumn>
                    <TableColumn key="account" className={`${forPayment ? 'hidden' : 'hidden sm:table-cell'} `}>ID du Compte</TableColumn>
                    <TableColumn key="date" className='hidden sm:table-cell'>Date d&apos;achat</TableColumn>
                    <TableColumn key="amount">Montant du bonus</TableColumn>
                    <TableColumn key="amount_to_be_pay" className='text-yellow-500'>Montant restant à payer</TableColumn>
                    <TableColumn key="status" className={`${forPayment ? 'hidden' : 'table-cell'}`}>Statut</TableColumn>
                </TableHeader>
                <TableBody emptyContent={
                    <EmptyData description="Aucun bonus sur achat des produits n'est enregistrer pour le moment." />
                    }
                    isLoading={isLoading}
                    loadingContent={<GlobalLoader />}
                 >
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
                                            <Chip variant='faded' size='sm' color='success'>Payé</Chip>
                                            :
                                            <Chip variant='faded' size='sm' color='danger'>Non Payé</Chip>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            <AlertModal
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={handlePurchaseSubmit}
                title="Confirmation de paiement"
                description={`Êtes-vous sûr de vouloir effectuer le paiement de ${paymentAmount}$ ?`}
                loading={isSubmitting}
            />
        </>
    )
}

export default PurchaseBonusTable