"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SidebarInset>
      <header className="flex h-16 items-center gap-2 border-b px-6">
        <SidebarTrigger className="focus-visible:ring-2 focus-visible:ring-ring" />
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-sm font-medium text-muted-foreground">{title}</h1>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-6">{children}</div>
    </SidebarInset>
  );
}
