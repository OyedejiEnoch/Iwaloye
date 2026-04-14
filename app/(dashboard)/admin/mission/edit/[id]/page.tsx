"use client";

import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Eye, Save, X, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetVisionByIdQuery, useUpdateVisionMutation } from "@/redux/api/adminApi";

interface EditMissionPageProps {
  params: Promise<{ id: string }>;
}

export default function EditMissionVisionPage({ params }: EditMissionPageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data: visionData, isLoading: isFetching } = useGetVisionByIdQuery(id);
  const [updateVision, { isLoading: isUpdating }] = useUpdateVisionMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visionData) {
      const data = visionData.data || visionData;
      setTitle(data.title || "");
      setContent(data.content || "");
      if (data.banner_image) {
        const fullImageUrl = data.banner_image.startsWith('http') 
          ? data.banner_image 
          : `${process.env.NEXT_PUBLIC_BASE_URL}/${data.banner_image.startsWith('/') ? data.banner_image.slice(1) : data.banner_image}`;
        setImagePreview(fullImageUrl);
      }
    }
  }, [visionData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be less than 2MB");
        return;
      }
      setImageFile(file);
      const output = URL.createObjectURL(file);
      setImagePreview(output);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (imageFile) {
      formData.append('banner_image', imageFile);
    }

    try {
      await updateVision({ id, data: formData }).unwrap();
      toast.success("Mission updated successfully");
      router.push("/admin/mission");
    } catch (error) {
      console.error("Failed to update mission:", error);
      toast.error("Failed to update mission");
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Edit Mission & Vision</h1>
              <p className="text-sm text-gray-500 mt-1">
                Refine your organization's mission and vision statement
              </p>
            </div>

            {/* Content Editor Card */}
            <Card className="border-gray-200 shadow-sm overflow-hidden rounded-sm">
              <CardHeader className="bg-white border-b border-gray-100 py-4 px-6">
                <CardTitle className="text-base font-semibold text-gray-800">
                  Content Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Header Title */}
                <div className="space-y-2">
                  <Label htmlFor="header-title" className="text-sm font-medium text-[#0A0A0A]">
                    Header Title
                  </Label>
                  <Input
                    id="header-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter header title"
                    className="bg-gray-50 text-black border-gray-200 focus:bg-white transition-colors h-11"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium text-[#0A0A0A]">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your mission and vision statement"
                    className="min-h-50 text-black bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Banner Image */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#0A0A0A]">
                    Banner Image (Optional)
                  </Label>
                  <div
                    className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden"
                    onClick={() => !imagePreview && fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-48">
                        <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-center">
                        <div className="flex justify-center">
                          <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="h-5 w-5 text-indigo-600" />
                          </div>
                        </div>
                        <div className="flex flex-col text-sm text-gray-600">
                          <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Click to upload
                          </span>
                          <p className="pl-1 text-xs text-gray-400 mt-1">
                            PNG, JPG or WebP (max. 2MB)
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                    />
                  </div>
                </div>
              </CardContent>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                <div className="text-xs text-gray-400 leading-tight">
                  <p>Last edited by: <span className="font-medium text-gray-600">Admin User</span></p>
                  <p className="mt-0.5">Last edited: March 9, 2026 at 10:30 AM</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2 text-gray-600 border-gray-200 hover:bg-gray-50 font-medium px-4 rounded-none" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSubmit} disabled={isUpdating} className="gap-2 bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium px-4 rounded-none">
                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
