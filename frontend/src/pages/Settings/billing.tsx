export default function Billing() {
  return (
    <div>
      <p className="text-3xl font-semibold">Billing</p>
      <p className="text-sm ui-text-muted">You&apos;re on the Pro plan.</p>
      <div className="mt-6 rounded-2xl border border-[rgb(var(--form-border-muted))] bg-[rgb(var(--zinc-light))] p-4 flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">Pro plan</p>
          <p className="text-sm ui-text-muted">$12 per member · billed monthly · next invoice Nov 28</p>
        </div>
        <button className="h-10 px-4 rounded-xl ui-gradient text-white text-sm font-semibold">Manage</button>
      </div>
    </div>
  );
}

