import Link from "next/link";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-widest text-text-secondary">{title}</p>
      <h1 className="max-w-xl text-3xl font-medium text-text md:text-4xl">
        This chapter hasn&apos;t been written yet.
      </h1>
      <p className="text-text-secondary">Soon enough.</p>
      <Link
        href="/"
        className="mt-4 text-sm text-accent underline-offset-4 hover:underline"
      >
        Back home
      </Link>
    </div>
  );
}
