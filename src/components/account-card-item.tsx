import { Badge } from '@nextui-org/react'
import React from 'react'

const AccountCardItem = () => {
    return (
        <Badge content={`$ 456`} color='primary' >
            <div className="z-2 border select-none overflow-hidden w-max sm:odd:last:max-w-sm min-w-80 h-max rounded-xl p-4 flex flex-col flex-1 gap-4 cursor-pointer bg-zinc-100 dark:bg-zinc-800">

                <div className="whitespace-nowrap text-lg font-semibold font-mono" >
                    4242&nbsp;4242&nbsp;4242&nbsp;4242
                </div>

                <div className="flex gap-8 justify-between">
                    <div className="owner flex flex-col w-max">
                        <span className="text-sm">Proprietaire</span>
                        <span className="whitespace-nowrap text-base">Nelson Kayisirirya</span>
                    </div>
                    <div className="cvc flex flex-col w-max">
                        <span className="text-sm">Downlines</span>
                        <span className="whitespace-nowrap text-base">123</span>
                    </div>
                </div>
            </div>
        </Badge>
    )
}

export default AccountCardItem