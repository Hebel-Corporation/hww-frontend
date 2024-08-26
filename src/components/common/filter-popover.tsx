'use client'

import { Badge, Button, Checkbox, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



type Status = {
    value: string,
    label: string
}


const FilterPopover = ({
    title,
    filterStatus,
    propsParams
}: {
    title: string,
    filterStatus: Status[],
    propsParams: { [key: string]: string | string[] | undefined }
}) => {

    const {
        formState: { isLoading, isSubmitting },
        register,
        getValues
    } = useForm()


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