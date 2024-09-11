import { ScrollShadow } from '@nextui-org/react'
import React from 'react'
import DownlineItem from './downline-item'

const MemberDownlineList = () => {
    return (
        <ScrollShadow className="flex flex-col flex-1 max-h-[calc(100vh-60vh)]">
            <div className='flex flex-col'>
                <DownlineItem />
                <DownlineItem />
                <DownlineItem />
                <DownlineItem />
                <DownlineItem />
                <DownlineItem />
                <DownlineItem />
                <DownlineItem />
                <DownlineItem />
            </div>
        </ScrollShadow>
    )
}

export default MemberDownlineList