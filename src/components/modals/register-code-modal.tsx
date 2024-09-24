import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useEffect, useState } from "react";
import { createOfficeRegisterCode, getCompanyPackages } from "@/actions/office-actions";
import { Package } from "@/types";


const memberFormSchema = z.object({
    packageId: z.string().min(2, {
        message: "Veillez sellectionner un plan d'enregistrement.",
    }),
    codeNumber: z.string({
        required_error: "Le nombre de codes est requis",
        invalid_type_error: "Le nombre de codes doit être un nombre",
    })
        .min(1, { message: "Veillez saisir le nombre des codes a générer" }),
    amount: z.string({
        required_error: "Le montant est requis",
        invalid_type_error: "Le montant doit être un nombre",
    })
        .min(1, { message: "Le montant doit être supérieur ou égal au prix du paquet sellectionné." })
})
// .refine(async (data) => {
//     if (data.amount) {
//         throw new z.ZodError([
//             {
//                 path: ['codeNumber'],
//                 message: "Verif",
//                 code: z.ZodIssueCode.custom
//             }
//         ]);
//     }
//     return true;
// });


export default function RegisterCodeModal({
    officeId
}: { officeId: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [currentPackage, setCurrentPackage] = useState<Package | undefined>(undefined);

    const form = useForm<z.infer<typeof memberFormSchema>>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            packageId: "",
            codeNumber: undefined,
            amount: undefined
        },
    })


    async function onSubmit(values: z.infer<typeof memberFormSchema>) {
        setIsSubmitting(true)

        toast.promise(
            createOfficeRegisterCode({
                package: values?.packageId,
                codeNumber: Number(values?.codeNumber),
                amount: Number(values?.amount)
            }, officeId), {
            loading: 'Enregistrement en cours...',
            success: () => {
                onOpenChange()
                form.reset()
                return `Les codes ont été généré avec succès !`;
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
        async function getPackages() {
            setIsLoading(true)
            const packages = await getCompanyPackages()
            if (packages?.length > 0) setPackages(packages)

            setIsLoading(false)
        }

        getPackages()

    }, [])

    return (
        <>
            <Button onPress={onOpen} radius="sm" variant="faded" startContent={
                <PlusCircle size={20} />
            }
                className="w-full"
            >
                Ajouter un code d&apos;enregistrement pour ce bureau
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <ModalHeader className="flex flex-col gap-1 p-3.5">Générer le code d&apos;enregistrement</ModalHeader>
                                    <ModalBody className="p-3.5">
                                        <div className="flex flex-col gap-2.5">
                                            <FormField
                                                control={form.control}
                                                name="packageId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Select {...field} radius="sm" size="sm" isLoading={isLoading} isDisabled={isLoading}
                                                                label="Paquet ou plan d'enregistrement"
                                                                description="Sellectionner le paquet pour lequel vous générez le code d'enregistrement!."
                                                                className="w-full"
                                                                onChange={ (e) => {
                                                                    const value = e.target.value || undefined
                                                                    if (value) {
                                                                        form.setValue('packageId', value)
                                                                        setCurrentPackage(packages?.find((itm: Package) => itm?.id === value))
                                                                    }
                                                                }}
                                                            >
                                                                {
                                                                    packages?.map((pack: any) => (
                                                                        <SelectItem key={pack?.id} value={pack?.id} textValue={`${pack?.name} ($${pack?.price}/code)`} >
                                                                            {pack?.name} (${pack?.price}/code)
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
                                                name="amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} isRequired type="number" radius="sm" size="sm"
                                                                label="Montant"
                                                                description="Saisissez le nombre de code a généré."
                                                                isDisabled={currentPackage ? false : true}
                                                                startContent={
                                                                    <div className="pointer-events-none flex items-center">
                                                                        <span className="text-default-400 text-small">$</span>
                                                                    </div>
                                                                }
                                                                onChange={(e) => {
                                                                    const value = e.target.value || 0
                                                                    if (value){
                                                                        form.setValue('amount', value as string)
                                                                        form.setValue('codeNumber', String(Number(value)/currentPackage?.price!))
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="codeNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} isRequired radius="sm" size="sm"
                                                                isDisabled={currentPackage ? false : true}
                                                                isReadOnly={true}
                                                                type="number"
                                                                label="Nombre de codes"
                                                                placeholder="0"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter className="p-3.5">
                                        <Button isDisabled={isSubmitting} radius="sm" color="danger" variant="light" onPress={onClose}>
                                            Annuler
                                        </Button>
                                        <Button isDisabled={isSubmitting} isLoading={isSubmitting} type="submit" radius="sm" color="primary">
                                            Générer maintenant
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </Form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}