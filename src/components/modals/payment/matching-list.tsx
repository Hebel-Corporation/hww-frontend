import React, { useEffect } from 'react'
import { Chip, Listbox, ListboxItem, Selection } from "@nextui-org/react";
import { MatchingType } from '@/types';
import { DollarSign } from 'lucide-react';

function MatchingList({
  matchings,
  setAmount,
  setBonuses
}: {
  matchings: MatchingType[],
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setBonuses: React.Dispatch<React.SetStateAction<string[]>>;
}) {

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([""]));

  const totalAmount = React.useMemo(
    () => {

      const total = matchings?.length ? matchings
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
          if (totalAmount < 16 /*&& Array.from(selectedKeys).includes(Array.from(value)[1])*/) {
            setSelectedKeys(value)
          } else {
            console.log('Fillet de sécurité ateint !')
          }
        }}
        classNames={{
          base: "min-h-[calc(100vh-50vh)] max-h-[calc(100vh-50vh)] p-0"
        }}
      >
        {
          matchings?.map((item: MatchingType) => (
            <ListboxItem key={item?.id}>
              <div className='flex gap-3 items-center justify-between'>
                <p>{item?.created_at}</p>
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
      <p className="text-small text-default-500">Montant total a payer : $ {totalAmount}</p>
    </div>
  )
}

export default MatchingList