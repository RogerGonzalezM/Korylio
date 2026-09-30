import Link from "next/link";
import { ApiStatus } from "@/components/system/api-status";

const mediaTypes = [
  {
    label: "Movies & TV",
    description: "Movies, series, anime, documentaries and more.",
    icon: "▶",
  },
  {
    label: "Books",
    description: "Books, manga, comics, articles and audiobooks.",
    icon: "◫",
  },
  {
    label: "Games",
    description: "PC, console, mobile, VR and retro games.",
    icon: "✦",
  },
  {
    label: "Music & Audio",
    description: "Albums, songs, podcasts and audio dramas.",
    icon: "♫",
  },
];

const navigation = [
  "Home",
  "Discover",
  "Library",
  "Diary",
  "Lists",
  "Statistics",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-5 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-base font-semibold tracking-tight text-foreground"
          >
            Universal
            <span className="text-muted"> Media</span>
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <ApiStatus />
            <button
              type="button"
              className="hidden h-9 w-80 items-center rounded-lg border border-border bg-surface px-3 text-left text-sm text-muted transition-colors hover:border-border-strong sm:flex"
            >
              <span className="mr-2 text-base">⌕</span>
              Search movies, books, games...
              <span className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-soft">
                Ctrl K
              </span>
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-sm font-medium text-foreground"
              aria-label="User profile"
            >
              U
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Your media life, in one place
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Track everything you
              <span className="text-muted"> watch, read, play and listen to.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              One library for movies, series, books, games, music, podcasts and
              everything else you consume.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Start tracking
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
              >
                Explore media
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_center,var(--glow),transparent_65%)]" />

            <div className="overflow-hidden rounded-2xl border border-border bg-panel shadow-panel">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
                    Continue
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-foreground">
                    Your media
                  </h2>
                </div>

                <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
                  4 active
                </span>
              </div>

              <div className="space-y-1 p-3">
                <MediaProgress
                  category="Series"
                  title="Currently watching"
                  detail="Season 2 · Episode 6"
                  progress={68}
                />

                <MediaProgress
                  category="Book"
                  title="Currently reading"
                  detail="Page 284 of 412"
                  progress={69}
                />

                <MediaProgress
                  category="Game"
                  title="Currently playing"
                  detail="32 hours played"
                  progress={42}
                />

                <MediaProgress
                  category="Podcast"
                  title="Listening"
                  detail="Episode 18"
                  progress={78}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface/50">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
                Universal tracking
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                One library. Every medium.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mediaTypes.map((type) => (
                <article
                  key={type.label}
                  className="group rounded-xl border border-border bg-background p-5 transition-colors hover:border-border-strong"
                >
                  <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-lg text-foreground">
                    {type.icon}
                  </div>

                  <h3 className="text-sm font-semibold text-foreground">
                    {type.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {type.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl items-center justify-between px-5 py-8 text-xs text-muted-soft lg:px-8">
        <span>Universal Media Tracker</span>
        <span>Early development</span>
      </footer>
    </div>
  );
}

type MediaProgressProps = {
  category: string;
  title: string;
  detail: string;
  progress: number;
};

function MediaProgress({
  category,
  title,
  detail,
  progress,
}: MediaProgressProps) {
  return (
    <div className="rounded-xl p-4 transition-colors hover:bg-surface">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-accent">{category}</p>
          <p className="mt-1 text-sm font-medium text-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted">{detail}</p>
        </div>

        <span className="font-mono text-xs text-muted">{progress}%</span>
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-progress-track">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}