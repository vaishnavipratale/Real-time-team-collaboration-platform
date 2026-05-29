function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm ui-text-default mb-1 font-medium">{label}</p>
      <div className="h-10 rounded-xl border ui-border bg-[rgb(var(--zinc-light))] px-3 flex items-center text-base">{value}</div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <p className="text-3xl font-semibold">Your profile</p>
      <p className="text-sm ui-text-muted mb-6">This information is visible to your teammates.</p>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl ui-gradient text-white text-3xl font-bold grid place-items-center">AK</div>
        <div>
          <button className="h-10 px-4 rounded-xl border ui-border text-sm">Upload avatar</button>
          <p className="text-xs ui-text-muted mt-2">PNG or JPG, max 2MB.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Full name" value="Alex Kim" />
        <Field label="Display name" value="alex" />
        <Field label="Email" value="alex@nova.com" />
        <Field label="Title" value="Head of Product" />
      </div>
      <div className="flex justify-end mt-6"><button className="h-10 px-5 rounded-xl ui-gradient text-white text-sm font-semibold">Save changes</button></div>
    </div>
  );
}

