import React, { ReactNode } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@heroui/react";

export default function DeleteAlert({
    children,
    message,
    onConfirm
} : {
    children: ReactNode,
    message: string,
    onConfirm: () => void
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="light" size="md" className="flex max-w-max min-w-min px-0 rounded-md border h-9 text-darkGray dark:text-darkGray-foreground">
        {children}
      </Button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-darkGray darK:text-lightGray-foreground">Suppression</ModalHeader>
              <ModalBody>
                <p className="text-center text-sm font-light text-darkGray"> 
                  {message}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" size="sm" onPress={onClose} className="rounded-md font-light">
                  Fermer
                </Button>
                <Button color="primary" size="sm" onPress={() => {
                    onConfirm()
                    onClose()
                }} className="rounded-md font-light">
                  Oui, supprimer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
