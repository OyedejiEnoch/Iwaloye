"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Plus, Edit2, Trash2, ShieldCheck, Hexagon, Loader2, AlertCircle } from "lucide-react";
import {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} from "@/redux/api/adminApi";
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

export default function AdminManagementPage() {
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<{ id: string, name: string } | null>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");

  const { data: adminsData, isLoading: isLoadingAdmins } = useGetAllAdminsQuery();
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  const admins = adminsData?.data || [];

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("admin");
    setPassword("");
    setEditingAdmin(null);
    setIsAddingAdmin(false);
  };

  const handleEdit = (admin: any) => {
    setEditingAdmin(admin);
    setFirstName(admin.first_name || admin.full_name || "");
    setLastName(admin.last_name || "");
    setEmail(admin.email);
    setRole(admin.role || "admin");
    setPassword(""); // Don't pre-fill password for security
    setIsAddingAdmin(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedAdmin({ id, name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAdmin) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedAdmin.id)) ? Number(selectedAdmin.id) : selectedAdmin.id;
      await deleteAdmin(idToSubmit as any).unwrap();
      toast.success("Admin deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete admin");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedAdmin(null);
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!editingAdmin && !password) {
      toast.error("Password is required for new admins");
      return;
    }

    const payload: any = {
      first_name: firstName,
      last_name: lastName,
      email,
      role: role === "super-admin" || role === "content-editor" ? "admin" : role, // Backend constraint
    };

    if (password) {
      payload.password = password;
    }

    try {
      if (editingAdmin) {
        await updateAdmin({ id: editingAdmin.id || editingAdmin._id, data: payload }).unwrap();
        toast.success("Admin updated successfully");
      } else {
        await createAdmin(payload).unwrap();
        toast.success("Admin created successfully");
      }
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Operation failed");
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
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50 text-left bg-white">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-[#101828]">Admin Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage administrator accounts and permissions
                </p>
              </div>
              {!isAddingAdmin && (
                <Button
                  onClick={() => setIsAddingAdmin(true)}
                  className="bg-[#155DFC] text-white gap-2 h-10 px-6 rounded-none transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Admin
                </Button>
              )}
            </div>

            {/* Main Content Area */}
            <div className="bg-[#F9FAFB] border border-gray-100 space-y-4 py-2">
              {/* Add New Administrator Form */}
              {isAddingAdmin && (
                <div className="p-8 pb-4 text-left">
                  <h2 className="text-base font-semibold text-[#101828] mb-6">
                    {editingAdmin ? "Edit Administrator" : "Add New Administrator"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">First Name</Label>
                      <Input
                        id="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        className="h-11 border-gray-200 bg-gray-50/50"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        className="h-11 border-gray-200 bg-gray-50/50"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="h-11 border-gray-200 bg-gray-50/50"
                      />
                    </div>
                    {/* <div className="space-y-2 text-left">
                      <Label htmlFor="role" className="text-sm font-medium text-gray-700">Role</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className="h-11 border-gray-200 bg-gray-50/50 text-left">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="super-admin">Super Admin</SelectItem>
                          <SelectItem value="content-editor">Content Editor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    <div className="space-y-2 md:col-span-2 text-left">
                      <Label htmlFor="tempPassword" className="text-sm font-medium text-gray-700">
                        {editingAdmin ? "New Password (Optional)" : "Password"}
                      </Label>
                      <Input
                        id="tempPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={editingAdmin ? "Leave blank to keep current" : "Set password"}
                        className="h-11 border-gray-200 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-8">
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="border-gray-200 text-gray-700 font-medium px-6 h-10"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isCreating || isUpdating}
                      className="bg-[#155DFC] rounded-none text-white font-medium px-6 h-10 gap-2"
                    >
                      {(isCreating || isUpdating) && <Loader2 className="w-4 h-4 animate-spin" />}
                      {editingAdmin ? "Update Administrator" : "Add Administrator"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Top border just above table */}
              {isAddingAdmin && <div className="border-t border-gray-100" />}

              {/* Admins Table */}
              <div className="px-4 pb-0 text-left">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100 bg-transparent">
                      <TableHead className="font-semibold text-gray-900 h-11 text-xs">Name</TableHead>
                      <TableHead className="font-semibold text-gray-900 h-11 text-xs">Email</TableHead>
                      <TableHead className="font-semibold text-gray-900 h-11 text-xs">Role</TableHead>
                      <TableHead className="font-semibold text-gray-900 h-11 text-xs">Date</TableHead>
                      <TableHead className="font-semibold text-gray-900 h-11 text-xs">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900 h-11 text-xs text-right pr-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingAdmins ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-20">
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 animate-spin text-[#4F00FF]" />
                            <p className="text-sm text-gray-500">Loading administrators...</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      admins.map((admin: any) => (
                        <TableRow key={admin.id || admin._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <TableCell className="font-medium text-gray-900 py-4 text-sm">
                            {admin.first_name && admin.last_name 
                              ? `${admin.first_name} ${admin.last_name}` 
                              : admin.full_name || "Admin"}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">{admin.email}</TableCell>
                          <TableCell className="text-gray-500 text-sm capitalize">
                            {admin.role?.replace("-", " ") || "Admin"}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">
                            {admin.created_at ? new Date(admin.created_at).toLocaleDateString() : "-"}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center text-sm font-medium text-gray-700">
                              <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                              Active
                            </span>
                          </TableCell>
                          <TableCell className="text-right pr-4">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleEdit(admin)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(admin.id || admin._id, `${admin.first_name} ${admin.last_name}`)}
                                disabled={isDeleting}
                                className="text-red-400 hover:text-red-600 p-1"
                              >
                                {isDeleting && selectedAdmin?.id === (admin.id || admin._id) ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    {!isLoadingAdmins && admins.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-20">
                          <p className="text-sm text-gray-500 italic">No administrators found.</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Roles Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 pt-6 border-t border-gray-100 text-left">
                <div className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors bg-white shadow-sm text-left">
                  <div className="flex items-center gap-3 mb-4 text-[#FF3B30] text-left">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    <h3 className="font-semibold text-[#101828]">Super Admin</h3>
                  </div>
                  <ul className="space-y-2.5 text-left">
                    {[
                      "Full system access",
                      "Manage all content",
                      "Add/remove administrators",
                      "Configure system settings",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-500 text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors bg-white shadow-sm text-left">
                  <div className="flex items-center gap-3 mb-4 text-[#4F00FF] text-left">
                    <Hexagon className="w-5 h-5 flex-shrink-0" />
                    <h3 className="font-semibold text-[#101828]">Content Editor</h3>
                  </div>
                  <ul className="space-y-2.5 text-left">
                    {[
                      "Create and edit content",
                      "Publish news articles",
                      "Manage FAQs",
                      "Upload newsletters",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-500 text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Standardized Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent className="max-w-[400px]">
                <DialogHeader className="items-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                  <DialogTitle className="text-xl font-bold text-center">Delete Admin?</DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    Are you sure you want to delete administrator <span className="font-semibold text-gray-900">"{selectedAdmin?.name}"</span>? This action cannot be undone.
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
                      "Delete Admin"
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
