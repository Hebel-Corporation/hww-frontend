import { SessionType } from '@/types'
import { hasOfficeAuthorization } from '@/utils/client-utils'
import { getServerSession } from '@/utils/server-auth-utils'
import React from 'react'

async function HasOfficePermission({children, offices}: {
    children: React.ReactNode,
    offices: string[]
}) {

    const session = await getServerSession({raw: false}) as SessionType | null

    if (hasOfficeAuthorization({ authorizedOffices: offices, userOffice: session?.user.office })) {
        return <>{children}</>
    }

    return null
}

export default HasOfficePermission