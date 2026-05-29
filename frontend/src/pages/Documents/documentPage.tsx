import { Link, useParams } from "react-router-dom";

const docs = [
  { id: "q4-roadmap", title: "Q4 Roadmap", category: "Engineering" },
  { id: "brand-guidelines", title: "Brand Guidelines", category: "Design" },
  { id: "engineering-wiki", title: "Engineering Wiki", category: "Engineering" },
  { id: "onboarding-playbook", title: "Onboarding Playbook", category: "People" },
];

const goals = [
  "Ship live cursors and presence to 100% of workspaces.",
  "Reduce p99 message latency to < 80ms globally.",
  "Launch the document AI assistant in private beta.",
];

export default function DocumentPage() {
  const { docId = "q4-roadmap" } = useParams();
  const current = docs.find((d) => d.id === docId) ?? docs[0];

  return (
    <div className="h-full rounded-2xl border border-[rgb(var(--form-border-muted))] bg-white overflow-auto">
      <div className="h-12 border-b border-[rgb(var(--form-border-muted))] px-4 flex items-center gap-5 text-sm ui-text-muted">
        <span>H1</span><span>B</span><span>I</span><span>U</span><span>•</span><span>•</span><span>•</span><span>Link</span><span>Image</span>
      </div>
      <div className="max-w-[980px] p-8 grid grid-cols-[220px_1fr] gap-8">
        <div>
          <p className="text-xs uppercase ui-text-muted font-semibold mb-2">Documents</p>
          <div className="space-y-1">
            {docs.map((doc) => (
              <Link key={doc.id} to={`/documents/${doc.id}`} className={`block px-3 py-2 rounded-lg text-sm ${current.id === doc.id ? "bg-[rgb(var(--accent))]" : "hover:bg-[rgb(var(--zinc-light))]"}`}>
                {doc.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm ui-text-muted">? Last edited by Maya · just now · Auto-saved</p>
          <h1 className="text-[64px] font-bold leading-none mt-4">{current.title}</h1>
          <p className="text-[36px] leading-tight mt-4 text-[rgb(var(--black))]">Our north star this quarter is delivering an end-to-end real-time collaboration experience that feels indistinguishable from working in the same room.</p>

          <h2 className="text-[48px] font-bold mt-10">?? Goals <span className="text-sm text-[#8b5cf6] align-middle">| Maya</span></h2>
          <ul className="mt-3 space-y-2">
            {goals.map((goal) => <li key={goal} className="text-[28px]">• {goal}</li>)}
          </ul>

          <h2 className="text-[48px] font-bold mt-10">?? Workstreams</h2>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              ["Realtime infra", "Owner · Jordan", "On track", "bg-emerald-50 text-emerald-600"],
              ["Editor v3", "Owner · Maya", "At risk", "bg-amber-50 text-amber-600"],
              ["AI Assist", "Owner · Sam", "On track", "bg-emerald-50 text-emerald-600"],
              ["Mobile parity", "Owner · Riya", "Planning", "bg-sky-50 text-sky-600"],
            ].map(([name, owner, status, badgeClass]) => (
              <div key={name} className="rounded-2xl border border-[rgb(var(--form-border-muted))] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[30px] font-semibold">{name}</p>
                  <span className={`px-2 py-0.5 rounded-md text-sm ${badgeClass}`}>{status}</span>
                </div>
                <p className="text-[22px] ui-text-muted mt-1">{owner}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

