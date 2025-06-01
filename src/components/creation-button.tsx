'use client';

import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";

export const ChevronDownIcon: React.FC = () => {
    return (
        <svg fill="none" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                fill="currentColor"
            />
        </svg>
    );
};

type MergeOption = "addMembre" | "purchaseBonus" | "addAccount";

type DescriptionsMap = Record<MergeOption, string>;
type LabelsMap = Record<MergeOption, string>;

const descriptionsMap: DescriptionsMap = {
    addMembre:
        "All commits from the source branch are added to the destination branch via a merge commit.",
    purchaseBonus:
        "All commits from the source branch are added to the destination branch as a single commit.",
    addAccount: "All commits from the source branch are added to the destination branch individually.",
};

const labelsMap: LabelsMap = {
    addMembre: "Ajouter un membre",
    purchaseBonus: "Enregistrer un bonus achat produit",
    addAccount: "Ajouter un compte",
};

export default function CreationButton() {
    const [selectedOption, setSelectedOption] = useState<Set<MergeOption>>(new Set<MergeOption>(["addMembre"]));

    // Convert the Set to an Array and get the first value.
    const selectedOptionValue = Array.from(selectedOption)[0];

    return (
        <ButtonGroup variant="flat">
            <Button>{labelsMap[selectedOptionValue]}</Button>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Button isIconOnly>
                        <ChevronDownIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Merge options"
                    className="max-w-[300px]"
                    selectedKeys={selectedOption}
                    selectionMode="single"
                    onSelectionChange={(keys) => setSelectedOption(keys as Set<MergeOption>)}
                >
                    <DropdownItem key="addMembre" description={descriptionsMap["addMembre"]}>
                        {labelsMap["addMembre"]}
                    </DropdownItem>
                    <DropdownItem key="purchaseBonus" description={descriptionsMap["purchaseBonus"]}>
                        {labelsMap["purchaseBonus"]}
                    </DropdownItem>
                    <DropdownItem key="addAccount" description={descriptionsMap["addAccount"]}>
                        {labelsMap["addAccount"]}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    );
}
