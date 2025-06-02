'use client'

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '@heroui/react'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBar = () => {

    const [search, setSearch] = React.useState<string>('')

    const router = useRouter()
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    const handleSearch = () => {

        if (search) {
            params.set('search', search);
        } else {
            params.delete('search')
        }

        router.push(`?${params.toString()}`);
    }


    React.useEffect(() => {
        handleSearch()
    }, [search])

    return (
        <div className="w-full flex items-center">
            <Input type="text" placeholder="Recherche"
                className="w-full !rounded-none !rounded-s-md placeholder:text-slate-300"
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
            <Button onPress={handleSearch} className="!rounded-none !rounded-e-md">
                <Search />
            </Button>
        </div>
    )
}

export default SearchBar