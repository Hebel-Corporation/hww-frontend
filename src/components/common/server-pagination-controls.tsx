'use client'

import React from 'react'
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/navigation'

const ServerPaginationControls = ({
    total_pages,
    page,
    limit
}: {
    total_pages: number,
    page: number,
    limit: number
}) => {

    const router = useRouter()

    return (
        <Pagination
            showControls={true}
            total={total_pages}
            initialPage={1}
            page={page}
            onChange={async (e) => {
                router.push(`?page=${e}&limit=${limit}`)
            }}
        />
    )
}

export default ServerPaginationControls