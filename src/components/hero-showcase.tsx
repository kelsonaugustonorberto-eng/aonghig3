"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type HeroShowcaseProps = {
  images: string[];
  alt: string;
  intervalMs?: number;
  className?: string;
};

export function HeroShowcase({
  images,
  alt,
  intervalMs = 6000,
  className = "",
}: HeroShowcaseProps) {
  const items = useMemo(
    () => (images.length > 0 ? images : ["/uploads/real/63C571A7-310D-47C5-B568-26ECD0BF878A.jpg"]),
    [images],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  return (
    <div
      className={`relative h-[420px] w-full overflow-hidden rounded-[28px] bg-[var(--surface-muted)] ${className}`}
    >
      {items.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 520px"
          priority={index === 0}
          className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
