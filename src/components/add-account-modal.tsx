'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, DatePicker } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';
import { ChevronRight, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { uplinesVerificationIDs } from "@/actions/member-actions";


const memberFormSchema = z.object({
  parrainID: z.string().min(2, {
    message: "Veillez entrer l'ID du parrain.",
  }),
  sponsorID: z.string().min(2, {
    message: "Veillez entrer l'ID du sponsor.",
  })
})

// .refine(async (data) => {
//   const { isValid, path, message } = await uplinesVerificationIDs({
//     parrainID: data.parrainID,
//     sponsorID: data.sponsorID
//   })
//   if (!isValid) {
//     throw new z.ZodError([
//       {
//         path: [path],
//         message: message,
//         code: z.ZodIssueCode.custom
//       }
//     ]);
//   }
//   return isValid;
// });


export default function AddAccountModal() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)


  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      parrainID: "",
      sponsorID: ""
    },
  })


  async function onSubmit(values: z.infer<typeof memberFormSchema>) {
    form.reset()
    onOpenChange()
    // setIsSubmitting(true)
    // toast.promise(
    //   CreateLocation({name: values.name, countryID: values.country}), {
    //     loading: 'Enregistrement en cours...',
    //     success: () => {
    //       onOpenChange()
    //       form.reset()
    //       return `Emplacement ajouté avec succès !`;
    //     },
    //     error: () => {
    //       return `Erreur d'enregistrement`;
    //     },
    //     finally() {
    //       setIsSubmitting(false)
    //     },
    //   }
    // )
  }


  return (
    <>
      <Button onPress={onOpen} radius="sm"
        startContent={
          <PlusCircle />
        }
      >
        Ajouter un compte
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Ajout d'un nouveau compte au membre</ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5">
                      <h1 className="text-sm font-light">Infos sur les uplines</h1>
                      <FormField
                        control={form.control}
                        name="parrainID"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select {...field} radius="sm" size="sm"
                                label="Compte parrain"
                                description="Sellectionner le compte du membre qui parraine le nouveau compte."
                                className="w-full"
                              >
                                <SelectItem key={'ACCOUNT-0001'}>
                                  ACCOUNT-0001
                                </SelectItem>
                                <SelectItem key={'ACCOUNT-0002'}>
                                  ACCOUNT-0002
                                </SelectItem>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sponsorID"
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
