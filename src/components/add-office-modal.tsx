'use client'

import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';
import { getLocations } from "@/actions/location-actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, LocateIcon, MapPinIcon } from "lucide-react";
import { createOffice } from "@/actions/office-actions";
import { getUserApiGroups } from "@/actions/auth-actions";
import { UserGroup } from "@/types";
import { toCapitalize } from "@/utils/utils-fonctions";


const officeFormSchema = z.object({
  name: z.string().optional(),
  location: z.string().min(2, {
    message: "Veillez sellectioner l'emplacement.",
  }),

  username: z.string().min(2, {
    message: "Veillez saisir le nom d'utilisateur.",
  }),
  password: z.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
    .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(/[@$!%*?&]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
  confirmPassword: z.string().min(6, 'Le mot de passe de confirmation doit comporter au moins 6 caractères')
    .regex(/[A-Z]/, 'Le mot de passe de confirmation doit contenir au moins une lettre majuscule.')
    .regex(/[a-z]/, 'Le mot de passe de confirmation doit contenir au moins une lettre minuscule.')
    .regex(/\d/, 'Confirm Password must contain at least one digit')
    .regex(/[@$!%*?&]/, 'Confirm Password must contain at least one special character'),
  groups: z.string().min(1, {
    message: 'Veillez sellectionner au moins un group !'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ['confirmPassword'],
});

export default function AddOfficeModal({
  children
}: {
  children: React.ReactNode
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [locations, setLocations] = React.useState<{
    value: string,
    label: string
  }[]>([]);
  const [userGroups, setUserGroups] = React.useState<UserGroup[]>([]);
  const [isVisible, setIsVisible] = React.useState(false);


  const form = useForm<z.infer<typeof officeFormSchema>>({
    resolver: zodResolver(officeFormSchema),
    defaultValues: {
      name: "",
      location: "",
      username: "",
      password: "",
      confirmPassword: "",
      groups: ""
    },
  })

  const toggleVisibility = () => setIsVisible(!isVisible);


  async function onSubmit(values: z.infer<typeof officeFormSchema>) {

    const formData = {
      office: {
        name: values.name,
        location: values.location
      },
      staff: {
        username: values.username,
        password: values.password,
        groups: values.groups.split(',')
      }
    }

    setIsSubmitting(true)
    toast.promise(
      createOffice(formData), {
      loading: 'Enregistrement en cours...',
      success: (data) => {
        if (data) onOpenChange()
        form.reset()
        return `Bureau ajouté avec succès !`;
      },
      error: (err: Error) => {
        return `${err.message}`;
      },
      finally: () => {
        setIsSubmitting(false)
      }
    }
    )
  }

  useEffect(() => {

    async function fetchLocations() {
      const locationList = await getLocations()
      if (locationList?.length) {
        setLocations([...locationList.map((itm: any) => {
          return { value: itm.id, label: itm.name }
        })])
      }
    }

    async function fetchUserGroups() {
      const groupList = await getUserApiGroups()
      if (groupList?.length)
        setUserGroups([...groupList])
    }

    fetchLocations()
    fetchUserGroups()
  }, [])

  return (
    <>
      <Button onPress={onOpen} radius="sm">
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Ajout du point de vente</ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-sm font-light">Infos sur le bureau</h1>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} type="text" radius="sm" size="sm" label="Nom du bureau (optionnel)" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Autocomplete {...field} isRequired radius="sm" size="sm"
                                label="Emplacement"
                                description="Sellectionner l'endroit où se situe le bureau !"
                                startContent={
                                  <MapPinIcon size={18} />
                                }
                                onSelectionChange={(value) => {
                                  form.setValue('location', value as string || '')
                                }}
                              >
                                {locations.map((location: any) => (
                                  <AutocompleteItem key={location.value} value={location.value}>
                                    {location.label}
                                  </AutocompleteItem>
                                ))}
                              </Autocomplete>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h1 className="text-sm font-light">Infos sur l'utilisateur</h1>
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired autoComplete="" type="text" radius="sm" size="sm" aria-autocomplete="none" label="Nom d'utilisateur" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired radius="sm" size="sm" label="Mot de passe" aria-autocomplete="none"
                                endContent={
                                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                      <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                      <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                  </button>
                                }
                                type={isVisible ? "text" : "password"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired type="password" radius="sm" size="sm" label="Confimer le mot de passe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="groups"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>

                              <Select {...field} isRequired selectionMode="multiple" radius="sm" size="sm"
                                label="Groups d'utilisateur"
                                placeholder="Sellectionner un ou plus d'un group"
                              >
                                {userGroups.map((group: UserGroup) => (
                                  <SelectItem key={group.id}>
                                    {toCapitalize(group.name)}
                                  </SelectItem>
                                ))}
                              </Select>

                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button isDisabled={isSubmitting} color="danger" radius="sm" variant="light" onPress={onClose}>
                    Annuler
                  </Button>
                  <Button isDisabled={isSubmitting} isLoading={isSubmitting} type="submit" color="primary" radius="sm">
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
