'use client'

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';

export default function AddLocationModal({
  children
}: {
  children: React.ReactNode
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm">
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajout d'un emplacement</ModalHeader>
              <ModalBody className="transition duration-400 ease-in-out">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-sm font-light">Infos sur l'emplacement</h1>
                    <Input type="text" radius="sm" size="sm" label="Nom de l'emplacement" />
                    <Input type="text" radius="sm" size="sm" label="Province" />
                    <Input type="text" radius="sm" size="sm" label="Pays" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" radius="sm" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <Button color="primary" radius="sm" onPress={onClose}>
                  Enregistrer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
