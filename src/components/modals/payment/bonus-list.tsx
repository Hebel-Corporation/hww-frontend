import React, { useEffect } from 'react'
import { Chip, Listbox, ListboxItem, Selection } from "@nextui-org/react";
import { MatchingType, PurchaseType, ReferralType } from '@/types';
import { DollarSign } from 'lucide-react';
import { formatDateTime } from '@/utils/utils-fonctions';

function BonusList({
  bonusType,
  items,
  setAmount,
  setBonuses
}: {
  bonusType: 'matching' | 'referral' | 'purchase',
  items: MatchingType[] | ReferralType[] | PurchaseType[],
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setBonuses: React.Dispatch<React.SetStateAction<string[]>>;
}) {

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([""]));

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
  

  return (
    <div className="flex flex-col gap-2">
      <Listbox
        aria-label="Multiple selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(value) => {
          if (totalAmount < 50 && bonusType === 'matching' /*&& Array.from(selectedKeys).includes(Array.from(value)[1])*/) {
            setSelectedKeys(value)
          } else if (bonusType !== 'matching') {
            setSelectedKeys(value)
          } else {
            console.log('Fillet de sécurité ateint !')
          }
        }}
        classNames={{
          base: "min-h-[calc(100vh-51.6vh)] max-h-[calc(100vh-51.6vh)] p-0"
        }}
      >
        {
          items?.map((item: MatchingType | ReferralType | PurchaseType) => (
            <ListboxItem key={item?.id}>
              <div className='flex gap-3 items-center justify-between'>
                <div className="flex flex-col gap-2">
                  <p>{formatDateTime(item?.created_at)}</p>
                </div>
                <Chip
                  startContent={<DollarSign size={18} />}
                  variant="faded"
                  color="success"
                >
                  {item?.amount}
                </Chip>
              </div>
            </ListboxItem>
          ))
        }
      </Listbox>
    </div>
  )
}

export default BonusList