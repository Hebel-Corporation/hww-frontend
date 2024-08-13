'use client'

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '@nextui-org/react'
import { Search } from 'lucide-react'

const SearchBar = () => {
    return (
        <div className="w-full flex items-center">
            <Input type="text" placeholder="Recherche"
                className="w-full !rounded-none !rounded-s-md placeholder:text-slate-300"
            />
            <Button className="!rounded-none !rounded-e-md">
                <Search />
            </Button>
        </div>
    )
}

export default SearchBar