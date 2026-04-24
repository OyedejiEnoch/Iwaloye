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
  AlertCircle,
  Eye,
  Download
} from "lucide-react";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { useGetAllMovementsQuery, useDeleteMovementMutation, useGetAllVolunteersQuery } from "@/redux/api/adminApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: volunteersData, isLoading, error: volunteersError } = useGetAllVolunteersQuery({ 
    page, 
    search: debouncedSearch 
  });
  
  const [deleteMovement, { isLoading: isDeleting }] = useDeleteMovementMutation();

  const [previewItem, setPreviewItem] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<{ id: string, name: string } | null>(null);

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedMovement({ id, name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMovement) return;
    try {
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

  const handleExport = async () => {
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }

    setIsExporting(true);
    try {
      let allVolunteers: any[] = [];
      let currentPage = 1;
      let totalPages = 1;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

      // Fetch all pages
      do {
        const response = await fetch(`/api/admin/volunteers?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Export failed on page ${currentPage}`);

        const result = await response.json();
        const data = result.data || [];
        const meta = result.meta || result;
        
        allVolunteers = [...allVolunteers, ...data];
        totalPages = meta.last_page || 1;
        currentPage++;
      } while (currentPage <= totalPages);

      if (allVolunteers.length === 0) {
        toast.error("No data found to export");
        return;
      }

      // Generate CSV
      const headers = ["Full Name", "Email", "Phone", "State", "LGA", "Ward", "Disability"];
      const csvRows = [
        headers.join(","), // Header row
        ...allVolunteers.map(vol => [
          `"${(vol.full_name || "").replace(/"/g, '""')}"`,
          `"${(vol.email || "").replace(/"/g, '""')}"`,
          `"${(vol.phone || "").replace(/"/g, '""')}"`,
          `"${(vol.state || "").replace(/"/g, '""')}"`,
          `"${(vol.lga || "").replace(/"/g, '""')}"`,
          `"${(vol.ward || "").replace(/"/g, '""')}"`,
          vol.disability ? "Yes" : "No"
        ].join(","))
      ];

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `volunteers_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`${allVolunteers.length} volunteers exported successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export volunteers data");
    } finally {
      setIsExporting(false);
    }
  };

  const volunteers = volunteersData?.data || [];
  const meta = volunteersData?.meta || volunteersData;
  const totalVolunteers = meta?.total || volunteers.length;
  const lastPage = meta?.last_page || 1;

  // Hybrid search: Use server-side query + client-side filter as fallback
  const filteredVolunteers = volunteers.filter((vol: any) =>
    (vol.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vol.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vol.phone || "").toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-2xl font-bold text-gray-900">Volunteer Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage campaign volunteers
                </p>
              </div>
              {/* <Link href="/admin/movements/add">
                <Button className="bg-[#155DFC] text-white font-medium gap-2 h-10 px-6 rounded-none transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add Volunteer
                </Button>
              </Link> */}
            </div>

            <div className="bg-[#F9FAFB] p-6">

              {/* Stats Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                <Card className="bg-white border-gray-100 shadow-sm rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-500">Total Volunteers</p>
                        <h3 className="text-2xl font-bold text-gray-900">{totalVolunteers}</h3>
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
                    <h2 className="text-base font-semibold text-gray-800 px-2">Campaign Volunteers</h2>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExport}
                        disabled={isExporting}
                        className="h-10 gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4"
                      >
                        {isExporting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">Download Data</span>
                      </Button>
                      <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search volunteers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="border-b border-gray-100">
                          <TableHead className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[30%]">Full Name</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[25%]">Contact Details</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[25%]">Location</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Disability</TableHead>
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
                        ) : filteredVolunteers.length > 0 ? (
                          filteredVolunteers.map((volunteer: any) => (
                            <TableRow key={volunteer.id || volunteer._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              <TableCell className="py-4 px-6">
                                <div className="text-left">
                                  <p className="font-semibold text-gray-900 leading-none capitalize">{volunteer.full_name}</p>
                                </div>
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600">
                                <div>
                                  <p>{volunteer.email}</p>
                                  <p className="text-xs text-gray-500 mt-1">{volunteer.phone}</p>
                                </div>
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600 capitalize">
                                {volunteer.state}, {volunteer.lga}
                                <span className="block text-xs text-gray-500 mt-1">Ward {volunteer.ward}</span>
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-500 text-center">
                                {volunteer.disability ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Yes</span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">No</span>
                                )}
                              </TableCell>
                              <TableCell className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg"
                                    onClick={() => setPreviewItem(volunteer)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {/* <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    onClick={() => handleDeleteClick(volunteer.id || volunteer._id, volunteer.full_name)}
                                    disabled={isDeleting}
                                  >
                                    {isDeleting && selectedMovement?.id === (volunteer.id || volunteer._id) ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button> */}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-gray-500">
                              No volunteers found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination Controls */}
                  {lastPage > 1 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                      <p className="text-sm text-gray-500">
                        Page <span className="font-medium text-gray-900">{page}</span> of <span className="font-medium text-gray-900">{lastPage}</span>
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1 || isLoading}
                          className="h-8 rounded-lg"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.min(lastPage, p + 1))}
                          disabled={page === lastPage || isLoading}
                          className="h-8 rounded-lg"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview Dialog */}
              <Dialog open={!!previewItem} onOpenChange={(open) => !open && setPreviewItem(null)}>
                <DialogContent className="max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] p-3 overflow-hidden shadow-2xl rounded-2xl border border-gray-100">
                  <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100">
                    <DialogTitle className="text-xl font-bold text-gray-900 capitalize text-center">
                      {previewItem?.full_name}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-gray-500 mt-1">
                      Volunteer Profile Details
                    </DialogDescription>
                  </DialogHeader>
                  {previewItem && (
                    <div className="p-6 space-y-5 bg-white">

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">State</p>
                          <p className="text-sm font-medium text-gray-900 capitalize">{previewItem.state}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">LGA</p>
                          <p className="text-sm font-medium text-gray-900 capitalize">{previewItem.lga}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Ward</p>
                          <p className="text-sm font-medium text-gray-900">Ward {previewItem.ward}</p>
                        </div>
                      </div>

                      <div className="h-px w-full bg-gray-100" />

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                          <p className="text-sm font-medium text-gray-900">{previewItem.email}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
                          <p className="text-sm font-medium text-gray-900">{previewItem.phone}</p>
                        </div>
                      </div>

                      <div className="h-px w-full bg-gray-100" />

                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Disability</p>
                        {previewItem.disability ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Yes</span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">No</span>
                        )}
                      </div>

                    </div>
                  )}
                  <DialogFooter className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <Button
                      onClick={() => setPreviewItem(null)}
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      Close Preview
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Standardized Delete Dialog */}
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-[400px]">
                  <DialogHeader className="items-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                    <DialogTitle className="text-xl font-bold text-center">Delete Volunteer?</DialogTitle>
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
                        "Delete Volunteer"
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
