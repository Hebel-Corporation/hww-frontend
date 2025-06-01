'use client'

import React, { useEffect } from "react"
import { Pagination } from "@heroui/react"

const LocalPaginationControls = ({
    rowsPerPage = 8,
    data = [],
    setLoadedData = (arg: any) => {},
    onDataLoading = (arg: any) => {}
}) => {

    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(data?.length / rowsPerPage);

    const items = React.useMemo(() => {
        onDataLoading(true)
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data?.slice(start, end);
    }, [page, data]);


    useEffect(() => {
        setLoadedData(items)
        onDataLoading(false)
    }, [items])


    return (
        <Pagination className="!text-white"
            showControls={true}
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
        />
    )
}


export default LocalPaginationControls;