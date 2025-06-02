'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Menu } from "lucide-react";

export default function MobileMenu({
    hasSession
}: {hasSession: boolean}) {
    return (
        <div className="block sm:hidden">
            <Dropdown backdrop="opaque">
                <DropdownTrigger>
                    <Button
                        variant="flat" radius="sm"
                        className="min-w-0 p-2"
                    >
                        <Menu />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="about" href="#about">A propos</DropdownItem>
                    <DropdownItem key="rewards" href="#rewards">Rewards</DropdownItem>
                    <DropdownItem key="products" href="#products">Produits</DropdownItem>
                    <DropdownItem key="contact" href="#contact">Nous contacter</DropdownItem>
                    <DropdownItem key="signIn" href={`${hasSession ? '/offices/dashboard' : '/login'}`} className="text-green-500" color="success">
                        {hasSession ? 'Tableau de bord' : 'Se connecter'}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}