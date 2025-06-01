'use client';


import { getMemberAccountBonus } from "@/actions/member-actions";
import { formatDateTime } from "@/utils/utils-fonctions";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { useEffect, useState } from "react";
import PaymentTable from "./payment-table";
import PurchaseBonusTable from "@/components/purchase-bonus-table";

export default function PaymentDrawer({ isOpen, onOpenChange, item }: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: any;
}) {

  const [bonusItems, setBonusItems] = useState<any>([])

  const fetchDetails = async () => {        
    if (item) {

        const bonusData = await getMemberAccountBonus({
            accountId: item?.grantee__id,
            page: 1,
            limit: 20,
            search: '',
            is_paid: false,
            bonusType: item?.bonus_type_code,
            periodFilter: 'all'
          })
          setBonusItems(bonusData?.results)
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [item]);

  return (
    <Drawer
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col">
              Paiement {item?.bonus_type}
              <h1 className="text-[14px] font-light capitalize text-zinc-600">
                {item?.grantee__member__first_name} {item?.grantee__member__last_name}
              </h1>
            </DrawerHeader>
            <DrawerBody className="p-0 h-grow gap-0">
                <div className="flex flex-col gap-0 flex-1">
                    {
                        item?.bonus_type_code === 'purchase_bonus' ?
                            <div className="px-3">
                              <PurchaseBonusTable 
                                  purchaseBonuses={bonusItems} 
                                  page={1} 
                                  pages={1} 
                                  forPayment={true} 
                                  heightSize="min-h-[calc(100dvh-35dvh)] max-h-[calc(100dvh-35dvh)]"
                                  onClose={onClose}
                                  accountId={item?.grantee__id}
                              />
                            </div>
                        :
                        <div className="px-3">
                          <PaymentTable 
                              items={bonusItems} 
                              onClose={onClose} 
                              bonusType={item?.bonus_type_code} 
                              accountId={item?.grantee__id}
                              heightSize="min-h-[calc(100dvh-30.5dvh)] max-h-[calc(100dvh-30.5dvh)]"
                          />
                        </div>
                    }
                </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
