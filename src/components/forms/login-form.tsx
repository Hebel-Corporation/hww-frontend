'use client'

import { Button, Input } from '@nextui-org/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'

const LoginForm = () => {

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='w-1/2 flex flex-col gap-8 border px-5 py-8 rounded-md'>
            <h1 className='text-xl font-semibold text-center'>Connexion</h1>
            <div className='w-full flex flex-col gap-4'>
                <Input
                    type="text"
                    radius='sm'
                    label="Nom d'utilisateur"
                    labelPlacement='outside'
                    placeholder="Entrer le nom d'utilisateur"
                    variant="faded"
                    className='w-full'
                />
                <Input
                    radius='sm'
                    label="Mot de passe"
                    labelPlacement='outside'
                    variant="faded"
                    placeholder="Entrer le mot de pass"
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
            </div>
            <Button radius='sm'>Se connecter</Button>
        </div>
    )
}

export default LoginForm