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
    FileText,
    X,
    AlertCircle
} from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { useGetAllVisionQuery, useDeleteVisionMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import Image from "next/image";

export default function MissionManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [previewItem, setPreviewItem] = useState<any>(null);

    const { data: visionData, isLoading } = useGetAllVisionQuery();
    const [deleteVision, { isLoading: isDeleting }] = useDeleteVisionMutation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState<{ id: string, question: string } | null>(null);

    const handleDeleteClick = (id: string, question: string) => {
        setSelectedMission({ id, question });
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedMission) return;
        try {
            // Ensure numeric ID for backend compatibility
            const idToSubmit = !isNaN(Number(selectedMission.id)) ? Number(selectedMission.id) : selectedMission.id;
            await deleteVision(idToSubmit as any).unwrap();
            toast.success("Mission deleted successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete mission");
        } finally {
            setDeleteDialogOpen(false);
            setSelectedMission(null);
        }
    };
    const visionItems = visionData?.data || (Array.isArray(visionData) ? visionData : visionData ? [visionData] : []);

    const filteredItems = visionItems.filter((item: any) =>
        (item.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(visionData)

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
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Mission & Vision</h1>
                                <p className="text-sm text-[#6A7282] mt-1">
                                    Manage your organization's mission and vision statements
                                </p>
                            </div>
                            <Link href="/admin/mission/add">
                                <Button className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                                    <Plus className="h-4 w-4" />
                                    Create Mission/Vision
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-[#F9FAFB] p-6">

                            {/* Main Content Area */}
                            <Card className="border-gray-200 shadow-sm overflow-hidden rounded">
                                <CardContent className="p-0">
                                    {/* Search Bar */}
                                    <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <h2 className="text-base font-semibold text-gray-800 px-2">Mission Statements</h2>
                                        <div className="relative w-full max-w-xs">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Search mission..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white h-10 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader className="bg-gray-50/50">
                                                <TableRow className="border-b border-gray-100">
                                                    <TableHead className="py-4 px-6 text-sm font-semibold text-gray-600 w-[45%]">Title</TableHead>
                                                    <TableHead className="py-4 px-4 text-sm font-semibold text-gray-600">Content Snippet</TableHead>
                                                    <TableHead className="py-4 px-4 text-sm font-semibold text-gray-600">Date Created</TableHead>
                                                    <TableHead className="py-4 px-6 text-sm font-semibold text-gray-600 text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {isLoading ? (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="h-32 text-center">
                                                            <Loader2 className="h-6 w-6 animate-spin mx-auto text-indigo-600" />
                                                        </TableCell>
                                                    </TableRow>
                                                ) : filteredItems.length > 0 ? (
                                                    filteredItems.map((item: any) => (
                                                        <TableRow key={item.id || item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                                            <TableCell className="py-4 px-6">
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="h-4 w-4 text-indigo-500 shrink-0" />
                                                                    <span className="font-medium text-gray-900 truncate max-w-[300px]">{item.title}</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-4 px-4 text-sm text-gray-600">
                                                                <span className="line-clamp-1 max-w-[250px]">{item.content}</span>
                                                            </TableCell>
                                                            <TableCell className="py-4 px-4 text-sm text-gray-500">
                                                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                                                            </TableCell>
                                                            <TableCell className="py-4 px-6 text-right">
                                                                <div className="flex items-center justify-end gap-1">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                                                        onClick={() => setPreviewItem(item)}
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                    <Link href={`/admin/mission/edit/${item.id || item._id}`}>
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                                                                            <Edit2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </Link>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                                                        onClick={() => handleDeleteClick(item.id || item._id, item.title)}
                                                                        disabled={isDeleting}
                                                                    >
                                                                        {isDeleting && selectedMission?.id === (item.id || item._id) ? (
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
                                                        <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                                                            No mission statements found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </main>
            </SidebarInset>

            {/* Preview Dialog */}
            <Dialog open={!!previewItem} onOpenChange={(open) => !open && setPreviewItem(null)}>
                <DialogContent className="max-w-6xl p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Mission Preview</DialogTitle>
                    </DialogHeader>
                    {previewItem && (
                        <div className="bg-white">
                            {/* Premium Preview Layout */}
                            <div className="relative h-[300px] w-full">
                                {previewItem.banner_image_url ? (
                                    <Image
                                        src={previewItem.banner_image_url.startsWith('http')
                                            ? previewItem.banner_image_url
                                            : `${process.env.NEXT_PUBLIC_BASE_URL}/${previewItem.banner_image_url.startsWith('/') ? previewItem.banner_image_url.slice(1) : previewItem.banner_image_url}`
                                        }
                                        alt="Banner"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 flex items-center justify-center">
                                        <FileText className="h-20 w-20 text-white/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                                    <h2 className="text-3xl font-bold text-white max-w-2xl leading-tight">
                                        {previewItem.title}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-10 w-1 rounded-full bg-[#155DFC]" />
                                    <span className="text-sm font-semibold uppercase tracking-wider text-[#155DFC]">
                                        Organization Goals
                                    </span>
                                </div>

                                <div className="prose prose-indigo max-w-none">
                                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                                        {previewItem.content}
                                    </p>
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Plus className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-tight">Created On</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {previewItem.updated_at ? new Date(previewItem.updated_at).toLocaleDateString(undefined, { dateStyle: 'long' }) : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        className="bg-[#155DFC] hover:bg-[#1458ec] text-white rounded-full px-8 shadow-lg shadow-blue-500/20"
                                        onClick={() => setPreviewItem(null)}
                                    >
                                        Close Preview
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-[400px]">
                    <DialogHeader className="items-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                        <DialogTitle className="text-xl font-bold text-center">Delete Mission?</DialogTitle>
                        <DialogDescription className="text-center text-gray-600">
                            Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedMission?.question}"</span>? This action cannot be undone.
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
                                "Delete Mission"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
