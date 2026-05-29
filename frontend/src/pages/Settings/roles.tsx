const roles = [
  { name: "Owner", desc: "Full access to billing, settings and members.", count: "1 member", perms: ["Read", "Write", "Invite", "Billing"] },
  { name: "Admin", desc: "Can manage members, channels and documents.", count: "2 members", perms: ["Read", "Write", "Invite"] },
  { name: "Member", desc: "Can create and collaborate on content.", count: "9 members", perms: ["Read", "Write"] },
  { name: "Guest", desc: "Limited to specific channels and docs.", count: "3 members", perms: ["Read"] },
];

export default function Roles() {
  return (
    <div>
      <p className="text-3xl font-semibold">Roles & permissions</p>
      <p className="text-sm ui-text-muted mb-4">Configure what each role can do across the workspace.</p>
      <div className="grid grid-cols-2 gap-4">
        {roles.map((r) => (
          <div key={r.name} className="rounded-2xl border border-[rgb(var(--form-border-muted))] p-4">
            <div className="flex justify-between"><p className="text-xl font-semibold">{r.name}</p><p className="text-sm ui-text-muted">{r.count}</p></div>
            <p className="text-sm ui-text-muted mt-1">{r.desc}</p>
            <div className="flex flex-wrap gap-2 mt-3">{r.perms.map((p) => <span key={p} className="px-2 py-0.5 rounded-full border border-[rgb(var(--form-border-muted))] bg-[rgb(var(--accent))] text-[rgb(var(--primary-start))] text-xs">{p}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

