'use client'

import { Button, Input } from '@heroui/react'
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

        const res = await userLogin({ username: values.username, password: values.password })
        setIsLoggingIn(false)
        if (res?.IsloggedIn)
            router.push(res?.redirectUrl)
        else
            setError(res?.mssg)

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-8 p-8 sm:p-10 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl'>
                <div className='space-y-2'>
                    <h1 className='text-2xl lg:text-3xl font-bold text-foreground'>Connexion</h1>
                    <p className='text-sm text-muted-foreground'>Accédez à votre espace personnel</p>
                </div>
                <div className='w-full flex flex-col gap-5'>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        radius='sm'
                                        size='lg'
                                        label="Nom d'utilisateur"
                                        labelPlacement='inside'
                                        variant="bordered"
                                        className='w-full'
                                        classNames={{
                                            input: "text-base",
                                            inputWrapper: "border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
                                        }}
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
                                        size='lg'
                                        label="Mot de passe"
                                        labelPlacement='inside'
                                        variant="bordered"
                                        endContent={
                                            <button className="focus:outline-none hover:opacity-70 transition-opacity" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                                {isVisible ? (
                                                    <EyeIcon className="w-5 h-5 text-zinc-400" />
                                                ) : (
                                                    <EyeOffIcon className="w-5 h-5 text-zinc-400" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        className='w-full'
                                        classNames={{
                                            input: "text-base",
                                            inputWrapper: "border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        error && (
                            <div className='p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50'>
                                <span className='text-sm font-medium text-red-600 dark:text-red-400'>{error}</span>
                            </div>
                        )
                    }
                </div>
                <Button
                    type="submit"
                    color='primary'
                    isLoading={isLoggingIn}
                    isDisabled={isLoggingIn}
                    radius='sm'
                    size='lg'
                    className='w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 font-semibold text-base shadow-lg hover:shadow-xl transition-all'
                >
                    Se connecter
                </Button>
            </form>
        </Form >
    )
}

export default LoginForm