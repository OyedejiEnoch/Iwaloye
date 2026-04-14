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
import { Plus, Edit2, Trash2, HelpCircle, Loader2, AlertCircle } from "lucide-react";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";
import { useGetAllFaqsQuery, useDeleteFaqMutation } from "@/redux/api/adminApi";
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

export default function FAQManagementPage() {
  const { data: faqsData, isLoading } = useGetAllFaqsQuery();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<{ id: string, question: string } | null>(null);

  const handleDeleteClick = (id: string, question: string) => {
    setSelectedFaq({ id, question });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedFaq) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedFaq.id)) ? Number(selectedFaq.id) : selectedFaq.id;
      await deleteFaq(idToSubmit as any).unwrap();
      toast.success("FAQ deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete FAQ");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedFaq(null);
    }
  };

  const faqsItems = faqsData?.data || (Array.isArray(faqsData) ? faqsData : []);

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
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage frequently asked questions
                </p>
              </div>
              <Button asChild className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                <Link href="/sub-admin/faq/add">
                  <Plus className="h-4 w-4" />
                  Add New FAQ
                </Link>
              </Button>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              <Card className="bg-white border-gray-100 shadow-sm rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-500">Total FAQs</p>
                      <h3 className="text-2xl font-bold text-gray-900">{faqsItems.length}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Table Area */}
            <Card className="border-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
              <CardContent className="p-0">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800 px-2">Published FAQs</h2>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50/50">
                      <TableRow className="border-b border-gray-100 text-left">
                        <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[50%]">Question</TableHead>
                        <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</TableHead>
                        <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Date Added</TableHead>
                        <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-48 text-center text-gray-500 italic">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#155DFC] mb-2" />
                                    Loading FAQs...
                                </TableCell>
                            </TableRow>
                        ) : faqsItems.length > 0 ? (
                        faqsItems.map((faq: any) => (
                           <TableRow key={faq.id || faq._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                             <TableCell className="py-4 px-6">
                               <p className="font-semibold text-gray-900 leading-tight text-left">{faq.question}</p>
                               <p className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-[500px] text-left">{faq.answer}</p>
                             </TableCell>
                             <TableCell className="py-4 px-4 text-sm text-gray-600">
                               {faq.category || "General"}
                             </TableCell>
                             <TableCell className="py-4 px-4 text-sm text-gray-500 text-center">
                               {faq.created_at ? new Date(faq.created_at).toLocaleDateString() : "N/A"}
                             </TableCell>
                             <TableCell className="py-4 px-6 text-right">
                               <div className="flex items-center justify-end gap-1">
                                 <Link href={`/sub-admin/faq/edit/${faq.id || faq._id}`}>
                                   <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg">
                                     <Edit2 className="h-4 w-4" />
                                   </Button>
                                 </Link>
                                 <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    onClick={() => handleDeleteClick(faq.id || faq._id, faq.question)}
                                    disabled={isDeleting}
                                 >
                                    {isDeleting && selectedFaq?.id === (faq.id || faq._id) ? (
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
                            <TableCell colSpan={4} className="h-48 text-center text-gray-500 italic">
                                No FAQs found.
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
                        <DialogTitle className="text-xl font-bold text-center">Delete FAQ?</DialogTitle>
                        <DialogDescription className="text-center text-gray-600">
                            Are you sure you want to delete this FAQ? This action cannot be undone.
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
                                "Delete FAQ"
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
