'use client'

import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { MapPinnedIcon, MoreHorizontal } from 'lucide-react'
import React from 'react'

const LocationItem = ({
  location
}: any) => {
  return (
    <div className='flex flex-col gap-3 w-full min-w-[19rem] flex-1 h-max border rounded-md py-2.5 px-3.5 bg-zinc-100 dark:bg-zinc-800'>
      <div className='flex justify-between items-start'>
        <MapPinnedIcon size={35} />

        <Dropdown>
          <DropdownTrigger>
            <Button radius='sm' size="sm" variant="light" className='min-w-0 p-1'>
              <MoreHorizontal />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Location Actions"
            onAction={(key) => console.log(key)}
          >
            <DropdownItem key="edit">Modifier</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Supprimer
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className='flex gap-3 items-center'>
        <div>
          <h1>{location.name}</h1>
          <span className='text-small font-light'>
            Taux d&apos;inscription : {location.subscription_rate}%
          </span>
        </div>
        <Divider orientation='vertical' />
        <div>
          <h1 className='text-xl font-semibold'>{location.offices_count}</h1>
          <span className='text-small font-light'>Bureau{location.offices_count > 1 ? 'x' : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default LocationItem