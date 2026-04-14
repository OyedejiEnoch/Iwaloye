"use client";

import Link from "next/link";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Send, Loader2, FileText, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useCreateNewsletterMutation } from "@/redux/api/adminApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddNewsletterPage() {
  const router = useRouter();
  const [createNewsletter, { isLoading }] = useCreateNewsletterMutation();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [newsletterFile, setNewsletterFile] = useState<File | null>(null);

  const coverImageRef = useRef<HTMLInputElement>(null);
  const newsletterFileRef = useRef<HTMLInputElement>(null);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Cover image must be less than 5MB");
        return;
      }
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsletterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Newsletter file must be less than 10MB");
        return;
      }
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setNewsletterFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (coverImage) formData.append("cover_image", coverImage);
    if (newsletterFile) formData.append("file", newsletterFile);

    try {
      await createNewsletter(formData).unwrap();
      toast.success("Newsletter uploaded and sent successfully");
      router.push("/admin/newsletter");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload newsletter");
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Newsletter Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Upload and send newsletters to registered users
              </p>
            </div>

            {/* Form Card */}
            <Card className="border-gray-200 shadow-sm overflow-hidden bg-white mb-6">
              <CardHeader className="bg-white border-b border-gray-100 py-4 px-6">
                <CardTitle className="text-base font-semibold text-gray-800">
                  Published Newsletters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Newsletter Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Newsletter Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., March 2026 Campaign Update"
                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors h-11"
                    required
                    maxLength={255}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this newsletter issue"
                    className="min-h-35 bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                    required
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Cover Image
                  </Label>
                  <div 
                    onClick={() => coverImageRef.current?.click()}
                    className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden"
                  >
                    <input 
                      type="file" 
                      ref={coverImageRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleCoverImageChange} 
                    />
                    {coverImagePreview ? (
                      <div className="relative w-full max-w-[200px] h-[120px]">
                        <img src={coverImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCoverImage(null);
                            setCoverImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-center">
                        <div className="flex justify-center">
                          <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ImageIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                        </div>
                        <div className="flex flex-col text-sm text-gray-600">
                          <span className="font-semibold text-indigo-600">
                            Click to upload or drag and drop images
                          </span>
                          <p className="pl-1 text-xs text-gray-400 mt-1">
                            PNG, JPG or WebP (max. 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Newsletter File (PDF) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Newsletter File (PDF)
                  </Label>
                  <div 
                    onClick={() => newsletterFileRef.current?.click()}
                    className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <input 
                      type="file" 
                      ref={newsletterFileRef} 
                      className="hidden" 
                      accept="application/pdf" 
                      onChange={handleNewsletterFileChange} 
                    />
                    {newsletterFile ? (
                      <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative pr-10">
                        <FileText className="h-8 w-8 text-indigo-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{newsletterFile.name}</p>
                          <p className="text-xs text-gray-500">{(newsletterFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewsletterFile(null);
                          }}
                          className="absolute top-1/2 -right-2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-1"
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
                          <span className="font-semibold text-indigo-600">
                            Click to upload newsletter PDF
                          </span>
                          <p className="pl-1 text-xs text-gray-400 mt-1">
                            PDF (max. 10MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              {/* Form Footer */}
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-end gap-3">
                <Button asChild variant="ghost" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium px-6 h-10">
                  <Link href="/admin/newsletter">
                    Cancel
                  </Link>
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 px-6 h-10 shadow-sm leading-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Upload & Send to Subscribers
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Published Newsletters Section Header (bottom part of card) */}
            <div className="px-2">
               <h3 className="text-sm font-semibold text-gray-800">Published Newsletters</h3>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
