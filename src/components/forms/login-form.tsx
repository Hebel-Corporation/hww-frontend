'use client'

import { Button, Input } from '@nextui-org/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { userLogin } from '@/actions/auth-actions'



const loginFormSchema = z.object({
    username: z.string().min(2, {
        message: "Entrer votre nom d'utilisateur",
    }),
    password: z.string().min(2, {
        message: "Entrer le mot de passe",
    }),
})


const LoginForm = () => {

    const [error, setError] = React.useState('');
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    const router = useRouter()
    const toggleVisibility = () => setIsVisible(!isVisible);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoggingIn(true)
        
        const res = await userLogin({username: values.username, password: values.password })
        setIsLoggingIn(false)
        if (res?.IsloggedIn)
            router.push(res?.redirectUrl)
        else
            setError(res?.mssg)

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full sm:max-w-sm flex flex-col gap-12 sm:border px-5 py-8 rounded-md'>
                <h1 className='text-xl font-semibold text-center'>Connexion</h1>
                <div className='w-full flex flex-col gap-6'>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        radius='sm'
                                        size='sm'
                                        label="Nom d'utilisateur"
                                        labelPlacement='inside'
                                        // placeholder="Entrer le nom d'utilisateur"
                                        variant="faded"
                                        className='w-full'
                                    />
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
                                    <Input {...field}
                                        radius='sm'
                                        size='sm'
                                        label="Mot de passe"
                                        labelPlacement='inside'
                                        variant="faded"
                                        // placeholder="Entrer le mot de passe"
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
                                        className='w-full'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                        {
                            error && <span className='text-small font-light text-red-400'>{error}</span>
                        }
                </div>
                <Button type="submit" isLoading={isLoggingIn} isDisabled={isLoggingIn} radius='sm'>
                    Se connecter
                </Button>
            </form>
        </Form >
    )
}

export default LoginForm