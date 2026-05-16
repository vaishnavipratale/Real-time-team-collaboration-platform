import { useState } from "react";
import { useNavigate } from "react-router-dom";

const teamSizes = ["2–10", "11–20", "21–50", "51–100"];
const industries = ["Software", "Design", "Marketing", "Finance", "Education", "Healthcare", "Other"];

export default function CreateWorkspacePage() {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("Acme Inc");
  const [workspaceUrl, setWorkspaceUrl] = useState("acme");
  const [teamSize, setTeamSize] = useState(teamSizes[0]);
  const [industry, setIndustry] = useState(industries[0]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) {
      if (!workspaceName.trim() || !workspaceUrl.trim()) {
        alert("Please fill in both workspace name and workspace URL.");
        return;
      }
      setStep(2);
      return;
    }

    navigate("/invite-members");
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
      <div style={{ width: "100%", maxWidth: 760, background: "#fff", borderRadius: 28, boxShadow: "0 30px 80px rgba(15, 23, 42, 0.08)", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 26 }}>
          <div>
            <p style={{ margin: 0, color: "#475569", textTransform: "uppercase", fontSize: 12, letterSpacing: "0.18em", fontWeight: 700 }}>
              Step {step} of 2
            </p>
            <h1 style={{ margin: "10px 0 6px", fontSize: 34, fontWeight: 700, color: "#0f172a" }}>
              Name your workspace
            </h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: 15, lineHeight: 1.75 }}>
              This is what your team will see.
            </p>
          </div>
          <div style={{ color: "#14b8a6", fontWeight: 700 }}>
            {step === 1 ? "Workspace details" : "Team setup"}
          </div>
        </div>

        {step === 1 ? (
          <div style={{ display: "grid", gap: 24 }}>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#334155", fontWeight: 600 }}>Workspace name</span>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #cbd5e1", fontSize: 15, color: "#0f172a" }}
              />
            </label>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#334155", fontWeight: 600 }}>Workspace URL</span>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ padding: "14px 16px", borderRadius: 16, background: "#f8fafc", border: "1px solid #cbd5e1", color: "#64748b" }}>
                  nova.app/
                </span>
                <input
                  type="text"
                  value={workspaceUrl}
                  onChange={(e) => setWorkspaceUrl(e.target.value)}
                  style={{ flex: 1, padding: "14px 16px", borderRadius: 16, border: "1px solid #cbd5e1", fontSize: 15, color: "#0f172a" }}
                />
              </div>
            </label>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 24 }}>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#334155", fontWeight: 600 }}>Team size</span>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #cbd5e1", fontSize: 15, color: "#0f172a", background: "#fff" }}
              >
                {teamSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "grid", gap: 10 }}>
              <span style={{ color: "#334155", fontWeight: 600 }}>Industry</span>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #cbd5e1", fontSize: 15, color: "#0f172a", background: "#fff" }}
              >
                {industries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <div style={{ marginTop: 34, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontWeight: 600 }}
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            style={{
              marginLeft: "auto",
              borderRadius: 16,
              border: "none",
              padding: "16px 24px",
              background: "linear-gradient(135deg, #4f6ef7, #6378f8)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              minWidth: 180,
            }}
          >
            {step === 1 ? "Continue →" : "Create workspace"}
          </button>
        </div>
      </div>
    </div>
  );
}
