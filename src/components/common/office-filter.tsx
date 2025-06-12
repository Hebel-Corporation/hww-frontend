"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOffices } from "@/actions/office-actions";
import { handleSearchParamChange } from "@/utils/navigation-utils";

interface OfficeFilterProps {
  officeFilter: string;
}

export default function OfficeFilter({ officeFilter }: OfficeFilterProps) {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([officeFilter])
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: officeItems,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["offices"],
    queryFn: () =>
      getOffices({
        page: 1,
        limit: 20,
        search: "",
      }),
    enabled: true,
  });

  const items: any[] = [
    {
      name: "Tous les bureaux",
      id: "all",
    },
    ...(officeItems?.results || [])?.map((office: any) => ({
      name: office.name,
      id: office.id,
      office_code: office.office_code,
      location: office.location?.name,
    })),
  ];

  const selectedKey = Array.from(selectedKeys)[0];

  const selectedLabel = React.useMemo(() => {
    const found = items.find(
      (item: any) => item.id === selectedKey || item.id === officeFilter
    );
    return found
      ? found.name || found?.location + " - " + found.office_code
      : "Sélectionner";
  }, [selectedKey, officeFilter, items]);



  if (items.length <= 1) return null;



  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="capitalize min-w-52 justify-between"
          variant="flat"
          radius="sm"
          endContent={<ChevronDown size={16} />}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          {selectedLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys: Selection) =>
          setSelectedKeys(keys as Set<string>)
        }
      >
        {items?.map((item: any) => (
          <DropdownItem
            key={item?.id}
            onClick={() =>
              handleSearchParamChange({
                param: "office",
                value: item?.id,
                router,
                searchParams,
              })
            }
          >
            {item?.name || item?.location + " - " + item?.office_code}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
