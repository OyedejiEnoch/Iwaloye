"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateMovementMutation } from "@/redux/api/adminApi";
import Link from "next/link";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Loader2, ArrowLeft, Plus } from "lucide-react";

const AddMovementPage = () => {

  const router = useRouter();
  const [name, setName] = useState("");
  const [createMovement, { isLoading }] = useCreateMovementMutation();

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter a movement name");
      return;
    }

    try {
      await createMovement({ name }).unwrap();
      toast.success("Movement created successfully");
      router.push("/admin/movements");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create movement");
    }
  };


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
                <Button className="bg-[#4F00FF] hover:bg-[#3d00cc] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add Movement
                </Button>
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="space-y-8">

              {/* Add Movement Form Section */}
              <div className="mb-8">
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-6">
                  <h2 className="text-base font-semibold text-[#101828]">Volunteer Data</h2>

                  <div className="space-y-3 mt-4">
                    <Label htmlFor="movement" className="text-sm font-medium text-gray-700">Add Movement</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Add a new movement"
                      className="h-11 border-gray-200 bg-gray-50/50"
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-6 flex justify-end gap-3 mt-4">
                    <Link href="/admin/movements">
                      <Button variant="outline" className="border-gray-200 text-gray-700 font-medium px-6 h-10">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 px-6 h-10 shadow-sm"
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save Movement
                    </Button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );

}

export default AddMovementPage