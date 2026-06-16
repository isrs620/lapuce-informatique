"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackEmoji?: string;
}

export default function ImageWithFallback({ src, alt, width, height, className, fallbackEmoji = "📱" }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-sky-50 text-6xl ${className}`}
        style={{ width, height }}
      >
        {fallbackEmoji}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
