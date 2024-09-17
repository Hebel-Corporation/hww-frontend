import Link from 'next/link'
import React from 'react'

const CommingSoon = ({
    backPath
} : {
    backPath?: string
}) => {
    return (
        <div className="max-w-xl flex flex-col gap-2 text-zinc-500">
            <h1 className="text-2xl font-semibold">Bientôt disponible</h1>
            <p>Cette section est en cours de construction. Revenez bientôt pour découvrir les nouvelles fonctionnalités !</p>
            <Link href={backPath || '/offices/dashboard'} className="border w-max bg-zinc-100 duration-500 hover:bg-zinc-200 text-sm px-3.5 py-2.5 mt-3 rounded-md">
                Retourner à la page d&apos;accueil
            </Link>
        </div>
    )
}

export default CommingSoon