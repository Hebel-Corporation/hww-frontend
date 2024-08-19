'use client'

import React, { useEffect, useState } from "react";
import { Badge, Button, Checkbox, Chip, Popover, PopoverContent, PopoverTrigger, Select, SelectedItems, SelectItem } from "@nextui-org/react";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import { fetchTypeEntreprise } from "@/_actions/actions";


type TypeDossier = {
    key: string,
    label: string
}


type Status = {
    value: string,
    label: string
}


const FilterPopover = ({
    title,
    filterStatus,
    asChild,
    propsParams
}: {
    title: string,
    filterStatus: Status[],
    asChild: true | false,
    propsParams: { [key: string]: string | string[] | undefined }
}) => {

    const {
        formState: { isLoading, isSubmitting },
        register,
        getValues,
        setValue
    } = useForm()


    const [types, setTypes] = useState<TypeDossier[]>([]);
    const [selectedType, setSelectedType] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname()
    let status: string[] = propsParams?.status ? JSON.parse(propsParams.status as string) : []
    let type: string[] = propsParams?.type ? JSON.parse(propsParams.type as string) : []

    const params = new URLSearchParams(searchParams.toString());

    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);


    const updateQueryParams = () => {
        status = []
        type = []
        const formValues = getValues()

        if (formValues['type']) {
            type = formValues['type'].split(',').filter((str: string) => str !== '')
            params.set('type', JSON.stringify(type));
        } else {
            params.delete('type')
            setSelectedType([])
        }


        delete formValues['type']

        for (const key in formValues) {
            if (formValues[key]) {
                status.push(formValues[key])
                delete formValues[key]
            }
        }

        if (status){
            params.set('status', JSON.stringify(status));
        }
        else {
            params.delete('status')
        }

        router.push(`${pathname}?${params.toString()}`);

        // Close popover filter
        handleClose()
    }


    useEffect(() => {

        fetchTypeEntreprise().then(res => {
            if (res && Array.isArray(res)) {
                setTypes(res.map((itm: any) => {
                    return {key: itm.id, label: itm.sigle}
                }))
            }
        })

        if (propsParams?.type) {
            const type = propsParams.type ? JSON.parse(propsParams.type as string) : []
            setSelectedType(type)
        } else {
            setSelectedType([])
        }
    }, [])

    return (
        <Popover placement="bottom" showArrow={true} shadow="md" isOpen={visible} onOpenChange={setVisible}>
            <Badge content="" color="success" shape="rectangle" placement="top-right" isInvisible={status?.length || selectedType?.length ? false : true}>
                <PopoverTrigger>
                    <Button size="sm" radius="sm" color="primary" onPress={handleOpen} className="flex gap-3 !h-9">
                        <Filter size={20} />
                        <span>Filtrer par</span>
                    </Button>
                </PopoverTrigger>
            </Badge>
            <PopoverContent className="min-w-64 max-w-64">
                <form className="w-full p-2 flex flex-col gap-5 select-none">
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-semibold leading-none">{title}</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1>Par statut :</h1>
                        <ul className="flex flex-col gap-2 ml-2">
                            {filterStatus.map((item: Status) => (
                                <Checkbox key={item.value} size="sm"
                                    value={item.value}
                                    defaultSelected={
                                        status.find((itm: string) => itm === item.value) ? true : false
                                    }
                                    {...register(`${item.value}`)}
                                >
                                    {item.label}
                                </Checkbox>
                            ))}
                        </ul>
                    </div>
                    {asChild &&
                        <div className="flex flex-col gap-2">
                            <h1>Par type :</h1>
                            <ul className="flex flex-col gap-2">
                                <Select size="sm"
                                    items={types}
                                    isMultiline={true}
                                    selectionMode="multiple"
                                    label=" "
                                    placeholder="Selectionner un ou plisieurs types"
                                    defaultSelectedKeys={selectedType}
                                    onChange={(e) => {
                                        setValue('type', e?.target.value)
                                        setSelectedType([...selectedType, e?.target.value])
                                    }}
                                    renderValue={(items: SelectedItems<TypeDossier>) => {
                                        return (
                                            <div className="flex flex-wrap gap-2 justify-start text-[12px]">
                                                {items.map((item) => (
                                                    <Chip key={item.key}>{item.data?.label}</Chip>
                                                ))}
                                            </div>
                                        );
                                    }}
                                    className="max-w-xs"
                                >
                                    {(type) => (
                                        <SelectItem key={type.key} value={type.key} {...register(`type`)}>
                                            {type.label}
                                        </SelectItem>
                                    )}
                                </Select>
                            </ul>
                        </div>
                    }
                    <Button size="sm" variant="faded" color="primary"
                        onPress={updateQueryParams}
                        isLoading={isSubmitting || isLoading}
                        disabled={isSubmitting || isLoading}
                        className="hover:cursor-pointer w-full !text-sm" >
                        Appliquer les filtres
                    </Button>
                </form>
            </PopoverContent>
        </Popover >
    )
}

export default FilterPopover