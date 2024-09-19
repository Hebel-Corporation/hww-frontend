import React from 'react'

function ProducItem({
    imageUrl,
    productName,
    description
} : {
    imageUrl: string,
    productName: string,
    description: string
}) {
    return (
        <div className="flex flex-col flex-1 h-grow w-full sm:min-w-60 md:min-w-72 sm:last:max-w-60 md:last:max-w-72 rounded-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-sm border">
                <div className="flex flex-1 flex-grow max-h-44 min-h-44 rounded-t-sm bg-gray-300">
                    <img className="object-contain" src={imageUrl} alt="" />
                </div>
                <div className="flex flex-col gap-2 p-4 py-5">
                    <h1 className="text-lg font-semibold leading-tight text-primary1">
                        {productName}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-slate-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProducItem