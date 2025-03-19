import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  breadcrumb?: React.ReactNode,
  children: React.ReactNode;
}

export function ContentLayout({ breadcrumb, children }: ContentLayoutProps) {
  return (
    <div className="flex flex-col flex-1">
      <Navbar breadcrumb={breadcrumb} /> 
      <div className="flex-1 relative flex flex-col px-4 sm:px-[19px]">
        {children}
      </div>
    </div>
  );
}
