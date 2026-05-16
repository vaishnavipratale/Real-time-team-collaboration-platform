import { useNavigate } from "react-router-dom";

export default function SelectWorkspacePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        padding: "28px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div>
            <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 12, fontWeight: 600 }}>
              Welcome back
            </p>
            <h1 style={{ margin: "10px 0 0", fontSize: 36, fontWeight: 600, lineHeight: 1.08 }}>
              Choose a workspace
            </h1>
            <p style={{ margin: "12px 0 0", color: "#64748b", fontSize: 15, lineHeight: 1.75 }}>
              You can create a new workspace or continue with an existing one.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{
              borderRadius: 14,
              border: "1px solid #dbeafe",
              background: "#eef2ff",
              color: "#3730a3",
              padding: "14px 22px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Continue to workspace
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) 0.8fr", gap: 24 }}>
          <div style={{ display: "grid", gap: 24 }}>
            <button
              type="button"
              onClick={() => navigate("/create-workspace")}
              style={{
                borderRadius: 24,
                border: "1px solid #e2e8f0",
                background: "#fff",
                padding: "32px",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
                display: "grid",
                gap: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 16, background: "#eff6ff", color: "#1d4ed8", fontSize: 20 }}>
                  +
                </div>
                <span style={{ color: "#475569", fontWeight: 700, fontSize: 14 }}>Create a new workspace</span>
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#0f172a" }}>Start fresh for your team or project</h2>
                <p style={{ margin: "12px 0 0", color: "#64748b", lineHeight: 1.7 }}>
                  Build your workspace, invite teammates, and start collaborating instantly.
                </p>
              </div>
            </button>

            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ borderRadius: 24, background: "#fff", padding: 22, boxShadow: "0 16px 32px rgba(15, 23, 42, 0.04)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
                  <div>
                    <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 18 }}>Nova Labs</div>
                    <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>12 members · Pro</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    style={{ padding: "10px 16px", borderRadius: 14, border: "none", background: "#4338ca", color: "#fff", cursor: "pointer", fontWeight: 600 }}
                  >
                    Continue
                  </button>
                </div>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Live workspace with channels, documents, and real-time collaboration for your product team.
                </p>
              </div>

              <div style={{ borderRadius: 24, background: "#fff", padding: 22, boxShadow: "0 16px 32px rgba(15, 23, 42, 0.04)", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
                  <div>
                    <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 18 }}>Acme Inc</div>
                    <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>4 members · Last sign-in 3 days ago</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    style={{ padding: "10px 16px", borderRadius: 14, border: "1px solid #c7d2fe", background: "#eef2ff", color: "#4338ca", cursor: "pointer", fontWeight: 600 }}
                  >
                    Continue
                  </button>
                </div>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Continue working in an existing space with your team's latest shared updates.
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: 24, background: "#fff", padding: 28, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "#e0f2fe", color: "#0369a1", display: "grid", placeItems: "center", fontSize: 20, fontWeight: 700 }}>
                N
              </div>
              <div>
                <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 16 }}>Nova</div>
                <div style={{ color: "#64748b", fontSize: 14 }}>Real-time collaboration platform</div>
              </div>
            </div>
            <p style={{ margin: 0, color: "#475569", lineHeight: 1.75 }}>
              Pick the workspace you want to open or create a new one to match the onboarding flow shown in the screens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
