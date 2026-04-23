"use client";

import { useState, useRef, useEffect, use } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  UploadCloud,
  Save,
  Loader2,
  X,
  ArrowLeft,
} from "lucide-react";
import { useGetNewsByIdQuery, useUpdateNewsMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default function EditNewsArticlePage({ params }: EditNewsPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: newsData, isLoading: isFetching } = useGetNewsByIdQuery(id);
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();

  const [newsTitle, setNewsTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (newsData) {
      const news = newsData.data || newsData;
      setNewsTitle(news.title || "");
      setArticleBody(news.body || "");

      // Use image_or_media_url if available, fallback to image_or_media
      const imageUrl = news.image_or_media_url || news.image_or_media;
      if (imageUrl) {
        const fullImageUrl = imageUrl.startsWith('http')
          ? imageUrl
          : `/${imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl}`;
        setImagePreview(fullImageUrl);
      }
    }
  }, [newsData]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const output = URL.createObjectURL(file);
      setImagePreview(output);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
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
      await updateNews({ id, data: formData }).unwrap();
      toast.success("News article updated successfully");
      router.push("/sub-admin/news");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update news article");
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
      <SubAdminSidebar />
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
              <div className="flex items-center gap-4">
                <Link href="/sub-admin/news">
                  <Button variant="ghost" size="icon" className="h-10 w-10 border border-gray-200 bg-white shadow-sm rounded-lg">
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit News Article</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Update your publication details
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
              <h2 className="text-base font-semibold text-[#101828]">Article Details</h2>

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
                    className="min-h-[200px] border-gray-200 bg-gray-50/50 resize-y"
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
                <Link href="/sub-admin/news">
                  <Button variant="outline" className="border-gray-200 text-gray-700 font-medium px-6 h-10">
                    Cancel
                  </Button>
                </Link>
                <Button
                  className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium px-6 h-10 gap-2"
                  onClick={handleSave}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Update Article
                </Button>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
