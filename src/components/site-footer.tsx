import Link from "next/link";

const footerLinks = [
  { label: "Serviços", href: "/servicos" },
  { label: "Antes & Depois", href: "/antes-depois" },
  { label: "Agendar", href: "/agendar" },
  { label: "FAQ", href: "/faq" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-[var(--muted)] lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-[var(--foreground)]">
            <span className="text-[var(--ango-green)]">Ango</span> Higiene
          </p>
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p>© {new Date().getFullYear()} Ango Higiene. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
