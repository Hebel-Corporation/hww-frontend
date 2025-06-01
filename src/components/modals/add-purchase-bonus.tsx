'use client'

import { getClientSession } from "@/utils/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { registerMemberPurchase } from "@/actions/member-actions";


const purchaseFormSchema = z.object({
    accountID: z.string().min(1, {
        message: "L'ID du compte est requis.",
    }),
    amount: z.string().min(1, {
        message: "Le montant d'achat est requis.",
    })
})


function PurchaseBonusModal({ accounts }: { accounts: string[] }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


    const form = useForm<z.infer<typeof purchaseFormSchema>>({
        resolver: zodResolver(purchaseFormSchema),
        defaultValues: {
            accountID: "",
            amount: ""
        },
    })



    async function onSubmit(values: z.infer<typeof purchaseFormSchema>) {

        setIsSubmitting(true)

        const session = await getClientSession()

        toast.promise(
            registerMemberPurchase({
                    accountID: values?.accountID,
                    amount: Number(values?.amount)
                  }, session?.user?.office?.id), {
            loading: 'Enregistrement en cours...',
            success: () => {
                onOpenChange()
                form.reset()
                return `L'achat a été ajouté avec succès !`;
            },
            error: (err: Error) => {
                return `${err?.message}`;
            },
            finally() {
                setIsSubmitting(false)
            },
        })

    }

    useEffect(() => {
        return () => {
            form.reset()
        }
    }, [])


    return (
        <>
            < Button radius='sm' size="md" variant="flat" className="min-w-max" onPress={onOpen}
                startContent={
                    <Plus size={18} />
                }>
                Enregistrer un bonus achat produit
            </Button >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" isDismissable={false} shouldBlockScroll>
                <ModalContent>
                    {(onClose) => (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <ModalHeader className="flex flex-col gap-1 p-5">Achat produit</ModalHeader>
                                <ModalBody className="transition duration-500 ease-in-out p-5">
                                    <div className="flex flex-col gap-2.5">
                                        <FormField
                                            control={form.control}
                                            name="accountID"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select {...field} isDisabled={isSubmitting} radius="sm" size="sm"
                                                            label="Compte"
                                                            className="w-full"
                                                        >
                                                            {
                                                                accounts?.map((account: string) => (
                                                                    <SelectItem key={account}>
                                                                        {account}
                                                                    </SelectItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <h1 className="text-sm font-light mt-3">Montant total des produits achetés</h1>
                                        <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} isRequired isDisabled={isSubmitting}
                                                            type="number"
                                                            radius="sm"
                                                            size="sm"
                                                            label="Montant"
                                                            min={1}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter className="p-3.5">
                                    <Button color="danger" radius="sm" variant="light"
                                        isDisabled={isSubmitting}
                                        onPress={onClose}
                                    >
                                        Annuler
                                    </Button>
                                    <Button type="submit" color="primary" radius="sm"
                                        isLoading={isSubmitting} isDisabled={isSubmitting}
                                    >
                                        Enregistrer
                                    </Button>
                                </ModalFooter>
                            </form>
                        </Form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

}


export default PurchaseBonusModal