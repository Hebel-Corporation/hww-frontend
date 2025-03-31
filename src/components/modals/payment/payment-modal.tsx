'use client'

import { MatchingType, ReferralType, PurchaseType } from "@/types";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import BonusList from "./bonus-list";
import { useEffect, useState } from "react";
import { processPurchaseBonusPayment, registerMemberPayment } from "@/actions/member-actions";
import { toast } from "sonner";
import { getClientSession } from "@/utils/client-utils";
import { Plus } from "lucide-react";
import PurchaseBonusTable from "@/components/purchase-bonus-table";
import AlertModal from "../alert-modal";

function PaymentModal({ currentTab, bonusItems, accountId, forPurchase }:
    {
        currentTab: string,
        bonusItems: MatchingType[] | ReferralType[] | PurchaseType[],
        accountId: string,
        forPurchase: boolean
    }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)
    const [bonuses, setBonuses] = useState<string[]>([])
    const [totalBonus, setTotalBonus] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState<string>("")

    const currentpath = usePathname()

    let tabs = [
        {
            id: "referral",
            label: "Parrainages",
            content: <BonusList bonusType="referral"
                items={bonusItems}
                setAmount={setAmount}
                setBonuses={setBonuses}
            />
        },
        {
            id: "matching",
            label: "Equilibres",
            content: <BonusList bonusType="matching"
                items={bonusItems}
                setAmount={setAmount}
                setBonuses={setBonuses}
            />
        },
        {
            id: "purchase",
            label: "Bonus sur achat produits",
            content: <PurchaseBonusTable purchaseBonuses={bonusItems} page={1} pages={1} forPayment={true} />
            // <BonusList bonusType="purchase"
            //     items={bonusItems}
            //     setAmount={setAmount}
            //     setBonuses={setBonuses}
            // />
        }
    ];

    async function handlePurchaseSubmit() {
        setIsSubmitting(true)
        const session = await getClientSession()

        toast.promise(
            processPurchaseBonusPayment({
                account: accountId,
                amount: parseFloat(paymentAmount)
            }, session.user.office.id), 
            {
                loading: 'Traitement du paiement en cours...',
                success: (data) => {
                    onOpenChange()
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

    async function handleSubmit() {

        setIsSubmitting(true)

        const session = await getClientSession()

        toast.promise(
            registerMemberPayment({
                account: accountId,
                payment_type: currentTab === 'matching'
                    ? 'matching_payment' : currentTab === 'referral'
                        ? 'referral_payment' : currentTab === 'purchase' ? 'purchase_payment' : '',
                amount: amount,
                bonuses: bonuses
            }, session?.user?.office?.id), {
            loading: 'Paiement en cours...',
            success: () => {
                onOpenChange()
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

    useEffect(() => {
        if (bonusItems && currentTab === 'purchase') {
            const total = bonusItems.reduce((sum, bonus) => sum + (bonus?.amount_to_be_paid ?? 0), 0)
            setTotalBonus(total)
        }
    }, [bonusItems])

    if (currentpath.endsWith('payments')) {
        return (
            <>
                <Button radius='sm' size="sm" variant="flat" className="min-w-max" onPress={onOpen}
                    startContent={
                        <Plus size={18} />
                    }>
                    Enregistrer un payement
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" isDismissable={false} shouldBlockScroll>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 px-2.5 sm:px-5">Payements</ModalHeader>
                                <ModalBody className="px-2.5 sm:px-5">
                                    <div className="flex w-full flex-col">
                                        <Tabs selectedKey={currentTab} aria-label="Payment tabs" items={tabs}
                                            classNames={{
                                                panel: "overflow-y-auto p-0 py-4"
                                            }}
                                        >
                                            {(item) => (
                                                <Tab key={item.id} title={item.label} href={`?tab=${item.id}`}>
                                                    {item.content}
                                                </Tab>
                                            )}
                                        </Tabs>
                                    </div>
                                </ModalBody>
                                {
                                    forPurchase ?
                                        <div className="flex gap-3 justify-between items-start px-3 sm:px-5 pb-3 sm:pb-5">
                                            <Input
                                                label="Montant à payer"
                                                type="number"
                                                size="md"
                                                radius="sm"
                                                min={5}
                                                max={totalBonus}
                                                description={`Le minimum de retrait est de 5$ et le maximum est le total de tous les bonus d'achat produit !`}
                                                className="w-[70%]"
                                                value={paymentAmount}
                                                onValueChange={setPaymentAmount}
                                            />
                                            <Button
                                                size="md"
                                                radius="sm"
                                                className="flex-1 !h-14"
                                                isDisabled={isSubmitting || parseFloat(paymentAmount) <= 0} isLoading={isSubmitting}
                                                onPress={() => {
                                                    if (!paymentAmount || parseFloat(paymentAmount) < 5 || parseFloat(paymentAmount) > totalBonus) {
                                                        toast.error("Montant invalide")
                                                        return
                                                    }
                                                    setShowAlert(true)
                                                }}
                                            >
                                                Payer
                                            </Button>
                                        </div>
                                        :
                                        <ModalFooter className="flex gap-3 justify-between items-center">
                                            <p className="text-small text-default-500">Montant total a payer : $ {amount}</p>
                                            <div className="flex gap-3 items-center">
                                                <Button color="danger" radius="sm" variant="light" isDisabled={isSubmitting} onPress={onClose}>
                                                    Annuler
                                                </Button>
                                                <Button color="primary" radius="sm" isDisabled={isSubmitting || amount <= 0} isLoading={isSubmitting} onPress={() => setShowAlert(true)}>
                                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                                                </Button>
                                            </div>
                                        </ModalFooter>
                                }
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <AlertModal
                    isOpen={showAlert}
                    onClose={() => setShowAlert(false)}
                    onConfirm={forPurchase ? handlePurchaseSubmit : handleSubmit}
                    title="Confirmation de paiement"
                    description={forPurchase ? `Êtes-vous sûr de vouloir effectuer le paiement de ${paymentAmount}$ ?` : `Êtes-vous sûr de vouloir effectuer le paiement de ${amount}$ ?`}
                    loading={isSubmitting}
                />
            </>
        )
    } else {
        return <></>
    }
}


export default PaymentModal