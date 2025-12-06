"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/antes-depois", label: "Antes & Depois" },
  { href: "/sobre", label: "Sobre" },
  { href: "/faq", label: "FAQ" },
  { href: "/contactos", label: "Contactos" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          <span className="text-[var(--ango-green)]">Ango</span> Higiene
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-[var(--foreground)]",
                pathname === item.href && "text-[var(--foreground)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/agendar"
          className="rounded-full bg-[var(--ango-green)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--ango-green)]/25 transition hover:bg-[var(--ango-green-dark)]"
        >
          Agendar
        </Link>
      </div>
    </header>
  );
}
