import { ReactNode } from "react";
import { cookies } from "next/headers";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminNav } from "@/components/admin-nav";
import { adminLogoutAction } from "@/actions/admin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const requiredKey = process.env.ADMIN_ACCESS_KEY;

  if (!requiredKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 text-center">
        <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <p className="text-lg font-semibold text-[var(--foreground)]">
            Configuração incompleta
          </p>
          <p className="text-[var(--muted)]">
            Define <code>ADMIN_ACCESS_KEY</code> no teu .env antes de abrir a
            área de administração.
          </p>
        </div>
      </div>
    );
  }

  const hasSession = cookieStore.get("admin_session")?.value === requiredKey;

  if (!hasSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12">
        <AdminLoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--foreground)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
              Painel Ango Higiene
            </p>
            <h1 className="text-2xl font-semibold">Administração</h1>
          </div>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--foreground)]"
            >
              Terminar sessão
            </button>
          </form>
        </header>
        <AdminNav />
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
          {children}
        </div>
      </div>
    </div>
  );
}
