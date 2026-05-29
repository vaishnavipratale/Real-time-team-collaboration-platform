import { useMemo, useState, useRef, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", to: "/dashboard", badge: null },
  { label: "Inbox", to: "/inbox", badge: 3 },
  { label: "Messages", to: "/chat/general", badge: 4 },
  { label: "Documents", to: "/documents/q4-roadmap", badge: null },
  { label: "Settings", to: "/settings", badge: null },
];

const channels = [
  { name: "general", badge: null },
  { name: "design-system", badge: 3 },
  { name: "engineering", badge: 12 },
  { name: "product", badge: null },
  { name: "random", badge: null },
];

const documents = ["Q4 Roadmap", "Brand Guidelines", "Engineering Wiki", "Onboarding Playbook"];
const topMembers = ["A", "M", "J", "S"];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Nova Labs · Workspace overview" },
  "/inbox": { title: "Inbox", subtitle: "3 unread notifications" },
  "/chat": { title: "# general", subtitle: "Company-wide announcements" },
  "/documents": { title: "Q4 Roadmap", subtitle: "Documents · Engineering" },
  "/settings": { title: "Settings", subtitle: "Manage your workspace" },
};

function InviteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 grid place-items-center px-4" onClick={onClose}>
      <div className="w-full max-w-[510px] rounded-2xl bg-white border ui-border p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-bold ui-text-default">Invite teammates to Nova Labs</p>
            <p className="text-sm ui-text-muted mt-1">They&apos;ll get an email invite and can join instantly.</p>
          </div>
          <button className="text-xl ui-text-muted" onClick={onClose} type="button">×</button>
        </div>

        <div className="mt-5 flex gap-2">
          <input className="ui-input rounded-xl h-10 py-0 text-sm" placeholder="name@company.com" />
          <select className="h-10 rounded-xl border ui-border px-3 text-sm ui-text-default bg-white min-w-[130px]">
            <option>Member</option>
            <option>Admin</option>
            <option>Guest</option>
          </select>
        </div>

        <button type="button" className="text-sm text-[rgb(var(--primary-start))] mt-3">+ Add another</button>

        <div className="mt-5 rounded-xl border ui-border p-3">
          <p className="text-sm font-medium ui-text-default">Or share an invite link</p>
          <div className="mt-2 flex gap-2">
            <input
              readOnly
              value="https://nova.app/invite/8f3a-2c91-7b4e"
              className="h-10 flex-1 rounded-xl border ui-border bg-[rgb(var(--zinc-light))] px-3 text-sm"
            />
            <button className="h-10 px-4 rounded-xl border ui-border text-sm font-medium" type="button">Copy</button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="h-10 px-4 rounded-xl text-sm font-semibold" type="button" onClick={onClose}>Cancel</button>
          <button className="h-10 px-4 rounded-xl ui-gradient text-white text-sm font-semibold" type="button">Send invites</button>
        </div>
      </div>
    </div>
  );
}

const navIcon = (name: string) => {
  const common = "w-[18px] h-[18px]";
  if (name === "Dashboard") return <svg className={common} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
  if (name === "Inbox") return <svg className={common} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>;
  if (name === "Messages") return <svg className={common} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
  if (name === "Documents") return <svg className={common} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  return <svg className={common} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
};

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const key = useMemo(() => {
    if (pathname.startsWith("/chat")) return "/chat";
    if (pathname.startsWith("/documents")) return "/documents";
    if (pathname.startsWith("/settings")) return "/settings";
    if (pathname.startsWith("/inbox")) return "/inbox";
    return "/dashboard";
  }, [pathname]);
  const meta = pageMeta[key];

  return (
    <div className="flex min-h-screen ui-page-bg ui-text-default" style={{ fontFamily: "var(--font-base)" }}>
      <aside className="w-[252px] bg-white border-r border-[rgb(var(--form-border-muted))] flex flex-col min-h-screen overflow-y-auto">
        <div className="px-5 py-5 border-b border-[rgb(var(--form-border-muted))]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl ui-gradient text-white text-sm font-bold grid place-items-center">NV</div>
            <div>
              <p className="font-semibold text-xl leading-tight">Nova Labs</p>
              <p className="text-sm ui-text-muted">12 members · Pro</p>
            </div>
          </div>
        </div>

        <div className="px-3 py-3">
          <div className="h-9 rounded-xl border border-[rgb(var(--form-border-muted))] flex items-center px-3 text-sm ui-text-muted">Quick search...</div>
        </div>

        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.to.replace("/q4-roadmap", "").replace("/general", ""));
            return (
              <Link key={item.label} to={item.to} className={`h-9 rounded-xl px-3 flex items-center gap-3 text-sm ${active ? "bg-[rgb(var(--accent))] text-[rgb(var(--black))]" : "text-[rgb(var(--black))] hover:bg-[rgb(var(--zinc-light))]"}`}>
                <span className={active ? "text-[rgb(var(--primary-start))]" : "ui-text-muted"}>{navIcon(item.label)}</span>
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge ? <span className="text-xs px-2 py-0.5 rounded-md bg-[rgb(var(--accent))] text-[rgb(var(--primary-start))] font-semibold">{item.badge}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide ui-text-muted font-semibold">Channels</p>
            <span className="ui-text-muted">+</span>
          </div>
          <div className="space-y-1">
            {channels.map((ch) => (
              <Link key={ch.name} to={`/chat/${ch.name}`} className="h-8 px-2 rounded-lg flex items-center text-[15px] text-[rgb(var(--black))] hover:bg-[rgb(var(--zinc-light))]">
                <span className="mr-2 ui-text-muted">#</span>
                <span className="flex-1">{ch.name}</span>
                {ch.badge ? <span className="text-xs px-1.5 rounded-md bg-[rgb(var(--accent))] text-[rgb(var(--primary-start))]">{ch.badge}</span> : null}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide ui-text-muted font-semibold">Documents</p>
            <span className="ui-text-muted">+</span>
          </div>
          <div className="space-y-1">
            {documents.map((doc) => (
              <Link key={doc} to={`/documents/${doc.toLowerCase().replace(/\s+/g, "-")}`} className="h-8 px-2 rounded-lg flex items-center text-[15px] text-[rgb(var(--black))] hover:bg-[rgb(var(--zinc-light))] truncate">
                {doc}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 mt-5">
          <div className="rounded-2xl border border-[rgb(var(--form-border-muted))] bg-[rgb(var(--accent))] p-3">
            <p className="font-semibold text-sm">Upgrade to Business</p>
            <p className="text-xs ui-text-muted mt-1">Unlock unlimited collaborators and advanced AI features.</p>
            <button className="mt-3 h-9 w-full rounded-xl ui-gradient text-white font-semibold text-sm">Upgrade</button>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-[72px] border-b border-[rgb(var(--form-border-muted))] bg-white flex items-center justify-between px-6">
          <div>
            <p className="font-semibold text-base leading-tight">{meta.title}</p>
            <p className="text-sm ui-text-muted">{meta.subtitle}</p>
          </div>
          <div className="flex-1 max-w-[460px] mx-6">
            <div className="h-10 rounded-xl border border-[rgb(var(--form-border-muted))] bg-[rgb(var(--zinc-light))] px-3 flex items-center text-sm ui-text-muted">Search workspace, people, files...</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {topMembers.map((m, i) => <div key={m} className="w-7 h-7 rounded-full border-2 border-white text-white text-[11px] grid place-items-center" style={{ background: ["#22c55e", "#a855f7", "#f59e0b", "#0ea5e9"][i] }}>{m}</div>)}
              <div className="w-7 h-7 rounded-full border-2 border-white bg-[rgb(var(--form-border-muted))] text-[rgb(var(--muted-text))] text-[11px] grid place-items-center">+8</div>
            </div>
            <button className="h-8 px-4 rounded-xl ui-gradient text-white text-sm font-semibold" type="button" onClick={() => setInviteOpen(true)}>+ Invite</button>
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                className="h-8 px-3 rounded-xl border border-[rgb(var(--form-border-muted))] bg-[rgb(var(--zinc-light))] text-[rgb(var(--black))] text-sm font-semibold flex items-center gap-2"
                onClick={() => setProfileOpen((open) => !open)}
              >
                AK
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-[rgb(var(--form-border-muted))] bg-white shadow-lg overflow-hidden z-50">
                  <button type="button" className="w-full text-left px-4 py-3 text-sm text-[rgb(var(--black))] hover:bg-[rgb(var(--zinc-light))]">Profile</button>
                  <button type="button" className="w-full text-left px-4 py-3 text-sm text-[rgb(var(--black))] hover:bg-[rgb(var(--zinc-light))]">Settings</button>
                  <button type="button" className="w-full text-left px-4 py-3 text-sm text-[rgb(var(--black))] hover:bg-[rgb(var(--zinc-light))]">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}

