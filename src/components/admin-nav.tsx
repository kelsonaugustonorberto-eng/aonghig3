"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Agendamentos" },
  { href: "/admin/galeria", label: "Galeria" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-3">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/admin" && pathname?.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold",
              isActive
                ? "border-transparent bg-[var(--ango-green)] text-white"
                : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
