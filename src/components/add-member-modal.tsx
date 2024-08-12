'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';
import { ChevronRight } from "lucide-react";

export default function AddMemberModal({
  children
}: {
  children: React.ReactNode
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [refferalID, setRefferalID] = useState<String>('')
  const [sponsorID, setSponsorID] = useState<String>('')

  useEffect(() => {

    return () => {
      setRefferalID('')
      setSponsorID('')
    }
  }, [])


  return (
    <>
      <Button onPress={onOpen} radius="sm">
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ajout du membre</ModalHeader>
              <ModalBody className="transition duration-400 ease-in-out">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-sm font-light">Infos sur les uplines</h1>
                    <Input type="text" radius="sm" size="sm" label="ID du parrain" />
                    <Input type="text" radius="sm" size="sm" label="ID du sponsor" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-sm font-light">Infos sur membre</h1>
                    <Input type="text" radius="sm" size="sm" label="Prénom" />
                    <Input type="text" radius="sm" size="sm" label="Nom de famille" />
                    <Input type="text" radius="sm" size="sm" label="Genre" />
                    <Input type="text" radius="sm" size="sm" label="Date de naissance" />
                    <Input type="text" radius="sm" size="sm" label="Numéro de téléphone" />
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
