'use client'

import { memberRegister, uplinesVerificationIDs } from "@/actions/member-actions";
import { getClientSession } from "@/utils/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDate } from "@internationalized/date";
import { Button, DatePicker, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { PlusCircle, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PackageItem from "./package-item";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";


const memberFormSchema = z.object({
  parrainId: z.string().min(2, {
    message: "Veillez entrer l'ID du parrain.",
  }),
  sponsorId: z.string().min(2, {
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
  phone: z.string().optional()
})

const refineMemberFormSchema = memberFormSchema.refine(async (data) => {
  const { isValid, path, message } = await uplinesVerificationIDs({
    parrainId: data.parrainId,
    sponsorId: data.sponsorId
  })

  console.log("VERIFICATIONS ======", isValid, path, message)

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


export default function AddMemberModal({ isFirstNode }: { isFirstNode: boolean }) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [date, setDate] = useState<CalendarDate | undefined>(undefined);



  const form = useForm<z.infer<typeof refineMemberFormSchema>>({
    resolver: zodResolver(isFirstNode ? memberFormSchema.omit({ parrainId: true, sponsorId: true }) : refineMemberFormSchema),
    defaultValues: {
      parrainId: "",
      sponsorId: "",
      first_name: "",
      last_name: "",
      gender: "",
      birthday: undefined,
      phone: "",
    },
  })


  async function onSubmit(values: z.infer<typeof refineMemberFormSchema>) {

    setIsSubmitting(true)

    const session = await getClientSession()

    let realValues: any = values

    if (isFirstNode) {
      const fieldsSchemaToBeValid = memberFormSchema.omit({ parrainId: true, sponsorId: true });
      const validationResult = fieldsSchemaToBeValid.safeParse(values);
      if (!validationResult.success) return

      realValues = validationResult.data
    }

    console.log("DATA ======", realValues)

    toast.promise(
      memberRegister({
        uplines: {
          referral_account: realValues?.parrainId || '',
          sponsor_account: realValues?.sponsorId || ''
        },
        member: {
          first_name: realValues.first_name,
          last_name: realValues.last_name,
          gender: realValues.gender,
          birthday: realValues.birthday,
          phone: realValues?.phone || ''
        }
      }, session?.user?.office?.id), {
      loading: 'Enregistrement en cours...',
      success: () => {
        onOpenChange()
        form.reset()
        setDate(undefined)
        return `Le membre a été ajouté avec succès !`;
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
      <Button onPress={onOpen} radius="sm" color="primary" startContent={
        <PlusCircle />
      } >
        Ajouter un membre
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="3xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Ajout du membre</ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="md:w-[37%] sm:w-[55%]">
                      <PackageItem />
                    </div>

                    <Divider orientation="vertical" />
                    
                    <div className="flex flex-col flex-1 gap-5">
                      {
                        !isFirstNode ? (
                          <div className="w-full flex gap-2 p-2.5 rounded-sm bg-yellow-50 text-yellow-500">
                            <TriangleAlert />
                            <span>Vous êtes au point d'enregistrer votre premier membre de la société !</span>
                          </div>
                        ) :
                          <div className="flex flex-col gap-2.5">

                            <h1 className="text-sm font-light">Infos sur les uplines</h1>
                            <FormField
                              control={form.control}
                              name="parrainId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} isRequired isDisabled={isSubmitting} type="text" radius="sm" size="sm" label="ID du parrain" />
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
                                    <Input {...field} isRequired isDisabled={isSubmitting} type="text" radius="sm" size="sm" label="ID du sponsor" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                          </div>
                      }
                      <div className="flex flex-col gap-2.5">
                        <h1 className="text-sm font-light">Infos sur le membre</h1>
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
