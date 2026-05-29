const members = [
  { initials: "AK", color: "#10b981", name: "Alex Kim", email: "alex@nova.com", role: "Owner" },
  { initials: "MC", color: "#8b5cf6", name: "Maya Chen", email: "maya@nova.com", role: "Admin" },
  { initials: "JL", color: "#f59e0b", name: "Jordan Lee", email: "jordan@nova.com", role: "Member" },
];

export default function Members() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-3xl font-semibold">Invite members</p>
        <p className="text-sm ui-text-muted mb-4">Send an invite link or add by email.</p>
        <div className="flex gap-2">
          <div className="flex-1 h-10 rounded-xl border ui-border bg-[rgb(var(--zinc-light))] px-3 flex items-center text-sm ui-text-muted">teammate@company.com</div>
          <button className="h-10 px-4 rounded-xl border ui-border text-sm">Member</button>
          <button className="h-10 px-5 rounded-xl ui-gradient text-white text-sm font-semibold">+ Invite</button>
        </div>
      </div>

      <div>
        <p className="text-3xl font-semibold">Members</p>
        <p className="text-sm ui-text-muted mb-4">5 people in this workspace</p>
        <div className="rounded-2xl border border-[rgb(var(--form-border-muted))] overflow-hidden">
          {members.map((m) => (
            <div key={m.email} className="h-16 px-4 border-b last:border-b-0 border-[rgb(var(--form-border-muted))] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full text-white text-sm font-bold grid place-items-center" style={{ background: m.color }}>{m.initials}</div>
              <div className="flex-1"><p className="text-base font-semibold">{m.name}</p><p className="text-sm ui-text-muted">{m.email}</p></div>
              <button className="h-9 px-3 rounded-lg border ui-border text-sm">{m.role}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

