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
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={`${item.path}`}>{item.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < breadcrumbItems.length - 1  && <BreadcrumbSeparator />}
                            </>
                            :
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                </BreadcrumbItem>
                                {index < breadcrumbItems.length - 1  && <BreadcrumbSeparator />}
                            </>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default CustomBreadcrumb