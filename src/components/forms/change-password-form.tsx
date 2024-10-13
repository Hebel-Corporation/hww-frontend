'use client'

import { Button, Input } from '@nextui-org/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';



const ChangePasswordSchema = z.object({
    old_password: z.string().min(2, {
        message: "Entrer l'ancien mot de passe",
    }),
    new_password: z.string().min(2, {
        message: "Entrer le nouveau mot de passe",
    }),
    confirm_password: z.string().min(2, {
        message: "Entrer le mot de passe de confirmation",
    })
})

function ChangePasswordForm() {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof ChangePasswordSchema>) {
        console.log("DATA : ", values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full sm:w-7/12 md:w-5/12 lg:w-4/12 flex flex-col gap-12 sm:border sm:p-8 p-4 rounded-md'>
                <h1>Changer le mot de passe</h1>
                <div className='flex flex-col gap-3.5'>
                    <FormField
                        control={form.control}
                        name="old_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} isRequired radius="sm" size="sm" label="Ancien mot de passe"
                                        labelPlacement='inside'
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
                                        type='password'
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

                <Button type='submit' radius="sm" color='primary'>
                    Changer le mot de passe
                </Button>
            </form>
        </Form >
    )
}

export default ChangePasswordForm