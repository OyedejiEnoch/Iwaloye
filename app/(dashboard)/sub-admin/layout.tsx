import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["sub-admin", "super-admin"]}>
      {children}
    </ProtectedRoute>
  );
}
