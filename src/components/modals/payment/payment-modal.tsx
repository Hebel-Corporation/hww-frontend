'use client'

import PurchaseBonusTable from "@/components/purchase-bonus-table";
import { MatchingType, PurchaseType, ReferralType } from "@/types";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { usePathname } from 'next/navigation';
import PaymentTable from "./payment-table";

function PaymentModal({ currentTab, bonusItems, accountId }:
    {
        currentTab: string,
        bonusItems: MatchingType[] | ReferralType[] | PurchaseType[],
        accountId: string,
    }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const currentpath = usePathname()
    

    let tabs = [
        {
            id: "referral",
            label: "Parrainages",
            content: <PaymentTable 
                        items={bonusItems} 
                        onClose={onOpenChange} 
                        bonusType='referral_bonus' 
                        accountId={accountId}
                        heightSize="min-h-[calc(100dvh-48dvh)] max-h-[calc(100dvh-48dvh)]"
                    />
            
        },
        {
            id: "matching",
            label: "Equilibres",
            content: <PaymentTable 
                        items={bonusItems} 
                        onClose={onOpenChange} 
                        bonusType='matching_bonus' 
                        accountId={accountId}
                        heightSize="min-h-[calc(100dvh-48dvh)] max-h-[calc(100dvh-48dvh)]"
                    />
            
        },
        {
            id: "purchase",
            label: "Bonus sur achat produits",
                content: <PurchaseBonusTable 
                purchaseBonuses={bonusItems} 
                page={1} 
                pages={1} 
                forPayment={true} 
                onClose={onOpenChange} 
                heightSize="min-h-[calc(100dvh-54.6dvh)] max-h-[calc(100dvh-54.6dvh)]"
                accountId={accountId}
            />
        }
    ];


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
                                <ModalBody>
                                    <div className="flex w-full flex-col">
                                        <Tabs selectedKey={currentTab} aria-label="Payment tabs" items={tabs}
                                            classNames={{
                                                panel: "overflow-y-auto p-0 py-4",
                                                tabContent: "px-2.5 sm:px-5",
                                                tabList: "px-2 sm:px-3",
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