"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Loader2,
  Save,
  ArrowLeft,
} from "lucide-react";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";
import { useGetFaqByIdQuery, useUpdateFaqMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditFAQPage() {
  const router = useRouter();
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");

  const { data: faqData, isLoading: isFetching } = useGetFaqByIdQuery(id as string);
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  useEffect(() => {
    if (faqData?.data) {
      setQuestion(faqData.data.question || "");
      setAnswer(faqData.data.body || faqData.data.answer || "");
      setCategory(faqData.data.category || "General");
    }
  }, [faqData]);

  const handleSave = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    if (!answer.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    try {
      await updateFaq({
        id: id as string,
        data: {
          question,
          body: answer,
          category,
        },
      }).unwrap();
      toast.success("FAQ updated successfully");
      router.push("/sub-admin/faq");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update FAQ");
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Link href="/sub-admin/faq">
                  <Button variant="ghost" size="icon" className="h-10 w-10 border border-gray-200 bg-white shadow-sm rounded-lg">
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit FAQ</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Update frequently asked question
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-8">
              {/* Edit FAQ Form Section */}
              <div className="mb-8">
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-6">
                  <h2 className="text-base font-semibold text-[#101828]">FAQ Details</h2>

                  <div className="space-y-6 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-11 border-gray-200 bg-gray-50/50">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Volunteering">Volunteering</SelectItem>
                          <SelectItem value="Donations">Donations</SelectItem>
                          <SelectItem value="Campaign">Campaign</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="question" className="text-sm font-medium text-gray-700">Question</Label>
                      <Input
                        id="question"
                        placeholder="Enter the question"
                        className="h-11 border-gray-200 bg-gray-50/50"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="answer" className="text-sm font-medium text-gray-700">Answer</Label>
                      <Textarea
                        id="answer"
                        placeholder="Enter the answer"
                        className="min-h-[200px] border-gray-200 bg-gray-50/50 resize-y"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 flex justify-end gap-3 mt-4">
                    <Link href="/sub-admin/faq">
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
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Update FAQ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
