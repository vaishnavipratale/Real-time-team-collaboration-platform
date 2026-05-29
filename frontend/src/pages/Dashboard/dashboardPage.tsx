const stats = [
  { title: "Active members", value: "24", badge: "+3" },
  { title: "Open documents", value: "128", badge: "+12" },
  { title: "Messages today", value: "1,284", badge: "+18%" },
  { title: "Tasks completed", value: "92%", badge: "+4%" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-none">Good morning, Alex </h1>
          <p className="text-sm ui-text-muted mt-2">Here&apos;s what&apos;s happening across your team today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-xl border ui-border bg-white text-sm">This week</button>
          <button className="h-9 px-4 rounded-xl ui-gradient text-white text-sm font-semibold">New project</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.title} className="ui-surface rounded-2xl border border-[rgb(var(--form-border-muted))] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[rgb(var(--zinc-light))]" />
              <span className="text-xs font-bold text-emerald-500">{s.badge}</span>
            </div>
            <p className="text-2xl font-bold leading-none">{s.value}</p>
            <p className="text-sm ui-text-muted mt-2">{s.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
        <div className="ui-surface rounded-2xl border border-[rgb(var(--form-border-muted))] overflow-hidden">
          <div className="p-5 border-b border-[rgb(var(--form-border-muted))] flex items-center justify-between">
            <div>
              <p className="font-bold text-xl">Recent activity</p>
              <p className="text-sm ui-text-muted mt-0.5">Live across your workspace</p>
            </div>
            <p className="text-sm text-emerald-500"> Live</p>
          </div>
          {[
            ["MC", "Maya Chen edited Q4 Roadmap", "2m ago", "#a855f7"],
            ["JL", "Jordan Lee commented in #engineering", "8m ago", "#f97316"],
            ["SP", "Sam Patel shared Brand Guidelines.pdf", "21m ago", "#06b6d4"],
          ].map(([initials, text, time, color]) => (
            <div key={text} className="px-5 py-4 border-b last:border-b-0 border-[rgb(var(--form-border-muted))] flex gap-3 items-center">
              <div className="w-9 h-9 rounded-full text-white text-xs font-semibold grid place-items-center" style={{ background: color }}>{initials}</div>
              <div>
                <p className="text-base">{text}</p>
                <p className="text-sm ui-text-muted">? {time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ui-surface rounded-2xl border border-[rgb(var(--form-border-muted))] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-xl">Team online</p>
            <span className="text-sm ui-text-muted">3 online</span>
          </div>
          <div className="space-y-3">
            {["Alex Kim", "Maya Chen", "Jordan Lee", "Sam Patel", "Riya Das"].map((name) => (
              <div key={name} className="flex items-center justify-between">
                <p className="text-base">{name}</p>
                <button className="text-sm ui-text-muted">Message</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

