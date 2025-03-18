'use client'

import { Button, ButtonGroup } from '@nextui-org/react'
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
        <div className='overflow-x-auto'>
            <ButtonGroup radius='sm'>
                {
                    accountSubMenus?.map(menu => (
                        <Button
                            key={menu?.key}
                            color={menu?.isActive ? 'primary' : 'default'}
                            className="!p-0 !min-w-0 h-max"
                        >
                            <Link href={menu?.path} className="flex-1 px-4 py-2.5">{menu?.label}</Link>
                        </Button>
                    ))
                }
            </ButtonGroup>
        </div>
    )
}

export default AccountSubMenu