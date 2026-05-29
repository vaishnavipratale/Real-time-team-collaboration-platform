const filters = [
  { label: "All", count: 5, active: true },
  { label: "Mentions", count: 2 },
  { label: "Comments", count: 1 },
  { label: "Invites", count: 1 },
  { label: "Channels", count: 1 },
];

const items = [
  { user: "MC", color: "#8b5cf6", title: "Maya mentioned you in Q4 Roadmap", text: "@alex — can you review the AI Assist section?", time: "2m" },
  { user: "RD", color: "#f43f5e", title: "Workspace invite", text: "Riya invited you to 'Design Crit'", time: "14m" },
  { user: "JL", color: "#f59e0b", title: "New comment on Brand Guidelines", text: "Jordan: Should we add a logo lockup section?", time: "1h" },
  { user: "EN", color: "#0ea5e9", title: "12 new messages in #engineering", text: "Sam, Jordan and 3 others have been active", time: "2h" },
  { user: "SP", color: "#0ea5e9", title: "Sam mentioned you in #design-system", text: "@alex thoughts on dark token contrast?", time: "Yesterday" },
];

function FilterRow({ label, count, active = false }: { label: string; count: number; active?: boolean }) {
  return (
    <button className={`h-10 rounded-xl px-3 flex items-center justify-between text-sm ${active ? "bg-[rgb(var(--accent))] text-[rgb(var(--black))]" : "ui-text-default hover:bg-[rgb(var(--zinc-light))]"}`}>
      <span>{label}</span>
      <span className="ui-text-muted">{count}</span>
    </button>
  );
}

export default function InboxPage() {
  return (
    <div className="h-full rounded-2xl border border-[rgb(var(--form-border-muted))] bg-white overflow-hidden grid grid-cols-[230px_1fr]">
      <div className="border-r border-[rgb(var(--form-border-muted))] p-3">
        <div className="space-y-1">
          {filters.map((f) => <FilterRow key={f.label} label={f.label} count={f.count} active={f.active} />)}
        </div>
        <button className="w-full mt-4 h-10 rounded-xl border ui-border text-sm">Mark all as read</button>
      </div>
      <div>
        {items.map((item) => (
          <div key={item.title} className="h-[74px] px-4 border-b border-[rgb(var(--form-border-muted))] flex items-center">
            <div className="w-9 h-9 rounded-full text-white text-xs font-bold grid place-items-center" style={{ background: item.color }}>{item.user}</div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-base font-semibold leading-tight truncate">{item.title}</p>
              <p className="text-sm ui-text-muted truncate">{item.text}</p>
            </div>
            <span className="text-sm ui-text-muted">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

