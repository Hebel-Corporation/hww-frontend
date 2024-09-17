import { CircleCheck } from 'lucide-react'
import React from 'react'

const OfficeCodeItem = () => {
    return (
        <div className="w-full">
            <div className="relative inline-flex items-center justify-between w-full text-gray-500 bg-slate-50 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="w-full p-2 bg-slate-50 border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-3 text-lg font-medium text-gray-500 dark:text-gray-400">Plan standard</h5>
                    <div className="flex items-baseline text-gray-900 dark:text-white">
                        <span className="text-2xl font-semibold">$</span>
                        <span className="text-3xl font-extrabold tracking-tight">80</span>
                        <span className="ms-1 text-lg font-normal text-gray-500 dark:text-gray-400">/compte</span>
                    </div>
                    <ul role="list" className="space-y-3 mt-5">
                        <li className="flex">
                            <CircleCheck size={17} className="text-blue-700 dark:text-blue-500" />
                            <span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                2 codes d&apos;enregistrement valides.
                            </span>
                        </li>
                        <li className="flex line-through decoration-gray-500">
                            <CircleCheck size={17} className="text-gray-400 dark:text-gray-500" />
                            <span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                1 codes déjà utilisés.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OfficeCodeItem