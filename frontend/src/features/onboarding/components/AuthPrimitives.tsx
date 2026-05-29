type WelcomePillProps = { text: string };

export function BrandHeader() {
  return (
    <div className="flex items-center justify-between">
      {/* Left: logo + name */}
      <div className="flex items-center gap-2.5">
        <div className="ui-gradient flex h-9 w-9 items-center justify-center rounded-[10px] text-[13px] font-bold text-white">
          N
        </div>
        <span className="text-[15px] font-semibold ui-text-default">Nova</span>
      </div>

      {/* Right: dark/light mode toggle */}
      <button
        aria-label="Toggle theme"
        className="flex h-8 w-8 items-center justify-center rounded-full text-[16px] ui-text-muted hover:bg-[rgb(var(--form-border-muted))] transition-colors"
      >
        🌙
      </button>
    </div>
  );
}

export function WelcomePill({ text }: WelcomePillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-[rgb(var(--form-border-muted))] bg-[rgb(var(--zinc-light))] px-3 py-1 text-[12px] font-medium ui-text-muted">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      {text}
    </span>
  );
}