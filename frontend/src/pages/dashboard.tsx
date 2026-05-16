export default function DashboardPage() {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: 0, color: "#475569", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em" }}>
            Dashboard
          </p>
          <h1 style={{ margin: "10px 0 0", fontSize: 36, fontWeight: 700, color: "#0f172a" }}>
            Good morning, Alex 👋
          </h1>
          <p style={{ margin: "14px 0 0", color: "#64748b", fontSize: 15, lineHeight: 1.8 }}>
            Here's what's happening across your team today.
          </p>
        </div>
        <button
          type="button"
          style={{
            borderRadius: 16,
            border: "none",
            padding: "14px 22px",
            background: "#4338ca",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          New project
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
        {[
          { title: "Active members", value: "24", badge: "+3" },
          { title: "Open documents", value: "128", badge: "+12" },
          { title: "Messages today", value: "1,284", badge: "+18%" },
          { title: "Tasks completed", value: "92%", badge: "+4%" },
        ].map((item) => (
          <div key={item.title} style={{ background: "#fff", borderRadius: 24, padding: 24, border: "1px solid #e2e8f0" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.14em" }}>
              {item.title}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>{item.value}</span>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>{item.badge}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 18 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 24, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Recent activity</h2>
            <span style={{ color: "#64748b", fontSize: 13 }}>Live across your workspace</span>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
            {[
              { name: "Maya Chen", action: "edited Q4 Roadmap", time: "2m ago" },
              { name: "Jordan Lee", action: "commented in #engineering", time: "8m ago" },
              { name: "Sam Patel", action: "shared Brand Guidelines.pdf", time: "21m ago" },
            ].map((item) => (
              <li key={item.name} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "#eef2ff", display: "grid", placeItems: "center", color: "#4338ca", fontWeight: 700 }}>
                  {item.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: "#0f172a" }}>{item.name} <span style={{ fontWeight: 500, color: "#475569" }}>{item.action}</span></p>
                  <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: 24, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Team online</h2>
            <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 700 }}>3 online</span>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { name: "Alex Kim", role: "Product · Online" },
              { name: "Maya Chen", role: "Design · Online" },
              { name: "Jordan Lee", role: "Engineering · Busy" },
            ].map((member) => (
              <div key={member.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#c7d2fe", display: "grid", placeItems: "center", color: "#312e81", fontWeight: 700 }}>
                  {member.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: "#0f172a" }}>{member.name}</p>
                  <p style={{ margin: "5px 0 0", color: "#64748b", fontSize: 13 }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
