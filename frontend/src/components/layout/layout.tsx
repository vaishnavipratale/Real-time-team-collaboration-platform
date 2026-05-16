import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Inbox", to: "/dashboard" },
  { label: "Messages", to: "/dashboard" },
  { label: "Documents", to: "/dashboard" },
  { label: "Settings", to: "/dashboard" },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f4f6fb", color: "#0f172a", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <aside style={{ width: 300, minHeight: "100vh", padding: 28, background: "#ffffff", borderRight: "1px solid #e5e7eb", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, display: "grid", placeItems: "center", background: "#4338ca", color: "#fff", fontWeight: 700, fontSize: 18 }}>
            N
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Nova Labs</div>
            <div style={{ color: "#64748b", fontSize: 13 }}>Workspace overview</div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={{
                display: "block",
                padding: "14px 18px",
                borderRadius: 18,
                textDecoration: "none",
                color: "#0f172a",
                background: item.label === "Dashboard" ? "#eef2ff" : "transparent",
                border: item.label === "Dashboard" ? "1px solid #c7d2fe" : "1px solid transparent",
                fontWeight: item.label === "Dashboard" ? 700 : 600,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: 20, borderRadius: 24, background: "#eff6ff", border: "1px solid #dbeafe" }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Upgrade to Business</div>
          <p style={{ margin: 0, color: "#475569", fontSize: 14, lineHeight: 1.75 }}>
            Unlock unlimited collaborators and advanced features.
          </p>
          <button
            type="button"
            style={{
              marginTop: 18,
              width: "100%",
              borderRadius: 16,
              border: "none",
              padding: "14px 16px",
              background: "#4338ca",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Upgrade
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 32px", background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "#e0e7ff", display: "grid", placeItems: "center", color: "#4338ca", fontWeight: 700 }}>
              ?
            </div>
            <div style={{ color: "#475569", fontWeight: 600 }}>Search workspace, people, files...</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button type="button" style={{ border: "none", background: "transparent", color: "#475569", cursor: "pointer" }}>
              ??
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#4338ca", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>
              AK
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowX: "hidden", padding: "28px 32px" }}>{children}</main>
      </div>
    </div>
  );
}
