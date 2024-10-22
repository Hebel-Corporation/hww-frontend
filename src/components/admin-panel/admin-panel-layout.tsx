"use client";

import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const pathname = usePathname()

  if (!sidebar) return null;

  const hideSideBar = /^\/offices(?:\/[\w-]+)*\/account\/config-password$/.test(pathname);


  return (
    <>
      {
        hideSideBar ? <></> :
          <Sidebar />
      }
      <main
        className={cn(
          "relative min-h-[calc(100vh)] flex flex-col flex-1 bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false && hideSideBar === false ? "lg:ml-[90px]" : hideSideBar ? "lg:ml-0" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
