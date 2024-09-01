import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

interface BreadcrumbType {
    label: string,
    path?: string
}


const CustomBreadcrumb = ({
    breadcrumbItems
}: {
    breadcrumbItems: BreadcrumbType[]
}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    breadcrumbItems.map((item, index) => (
                        item.path ?
                            <div key={item.label} className='flex gap-2.5 items-center'>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={`${item.path}`}>{item.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < breadcrumbItems.length - 1  && <BreadcrumbSeparator />}
                            </div>
                            :
                            <div key={item.label} className='flex gap-2.5 items-center'>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                </BreadcrumbItem>
                                {index < breadcrumbItems.length - 1  && <BreadcrumbSeparator />}
                            </div>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default CustomBreadcrumb