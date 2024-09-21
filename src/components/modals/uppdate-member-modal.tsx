'use client'

import { memberUpdate } from "@/actions/member-actions";
import { getClientSession } from "@/utils/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { PenSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { format } from 'date-fns';


const memberFormSchema = z.object({
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
  phone: z.string().optional()
})


type MemberType = {
  id: string,
  first_name: string,
  last_name: string,
  gender: string,
  birthday: Date,
  phone: string
}


export default function UpdateMemberModal({ member }: { member: MemberType }) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [date, setDate] = useState<CalendarDate | undefined>(undefined);
  const [currentMember, setCurrentMember] = useState<MemberType>({...member})



  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      first_name: currentMember.first_name,
      last_name: currentMember.last_name,
      gender: currentMember.gender,
      birthday: currentMember.birthday,
      phone: currentMember.phone,
    },
  })

  useEffect(() => {
    if (currentMember?.birthday) {
      setDate(parseDate(format(currentMember.birthday, "yyyy-MM-dd")))
    }
  }, [])


  async function onSubmit(values: z.infer<typeof memberFormSchema>) {

    setIsSubmitting(true)
    const memberUpdateInstance = {
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      birthday: values.birthday,
      phone: values.phone || ''
    }

    setCurrentMember({
      ...memberUpdateInstance,
      id: currentMember.id
    })

    toast.promise(
      memberUpdate({
        ...memberUpdateInstance,
        birthday: new Date(memberUpdateInstance.birthday)
      }, currentMember?.id), {
      loading: 'Mise à jour en cours...',
      success: () => {
        onOpenChange()
        form.reset()
        setDate(undefined)
        return `Les infos ont été ajouté avec succès !`;
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
      <Button radius='sm' className='min-w-0 p-1.5'
        onClick={(event) => {
          event.stopPropagation();
        }}
        onPress={onOpen}
      >
        <PenSquare size={22} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1 p-3.5">
                  Mettre à jour les infos du membre
                </ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out p-3.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex flex-col flex-1 gap-5">
                      <div className="flex flex-col gap-2.5">
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} isRequired isDisabled={isSubmitting} type="text" radius="sm" size="sm" label="Prénom" />
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
                                <Input {...field} isRequired isDisabled={isSubmitting} type="text" radius="sm" size="sm" label="Nom de famille" />
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
                                <Select {...field} isDisabled={isSubmitting} radius="sm" size="sm"
                                  label="Genre"
                                  className="w-full"
                                  defaultSelectedKeys={currentMember.gender}
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
                                <DatePicker {...field} isRequired isDisabled={isSubmitting} showMonthAndYearPickers size="sm"
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
                                <Input {...field} isDisabled={isSubmitting} type="text" radius="sm" size="sm" label="Numéro de téléphone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
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
                    Mettre à jour
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
