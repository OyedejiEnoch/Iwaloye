"use client"

import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  Newspaper,
  PenSquare,
  CalendarCheck,
  FileText,
  UserPlus,
  Mail,
  Calendar,
  CheckCircle,
  UserCircle,
  Users,
} from "lucide-react";
import { useGetAllCalendersQuery, useGetAllLeadersQuery, useGetAllNewsQuery, useGetAllVolunteersQuery } from "@/redux/api/adminApi";


const recentActivity = [
  {
    text: "Draft: 'Campaign Rally Recap' ready for review",
    time: "1 hour ago",
    icon: FileText,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    text: "Newsletter for March sent to 1,200 subscribers",
    time: "3 hours ago",
    icon: Mail,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    text: "12 new volunteers registered via the website",
    time: "Yesterday",
    icon: UserPlus,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    text: "Campaign Calendar updated with 2 new events",
    time: "2 days ago",
    icon: CalendarCheck,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

export default function SubAdminDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: newsData, isLoading, error: newsError } = useGetAllNewsQuery();
  const { data: calendersData, error: calendersError } = useGetAllCalendersQuery()
  // const { data: leadersData, error: leadersError } = useGetAllLeadersQuery();
  const { data: volunteersData, error: volunteersError } = useGetAllVolunteersQuery();

  useEffect(() => {
    const checkErrors = (...errors: any[]) => {
      for (const error of errors) {
        if (error && (error.status === 401 || error.status === 403)) {
          dispatch(logout());
          router.push("/login");
          return;
        }
      }
    };

    checkErrors(newsError, volunteersError, calendersError);
  }, [newsError, volunteersError, calendersError, dispatch, router]);

  const newsItems = newsData?.data || (Array.isArray(newsData) ? newsData : newsData ? [newsData] : []);
  const calendersItems = calendersData?.data || (Array.isArray(calendersData) ? calendersData : calendersData ? [calendersData] : []);
  // const leadersItems = leadersData?.data || (Array.isArray(leadersData) ? leadersData : leadersData ? [leadersData] : []);
  const volunteersItems = volunteersData?.data || (Array.isArray(volunteersData) ? volunteersData : volunteersData ? [volunteersData] : []);
  const volunteersMeta = volunteersData?.meta || volunteersData;
  const totalVolunteers = volunteersMeta?.total || volunteersItems.length;

  const stats = [
    {
      label: "Published News",
      value: newsItems.length,
      icon: Newspaper,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Volunteers",
      value: totalVolunteers,
      icon: Users,
      iconBg: "bg-[#EFF6FF]",
      iconColor: "text-indigo-600",
    },
  ];


  return (
    <>
      <SubAdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Sub Admin"
          userRole="Content Manager"
          userInitials="SA"
        />
        <main className="flex-1 overflow-y-auto  p-6 px-7 bg-gray-50">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#101828]">Dashboard Overview</h1>
            <p className="text-[#6A7282] mt-1 text-sm">Welcome back! Here's your content summary.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  mb-8 px-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-[13px] text-[#6A7282] mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {/* <p className="text-xs text-emerald-600 mt-1">{stat.change}</p> */}
                </div>
                <div className={`h-12 w-12 rounded-full ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
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
