"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Mail,
  Calendar,
  BookOpen,
  Settings,
  ChevronRight,
  PenSquare,
  MessageSquare,
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
  { title: "Overview", href: "/sub-admin", icon: LayoutDashboard },
];

const contentItems = [
  { title: "Mission & Vision", href: "/sub-admin/mission", },
  { title: "News & Publications", href: "/sub-admin/news",  },
  { title: "Meet Our Leaders", href: "/sub-admin/leaders",  },
  { title: "FAQ Management", href: "/sub-admin/faq", },
  { title: "Newsletter", href: "/sub-admin/newsletter",  },
  { title: "Campaign Calender", href: "/sub-admin/calender", },
];



export default function SubAdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div>
            <p className="font-bold text-gray-900 text-sm">Content Editor - Judith</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {/* Overview Section */}
        <SidebarGroup>
        
          <SidebarMenu>
            {overviewItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`rounded-lg transition-all duration-150 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className={`h-4 w-4 ${isActive ? "text-emerald-600" : "text-gray-400"}`} />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* <SidebarSeparator className="my-2" /> */}

        {/* Content Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 mb-1">
            Content Management
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-4">
            {contentItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`rounded-lg transition-all duration-150 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-[#364153D9] hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                    {isActive && <CircleArrowOutUpRight className="text-[#155DFC]" />}
                      {/* <item.icon className={`h-4 w-4 ${isActive ? "text-emerald-600" : "text-gray-400"}`} /> */}
                      <span className={`${isActive ? "text-[#155DFC]" : "text-sm"}`}>{item.title}</span>
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
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Sub Admin</p>
            <p className="text-xs text-gray-500 truncate">Content Manager</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
