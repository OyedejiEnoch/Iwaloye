"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  Newspaper,
  Users,
  HelpCircle,
  Mail,
  Calendar,
  UserCog,
  Settings,
  BookOpen,
  ChevronRight,
  CircleArrowOutUpRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const overviewItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
];

const contentItems = [
  { title: "Mission & Vision", href: "/admin/mission" },
  { title: "News & Publications", href: "/admin/news" },
  { title: "Meet Our Leaders", href: "/admin/leaders" },
  { title: "FAQ", href: "/admin/faq" },
  { title: "Newsletter", href: "/admin/newsletter" },
  { title: "Campaign Calendar", href: "/admin/calender" },
  { title: "Gallery", href: "/admin/gallery" },
];

const userManagementItems = [
  { title: "Movements", href: "/admin/movements", },
  { title: "Admin Management", href: "/admin/admin-management", },
  { title: "Settings", href: "/admin/settings", },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <p className="font-medium text-[#101828] text-sm">Admin Dashboard -</p>
          <p className="text-sm text-[#101828]">Wale</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {/* Overview Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-[#3B414C] px-2 mb-1">
            Overview
          </SidebarGroupLabel>
          <SidebarMenu>
            {overviewItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`rounded-lg transition-all duration-150 ${isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>


        {/* Content Management Section */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-[#3B414C] px-2 mb-1">
            Content Management
          </SidebarGroupLabel>
          <SidebarMenu className="gap-3">
            {contentItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`rounded-lg transition-all duration-150 ${isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-[#364153]/80 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                      {isActive && <CircleArrowOutUpRight className="text-[#155DFC]" />}
                      {/* <item.icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`} /> */}
                      <span className={`${isActive ? "text-[#155DFC]" : "text-sm"}`}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* User Management Section */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-[#3B414C] px-2 mb-1">
            User Management
          </SidebarGroupLabel>
          <SidebarMenu className="gap-3">
            {userManagementItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`rounded-lg transition-all duration-150 ${isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-[#364153]/80 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                      {/* <item.icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`} /> */}
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 ring-2 ring-indigo-200">
            <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">Super Admin</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
