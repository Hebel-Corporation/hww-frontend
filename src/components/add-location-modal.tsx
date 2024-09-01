'use client'

import { CreateLocation, getCountries } from "@/actions/location-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "sonner";


const locationFormSchema = z.object({
  name: z.string().min(2, {
    message: "Entrer le nom de l'emplacement.",
  }),
  country: z.string().min(2, {
    message: "Veillez sellectioner un pays.",
  }),
})


export default function AddLocationModal({
  children
}: {
  children: React.ReactNode
}) {

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [countries, setCountries] = React.useState<{
    value: string,
    label: string
  }[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const form = useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      country: "",
    },
  })

  async function onSubmit(values: z.infer<typeof locationFormSchema>) {
    setIsSubmitting(true)
    toast.promise(
      CreateLocation({name: values.name, countryID: values.country}), {
        loading: 'Enregistrement en cours...',
        success: () => {
          onOpenChange()
          form.reset()
          return `Emplacement ajouté avec succès !`;
        },
        error: () => {
          return `Erreur d'enregistrement`;
        },
        finally() {
          setIsSubmitting(false)
        },
      }
    )
  }

  useEffect(() => {

    async function fetchCountries() {
      const countries = await getCountries()
      if (countries?.length) {
        setCountries([...countries.map((itm: any) => { return { value: itm.id, label: itm.name } })])
      }
    }

    fetchCountries()
  }, [])

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
                <ModalHeader className="flex flex-col gap-1">Ajout d'un emplacement</ModalHeader>
                <ModalBody className="transition duration-400 ease-in-out">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-sm font-light">Infos sur l'emplacement</h1>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} isRequired type="text" radius="sm" size="sm"
                                label="Nom de l'emplacement"
                                description="Ecrivez le nom d'une ville, un térritoire ou d'un endoit quelconque !"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Autocomplete {...field} isRequired radius="sm" size="sm"
                                label="Pays"
                                description="Sellectionner le pays dans lequel se trouve l'endoit que vous voulez enregistrer."
                                onSelectionChange={(value) => {
                                  form.setValue('country', value as string || '')
                                }}
                              >
                                {countries.map((country: any) => (
                                  <AutocompleteItem key={country.value} value={country.value}>
                                    {country.label}
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
                  <Button color="danger" radius="sm" variant="light" onPress={onClose}>
                    Annuler
                  </Button>
                  <Button type="submit" color="primary" radius="sm"
                    isLoading={isSubmitting} isDisabled={isSubmitting}
                   >
                    Enregistrer{isSubmitting && '...'}
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
