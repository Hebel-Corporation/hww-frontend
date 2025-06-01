
'use client'

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Selection
} from "@heroui/react";
import { formatDateTime } from "@/utils/utils-fonctions";
import { getClientSession } from "@/utils/client-utils";
import { toast } from "sonner";
import { processPurchaseBonusPayment, registerMemberPayment } from "@/actions/member-actions";
import AlertModal from "../alert-modal";

export default function PaymentTable({
    items,
    heightSize,
    bonusType,
    accountId,
    onClose
}: {
    items: any[],
    heightSize?: string,
    bonusType: 'matching_bonus' | 'referral_bonus' | 'purchase_bonus',
    accountId: string,
    onClose: () => void
}) {

    const [amount, setAmount] = useState<number>(0)
    const [bonuses, setBonuses] = useState<string[]>([])
    const [selectError, setSelectError] = useState<string>(' ')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([""]));


    const totalAmount = React.useMemo(
        () => {
    
          const total = items?.length ? items
            .filter(obj => Array.from(selectedKeys).includes(obj.id))
            .reduce((sum, obj) => sum + Number(obj.amount), 0) : 0;
    
          return total
        },
        [selectedKeys]
    );
    
    
    useEffect(() => {
    setAmount(totalAmount)
    const idArray = Array.from(selectedKeys).filter(item => item !== "") as string[]
    setBonuses(idArray)
    }, [selectedKeys, totalAmount])


    
    async function handleSubmit() {

        setIsSubmitting(true)

        const session = await getClientSession()

        toast.promise(
            registerMemberPayment({
                account: accountId,
                payment_type: bonusType === 'matching_bonus'
                    ? 'matching_payment' : bonusType === 'referral_bonus'
                        ? 'referral_payment' : bonusType === 'purchase_bonus' ? 'purchase_payment' : '',
                amount: amount,
                bonuses: bonuses
            }, session?.user?.office?.id), {
            loading: 'Paiement en cours...',
            success: () => {
                onClose()
                return `Paiement éffecué avec succès !`;
            },
            error: () => {
                return `Erreur lors du paiement`;
            },
            finally() {
                setIsSubmitting(false)
            },
        }
        )
    }


  return (
    <>
      <Table shadow='none' radius='md'
        aria-label="Bonus table"
        color="success"
        defaultSelectedKeys={[]}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        bottomContentPlacement="outside"
        isStriped
        isHeaderSticky
        classNames={{
            wrapper: `w-full ${heightSize} p-0 shadow-none`,
            thead: 'rounded-sm',
            base: 'gap-0'
        }}
        
        bottomContent={
            <div className="flex flex-col flex-1 relative bottom-0 gap-3">
                <div className="mb-2 flex flex-col gap-1">
                    <h1 className="text-xl font-semibold">
                        Total : {totalAmount} $ 
                    </h1>
                    <p className="text-xs text-red-500">{selectError || ''}</p>
                </div>
                <Button isDisabled={isSubmitting || amount <= 0} isLoading={isSubmitting} 
                    size="md"
                    radius="sm"
                    variant="flat"
                    color="success"
                    onPress={() => setShowAlert(true)}
                >
                    {isSubmitting ? 'Paiement en cours...' : 'Payer maintenant'}
                </Button>
                <Button
                    size="md"
                    radius="sm"
                    variant="flat"
                    color="danger"
                    onPress={onClose}
                >
                    Quitter
                </Button>
            </div>
        }

        onSelectionChange={(value) => {
            if (totalAmount < 50 && bonusType === 'matching_bonus' /*&& Array.from(selectedKeys).includes(Array.from(value)[1])*/) {
                setSelectedKeys(value)
                setSelectError(' ')
              } else if (bonusType !== 'matching_bonus') {
                setSelectedKeys(value)
                setSelectError(' ')
              } else {
                setSelectError('Le fillet de sécurité de 50$ a été atteint !')
              }
        }}
        >
        <TableHeader >
          <TableColumn>Date</TableColumn>
          <TableColumn>Montant</TableColumn>
          <TableColumn>Statut</TableColumn>
        </TableHeader>
        <TableBody className="flex flex-col flex-1 h-grow">
          {items?.map((item: any) => (
            <TableRow key={item?.id}>
            <TableCell>{formatDateTime(item?.created_at)}</TableCell>
            <TableCell>{item?.amount}</TableCell>
            <TableCell className={item?.is_paid ? 'text-green-500' : 'text-red-400'}>
                {item?.is_paid ? 'Payé' : 'Non Payé'}
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>

    <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleSubmit}
        title="Confirmation de paiement"
        description={`Êtes-vous sûr de vouloir effectuer le paiement de ${amount}$ ?`}
        loading={isSubmitting}
    />
</>
  );
}

