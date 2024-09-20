import PaymentTable from '@/components/payment-table'
import { notFound } from 'next/navigation'

async function PaymentPage ({
    params,
    searchParams
  }: {
    params: { memberId: string, accountId: string },
    searchParams: { [key: string]: string | undefined }
  }) {

    const accountId: string = params?.accountId
    
    const payments: any[] = [] //await getMemberAccountpayments({ accountId: accountId })
    if (payments == undefined)
      notFound()
  
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10
    const pages = payments?.length ? Math.ceil(payments.length / limit) : 0;

    return (
        <main className='flex flex-col flex-1 gap-3'>
            <h1>Liste des transactions</h1>

            <PaymentTable payments={payments}
                page={page}
                pages={pages}
            />
        </main>
    )
}

export default PaymentPage