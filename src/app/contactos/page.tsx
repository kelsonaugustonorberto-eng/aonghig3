import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
import { contactInfo } from "@/data/content";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Fala connosco via formulário, WhatsApp, telefone ou e-mail para tirar dúvidas e agendar higienização.",
};

const whatsappLink = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <PageIntro
        eyebrow="Contactos"
        title="Fala connosco"
        description="Estamos disponíveis para esclarecer dúvidas e ajudar no agendamento."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              WhatsApp
            </p>
            <Link
              href={whatsappLink}
              className="mt-2 block text-lg font-semibold text-[var(--foreground)]"
            >
              {contactInfo.whatsapp}
            </Link>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              Telefone
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
              {contactInfo.phone}
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              Email
            </p>
            <Link
              href={`mailto:${contactInfo.email}`}
              className="mt-2 text-lg font-semibold text-[var(--foreground)]"
            >
              {contactInfo.email}
            </Link>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              Instagram
            </p>
            <Link
              href={contactInfo.instagram}
              target="_blank"
              className="mt-2 text-lg font-semibold text-[var(--ango-green)]"
            >
              @angohigiene
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
