import Image from "next/image";
import Link from "next/link";
import {
  coverage,
  differentiators,
  hero,
  mainServices,
  processSteps,
  pricingExtras,
  pricingPackages,
  testimonials,
} from "@/data/content";
import { HeroShowcase } from "@/components/hero-showcase";
import { listGalleryItems } from "@/lib/gallery";

export default async function Home() {
  const galleryItems = await listGalleryItems(4);
  return (
    <div className="bg-[var(--background)] pb-20">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-[var(--border)] px-4 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Higienização premium
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--foreground)] lg:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-lg text-[var(--muted)]">
              {hero.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={hero.primaryCta.href}
              className="rounded-full bg-[var(--ango-green)] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-[var(--ango-green)]/25 transition hover:bg-[var(--ango-green-dark)]"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--foreground)]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="relative rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_25px_60px_rgba(15,23,42,0.15)]">
          <HeroShowcase
            images={hero.images ?? [hero.image]}
            alt="Higienização profissional de sofá"
          />
          <div className="absolute -bottom-8 left-6 rounded-2xl bg-[var(--surface)] p-4 shadow-lg">
            <p className="text-xs uppercase text-[var(--muted)]">Resultados</p>
            <p className="text-lg font-semibold">Antes & Depois reais</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm text-[var(--muted)]">Serviços principais</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Limpeza profunda para tudo o que precisa.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {mainServices.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <span className="h-2 w-2 rounded-full bg-[var(--ango-green)]" />
              </div>
              <p className="mt-4 text-[var(--muted)]">{service.benefit}</p>
              <Link
                href="/servicos"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--ango-green)]"
              >
                Saiba mais →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-12 flex flex-col gap-3">
          <p className="text-sm text-[var(--muted)]">Como funciona</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Basta escolher serviço, data e local. Cuidamos do resto.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-sm font-semibold">
                  {index + 1}
                </span>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
                  Passo {index + 1}
                </p>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-[var(--muted)]">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/agendar"
            className="rounded-full bg-[var(--ango-green)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--ango-green)]/25 transition hover:bg-[var(--ango-green-dark)]"
          >
            Agendar agora
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[var(--muted)]">Antes & Depois</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Não vendemos promessas. Mostramos resultados.
          </h2>
          <p className="text-[var(--muted)]">
            Resultados reais em sofás, colchões, tapetes e interiores de viatura.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <p className="mb-3 text-sm font-medium text-[var(--muted)]">
                {item.label}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Antes", "Depois"].map((label, idx) => (
                  <div key={label} className="space-y-2">
                    <p className="text-xs uppercase text-[var(--muted)]">
                      {label}
                    </p>
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
                      <Image
                        src={idx === 0 ? item.beforeUrl : item.afterUrl}
                        alt={`${label} ${item.label}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 240px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/antes-depois"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ango-green)]"
          >
            Ver galeria completa →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[var(--muted)]">Proposta & Preços</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Transparência desde o primeiro contacto.
          </h2>
          <p className="text-[var(--muted)]">
            Escolhe um pacote completo ou contrata serviços avulso conforme a
            necessidade do teu espaço.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
                {pkg.name}
              </p>
              <p className="mt-4 text-3xl font-semibold text-[var(--foreground)]">
                {pkg.price}
              </p>
              <p className="mt-3 text-[var(--muted)]">{pkg.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {pricingExtras.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <ul className="mt-4 divide-y divide-[var(--border)]">
                {group.items.map((item) => (
                  <li
                    key={`${group.title}-${item.name}`}
                    className="flex items-start justify-between py-3"
                  >
                    <p className="max-w-xs text-[var(--foreground)]">{item.name}</p>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {item.price}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm text-[var(--muted)]">Por que escolher a Ango</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Diferenciais que fazem a diferença.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm text-[var(--muted)]">Zona de atendimento</p>
            <h2 className="mt-2 text-3xl font-semibold">
              Luanda inteiro, com foco nos principais bairros residenciais.
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 text-[var(--muted)] sm:grid-cols-3">
              {coverage.areas.map((area) => (
                <p key={area}>{area}</p>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[var(--surface-muted)] p-6 text-[var(--muted)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
              Horário
            </p>
            <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
              {coverage.hours}
            </p>
            <p className="mt-6 text-sm">
              Atendimento em domicílio ou empresa. Para zonas fora da lista basta
              sinalizar no pedido de agendamento.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm text-[var(--muted)]">Testemunhos</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Quem já higienizou com a Ango Higiene.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <p className="text-sm text-[var(--muted)]">{testimonial.service}</p>
              <p className="mt-4 text-base leading-relaxed text-[var(--foreground)]">
                “{testimonial.text}”
              </p>
              <p className="mt-6 text-sm font-semibold text-[var(--foreground)]">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-[40px] bg-[var(--ango-green)] px-8 py-16 text-center text-white lg:px-16">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Pronto para começar?
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Dá nova vida aos teus estofos sem sair de casa.
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Serviço rápido, seguro e feito no conforto do teu lar.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/agendar"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--ango-green)] transition hover:bg-white/90"
            >
              Agendar agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
