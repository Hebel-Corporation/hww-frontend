import React from 'react'

function SectionTitle({
    title,
    description
}: {
    title: string,
    description?: string
}) {
    return (
        <div className='flex flex-col gap-2 pb-12 sm:pb-14'>
            <h1 className="text-2xl uppercase md:text-3xl leading-tight font-bold text-primary1">
                {title}
            </h1>
            {
                description &&
                <h3 className='max-w-2xl text-lg font-extralight'>
                    {description}
                </h3>
            }
            <hr className='w-[20%] h-2 bg-yellow-600 mt-3' />
        </div>
    )
}

export default SectionTitle