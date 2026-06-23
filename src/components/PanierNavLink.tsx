"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lirePanier } from "@/lib/cart";

export default function PanierNavLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      setCount(lirePanier().reduce((s, i) => s + i.qty, 0));
    };
    update();
    window.addEventListener("panier-updated", update);
    return () => window.removeEventListener("panier-updated", update);
  }, []);

  return (
    <Link
      href="/panier"
      className="relative p-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors"
      title="Panier"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
