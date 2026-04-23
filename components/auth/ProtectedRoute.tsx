"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("super-admin" | "sub-admin")[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // If not authenticated or no token, redirect to login immediately
    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role as any)) {
      if (role === "super-admin") {
        router.push("/admin");
      } else if (role === "sub-admin") {
        router.push("/sub-admin");
      } else {
        router.push("/login");
      }
      return;
    }

    setIsVerifying(false);
  }, [isAuthenticated, token, role, allowedRoles, router]);

  // Case 1: Still verifying or missing basics
  if (isVerifying || !isAuthenticated || !token) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="text-sm font-medium text-gray-500 animate-pulse">Verifying access...</p>
      </div>
    );
  }

  // Case 2: Verification successful
  return <>{children}</>;
}
