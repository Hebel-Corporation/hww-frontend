'use client'

import { DotIcon, XIcon } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function RegisterBanner() {
    return (
        <div className='absolute bottom-2 right-0 w-full z-50'>
            <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-3 py-2.5 sm:px-3.5 sm:before:flex-1">
                <div
                    aria-hidden="true"
                    className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-sm leading-6 text-gray-900">
                        <strong className="font-semibold hidden sm:inline">Désolé !</strong>
                        <DotIcon className="mx-2 hidden sm:inline" />
                        Vous avez pas des codes valide pour faire les enregistrements.
                    </p>

                    <HelpPopover />
                </div>
                <div className="flex flex-1 justify-end">
                    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
                        <span className="sr-only">Fermer</span>
                        <XIcon className="hidden sm:block h-5 w-5 text-gray-900" />
                    </button>
                </div>
            </div>
        </div>
    )
}






export function HelpPopover() {
    return (
        <Popover
            showArrow
            backdrop="opaque"
            placement="top"
            classNames={{
                base: [
                    // arrow color
                    "before:bg-default-200"
                ],
                content: [
                    "py-3 px-4 border border-default-200",
                    "bg-gradient-to-br from-white to-default-300",
                    "dark:from-default-100 dark:to-default-50",
                ],
            }}
        >
            <PopoverTrigger>
                <a
                    href="#"
                    className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                    Faite vous aider <span aria-hidden="true">&rarr;</span>
                </a>
            </PopoverTrigger>
            <PopoverContent>
                {(titleProps) => (
                    <div className="max-w-xs flex flex-col gap-3 px-1 py-2">
                        <h3 className="text-small font-bold" {...titleProps}>
                            Note:
                        </h3>
                        <div className="text-tiny">
                            Pour recevoir les nouveaux codes d&apos;enregistrements vous dévez contacter votre le central avec un montant d&apos;argent correspondant au nombre des codes que vous souhaitez générer.
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}