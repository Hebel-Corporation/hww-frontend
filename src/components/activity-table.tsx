'use client'


import { getOfficeActivities } from '@/actions/office-actions';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import EmptyData from './common/empty-data';
import GlobalLoader from './common/global-loader';


export default function ActivityTable({officeId, filterSlug}:{
    officeId: string, filterSlug: string
}) {

    const { data, error, isLoading, isError } = useQuery({  
        queryKey: ['officeActivities', officeId, filterSlug],
        queryFn: () => getOfficeActivities({ officeId: officeId, filterSlug: filterSlug }),
        enabled: !!officeId
    })

    return (
        <Table isStriped aria-label="bonus records" shadow='none' radius='sm'
            isHeaderSticky
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "min-h-[64dvh] max-h-[64dvh] p-0",
                thead: 'rounded-sm'
            }}
        >
            <TableHeader>
                <TableColumn key="downline">Bénéficière</TableColumn>
                <TableColumn key="account" className='hidden sm:table-cell'>Compte</TableColumn>
                <TableColumn key="office">Bureau</TableColumn>
                <TableColumn key="account" className='hidden sm:table-cell'>Type de bonus</TableColumn>
                <TableColumn key="amount">Montant total</TableColumn>
                <TableColumn key="status">Actions</TableColumn>
            </TableHeader>
            <TableBody isLoading={isLoading} loadingContent={<GlobalLoader />} emptyContent={
                    <EmptyData description="Aucun parrainage n'est enregistrer pour le moment." />
                } 
            >
                {
                    data?.bonuses?.map((item: any, i:any) => (
                        <TableRow key={item?.grantee__id+i+item?.bonus_type}>
                            <TableCell className='px-0 sm:px-3'>
                                <div className='flex flex-col gap-1'>
                                    <h1>{item?.grantee__member__first_name} {item?.grantee__member__last_name}</h1>
                                    <span className='block sm:hidden text-tiny font-extralight'>
                                        {item?.grantee__company_id}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className='hidden sm:table-cell'>
                                {item?.grantee__company_id}
                            </TableCell>
                            <TableCell>
                                {item?.grantee__office__name || `${item?.grantee__office__location__name} - ${item?.grantee__office__office_code}`}
                            </TableCell>
                            <TableCell className='hidden sm:table-cell'>
                                {item?.bonus_type}
                            </TableCell>
                            <TableCell>
                                $ {item?.total_bonus}
                            </TableCell>
                            <TableCell className='px-0 sm:px-3'>
                                <Button size='sm'>Payer</Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
