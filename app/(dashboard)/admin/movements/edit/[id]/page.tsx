"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  useGetMovementByIdQuery, 
  useUpdateMovementMutation 
} from "@/redux/api/adminApi";
import Link from "next/link";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Loader2, ArrowLeft } from "lucide-react";

interface EditMovementPageProps {
  params: Promise<{ id: string }>;
}

export default function EditMovementPage({ params }: EditMovementPageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data: movementData, isLoading: isFetching } = useGetMovementByIdQuery(id);
  const [updateMovement, { isLoading: isUpdating }] = useUpdateMovementMutation();

  const [name, setName] = useState("");

  useEffect(() => {
    if (movementData?.data) {
      setName(movementData.data.name || "");
    }
  }, [movementData]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter a movement name");
      return;
    }

    try {
      await updateMovement({ id, data: { name } }).unwrap();
      toast.success("Movement updated successfully");
      router.push("/admin/movements");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update movement");
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50/50">
        <Loader2 className="h-8 w-8 animate-spin text-[#155DFC]" />
      </div>
    );
  }

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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 text-left">
              <Link href="/admin/movements">
                <Button variant="ghost" size="icon" className="h-10 w-10 border border-gray-200 bg-white shadow-sm rounded-lg">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Group</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Update campaign movement group details
                </p>
              </div>
            </div>

            {/* Form Card */}
            <Card className="border-gray-200 shadow-sm overflow-hidden bg-white mb-6">
              <CardHeader className="bg-white border-b border-gray-100 py-4 px-6 text-left">
                <CardTitle className="text-base font-semibold text-gray-800">
                  Group Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 text-left">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Group Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter group name"
                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors h-11"
                  />
                </div>
              </CardContent>

              {/* Form Footer */}
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-end gap-3">
                <Button asChild variant="ghost" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium px-6 h-10">
                  <Link href="/admin/movements">
                    Cancel
                  </Link>
                </Button>
                <Button 
                  className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 px-6 h-10 shadow-sm"
                  onClick={handleSave}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Update Group
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
