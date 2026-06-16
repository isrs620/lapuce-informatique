"use client";
import { useState } from "react";

export type DeviceType = "phone" | "tablet" | "laptop" | "watch" | "console" | "ipad-mini" | "ipad-pro";

interface Props {
  src: string;
  alt: string;
  className?: string;
  deviceType?: DeviceType;
}

// ─── SVG Silhouettes professionnelles ─────────────────────────────────────────

function PhoneSVG() {
  return (
    <svg viewBox="0 0 90 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="4" width="74" height="152" rx="14" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="14" y="18" width="62" height="108" rx="4" fill="#bfdbfe"/>
      <rect x="32" y="138" width="26" height="5" rx="2.5" fill="#93c5fd"/>
      <rect x="38" y="9" width="14" height="3" rx="1.5" fill="#93c5fd"/>
    </svg>
  );
}

function TabletSVG() {
  return (
    <svg viewBox="0 0 130 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="4" width="118" height="162" rx="14" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="16" y="16" width="98" height="136" rx="5" fill="#bfdbfe"/>
      <circle cx="65" cy="161" r="0" fill="none"/>
      <rect x="53" y="157" width="24" height="4" rx="2" fill="#93c5fd"/>
      <rect x="60" y="8" width="10" height="3" rx="1.5" fill="#93c5fd"/>
    </svg>
  );
}

function TabletMiniSVG() {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="4" width="88" height="132" rx="12" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="14" y="14" width="72" height="106" rx="4" fill="#bfdbfe"/>
      <rect x="40" y="125" width="20" height="4" rx="2" fill="#93c5fd"/>
      <rect x="44" y="7" width="12" height="3" rx="1.5" fill="#93c5fd"/>
    </svg>
  );
}

function TabletProSVG() {
  return (
    <svg viewBox="0 0 140 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="4" width="128" height="182" rx="16" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="15" y="14" width="110" height="160" rx="5" fill="#bfdbfe"/>
      <rect x="62" y="179" width="16" height="3" rx="1.5" fill="#93c5fd"/>
      <rect x="66" y="7" width="8" height="3" rx="1.5" fill="#93c5fd"/>
    </svg>
  );
}

function LaptopSVG() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="22" y="6" width="156" height="100" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="30" y="13" width="140" height="86" rx="4" fill="#bfdbfe"/>
      <rect x="8" y="108" width="184" height="16" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="78" y="112" width="44" height="6" rx="3" fill="#93c5fd"/>
      <rect x="16" y="112" width="55" height="6" rx="2" fill="#bfdbfe"/>
      <rect x="129" y="112" width="55" height="6" rx="2" fill="#bfdbfe"/>
    </svg>
  );
}

function WatchSVG() {
  return (
    <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="35" y="4" width="30" height="22" rx="4" fill="#93c5fd"/>
      <rect x="35" y="124" width="30" height="22" rx="4" fill="#93c5fd"/>
      <rect x="14" y="26" width="72" height="98" rx="18" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="20" y="32" width="60" height="86" rx="14" fill="#bfdbfe"/>
      <rect x="26" y="68" width="48" height="14" rx="3" fill="#93c5fd" opacity="0.5"/>
      <rect x="33" y="50" width="34" height="12" rx="2" fill="#93c5fd" opacity="0.4"/>
    </svg>
  );
}

function ConsoleSVG() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M30 50 Q10 50 10 80 Q10 120 50 120 L150 120 Q190 120 190 80 Q190 50 170 50 Z" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <rect x="80" y="55" width="40" height="30" rx="4" fill="#bfdbfe"/>
      <circle cx="50" cy="80" r="18" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>
      <circle cx="50" cy="68" r="5" fill="#93c5fd"/>
      <circle cx="50" cy="92" r="5" fill="#93c5fd"/>
      <circle cx="38" cy="80" r="5" fill="#93c5fd"/>
      <circle cx="62" cy="80" r="5" fill="#93c5fd"/>
      <circle cx="145" cy="70" r="5" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>
      <circle cx="158" cy="83" r="5" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>
      <circle cx="145" cy="96" r="5" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>
      <circle cx="132" cy="83" r="5" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>
    </svg>
  );
}

function getDeviceSVG(type: DeviceType) {
  switch (type) {
    case "tablet":    return <TabletSVG />;
    case "ipad-mini": return <TabletMiniSVG />;
    case "ipad-pro":  return <TabletProSVG />;
    case "laptop":    return <LaptopSVG />;
    case "watch":     return <WatchSVG />;
    case "console":   return <ConsoleSVG />;
    default:          return <PhoneSVG />;
  }
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DeviceImage({ src, alt, className = "", deviceType = "phone" }: Props) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ padding: "8px" }}>
        {getDeviceSVG(deviceType)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
