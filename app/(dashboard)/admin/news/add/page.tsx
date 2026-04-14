"use client";
import { useState, useRef } from "react";

import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Plus,
  Search,
  UploadCloud,
  Eye,
  Save,
  Loader2,
  X,
} from "lucide-react";
import { useCreateNewsMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddNewsArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newsTitle, setNewsTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createNews, { isLoading }] = useCreateNewsMutation();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async (publish: boolean) => {
    if (!newsTitle.trim()) {
      toast.error("Please enter a news title");
      return;
    }
    if (!articleBody.trim()) {
      toast.error("Please enter article content");
      return;
    }

    const formData = new FormData();
    formData.append("title", newsTitle);
    formData.append("body", articleBody);
    if (selectedImage) {
      formData.append("image_or_media", selectedImage);
    }

    try {
      await createNews(formData).unwrap();
      toast.success("News article created successfully");
      router.push("/admin/news");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create news article");
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">News & Publications</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and publish news articles
                </p>
              </div>
              {/* <Link href="/admin/news/add">
                <Button className="bg-[#4F00FF] hover:bg-[#3d00cc] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Create News Article
                </Button>
              </Link> */}
            </div>

            {/* Main Content Area */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
              
              {/* Form Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#101828]">
                  Create New Article
                </h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-9 bg-gray-50 border-gray-100 focus:bg-white h-10 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newsTitle" className="text-sm font-medium text-gray-700">News Title</Label>
                  <Input 
                    id="newsTitle" 
                    placeholder="Enter article title" 
                    className="h-11 border-gray-200 bg-gray-50/50"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    maxLength={255}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="articleBody" className="text-sm font-medium text-gray-700">Article Body</Label>
                  <Textarea 
                    id="articleBody" 
                    placeholder="Write your article content here..." 
                    className="min-h-[180px] border-gray-200 bg-gray-50/50 resize-y"
                    value={articleBody}
                    onChange={(e) => setArticleBody(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Featured Image & Media</Label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={removeImage}
                          className="gap-2"
                        >
                          <X className="h-4 w-4" />
                          Remove Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-gray-300 rounded-xl bg-gray-50/30 p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                        <UploadCloud className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Click to upload or drag and drop images
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or WebP (max. 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="border-t border-gray-100 pt-6 flex justify-end gap-3 mt-8">
                <Link href="/admin/news">
                  <Button variant="outline" className="border-gray-200 text-gray-700 font-medium px-6 h-10">
                    Cancel
                  </Button>
                </Link>
                <Button variant="outline" className="border-gray-200 text-gray-700 font-medium px-6 h-10 gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button 
                  className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium px-6 h-10 gap-2"
                  onClick={() => handleSave(true)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save & Publish
                </Button>
              </div>

            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
