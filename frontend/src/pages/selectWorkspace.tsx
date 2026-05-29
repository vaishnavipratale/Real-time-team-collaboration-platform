import { useNavigate } from "react-router-dom";
import { useSession } from "@context/sessionContext";

export default function SelectWorkspacePage() {
  const navigate = useNavigate();
  const { login } = useSession();

 const workspaces = [
  { id: "nova-labs", initials: "NV", name: "Nova Labs", members: 12, lastSignIn: "2 hours ago" },
  { id: "acme-inc",  initials: "AC", name: "Acme Inc",  members: 4,  lastSignIn: "3 days ago"  },
];

  return (
    <div className="min-h-screen bg-[#f0f0ed]">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-7 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-[15px]">
            N
          </div>
          <span className="font-semibold text-[16px]">Nova</span>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
          Sign in to another account
        </button>
      </nav>

      {/* Main content */}
      <main className="max-w-[680px] mx-auto px-6 pt-16 pb-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-[42px] font-bold tracking-tight leading-tight">
            <span className="text-[#c9cdd8]">Welcome </span>
            <span className="text-[#8892a4]">back!</span>
          </h1>
          <p className="mt-2.5 text-[15px] text-[#a0a8b8]">
            You can create a new workspace or continue with an existing one.
          </p>
        </div>

        {/* Create new workspace */}
        <button
          type="button"
          onClick={() => navigate("/create-workspace")}
          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
        >
          <div className="w-[42px] h-[42px] rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[15px] text-gray-800">Create a new workspace</p>
            <p className="text-[13px] text-[#a0a8b8] mt-0.5">Start fresh for your team or project</p>
          </div>
          <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Legal */}
        <p className="text-center text-[12.5px] text-[#b0b8c8] mt-3.5 mb-7">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3.5 mb-7">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[11.5px] font-semibold tracking-[0.08em] text-[#b0b8c8] whitespace-nowrap">
            CONTINUE TO EXISTING WORKSPACE
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Ready to launch */}
        <p className="font-semibold text-[15px] text-gray-900 mb-0.5">Ready to launch</p>
        <p className="text-[13px] text-[#7b8fa6] mb-4">alex@nova.com</p>

        <div className="flex flex-col gap-3">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              type="button"
              onClick={() => {
                localStorage.setItem("hasWorkspace", "true");
                localStorage.setItem("activeWorkspaceId", ws.id);
                localStorage.setItem("activeWorkspaceName", ws.name);
                login();
                navigate(`/dashboard/${ws.id}`, { state: { workspace: ws } });
              }}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
            >
              {/* Avatar */}
              <div
                className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-white text-[14px] font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #5b9ef9 0%, #2563eb 100%)" }}
              >
                {ws.initials}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-[15px] text-gray-900 leading-snug">{ws.name}</p>
                <p className="text-[13px] text-[#9ca8b8] mt-0.5 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  {ws.members} members
                  <span className="text-[10px] leading-none">·</span>
                  Last sign-in {ws.lastSignIn}
                </p>
              </div>

              <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
