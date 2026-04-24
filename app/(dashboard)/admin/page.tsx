"use client"
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  Users,
  Newspaper,
  UserCircle,
  FileText,
  UserPlus,
  Mail,
  CalendarCheck,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useGetAllNewsQuery, useGetAllLeadersQuery, useGetAllVolunteersQuery, useGetAllCalendersQuery } from "@/redux/api/adminApi";

const recentActivity = [
  {
    text: "New article published: Community Outreach Success",
    time: "2 hours ago",
    icon: FileText,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-gray-500",
  },
  {
    text: "5 new volunteers joined from Lagos",
    time: "4 hours ago",
    icon: UserPlus,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-gray-500",
  },
  {
    text: "March Newsletter uploaded and sent",
    time: "1 day ago",
    icon: Mail,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-gray-500",
  },
  {
    text: "Town Hall Meeting scheduled for March 15",
    time: "2 days ago",
    icon: CalendarCheck,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-gray-500",
  },
  {
    text: "Content Editor role assigned to John Doe",
    time: "3 days ago",
    icon: ShieldCheck,
    iconBg: "bg-[#F3F4F6]",
    iconColor: "text-gray-500",
  },
];




import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: newsData, isLoading, error: newsError } = useGetAllNewsQuery();
  // const { data: leadersData, error: leadersError } = useGetAllLeadersQuery();
  const { data: volunteersData, error: volunteersError } = useGetAllVolunteersQuery();
  const { data: calendersData, error: calendersError } = useGetAllCalendersQuery()

  useEffect(() => {
    const checkErrors = (errorObjs: { name: string, error: any }[]) => {
      for (const { name, error } of errorObjs) {
        if (error) {
          if (error.status === 401) {
            toast.error("Session expired. Logging out...");
            dispatch(logout());
            router.push("/login");
            return;
          }
          if (error.status === 403) {
            console.warn(`Admin restricted from ${name} API:`, error);
          }
        }
      }
    };

    checkErrors([
      { name: "News", error: newsError },
      { name: "Volunteers", error: volunteersError },
      { name: "Calendars", error: calendersError }
    ]);
  }, [newsError, volunteersError, calendersError, dispatch, router]);

  const newsItems = newsData?.data || (Array.isArray(newsData) ? newsData : newsData ? [newsData] : []);
  const volunteersItems = volunteersData?.data || (Array.isArray(volunteersData) ? volunteersData : volunteersData ? [volunteersData] : []);
  const volunteersMeta = volunteersData?.meta || volunteersData;
  const totalVolunteers = volunteersMeta?.total !== undefined ? volunteersMeta.total : volunteersItems.length;
  const calendersItems = calendersData?.data || (Array.isArray(calendersData) ? calendersData : calendersData ? [calendersData] : []);

  const stats = [
    {
      label: "Total Volunteers",
      value: (volunteersError && 'status' in volunteersError && volunteersError.status === 403) ? "0" : totalVolunteers,
      change: "+12.5%",
      icon: Users,
      iconBg: "bg-[#EFF6FF]",
      iconColor: "text-indigo-600",
    },
    {
      label: "Published News",
      value: (newsError && 'status' in newsError && newsError.status === 403) ? "0" : newsItems.length,
      change: "+5 this month",
      icon: Newspaper,
      iconBg: "bg-[#FAF5FF]",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <>
      <AdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Admin User"
          userRole="Super Admin"
          userInitials="AD"
        />
        <main className="flex-1 overflow-y-auto p-6 px-7 bg-gray-50">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#101828]">Dashboard Overview</h1>
            <p className="text-[#6A7282] mt-1 text-sm">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 px-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg border border-gray-100 shadow-xs p-5 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-[13px] text-[#6A7282] mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {/* <p className="text-xs text-green-600 mt-1">{stat.change}</p> */}
                </div>
                <div className={`h-12 w-12 rounded-lg ${stat.iconBg} flex items-center justify-center shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
            {/* Recent Activity */}
            {/* <div className="bg-white rounded-lg border border-gray-100 shadow-xs p-5">
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="h-4 w-4 text-gray-400" />
                <h2 className="text-base font-semibold text-gray-800">Recent Activity</h2>
              </div>
              <ul className="space-y-5">
                {recentActivity.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className={`mt-0.5 h-10 w-10 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`h-5 w-5 ${item.iconColor} `} />
                    </div>
                    <div>
                      <p className="text-sm text-[#101828] font-medium leading-snug">{item.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-5">
                <CalendarCheck className="h-4 w-4 text-gray-400" />
                <h2 className="text-base font-semibold text-gray-800">Upcoming Campaign Events</h2>
              </div>
              <ul className="space-y-5">
                {calendersItems.slice(0, 4).map((event: any) => {
                  const date = event.event_date ? new Date(event.event_date) : null;
                  const day = date ? date.getDate() : "--";
                  const month = date ? date.toLocaleString('default', { month: 'short' }) : "N/A";

                  return (
                    <li key={event.id || event._id} className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[#EFF6FF] flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-indigo-400 leading-none">{day}</span>
                        <span className="text-[10px] text-indigo-400 leading-none mt-0.5 uppercase">{month}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#101828] line-clamp-1">{event.title}</p>
                        <p className="text-xs text-gray-500">
                          {event.start_time || "N/A"} {event.end_time ? `- ${event.end_time}` : ""}
                        </p>
                        <p className="text-xs text-gray-400 line-clamp-1">{event.location}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
