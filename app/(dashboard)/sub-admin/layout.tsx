import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
      {children}
    </ProtectedRoute>
  );
}
