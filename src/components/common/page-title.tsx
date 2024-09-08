import React from 'react'

const PageTitle = ({title, description}:{
    title: string,
    description: string
}) => {
    return (
        <div className='flex flex-col gap-1'>
            <h1 className="text-xl">{title}</h1>
            <p className="text-small font-extralight">
                {description}
            </p>
        </div>
    )
}

export default PageTitle