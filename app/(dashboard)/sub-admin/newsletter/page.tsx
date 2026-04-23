"use client";

import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
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
  Edit2,
  Trash2,
  Send,
  Loader2,
  AlertCircle,
  FileText
} from "lucide-react";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";
import { useGetAllNewsletterQuery, useDeleteNewsletterMutation, useSendNewsletterMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
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

export default function NewsletterManagementPage() {
  const { data: newslettersData, isLoading, isError } = useGetAllNewsletterQuery();

  const [deleteNewsletter, { isLoading: isDeleting }] = useDeleteNewsletterMutation();
  const [sendNewsletter, { isLoading: isSending }] = useSendNewsletterMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<{ id: string, title: string } | null>(null);

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedNewsletter({ id, title });
    setDeleteDialogOpen(true);
  };

  const handleSendClick = (id: string, title: string) => {
    setSelectedNewsletter({ id, title });
    setSendDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedNewsletter) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedNewsletter.id)) ? Number(selectedNewsletter.id) : selectedNewsletter.id;
      await deleteNewsletter(idToSubmit as any).unwrap();
      toast.success("Newsletter deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete newsletter");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedNewsletter(null);
    }
  };

  const confirmSend = async () => {
    if (!selectedNewsletter) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedNewsletter.id)) ? Number(selectedNewsletter.id) : selectedNewsletter.id;
      await sendNewsletter(idToSubmit as any).unwrap();
      toast.success("Newsletter sent to subscribers successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send newsletter");
    } finally {
      setSendDialogOpen(false);
      setSelectedNewsletter(null);
    }
  };

  const newsletterList = newslettersData?.data || (Array.isArray(newslettersData) ? newslettersData : []);

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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Newsletter Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Upload and send newsletters to registered users
                </p>
              </div>
              <Button asChild className="bg-[#155DFC] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                <Link href="/sub-admin/newsletter/add">
                  <Plus className="h-4 w-4" />
                  Upload Newsletter
                </Link>
              </Button>
            </div>

            {/* Main Content Area */}
            <Card className="border-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
              <CardContent className="p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-6">Published Newsletters</h2>

                {/* Stats row inside card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-6 text-center">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total Newsletters</p>
                    <p className="text-4xl font-bold text-gray-900">{newsletterList.length}</p>
                  </div>
                  <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-6 text-center">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Email Subscribers</p>
                    <p className="text-4xl font-bold text-gray-900">0</p>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mx-[-1.5rem]">
                  <Table>
                    <TableHeader className="bg-gray-50/30">
                      <TableRow className="border-b border-gray-100">
                        <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[45%]">Title</TableHead>
                        <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Uploaded By</TableHead>
                        <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Date Published</TableHead>
                        <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Views</TableHead>
                        <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-48 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center">
                              <Loader2 className="h-8 w-8 animate-spin text-[#155DFC] mb-2" />
                              <p className="text-sm font-medium">Loading newsletters...</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : newsletterList.length > 0 ? (
                        newsletterList.map((nl: any) => (
                          <TableRow key={nl.id || nl._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <TableCell className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-indigo-500 shrink-0" />
                                <span className="font-medium text-gray-900 truncate max-w-[300px]">{nl.title}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-600">
                              {nl.admin?.full_name || nl.uploadedBy || "Admin"}
                            </TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-500">
                              {nl.created_at ? new Date(nl.created_at).toLocaleDateString() : (nl.datePublished || "N/A")}
                            </TableCell>
                            <TableCell className="py-4 px-4 text-sm text-gray-500 text-center">
                              {nl.views || 0}
                            </TableCell>
                            <TableCell className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg"
                                  title="Send to Subscribers"
                                  onClick={() => handleSendClick(nl.id || nl._id, nl.title)}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                  onClick={() => handleDeleteClick(nl.id || nl._id, nl.title)}
                                  disabled={isDeleting}
                                >
                                  {isDeleting && selectedNewsletter?.id === (nl.id || nl._id) ? (
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
                          <TableCell colSpan={5} className="h-48 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center">
                              <AlertCircle className="h-8 w-8 text-gray-300 mb-2" />
                              <p className="text-lg font-medium text-gray-900">No newsletters yet</p>
                              <p className="text-sm text-gray-500 mt-1">Upload your first newsletter to engage with subscribers</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent className="max-w-[400px]">
                <DialogHeader className="items-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                  <DialogTitle className="text-xl font-bold text-center">Delete Newsletter?</DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedNewsletter?.title}"</span>? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:flex-1 h-11 border-gray-200 font-medium">Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="w-full sm:flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-medium"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                      "Delete Newsletter"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
              <DialogContent className="max-w-[400px]">
                <DialogHeader className="items-center">
                  <Send className="h-12 w-12 text-[#155DFC] mb-2" />
                  <DialogTitle className="text-xl font-bold text-center">Send Newsletter?</DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    Are you sure you want to send <span className="font-semibold text-gray-900">"{selectedNewsletter?.title}"</span> to all subscribers?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:flex-1 h-11 border-gray-200 font-medium">Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={confirmSend}
                    disabled={isSending}
                    className="w-full sm:flex-1 h-11 bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                      "Send to Subscribers"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
