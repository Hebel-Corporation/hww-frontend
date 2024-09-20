'use client'

import { Button, ButtonGroup } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AccountSubMenu({
    memberId,
    accountId
} : {
    memberId: string,
    accountId: string
}) {

    const pathname = usePathname()

    const accountSubMenus = [
        {
          key: 'referals',
          label: 'Parrainage',
          path: `/offices/members/${memberId}/${accountId}`,
          isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}`)
        },
        {
          key: 'matchings',
          label: 'Equilibres',
          path: `/offices/members/${memberId}/${accountId}/matchings`,
          isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}/matchings`)
        },
        {
          key: 'payments',
          label: 'Payements',
          path: `/offices/members/${memberId}/${accountId}/payments`,
          isActive: pathname.endsWith(`/offices/members/${memberId}/${accountId}/payments`)
        }
    ]

    return (
        <ButtonGroup radius='sm'>
            {
                accountSubMenus?.map(menu => (
                    <Button key={menu?.key} color={menu?.isActive ? 'primary' : 'default'} children={
                        <Link href={menu?.path}>{menu?.label}</Link>
                    }></Button>
                ))
            }
        </ButtonGroup>
    )
}

export default AccountSubMenu