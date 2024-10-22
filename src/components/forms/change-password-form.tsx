'use client'

import { Button, Input } from '@nextui-org/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { toast } from 'sonner';
import { changeUserPassword } from '@/actions/auth-actions';
import { useRouter } from 'next/navigation';



const ChangePasswordSchema = z.object({
    old_password: z.string().min(2, {
        message: "Entrer l'ancien mot de passe",
    }),
    new_password: z.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères')
        // .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
        // .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
        .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre'),
        // .regex(/[@$!%*?&]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    confirm_password: z.string()
}).refine(data => data.new_password === data.confirm_password, {
    message: "Les mots de passe ne correspondent pas",
    path: ['confirm_password'],
});



function ChangePasswordForm() {

    const [isVisible, setIsVisible] = React.useState(false);
    const [isNewwPsswdVisible, setIsNewwPsswdVisible] = React.useState(false);
    const [changingPassword, setChangingPassword] = React.useState(false);


    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleNewPsswdVisibility = () => setIsNewwPsswdVisible(!isNewwPsswdVisible);

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
    })


    const router = useRouter()


    async function onSubmit(values: z.infer<typeof ChangePasswordSchema>) {
        setChangingPassword(true)
        toast.promise(changeUserPassword({
            old_password: values.old_password,
            new_password: values.new_password,
            confirm_password: values.confirm_password
        }), {
            loading: "Changement de mot de passe en cours...",
            success: (data) => {
                router.replace('/offices/dashboard')
                return `${data?.message}`
            },
            error: (err) => {
                return `${err?.message}`
            },
            finally() {
                setChangingPassword(false)
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full sm:w-7/12 md:w-5/12 lg:w-4/12 flex flex-col gap-10 sm:border sm:p-8 p-4 rounded-md'>
                <div className='flex flex-col gap-1.5'>
                    <h1 className='text-xl md:text-2xl'>
                        Changer le mot de passe
                    </h1>
                    <p className='text-sm font-thin'>
                        Pour des raisons de sécurité, vous devez modifier votre mot de passe avant de pouvoir accéder pleinement à votre compte.
                    </p>
                </div>
                <div className='flex flex-col gap-3.5'>
                    <FormField
                        control={form.control}
                        name="old_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} isRequired radius="sm" size="sm" label="Ancien mot de passe"
                                        labelPlacement='inside'
                                        isDisabled={changingPassword}
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="new_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} isRequired radius="sm" size="sm" label="Nouveau mot de passe"
                                        labelPlacement='inside'
                                        isDisabled={changingPassword}
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleNewPsswdVisibility} aria-label="toggle password visibility">
                                                {isNewwPsswdVisible ? (
                                                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isNewwPsswdVisible ? "text" : "password"}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} isRequired radius="sm" size="sm" label="Confirmation"
                                        labelPlacement='inside'
                                        isDisabled={changingPassword}
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
                </div>

                <Button type='submit' radius="sm" color='primary'
                    isDisabled={changingPassword}
                    isLoading={changingPassword}
                >
                    Changer le mot de passe
                </Button>
            </form>
        </Form >
    )
}

export default ChangePasswordForm