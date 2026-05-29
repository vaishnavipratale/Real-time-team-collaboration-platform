import { Link, useParams } from "react-router-dom";
import Profile from "./profile";
import Workspace from "./workspace";
import Members from "./members";
import Roles from "./roles";
import Billing from "./billing";

const tabs = ["profile", "workspace", "members", "roles", "billing"] as const;
type TabType = (typeof tabs)[number];

function tabLabel(t: TabType) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export default function SettingsPage() {
  const { tab } = useParams();
  const active = (tabs.includes((tab as TabType) ?? "profile") ? (tab as TabType) : "profile") as TabType;

  return (
    <div className="rounded-2xl border border-[rgb(var(--form-border-muted))] bg-white overflow-hidden">
      <div className="px-6 pt-4 border-b border-[rgb(var(--form-border-muted))]">
        <div className="flex gap-8">
          {tabs.map((t) => {
            const isActive = active === t;
            return (
              <Link key={t} to={t === "profile" ? "/settings" : `/settings/${t}`} className={`pb-3 text-base ${isActive ? "text-[rgb(var(--black))] border-b-2 border-[rgb(var(--primary-start))]" : "ui-text-muted"}`}>
                {tabLabel(t)}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="p-6">
        {active === "profile" ? <Profile /> : null}
        {active === "workspace" ? <Workspace /> : null}
        {active === "members" ? <Members /> : null}
        {active === "roles" ? <Roles /> : null}
        {active === "billing" ? <Billing /> : null}
      </div>
    </div>
  );
}

