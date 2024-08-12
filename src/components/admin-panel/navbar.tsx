import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";

interface NavbarProps {
  breadcrumb?: React.ReactNode,
}

export function Navbar({breadcrumb}: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full  backdrop-blur ">
      <div className="mx-4 sm:mx-[19px] flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <>{breadcrumb}</>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
