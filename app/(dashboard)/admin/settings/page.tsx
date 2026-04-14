"use client";

import { useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "security">("general");

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
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#101828]">Settings</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your campaign platform settings
              </p>
            </div>

            {/* Main Content Area */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-8">
              <div className="space-y-6">
                <h2 className="text-base font-semibold text-[#101828]">Settings</h2>
                
                {/* Tabs */}
                <div className="inline-flex items-center bg-gray-100/80 p-1 rounded-[100px]">
                  <button
                    onClick={() => setActiveTab("general")}
                    className={`px-8 py-2 rounded-[100px] text-sm font-medium transition-colors ${
                      activeTab === "general"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    General
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`px-8 py-2 rounded-[100px] text-sm font-medium transition-colors ${
                      activeTab === "security"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Security
                  </button>
                </div>

                <div className="pt-2">
                  {activeTab === "general" ? (
                    <div className="space-y-6 max-w-3xl">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">Contact Email</Label>
                        <Input 
                          id="contactEmail" 
                          type="email" 
                          defaultValue="contact@campaign.org" 
                          className="h-11 border-gray-200 bg-gray-50/50" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">Contact Phone</Label>
                        <Input 
                          id="contactPhone" 
                          type="tel" 
                          defaultValue="+234 800 123 4567" 
                          className="h-11 border-gray-200 bg-gray-50/50" 
                        />
                      </div>
                      
                      <div className="border-b border-gray-100 pb-6 flex justify-end gap-3 mt-8">
                        <Button variant="outline" className="border-gray-200 text-gray-700 font-medium px-6 h-10">
                          Cancel
                        </Button>
                        <Button className="bg-[#4F00FF] hover:bg-[#3d00cc] text-white font-medium px-6 h-10">
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 max-w-3xl">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">Current Password</Label>
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          className="h-11 border-gray-200 bg-gray-50/50" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          className="h-11 border-gray-200 bg-gray-50/50" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          className="h-11 border-gray-200 bg-gray-50/50" 
                        />
                      </div>
                      
                      <div className="border-b border-gray-100 pb-6 flex justify-end gap-3 mt-8">
                        <Button className="bg-[#4F00FF] hover:bg-[#3d00cc] text-white font-medium px-6 h-10 flex items-center gap-2">
                          <span className="w-4 h-4 rounded-sm border-2 border-white flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M1 5L4 8L9 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span> 
                          Update Password
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
