"use client";

import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Edit2,
  Trash2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";

import { useGetAllCalendersQuery, useDeleteCalenderMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CampaignCalendarPage() {
  const { data: calendarData, isLoading } = useGetAllCalendersQuery();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteCalenderMutation();

  const events = calendarData?.data || [];

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ id: string, title: string } | null>(null);

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedEvent({ id, title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedEvent) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedEvent.id)) ? Number(selectedEvent.id) : selectedEvent.id;
      await deleteEvent(idToSubmit as any).unwrap();
      toast.success("Event deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete event");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "meeting": return "bg-blue-100 text-blue-700";
      case "rally": return "bg-red-100 text-red-700";
      case "outreach": return "bg-green-100 text-green-700";
      case "workshop": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <SubAdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Sub Admin User"
          userRole="Sub Admin"
          userInitials="SA"
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto text-left">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Campaign Calendar</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage campaign activities and events
                </p>
              </div>
              <Button asChild className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                <Link href="/sub-admin/calender/add">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Link>
              </Button>
            </div>

            {/* Calendar Card */}
            <Card className="border-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
              <CardHeader className="p-6 border-b border-gray-100 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <CardTitle className="text-base font-semibold text-gray-800 px-2">
                    Events Calendar
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-6 bg-gray-50/30">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64 py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#155DFC]" />
                    <p className="text-sm text-gray-500 mt-4 font-medium">Loading events...</p>
                  </div>
                ) : events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event: any) => (
                      <div key={event.id || event._id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group text-left">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                {event.title}
                              </h3>
                              <Badge className={`${getBadgeColor(event.event_type)} border-none font-medium px-2 py-0.5 text-[10px]`}>
                                {event.event_type}
                              </Badge>
                            </div>

                            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl text-left">
                              {event.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                              <div className="flex items-center gap-2 text-gray-500">
                                <CalendarIcon className="h-4 w-4 text-gray-400" />
                                <span className="text-xs font-medium">{event.event_date ? new Date(event.event_date).toLocaleDateString() : "No date"}</span>
                              </div>
                              {(event.start_time || event.end_time) && (
                                <div className="flex items-center gap-2 text-gray-500">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span className="text-xs font-medium">
                                    {event.start_time || "N/A"} {event.end_time ? `- ${event.end_time}` : ""}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-gray-500">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-xs font-medium">{event.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                            <Link href={`/sub-admin/calender/edit/${event.id || event._id}`}>
                              <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-600 border-gray-200 hover:bg-gray-50 rounded-lg px-4">
                                <Edit2 className="h-3.5 w-3.5" />
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 gap-2 text-red-500 border-gray-100 hover:bg-red-50 hover:border-red-100 rounded-lg px-4"
                              onClick={() => handleDeleteClick(event.id || event._id, event.title)}
                              disabled={isDeleting}
                            >
                              {isDeleting && selectedEvent?.id === (event.id || event._id) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-dashed border-gray-300 rounded-xl py-20 flex flex-col items-center justify-center text-center">
                    <div className="h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                      <CalendarIcon className="h-7 w-7 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No events yet</h3>
                    <p className="text-sm text-gray-500 max-w-[280px] mt-1 italic">
                      There are currently no events on the campaign calendar.
                    </p>
                  </div>
                )}

                {/* Standardized Delete Dialog */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogContent className="max-w-[400px]">
                    <DialogHeader className="items-center">
                      <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                      <DialogTitle className="text-xl font-bold text-center">Delete Event?</DialogTitle>
                      <DialogDescription className="text-center text-gray-600">
                        Are you sure you want to delete event <span className="font-semibold text-gray-900">"{selectedEvent?.title}"</span>? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:flex-1 h-11 border-gray-200">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={confirmDelete}
                        disabled={isDeleting}
                        className="w-full sm:flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-medium"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Delete Event"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
