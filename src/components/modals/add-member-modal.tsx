'use client'

import { getMemberAccountSponsors, memberRegister, uplinesVerificationIDs } from "@/actions/member-actions";
import { getClientSession } from "@/utils/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDate, CalendarDateTime, ZonedDateTime } from "@internationalized/date";
import { Autocomplete, AutocompleteItem, Avatar, Button, Chip, DatePicker, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { PlusCircle, TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PackageItem from "../package-item";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { AccountType } from "@/types";
import { getInitialChar } from "@/utils/utils-fonctions";


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
  }).optional(),
  phone: z.string().optional()
})

const refineMemberFormSchema = memberFormSchema.refine(async (data) => {
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


export default function AddMemberModal({
  isFirstNode,
  hasRegisterCodeValid,
  referralAccounts
}: {
  isFirstNode: boolean,
  hasRegisterCodeValid: boolean,
  referralAccounts: AccountType[]
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isFetchingSponsors, setIsFetchingSponsors] = React.useState(false)
  const [referralID, setReferralID] = React.useState<string | undefined>('')
  const [sponsorAccounts, setSponsorAccounts] = React.useState<{ id: string, full_name: string, company_id: string, descendant_count: number }[]>([])
  const [date, setDate] = useState<any>(null);



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
          birthday: realValues.birthday || null,
          phone: realValues?.phone || ''
        }
      }, session?.user?.office?.id), {
      loading: 'Enregistrement en cours...',
      success: () => {
        onOpenChange()
        form.reset()
        setDate(null)
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

  useEffect(() => {

    async function getSponsors() {
      setIsFetchingSponsors(true)
      const sponsors = await getMemberAccountSponsors({ accountId: referralID || '' })
      setSponsorAccounts(sponsors)
      setIsFetchingSponsors(false)
    }

    if (referralID) {
      getSponsors()
    } else {
      setSponsorAccounts([])
    }

  }, [referralID])


  return (
    <>
      <Button onPress={onOpen} isDisabled={!hasRegisterCodeValid} radius="sm" color="primary" startContent={
        <PlusCircle />
      } >
        Ajouter un membre
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="3xl" scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1 p-3.5">Ajout du membre</ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out p-3.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="md:w-[37%] sm:w-[55%]">
                      <PackageItem />
                    </div>

                    <Divider orientation="vertical" />

                    <div className="flex flex-col flex-1 gap-5">
                      {
                        isFirstNode ? (
                          <div className="w-full flex gap-2 p-2.5 rounded-sm bg-yellow-50 text-yellow-500">
                            <TriangleAlert />
                            <span>Vous êtes au point d&apos;enregistrer votre premier membre de la société !</span>
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
                                    <Select {...field} isDisabled={isSubmitting} radius="sm" size="sm"
                                      label="ID du parrain"
                                      className="w-full"
                                      onChange={(e) => {
                                        const value = e.target.value
                                        form.setValue("sponsorId", '')
                                        form.setValue("parrainId", value)
                                        if (!value) setSponsorAccounts([])
                                        setReferralID(referralAccounts?.find(acc => acc?.company_id === value)?.id)

                                      }}
                                    >
                                      {
                                        referralAccounts?.map((account: AccountType) => (
                                          <SelectItem key={account.company_id}>
                                            {account.company_id}
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
                                    <Autocomplete {...field} className="w-full" label="ID du sponsor" radius="sm" size="sm"
                                      isDisabled={isSubmitting || sponsorAccounts?.length === 0}
                                      isLoading={isFetchingSponsors}
                                      onSelectionChange={(value) => {
                                        if (value) {
                                          form.setValue("sponsorId", value?.toString())
                                        } else {
                                          form.setValue("sponsorId", '')
                                        }
                                      }}
                                    >
                                      {sponsorAccounts.map((account) => (
                                        <AutocompleteItem key={account.company_id} textValue={account.company_id}>
                                          <div className="w-full flex gap-3 items-center">
                                            <Avatar alt={account.full_name} className="flex-shrink-0" size="sm" fallback={
                                              <>{getInitialChar({ first_name: account.full_name.split('')[0], last_name: account.full_name.split('')[1] })}</>
                                            } />
                                            <div className="w-full flex gap-2 py-1 justify-between items-center">
                                              <div className="flex flex-col">
                                                <span className="text-tiny">{account.full_name}</span>
                                                <span className="text-small text-default-400">{account.company_id}</span>
                                              </div>
                                              <Chip size="sm">{account.descendant_count} downline</Chip>
                                            </div>
                                          </div>
                                        </AutocompleteItem>
                                      ))}
                                    </Autocomplete>
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
                                <DatePicker {...field} isDisabled={isSubmitting} showMonthAndYearPickers size="sm"
                                  granularity="day"
                                  value={date}
                                  onChange={(value) => {
                                    setDate(value)
                                    form.setValue('birthday', value ? new Date(value.toString()) : undefined)
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
