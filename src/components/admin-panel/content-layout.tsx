import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  breadcrumb?: React.ReactNode,
  children: React.ReactNode;
}

export function ContentLayout({ breadcrumb, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar breadcrumb={breadcrumb} />
      <div className="container min-h-[calc(100vh_-_56px)] relative flex flex-col flex-1 px-4 sm:px-[19px]">{children}</div>
    </div>
  );
}
