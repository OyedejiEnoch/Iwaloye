"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("super-admin" | "sub-admin")[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Small delay to ensure state is hydrated from localStorage (handled in authSlice initialState)
    const checkAuth = () => {
      if (!isAuthenticated || !token) {
        // Not logged in, redirect to login
        router.push("/login");
      } else if (allowedRoles && !allowedRoles.includes(role as any)) {
        // Logged in but color role not permitted for this route
        // Determine the safe dashboard based on the user's actual role
        if (role === "super-admin") {
          router.push("/admin");
        } else if (role === "sub-admin") {
          router.push("/sub-admin");
        } else {
          router.push("/login");
        }
      } else {
        // Authenticated and role permitted
        setIsVerifying(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, token, role, allowedRoles, router, pathname]);

  // Case 1: Still verifying or redirecting
  if (isVerifying || !isAuthenticated || !token || (allowedRoles && !allowedRoles.includes(role as any))) {
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
