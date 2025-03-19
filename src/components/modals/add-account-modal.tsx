'use client'

import { createMemberAccount, getMemberAccountSponsors, uplinesVerificationIDs } from "@/actions/member-actions";
import { getClientSession } from "@/utils/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem, Avatar, Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PackageItem from "../package-item";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { AccountType } from "@/types";
import { getInitialChar } from "@/utils/utils-fonctions";


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
  memberId,
  referralAccounts,
  hasRegisterCodeValid
}: {
  accounts: string[],
  memberId: string,
  referralAccounts: AccountType[],
  hasRegisterCodeValid: boolean
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isFetchingSponsors, setIsFetchingSponsors] = React.useState(false)
  const [referralID, setReferralID] = React.useState<string | undefined>('')
  const [sponsorAccounts, setSponsorAccounts] = React.useState<{ id: string, full_name: string, company_id: string, descendant_count: number }[]>([])


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
      <Button onPress={onOpen} isDisabled={!hasRegisterCodeValid} radius="sm" color="primary"
        variant="ghost"
        startContent={
          <PlusCircle />
        }
        className="!min-w-0"
      >
        <span className="">Ajouter un compte</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Ajout d&apos;un nouveau compte au membre</ModalHeader>
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
                                    <div className="w-full flex gap-2 items-center">
                                      <Avatar alt={account.full_name} className="flex-shrink-0" size="sm" fallback={
                                        <>{getInitialChar({ first_name: account.full_name.split('')[0], last_name: account.full_name.split('')[1] })}</>
                                      } />
                                      <div className="w-full flex gap-2 justify-between items-center">
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
