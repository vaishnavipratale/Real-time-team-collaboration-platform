import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@context/sessionContext";

export default function CreateWorkspacePage() {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("Acme Inc");
  const [workspaceUrl, setWorkspaceUrl] = useState("acme");
  const navigate = useNavigate();
  const { login } = useSession();

  const handleNext = () => {
    if (step === 1) {
      if (!workspaceName.trim() || !workspaceUrl.trim()) return;
      setStep(2);
      return;
    }
    localStorage.setItem("hasWorkspace", "true");
    localStorage.setItem("activeWorkspaceId", workspaceUrl.trim().toLowerCase() || "workspace");
    localStorage.setItem("activeWorkspaceName", workspaceName.trim() || "Workspace");
    login();
    navigate("/invite-members");
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
          <span className="text-[13px] text-gray-400">Step {step} of 2</span>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-16">
        <div className="w-full max-w-[480px]">

          {/* Progress bar */}
          <div className="w-full h-[3px] bg-gray-100 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: step === 1 ? "50%" : "100%",
                background: "linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)",
              }}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-[12px] text-gray-500 mb-5">
            <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Set up your workspace
          </div>

          {/* Heading */}
          <h1 className="text-[36px] font-bold leading-tight mb-2" style={{ color: "#c5cbd8" }}>
            {step === 1 ? "Name your workspace" : "Tell us about your team"}
          </h1>
          <p className="text-[14px] text-gray-400 mb-8">
            {step === 1 ? "This is what your team will see." : "Help us personalise your experience."}
          </p>

          {/* Form */}
          {step === 1 ? (
            <div className="flex flex-col gap-5">
              {/* Workspace name */}
              <div>
                <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                  Workspace name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Acme Inc"
                  className="w-full h-[48px] px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-800 placeholder-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Workspace URL */}
              <div>
                <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                  Workspace URL
                </label>
                <div className="flex h-[48px] rounded-xl border border-gray-200 overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">
                  <div className="flex items-center px-4 bg-gray-50 border-r border-gray-200 text-[13px] text-gray-400 whitespace-nowrap flex-shrink-0">
                    nova.app/
                  </div>
                  <input
                    type="text"
                    value={workspaceUrl}
                    onChange={(e) => setWorkspaceUrl(e.target.value)}
                    placeholder="acme"
                    className="flex-1 px-4 bg-white text-[14px] text-gray-800 placeholder-gray-300 outline-none"
                  />
                </div>
              </div>

              {/* Continue button */}
              <button
                type="button"
                onClick={handleNext}
                className="w-full h-[50px] rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 mt-1 transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6b8ef5 0%, #4f6ef7 100%)" }}
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-[13px] font-medium text-gray-500 mb-1.5">Team size</label>
                <select className="w-full h-[48px] px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition appearance-none">
                  {["2–10", "11–20", "21–50", "51–100", "100+"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-500 mb-1.5">Industry</label>
                <select className="w-full h-[48px] px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition appearance-none">
                  {["Software", "Design", "Marketing", "Finance", "Education", "Healthcare", "Other"].map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between mt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[13px] font-medium text-gray-400 hover:text-gray-600"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-[50px] px-8 rounded-xl text-white font-semibold text-[15px] flex items-center gap-2 transition hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #6b8ef5 0%, #4f6ef7 100%)" }}
                >
                  Create workspace
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
