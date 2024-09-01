'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, DatePicker } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { uplinesVerificationIDs } from "@/actions/member-actions";
import { CalendarDate, DateValue, now, parseAbsoluteToLocal, parseDate } from "@internationalized/date";


const memberFormSchema = z.object({
  parrainID: z.string().min(2, {
    message: "Veillez entrer l'ID du parrain.",
  }),
  sponsorID: z.string().min(2, {
    message: "Veillez entrer l'ID du sponsor.",
  }),
  first_name: z.string().min(2, {
    message: "Entrer le prénom du membre.",
  }),
  last_name: z.string().min(2, {
    message: "Entrer le nom de famille du membre.",
  }),
  gender: z.string().min(1, {
    message: "Entrer le genre du membre.",
  }),
  birthday: z.date({
    required_error: "La date de naissance est requise.",
  }).refine(date => !isNaN(date.getTime()), {
    message: "La date de naissance n'est pas valide.",
  }),
  phone: z.string().min(2, {
    message: "Entrer le numéro de téléphone du membre.",
  }),
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


export default function AddMemberModal({
  children
}: {
  children: React.ReactNode
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [date, setDate] = useState<CalendarDate | undefined>(undefined);


  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      parrainID: "",
      sponsorID: "",
      first_name: "",
      last_name: "",
      gender: "",
      birthday: undefined,
      phone: "",
    },
  })


  async function onSubmit(values: z.infer<typeof memberFormSchema>) {
    form.reset()
    setDate(undefined)
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
      <Button onPress={onOpen} radius="sm">
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Ajout du membre</ModalHeader>
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
                              <Input {...field} isRequired type="text" radius="sm" size="sm" label="ID du parrain" />
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
                              <Input {...field} isRequired type="text" radius="sm" size="sm" label="ID du sponsor" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h1 className="text-sm font-light">Infos sur le membre</h1>
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired type="text" radius="sm" size="sm" label="Prénom" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired type="text" radius="sm" size="sm" label="Nom de famille" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select {...field} radius="sm" size="sm"
                                label="Genre"
                                className="w-full"
                              >
                                <SelectItem key={'F'}>
                                  Femme
                                </SelectItem>
                                <SelectItem key={'M'}>
                                  Homme
                                </SelectItem>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker {...field} isRequired showMonthAndYearPickers size="sm"
                                granularity="day"
                                value={date}
                                onChange={(value) => {
                                  setDate(value)
                                  form.setValue('birthday', new Date(value.toString()))
                                }}
                                label="Date de naissance"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired type="text" radius="sm" size="sm" label="Numéro de téléphone" />
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
                    Enregistrer
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
