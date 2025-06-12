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
import { useQuery } from "@tanstack/react-query";

export default function PaymentDrawer({ isOpen, onOpenChange, item, periodFilter }: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: any;
  periodFilter: 'all' | 'daily' | 'weekly' | 'monthly';
}) {
  

  const { data: bonusItems, error, isLoading, isError } = useQuery({  
      queryKey: ['bonusItems', item?.grantee__id, periodFilter],
      queryFn: () => getMemberAccountBonus({
        accountId: item?.grantee__id,
        officeCode: item?.office__office_code,
        page: 1,
        limit: 20,
        search: '',
        is_paid: false,
        bonusType: item?.bonus_type_code,
        periodFilter: periodFilter
      }),
      enabled: !!item?.grantee__id
  })



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
                                  purchaseBonuses={bonusItems?.results} 
                                  isLoading={isLoading}
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
                              items={bonusItems?.results} 
                              isLoading={isLoading}
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
