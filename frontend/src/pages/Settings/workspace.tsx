export default function Workspace() {
  return (
    <div>
      <p className="text-3xl font-semibold mb-6">Workspace details</p>
      <div className="grid grid-cols-2 gap-4">
        <div><p className="text-sm ui-text-muted mb-1">Workspace name</p><div className="h-10 rounded-xl border ui-border bg-[rgb(var(--zinc-light))] px-3 flex items-center text-base">Nova Labs</div></div>
        <div><p className="text-sm ui-text-muted mb-1">URL</p><div className="h-10 rounded-xl border ui-border bg-[rgb(var(--zinc-light))] px-3 flex items-center text-base">nova.app/labs</div></div>
      </div>
    </div>
  );
}

