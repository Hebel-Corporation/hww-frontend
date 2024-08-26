'use client'

import React from 'react'
import { Pagination } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation'

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
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    const handlePagination = ({
        pageValue
    }: { pageValue: number }) => {

        params.set('page', String(pageValue));
        params.set('limit', String(limit))

        router.push(`?${params.toString()}`);
    }

    return (
        <Pagination
            showControls={true}
            total={total_pages}
            initialPage={1}
            page={page}
            onChange={async (value) => {
                handlePagination({ pageValue: value })
            }}
        />
    )
}

export default ServerPaginationControls