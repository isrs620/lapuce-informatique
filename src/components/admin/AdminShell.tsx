"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "./AdminAuthProvider";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: "📊" },
  { href: "/admin/produits", label: "Produits", icon: "📦" },
  { href: "/admin/appareils", label: "Produit par appareil", icon: "📱" },
  { href: "/admin/prix", label: "Gestion des prix", icon: "💰" },
  { href: "/admin/configurer", label: "Stockage produits", icon: "💾" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-gradient-to-b from-sky-700 to-blue-800 text-white shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="block">
            <h1 className="text-lg font-extrabold">LaPuce Admin</h1>
            <p className="text-sky-200 text-xs mt-0.5">Gestion complète</p>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" className="block text-center text-sm text-sky-200 hover:text-white py-2">
            ← Retour au site
          </Link>
          <button
            onClick={logout}
            className="w-full py-2.5 text-sm font-medium bg-white/10 hover:bg-red-500/30 rounded-xl transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 bg-gradient-to-b from-sky-700 to-blue-800 text-white h-full flex flex-col">
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <span className="font-extrabold">LaPuce Admin</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1">✕</button>
            </div>
            <nav className="p-4 space-y-1 flex-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-white/10"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
            <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-slate-800">Administration</span>
          <button onClick={logout} className="text-sm text-sky-600 font-medium">Sortir</button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
