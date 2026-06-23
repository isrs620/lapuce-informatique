"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PanierNavLink from "@/components/PanierNavLink";

const services = [
  { label: "iPhone", href: "/reparation/iphone" },
  { label: "Samsung", href: "/reparation/samsung" },
  { label: "iPad", href: "/reparation/ipad" },
  { label: "MacBook", href: "/reparation/macbook" },
  { label: "Apple Watch", href: "/reparation/apple-watch" },
  { label: "Consoles", href: "/reparation/consoles" },
];

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Rendez-vous", href: "/rendez-vous" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-900">LaPuce<span className="text-sky-500"> Informatique</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/" ? "text-sky-600" : "text-slate-600 hover:text-sky-600"}`}
            >
              Accueil
            </Link>

            {/* Réparations dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${pathname.startsWith("/reparation") ? "text-sky-600" : "text-slate-600 hover:text-sky-600"}`}
              >
                Réparations
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-sky-100 rounded-xl shadow-xl shadow-sky-100/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`block px-4 py-2.5 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${pathname === s.href ? "text-sky-600 bg-sky-50" : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"}`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href ? "text-sky-600" : "text-slate-600 hover:text-sky-600"}`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/rendez-vous"
              className="ml-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Prendre rendez-vous
            </Link>

            <PanierNavLink />

            {/* Admin link */}
            <Link
              href="/admin"
              className="ml-1 p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
              title="Administration"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-slate-500 hover:text-sky-600"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-sky-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-sky-50 text-sm font-medium">
              Accueil
            </Link>

            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-sky-50 text-sm font-medium"
            >
              Réparations
              <svg className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {servicesOpen && (
              <div className="pl-4 space-y-1">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-slate-500 hover:text-sky-600 hover:bg-sky-50 text-sm"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-sky-50 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/rendez-vous"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg text-center transition-colors"
            >
              Prendre rendez-vous
            </Link>

            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Administration
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
