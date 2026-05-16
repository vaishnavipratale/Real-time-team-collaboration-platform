import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialRows = [
  { email: "", role: "Member" },
  { email: "", role: "Member" },
  { email: "", role: "Member" },
];
const roles = ["Member", "Admin", "Viewer"];

export default function InviteMembersPage() {
  const [rows, setRows] = useState(initialRows);
  const navigate = useNavigate();

  const updateRow = (index: number, key: "email" | "role", value: string) => {
    const next = [...rows];
    next[index] = { ...next[index], [key]: value };
    setRows(next);
  };

  const addRow = () => {
    setRows([...rows, { email: "", role: "Member" }]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
      <div style={{ width: "100%", maxWidth: 820, background: "#fff", borderRadius: 28, boxShadow: "0 32px 80px rgba(15, 23, 42, 0.08)", padding: 34 }}>
        <div style={{ marginBottom: 26 }}>
          <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", fontSize: 12, letterSpacing: "0.18em", fontWeight: 700 }}>
            You’re almost ready
          </p>
          <h1 style={{ margin: "10px 0 8px", fontSize: 34, fontWeight: 700, color: "#0f172a" }}>
            Invite your team
          </h1>
          <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.8 }}>
            Nova is better with teammates. Add a few collaborators to get started.
          </p>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          {rows.map((row, index) => (
            <div key={index} style={{ display: "grid", gap: 12, background: "#f8fafc", borderRadius: 20, padding: 18, border: "1px solid #dbeafe" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#0f172a", fontWeight: 700 }}>Collaborator {index + 1}</span>
                <button
                  type="button"
                  onClick={() => setRows(rows.filter((_, idx) => idx !== index))}
                  style={{ border: "none", background: "transparent", color: "#475569", cursor: "pointer" }}
                >
                  Remove
                </button>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <input
                  value={row.email}
                  onChange={(e) => updateRow(index, "email", e.target.value)}
                  placeholder="name@company.com"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #cbd5e1", fontSize: 15, color: "#0f172a" }}
                />
                <select
                  value={row.role}
                  onChange={(e) => updateRow(index, "role", e.target.value)}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #cbd5e1", fontSize: 15, color: "#0f172a", background: "#fff" }}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRow}
          style={{
            marginTop: 20,
            borderRadius: 18,
            border: "1px dashed #c7d2fe",
            background: "#eff6ff",
            padding: "14px 18px",
            fontSize: 15,
            fontWeight: 600,
            color: "#4338ca",
            cursor: "pointer",
          }}
        >
          + Add another
        </button>

        <div
          style={{
            marginTop: 30,
            borderRadius: 24,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            padding: 24,
            display: "grid",
            gap: 14,
          }}
        >
          <div style={{ color: "#334155", fontWeight: 700 }}>Invite link</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <input
              value="https://nova.app/invite/8f3a-2c91-7b4e"
              readOnly
              style={{ flex: 1, minWidth: 0, padding: "14px 16px", borderRadius: 16, border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a" }}
            />
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText("https://nova.app/invite/8f3a-2c91-7b4e")}
              style={{ borderRadius: 16, border: "none", padding: "14px 20px", background: "#4338ca", color: "#fff", fontWeight: 600, cursor: "pointer" }}
            >
              Copy
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: 30,
            borderRadius: 16,
            border: "none",
            padding: "16px 24px",
            background: "linear-gradient(135deg, #4f6ef7, #6378f8)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Continue to workspace →
        </button>
      </div>
    </div>
  );
}
