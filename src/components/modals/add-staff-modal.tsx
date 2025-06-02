'use client'

import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@heroui/react";
import { useDisclosure } from '@heroui/react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, PlusCircle } from "lucide-react";
import { createOfficeStaff } from "@/actions/office-actions";
import { getUserApiGroups } from "@/actions/auth-actions";
import { UserGroup } from "@/types";
import { toCapitalize } from "@/utils/utils-fonctions";


const officeFormSchema = z.object({
  first_name: z.string().min(2, {
    message: "Le prénom est réquis",
  }),
  last_name: z.string().min(2, {
    message: "Le nom de famille est réquis",
  }),
  gender: z.string().min(1, {
    message: "Le genre du staff est réquis",
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

export default function AddStaffModal({officeID}:{officeID: string}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [userGroups, setUserGroups] = React.useState<UserGroup[]>([]);
  const [isVisible, setIsVisible] = React.useState(false);


  const form = useForm<z.infer<typeof officeFormSchema>>({
    resolver: zodResolver(officeFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      username: "",
      password: "",
      confirmPassword: "",
      groups: ""
    },
  })

  const toggleVisibility = () => setIsVisible(!isVisible);


  async function onSubmit(values: z.infer<typeof officeFormSchema>) {

    setIsSubmitting(true)
    toast.promise(
      createOfficeStaff({
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        groups: values.groups.split(','),
        password: values.password,
        username: values.username
      }, officeID), {
      loading: 'En cours de creation...',
      success: () => {
        onOpenChange()
        form.reset()
        return `Le staff a été ajouté avec succès !`;
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

    async function fetchUserGroups() {
      const groupList = await getUserApiGroups()
      if (groupList?.length)
        setUserGroups([...groupList])
    }

    fetchUserGroups()
  }, [])

  return (
    <>
      <Button onPress={onOpen} radius="sm" color="primary"
        startContent={
          <PlusCircle />
        }
      >
        Ajouter un utilisateur
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">Ajout d&apos;un staff</ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out">
                  <div className="flex flex-col gap-3">
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
                                Féminin
                              </SelectItem>
                              <SelectItem key={'M'}>
                                Masculin
                              </SelectItem>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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

                            <Select {...field} selectionMode="multiple" radius="sm" size="sm"
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
