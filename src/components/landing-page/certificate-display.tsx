'use client'

import Image from 'next/image'

export default function CertificateDisplay() {
    return (
        <div className="relative w-full rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 select-none">
            {/* Certificate image */}
            <Image
                src="/英文版授权书20230324 微信_副本.jpg"
                alt="Certificat d'autorisation HWW"
                width={800}
                height={1066}
                className="w-full h-auto select-none pointer-events-none"
                draggable={false}
                priority
            />

            {/* Subtle watermark overlay for protection */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="text-8xl font-bold text-white/[0.02] dark:text-black/[0.02] rotate-[-45deg] select-none">
                    HWW OFFICIEL
                </div>
            </div>

            {/* Protection overlay - prevents right-click, download and selection */}
            {/* <div
                className="absolute inset-0 z-20"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                }}
            /> */}
        </div>
    )
}
