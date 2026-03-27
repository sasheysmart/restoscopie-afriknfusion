"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, PlusCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Tableau de bord", icon: BarChart3 },
  { href: "/audit", label: "Nouvel audit", icon: PlusCircle },
];

function titleFromPath(pathname: string): string {
  if (pathname.startsWith("/audit")) return "Nouvel audit";
  return "Tableau de bord";
}

function breadcrumbFromPath(pathname: string): string {
  if (pathname === "/") return "Accueil / Tableau de bord";
  if (pathname === "/audit") return "Accueil / Audit";
  return "Accueil / Audit / Synthèse";
}

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="w-[240px] border-r border-[#E5E7EB] bg-white"
      style={{ "--sidebar-width": "240px" } as React.CSSProperties}
    >
      <SidebarHeader className="px-6 py-6">
        <Link href="/" className="text-xl font-bold text-[#111827]">
          Restoscopie
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      className={cn(
                        "h-10 rounded-lg border-l-2 border-transparent px-3 text-sm font-medium text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]",
                        active && "border-l-[#D4521A] bg-[#FFF7F2] text-[#D4521A]",
                      )}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titleFromPath(pathname);
  const breadcrumb = breadcrumbFromPath(pathname);

  return (
    <SidebarProvider>
      <SidebarNav pathname={pathname} />
      <SidebarInset className="bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-5 md:px-8">
          <div className="mb-6 flex items-center justify-between border-b border-[#E5E7EB] pb-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-bold text-[#111827]">{title}</h1>
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              {breadcrumb}
            </p>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
