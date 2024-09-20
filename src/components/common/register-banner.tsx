'use client'

import { DotIcon, XIcon } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function RegisterBanner() {
    return (
        <div className='relative w-full z-50'>
            <div className="relative isolate flex items-center gap-x-6 overflow-hidden rounded-sm bg-gradient-to-r from-[#ff80b5] to-blue-500 bg-opacity-25 p-3.5">
                
                <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm leading-6 text-gray-900">
                        <strong className="font-semibold hidden sm:inline">Désolé !</strong>
                        <DotIcon className="mx-0.5 hidden sm:inline" />
                        Vous avez pas des codes valide pour faire les enregistrements.
                    </p>

                    <HelpPopover />
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
                    className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
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
                        <div className="text-sm font-light">
                            Pour recevoir les nouveaux codes d&apos;enregistrements vous dévez contacter votre le central avec un montant d&apos;argent correspondant au nombre des codes que vous souhaitez générer.
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}