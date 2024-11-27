'use client'

import { MatchingType, ReferralType } from "@/types";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import BonusList from "./bonus-list";
import { useState } from "react";
import { registerMemberPayment } from "@/actions/member-actions";
import { toast } from "sonner";
import { getClientSession } from "@/utils/client-utils";


function PaymentModal({ currentTab, bonusItems, accountId }:
    {
        currentTab: string,
        bonusItems: MatchingType[] | ReferralType[],
        accountId: string
    }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)
    const [bonuses, setBonuses] = useState<string[]>([])

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
            label: "Bonus sur achat",
            content: ""
        }
    ];

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

    if (currentpath.endsWith('payments')) {
        return (
            <>
                < Button radius='sm' className="min-w-max" onPress={onOpen} > Enregistrer un payement</Button >
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" isDismissable={false} scrollBehavior="inside">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Payements</ModalHeader>
                                <ModalBody>
                                    <div className="flex w-full flex-col">
                                        <Tabs disabledKeys={["purchase"]} selectedKey={currentTab} aria-label="Payment tabs" items={tabs}>
                                            {(item) => (
                                                <Tab key={item.id} title={item.label} href={`?tab=${item.id}`}>
                                                    {item.content}
                                                </Tab>
                                            )}
                                        </Tabs>
                                    </div>
                                </ModalBody>
                                <ModalFooter className="flex gap-3 justify-between items-center">
                                    <p className="text-small text-default-500">Montant total a payer : $ {amount}</p>
                                    <div className="flex gap-3 items-center">
                                        <Button color="danger" radius="sm" variant="light" isDisabled={isSubmitting} onPress={onClose}>
                                            Annuler
                                        </Button>
                                        <Button color="primary" radius="sm" isDisabled={isSubmitting || amount <= 0} isLoading={isSubmitting} onPress={handleSubmit}>
                                            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        )
    } else {
        return <></>
    }
}


export default PaymentModal