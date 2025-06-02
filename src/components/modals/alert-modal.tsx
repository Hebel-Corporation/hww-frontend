'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"
import { AlertTriangle } from "lucide-react"

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => Promise<void>
    title: string
    description: string
    confirmText?: string
    loading?: boolean
}

const AlertModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Oui, Confirmer",
    loading = false
}: AlertModalProps) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size="sm"
            placement="center"
            backdrop="blur"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-danger" size={24} />
                        {title}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <p>{description}</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={onClose}
                        disabled={loading}
                    >
                        Non, Annuler
                    </Button>
                    <Button
                        color="danger"
                        onPress={async () => await onConfirm()}
                        isLoading={loading}
                    >
                        {confirmText}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AlertModal
