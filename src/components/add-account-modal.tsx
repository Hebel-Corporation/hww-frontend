'use client'

import { createMemberAccount, uplinesVerificationIDs } from "@/actions/member-actions";
import { getClientSession } from "@/utils/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PackageItem from "./package-item";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";


const memberFormSchema = z.object({
  parrainId: z.string().min(2, {
    message: "Veillez entrer l'ID du compte parrain.",
  }),
  sponsorId: z.string().min(2, {
    message: "Veillez entrer l'ID du compte sponsor.",
  })
}).refine(async (data) => {
  const { isValid, path, message } = await uplinesVerificationIDs({
    parrainId: data.parrainId,
    sponsorId: data.sponsorId
  })
  if (!isValid) {
    throw new z.ZodError([
      {
        path: [path],
        message: message,
        code: z.ZodIssueCode.custom
      }
    ]);
  }
  return isValid;
});


export default function AddAccountModal({
  accounts,
  memberId
}: {
  accounts: string[],
  memberId: string
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)


  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      parrainId: "",
      sponsorId: ""
    },
  })


  async function onSubmit(values: z.infer<typeof memberFormSchema>) {
    setIsSubmitting(true)

    const session = await getClientSession()

    toast.promise(
      createMemberAccount({
        referral_account: values?.parrainId,
        sponsor_account: values?.sponsorId,
        memberId: memberId
      }, session?.user?.office?.id), {
      loading: 'Enregistrement en cours...',
      success: () => {
        onOpenChange()
        form.reset()
        return `Le compte a été ajouté avec succès !`;
      },
      error: (err: Error) => {
        return `${err?.message}`;
      },
      finally() {
        setIsSubmitting(false)
      },
    }
    )
  }


  return (
    <>
      <Button onPress={onOpen} radius="sm" color="primary"
        startContent={
          <PlusCircle />
        }
      >
        <span className="hidden sm:block">Ajouter un compte</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Ajout d'un nouveau compte au membre</ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out">
                  <div className="flex flex-col gap-5">
                    <PackageItem />
                    <div className="flex flex-col gap-2.5">
                      <h1 className="text-sm font-light">Infos sur les uplines</h1>
                      <FormField
                        control={form.control}
                        name="parrainId"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select {...field} radius="sm" size="sm"
                                label="Compte parrain"
                                description="Sellectionner le compte du membre qui parraine le nouveau compte."
                                className="w-full"
                              >
                                {
                                  accounts?.map(account => (
                                    <SelectItem key={account} value={account}>
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

                      <FormField
                        control={form.control}
                        name="sponsorId"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired type="text" radius="sm" size="sm"
                                label="ID du sponsor"
                                description="Saisissez l'ID du compte sponsor du nouveau compte."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" radius="sm" variant="light"
                    isDisabled={isSubmitting}
                    onPress={onClose}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" color="primary" radius="sm"
                    isLoading={isSubmitting} isDisabled={isSubmitting}
                  >
                    Créer le compte
                  </Button>
                </ModalFooter>
              </form>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
