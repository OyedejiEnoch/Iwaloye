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
  Search,
  Edit2,
  Trash2,
  TrendingUp,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { useGetAllMovementsQuery, useDeleteMovementMutation } from "@/redux/api/adminApi";
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

export default function MovementManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: movementsData, isLoading } = useGetAllMovementsQuery();
  const [deleteMovement, { isLoading: isDeleting }] = useDeleteMovementMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<{ id: string, name: string } | null>(null);

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedMovement({ id, name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMovement) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedMovement.id)) ? Number(selectedMovement.id) : selectedMovement.id;
      await deleteMovement(idToSubmit as any).unwrap();
      toast.success("Movement deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete movement");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedMovement(null);
    }
  };

  const movements = movementsData?.data || [];

  const filteredMovements = movements.filter((mov: any) =>
    (mov.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (mov.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Admin User"
          userRole="Super Admin"
          userInitials="AD"
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50 bg-white">
          <div className="max-w-8xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Movement Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage campaign supporting movements
                </p>
              </div>
              <Link href="/admin/movements/add">
                <Button className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add Movement
                </Button>
              </Link>
            </div>

            <div className="bg-[#F9FAFB] p-6">

              {/* Stats Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                <Card className="bg-white border-gray-100 shadow-sm rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-500">Active Movements</p>
                        <h3 className="text-2xl font-bold text-gray-900">{movements.length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Table Area */}
              <Card className="border-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
                <CardContent className="p-0">
                  {/* Search bar */}
                  <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-base font-semibold text-gray-800 px-2">Campaign Movements</h2>
                    <div className="relative w-full max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search movements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="border-b border-gray-100">
                          <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[40%]">Movement Name</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Members</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Date Added</TableHead>
                          <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center">
                              <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#155DFC]" />
                            </TableCell>
                          </TableRow>
                        ) : filteredMovements.length > 0 ? (
                          filteredMovements.map((movement: any) => (
                            <TableRow key={movement.id || movement._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              <TableCell className="py-4 px-6">
                                <div className="text-left">
                                  <p className="font-semibold text-gray-900 leading-none">{movement.name}</p>
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-1 truncate max-w-[300px]">{movement.description || "No description"}</p>
                                </div>
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600">
                                {movement.category || "General"}
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600">
                                {movement.memberCount || "0"}
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-500 text-center">
                                {movement.created_at ? new Date(movement.created_at).toLocaleDateString() : "N/A"}
                              </TableCell>
                              <TableCell className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Link href={`/admin/movements/edit/${movement.id || movement._id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg">
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    onClick={() => handleDeleteClick(movement.id || movement._id, movement.name)}
                                    disabled={isDeleting}
                                  >
                                    {isDeleting && selectedMovement?.id === (movement.id || movement._id) ? (
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
                              No movements found.
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
                          <DialogTitle className="text-xl font-bold text-center">Delete Movement?</DialogTitle>
                          <DialogDescription className="text-center text-gray-600">
                              Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedMovement?.name}"</span>? This action cannot be undone.
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
                                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                              ) : (
                                  "Delete Movement"
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
