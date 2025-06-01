'use client'

import { Button, ButtonGroup } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AccountSubMenu({
    memberId,
    accountId
}: {
    memberId: string,
    accountId: string
}) {

    const pathname = usePathname()

    const accountSubMenus = [
        {
            key: 'dowlines',
            label: 'Dowlines',
            path: `/offices/members/${memberId}/${accountId}`,
            isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}`)
        },
        {
            key: 'referrals',
            label: 'Parrainages',
            path: `/offices/members/${memberId}/${accountId}/referrals`,
            isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}/referrals`)
        },
        {
            key: 'matchings',
            label: 'Equilibres',
            path: `/offices/members/${memberId}/${accountId}/matchings`,
            isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}/matchings`)
        },
        {
            key: 'purchase-bonus',
            label: 'Bonus achat produit',
            path: `/offices/members/${memberId}/${accountId}/purchase-bonus`,
            isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}/purchase-bonus`)
        },
        {
            key: 'payments',
            label: 'Payements',
            path: `/offices/members/${memberId}/${accountId}/payments`,
            isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}/payments`)
        }
    ]

    return (
        <div className='overflow-x-auto border rounded-lg'>
            <ButtonGroup radius='sm'>
                {
                    accountSubMenus?.map(menu => (
                        <Link key={menu?.key} color={menu?.isActive ? 'primary' : 'default'} href={menu?.path} 
                            className={`${menu?.isActive ? 'bg-zinc-800 text-white dark:bg-white dark:text-zinc-800' : 'bg-inherit'} border-r last:border-r-0 text-sm flex-1 px-3 py-2.5 first:rounded-l-lg last:rounded-r-lg max-w-max truncate`}>
                            {menu?.label}
                        </Link>
                    ))
                }
            </ButtonGroup>
        </div>
    )
}

export default AccountSubMenu