"use client";

import { useState, useRef } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateLeaderMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";

export default function AddLeaderPage() {
  const router = useRouter();
  const [createLeader, { isLoading }] = useCreateLeaderMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    position: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length <= 255) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must not be greater than 2MB");
        return;
      }
      setProfilePicture(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setProfilePicture(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.position) {
      toast.error("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("position", formData.position);
    if (profilePicture) {
      data.append("profile_picture", profilePicture);
    }

    try {
      await createLeader(data).unwrap();
      toast.success("Leader added successfully");
      router.push("/admin/leaders");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add leader");
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Meet Our Leaders</h1>
              <p className="text-sm text-gray-500">
                Manage leadership team profiles
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="border-gray-200 shadow-sm overflow-hidden bg-white mb-6">
                <CardContent className="p-8">
                  <h2 className="text-base font-semibold text-gray-800 mb-8 border-b pb-4">Profile Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        placeholder="Enter first name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-purple-500 rounded-lg"
                        required
                        maxLength={255}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">Last Name</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        placeholder="Enter last name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-purple-500 rounded-lg"
                        required
                        maxLength={255}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <Label htmlFor="position" className="text-sm font-medium text-gray-700">Position / Role</Label>
                    <Input
                      id="position"
                      name="position"
                      placeholder="Enter position or role"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="h-12 border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-purple-500 rounded-lg w-full"
                      required
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Profile Picture</Label>
                    <div 
                      className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                        previewUrl ? "border-purple-200 bg-purple-50/30" : "border-gray-200 hover:border-purple-300 bg-gray-50/50"
                      }`}
                    >
                      {previewUrl ? (
                        <div className="relative aspect-video max-w-md mx-auto p-4 flex items-center justify-center">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-48 h-48 rounded-full border-4 border-white shadow-xl object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-6 right-6 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          className="flex flex-col items-center justify-center py-12 px-4 cursor-pointer group"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-200 mb-4">
                            <Upload className="h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Click to upload or drag and drop images</p>
                          <p className="text-xs text-gray-500 italic">PNG, JPG or WebP (max. 2MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/leaders")}
                  className="h-11 px-8 rounded-lg border-gray-200 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 px-8 rounded-lg bg-[#4F00FF] hover:bg-[#3d00cc] text-white font-medium shadow-sm transition-all flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Leader"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
