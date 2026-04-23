"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  Eye,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle
} from "lucide-react";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";
import { useGetAllNewsQuery, useDeleteNewsMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function NewsPublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: newsData, isLoading } = useGetAllNewsQuery();
  const [deleteNews, { isLoading: isDeleting }] = useDeleteNewsMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<{ id: string, title: string } | null>(null);

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedNews({ id, title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedNews) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedNews.id)) ? Number(selectedNews.id) : selectedNews.id;
      await deleteNews(idToSubmit as any).unwrap();
      toast.success("News article deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete news article");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedNews(null);
    }
  };

  const newsItems = newsData?.data || (Array.isArray(newsData) ? newsData : []);

  const filteredItems = newsItems.filter((article: any) =>
    (article.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SubAdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Sub Admin User"
          userRole="Sub Admin"
          userInitials="SA"
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50 bg-white">
          <div className="max-w-8xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">News & Publications</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and publish news articles
                </p>
              </div>
              <Link href="/sub-admin/news/add">
                <Button className="bg-[#155DFC] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Create News Article
                </Button>
              </Link>
            </div>

            <div className="bg-[#F9FAFB] p-6">
              {/* Main Content Area */}
              <Card className="border-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
                <CardContent className="p-0">
                  {/* Search bar */}
                  <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-base font-semibold text-gray-800 px-2">Published Articles</h2>
                    <div className="relative w-full max-w-xs">
                      {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white h-10 rounded-lg text-sm"
                      /> */}
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="border-b border-gray-100">
                          <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[45%]">Title</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Author</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Date Published</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Views</TableHead>
                          <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-gray-500">
                              <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#155DFC] mb-2" />
                              <p className="text-sm">Loading articles...</p>
                            </TableCell>
                          </TableRow>
                        ) : filteredItems.length > 0 ? (
                          filteredItems.map((article: any) => (
                            <TableRow key={article.id || article._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              <TableCell className="py-4 px-6 font-medium text-gray-900">
                                <span className="line-clamp-1 max-w-[400px]">{article.title}</span>
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600">
                                {article.author || article.admin?.full_name || "Admin"}
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-500">
                                {article.created_at ? new Date(article.created_at).toLocaleDateString() : (article.datePublished || "N/A")}
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-500 text-center">
                                {article.views || 0}
                              </TableCell>
                              <TableCell className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Link href={`/sub-admin/news/edit/${article.id || article._id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    onClick={() => handleDeleteClick(article.id || article._id, article.title)}
                                    disabled={isDeleting}
                                  >
                                    {isDeleting && selectedNews?.id === (article.id || article._id) ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-gray-500 italic">
                              No news articles found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Standardized Delete Dialog */}
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-[400px]">
                  <DialogHeader className="items-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                    <DialogTitle className="text-xl font-bold text-center">Delete News Article?</DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                      Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedNews?.title}"</span>? This action cannot be undone.
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
                        "Delete Article"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
