import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@context/sessionContext";

const roles = ["Member", "Admin", "Viewer"];

export default function InviteMembersPage() {
  const navigate = useNavigate();
  const { login } = useSession();
  const [rows, setRows] = useState([
    { email: "", role: "Member" },
    { email: "", role: "Member" },
    { email: "", role: "Member" },
  ]);
  const [copied, setCopied] = useState(false);

  const updateRow = (index: number, key: "email" | "role", value: string) => {
    const next = [...rows];
    next[index] = { ...next[index], [key]: value };
    setRows(next);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("https://nova.app/invite/8f3a-2c91-7b4e");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-7 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-[15px]">
            N
          </div>
          <span className="font-semibold text-[16px]">Nova</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const workspaceId = localStorage.getItem("activeWorkspaceId") || "nova-labs";
              login();
              navigate(`/dashboard/${workspaceId}`);
            }}
            className="text-[13px] text-gray-400 hover:text-gray-600 flex items-center gap-1"
          >
            Skip for now
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-14">
        <div className="w-full max-w-[540px]">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-[12px] text-gray-500 mb-5">
            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            You're almost ready
          </div>

          {/* Heading */}
          <h1 className="text-[36px] font-bold leading-tight mb-2" style={{ color: "#c5cbd8" }}>
            Invite your team
          </h1>
          <p className="text-[14px] text-gray-400 mb-7">
            Nova is better with teammates. Add a few collaborators to get started.
          </p>

          {/* Invite rows */}
          <div className="flex flex-col gap-3 mb-4">
            {rows.map((row, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="email"
                  value={row.email}
                  onChange={(e) => updateRow(index, "email", e.target.value)}
                  placeholder="name@company.com"
                  className="flex-1 h-[44px] px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-800 placeholder-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
                <select
                  value={row.role}
                  onChange={(e) => updateRow(index, "role", e.target.value)}
                  className="h-[44px] px-3 pr-8 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition appearance-none"
                  style={{ minWidth: "120px" }}
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-500 transition flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add another */}
          <button
            type="button"
            onClick={() => setRows([...rows, { email: "", role: "Member" }])}
            className="text-[13px] font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 mb-6"
          >
            + Add another
          </button>

          {/* Invite link box */}
          <div className="rounded-2xl border border-gray-200 p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-[13px] font-semibold text-gray-600">Invite link</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[40px] px-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center text-[13px] text-gray-500 overflow-hidden">
                <span className="truncate">https://nova.app/invite/8f3a-2c91-7b4e</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="h-[40px] px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 transition flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Continue button */}
          <button
            type="button"
            onClick={() => {
              const workspaceId = localStorage.getItem("activeWorkspaceId") || "nova-labs";
              login();
              navigate(`/dashboard/${workspaceId}`);
            }}
            className="w-full h-[50px] rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6b8ef5 0%, #4f6ef7 100%)" }}
          >
            Continue to workspace
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

        </div>
      </main>
    </div>
  );
}
