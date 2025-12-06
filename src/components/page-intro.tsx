import { ReactNode } from "react";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: PageIntroProps) {
  return (
    <div className="mb-12 space-y-4">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-3xl text-lg text-[var(--muted)]">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
