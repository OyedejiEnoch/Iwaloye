"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardNavbarProps {
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

export default function DashboardNavbar({
  userName = "Admin User",
  userRole = "Super Admin",
  userInitials = "AD",
}: DashboardNavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 md:px-6 sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-gray-500 hover:text-gray-900" />
        {/* <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-600 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300"
          />
        </div> */}
      </div>
      <div className="flex items-center gap-4">


      </div>
    </header>
  );
}
