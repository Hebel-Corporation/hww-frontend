import React from 'react'

function ObjectiveItem({
    children,
    title,
    description
}:{
    children: React.ReactNode,
    title: string,
    description: string
}) {
    return (
        <div className="w-full flex flex-col gap-2 sm:w-1/2">
            <h4 className="text-xl font-bold leading-tight text-center">
                {title}
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 items-start justify-center sm:justify-start mt-3">
                <div className="mx-auto sm:mx-0 p-2 bg-slate-300 dark:bg-zinc-700 rounded-sm flex items-center justify-center">
                    {children}
                </div>
                <p className="text-lg text-center sm:text-start font-light">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ObjectiveItem