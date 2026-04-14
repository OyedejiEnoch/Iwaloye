"use client";

import { useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Link from "next/link";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Search,
} from "lucide-react";

const initialVolunteers = [
  {
    id: 1,
    name: "John Adewale",
    state: "Abia",
    lga: "Alyedaade",
    ward: "Ward 5",
    gmail: "guru@wtf.com",
    phone: "+2348012345678",
    disabled: "No",
    movement: "Youth Leaders",
    dateJoined: "Jan 15, 2026",
  },
  {
    id: 2,
    name: "Sarah Okonkwo",
    state: "Osun",
    lga: "Ife North",
    ward: "Ward 2",
    gmail: "guru@wtf.com",
    phone: "+2348023456789",
    disabled: "No",
    movement: "Community Organizers",
    dateJoined: "Jan 20, 2026",
  },
  {
    id: 3,
    name: "Michael Eze",
    state: "Ekiti",
    lga: "Iwo",
    ward: "Ward 8",
    gmail: "guru@wtf.com",
    phone: "+2348045678901",
    disabled: "Yes",
    movement: "Youth Leaders",
    dateJoined: "Feb 5, 2026",
  },
  {
    id: 4,
    name: "Grace Nnamdi",
    state: "Osun",
    lga: "Orolu",
    ward: "Ward 8",
    gmail: "guru@wtf.com",
    phone: "+2348034567890",
    disabled: "No",
    movement: "Women's Group",
    dateJoined: "Feb 12, 2026",
  },
  {
    id: 5,
    name: "David Okafor",
    state: "Lagos",
    lga: "Ejigbo",
    ward: "Ward 1",
    gmail: "guru@wtf.com",
    phone: "+2348056789012",
    disabled: "No",
    movement: "Community Organizers",
    dateJoined: "Feb 28, 2026",
  },
];

export default function MovementManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVolunteers = initialVolunteers.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.phone.includes(searchTerm)
  );

  return (
    <>
      <AdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Admin User"
          userRole="Super Admin"
          userInitials="AD"
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Volunteers & Community Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage volunteer registrations and community data
                </p>
              </div>
              <Link href="/admin/movement/add">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add Movement
                </Button>
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="space-y-6">
              {/* Volunteer Data Header (Visual only from design) */}
              <div className="px-2">
                <h2 className="text-base font-semibold text-gray-800">Volunteer Data</h2>
              </div>

              {/* Stats Summary Card */}
              <Card className="border-gray-200 shadow-sm bg-white rounded-xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="text-center">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Movement</p>
                      <p className="text-5xl font-bold text-gray-900 leading-none">12</p>
                    </div>
                    <div className="text-center border-l border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total Volunteers</p>
                      <p className="text-5xl font-bold text-gray-900 leading-none">2,847</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filters and Table Card */}
              <Card className="border-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
                <CardContent className="p-0">
                  {/* Search Bar */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-semibold text-gray-800">Filter Volunteers</h3>
                      <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search gmail/ phone number"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-50 border-gray-200 focus:bg-white h-10 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50/30">
                        <TableRow className="border-b border-gray-100">
                          <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Name</TableHead>
                          <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">State</TableHead>
                          <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">LGA</TableHead>
                          <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Ward</TableHead>
                          <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Gmail</TableHead>
                          <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Phone Number</TableHead>
                          <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Disabled</TableHead>
                          <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Movement</TableHead>
                          <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-gray-500 text-right">Date Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredVolunteers.map((v) => (
                          <TableRow key={v.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <TableCell className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{v.name}</TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-600">{v.state}</TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-600">{v.lga}</TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-600">{v.ward}</TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-500">{v.gmail}</TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-600 font-mono tracking-tight">{v.phone}</TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-600">{v.disabled}</TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-600">{v.movement}</TableCell>
                            <TableCell className="py-4 px-6 text-sm text-gray-500 text-right whitespace-nowrap">{v.dateJoined}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
