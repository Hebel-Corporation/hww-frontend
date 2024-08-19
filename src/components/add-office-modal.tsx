'use client'

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';

export default function AddOfficeModal({
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
              <ModalHeader className="flex flex-col gap-1">Ajout du point de vente</ModalHeader>
              <ModalBody className="transition duration-400 ease-in-out">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-sm font-light">Infos sur le bureau</h1>
                    <Input type="text" radius="sm" size="sm" label="Nom du bureau" />
                    <Input type="text" radius="sm" size="sm" label="Emplacement" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-sm font-light">Infos sur l'utilisateur</h1>
                    <Input type="text" radius="sm" size="sm" label="Nom d'utilisateur" />
                    <Input type="text" radius="sm" size="sm" label="Mot de passe" />
                    <Input type="text" radius="sm" size="sm" label="Confimer le mot de passe" />
                    <Input type="text" radius="sm" size="sm" label="Groupes d'utilisateur" />
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
