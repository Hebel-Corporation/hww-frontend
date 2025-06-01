'use client'

import { SubscriptionCode } from "@/types";
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { View } from "lucide-react";
import EmptyData from "../common/empty-data";
import RegisterCodeModal from "./register-code-modal";



export default function SubscriptionCodeModal({
  officeId,
  registerCodes,
  validCodeNumber
}: { 
  officeId: string,
  registerCodes: SubscriptionCode[],
  validCodeNumber: number
 }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  

  return (
    <>
      <Button onPress={onOpen} radius="sm" variant='light' color='success' startContent={
        <View size={20} />
      }
      >
        {validCodeNumber} Code{validCodeNumber > 1 ? 's' : ''} d&apos;inscription valide
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size="3xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-3.5">Codes d&apos;enregistrement</ModalHeader>
              <ModalBody className="p-3.5">
                <div className="flex flex-col gap-5">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-3 py-3">
                            Package
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Codes générés
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Code déjà utilisés
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Montant
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Statut
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registerCodes?.map((code: SubscriptionCode) => (
                            <tr key={code?.id} className="bg-white border-b dark:bg-transparent dark:border-gray-700">
                              <th scope="row" className="px-3 py-2.5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {code?.package?.name} <span className="text-small font-extralight ml-2">(${code?.package?.price}/code)</span>
                              </th>
                              <td className="px-6 py-2.5">
                                {code?.reccords_number}
                              </td>
                              <td className="px-6 py-2.5">
                                {code?.used_reccords_number}
                              </td>
                              <td className="px-6 py-2.5">
                                ${code?.total_amount}
                              </td>
                              <td className="px-6 py-2.5">
                                {
                                  code?.is_valid ?
                                    <Chip variant="faded" size="sm" color="success">Valide</Chip>
                                    :
                                    <Chip variant="faded" size="sm" color="danger">Non valide</Chip>
                                }

                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                  {
                    registerCodes?.length <= 0 &&
                    <div className="flex flex-col h-40">
                      <EmptyData description="Aucun code d'enregistrement géréré pour le moment." />
                    </div>
                  }

                </div>
              </ModalBody>
              <ModalFooter className="w-full p-3.5">
                <RegisterCodeModal officeId={officeId} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
