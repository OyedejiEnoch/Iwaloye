"use client";

import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Loader2 } from "lucide-react";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateCalenderMutation } from "@/redux/api/adminApi";

interface EventFormData {
  title: string;
  description: string;
  event_date: string;
  event_type: string;
  start_time: string;
  end_time: string;
  location: string;
}

export default function AddEventPage() {
  const router = useRouter();
  const [createEvent, { isLoading }] = useCreateCalenderMutation();

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    event_date: "",
    event_type: "Meeting",
    start_time: "",
    end_time: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, event_type: value }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.event_date || !formData.location.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createEvent(formData).unwrap();
      toast.success("Event created successfully");
      router.push("/sub-admin/calender");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create event");
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 text-left">
              <h1 className="text-2xl font-bold text-gray-900">Campaign Calendar</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage campaign activities and events
              </p>
            </div>

            {/* Form Card */}
            <Card className="border-gray-200 shadow-sm overflow-hidden bg-white mb-6">
              <CardHeader className="bg-white border-b border-gray-100 py-4 px-6 text-left">
                <CardTitle className="text-base font-semibold text-gray-800">
                  Create New Event
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 text-left">
                {/* Campaign Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Event Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors h-11"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the event details"
                    className="min-h-[140px] bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Date and Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="event_date" className="text-sm font-medium text-gray-700">
                      Date
                    </Label>
                    <Input
                      id="event_date"
                      type="date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-gray-200 focus:bg-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Event Type
                    </Label>
                    <Select value={formData.event_type} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-gray-50 border-gray-200 h-11">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                        <SelectItem value="Rally">Rally</SelectItem>
                        <SelectItem value="Outreach">Outreach</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Times */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start_time" className="text-sm font-medium text-gray-700">
                      Start Time (Optional)
                    </Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={formData.start_time}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-gray-200 focus:bg-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_time" className="text-sm font-medium text-gray-700">
                      End Time (Optional)
                    </Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={formData.end_time}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-gray-200 focus:bg-white h-11"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter event location"
                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors h-11"
                  />
                </div>
              </CardContent>

              {/* Form Footer */}
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-end gap-3">
                <Button asChild variant="ghost" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium px-6 h-10">
                  <Link href="/sub-admin/calender">
                    Cancel
                  </Link>
                </Button>
                <Button 
                  className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 px-6 h-10 shadow-sm leading-none"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Event
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
