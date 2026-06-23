"use client";

import { AdminAuthProvider, useAdminAuth } from "@/components/admin/AdminAuthProvider";
import AdminLoginPage from "@/components/admin/AdminLoginPage";
import AdminShell from "@/components/admin/AdminShell";

function AdminGate({ children }: { children: React.ReactNode }) {
  const { authenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">
        Chargement...
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLoginPage />;
  }

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGate>{children}</AdminGate>
    </AdminAuthProvider>
  );
}
