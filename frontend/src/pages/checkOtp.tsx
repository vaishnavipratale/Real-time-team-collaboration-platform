import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "@context/sessionContext";
import AuthShell from "../features/onboarding/components/AuthShell";
import { BrandHeader, WelcomePill } from "../features/onboarding/components/AuthPrimitives";

export default function CheckOtpPage() {
  const navigate = useNavigate();
  const { login } = useSession();
  const location = useLocation();
  const identifier =
    (location.state as { identifier?: string } | null)?.identifier ?? "your email";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join("").length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }
    login({
      first_name: "Alex",
      last_name: "Kim",
      email: String(identifier),
      role: "owner",
    });
    const hasWorkspace = localStorage.getItem("hasWorkspace") === "true";
    navigate(hasWorkspace ? "/select-workspace" : "/create-workspace");
  };

  const rightPanel = (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        {[
          {
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            ),
            title: "Real-time editing",
            desc: "Maya is editing 'Q4 Roadmap' · 3 collaborators online",
            active: true,
          },
          {
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            ),
            title: "#engineering",
            desc: "Jordan: Shipped the new auth flow 🚀",
            active: false,
          },
          {
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            ),
            title: "Permissions updated",
            desc: "Sam was granted Admin access to Nova Labs",
            active: false,
          },
        ].map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl border bg-[rgb(var(--card))] px-4 py-4 shadow-[0_6px_20px_rgba(15,23,42,0.06)] ${
              item.active
                ? "border-[rgba(79,110,247,0.3)]"
                : "border-[rgb(var(--form-border-muted))]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(79,110,247,0.08)] text-[rgb(var(--primary-start))]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[13px] font-bold ui-text-default">{item.title}</p>
                  <p className="mt-0.5 text-[12px] leading-5 ui-text-muted">{item.desc}</p>
                </div>
              </div>
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[rgb(var(--green-base))]" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-[32px] font-semibold leading-[1.15] ui-text-heading">
          Where modern teams ship together.
        </h2>
        <p className="mt-3 text-[15px] leading-7 ui-text-muted">
          Docs, chat, and projects — unified in one beautifully fast workspace.
        </p>
      </div>
    </div>
  );

  return (
    <AuthShell rightPanel={rightPanel}>

      {/* TOP */}
      <BrandHeader />

      {/* CENTER */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="w-full max-w-[380px]">

          <WelcomePill text="Welcome back" />

          <h1 className="mt-4 text-[32px] font-semibold leading-[1.15] ui-text-heading">
            Check your messages
          </h1>
          <p className="mt-3 text-[14px] leading-6 ui-text-muted">
            We sent a 6-digit code to{" "}
            <span className="font-semibold ui-text-default">{identifier}</span>.
            It expires in 10 minutes.
          </p>

          <div className="mt-6 grid grid-cols-6 gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { otpRefs.current[index] = el; }}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="ui-input h-12 rounded-xl text-center text-[16px] font-bold"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={verifyOtp}
            className="ui-gradient mt-3 h-10 w-full rounded-xl text-[13px] font-bold text-white"
          >
            Verify &amp; continue →
          </button>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[12px] font-semibold ui-text-muted transition-colors"
            >
              ← Use a different identifier
            </button>
            <button
              type="button"
              className="text-[12px] font-semibold text-[rgb(var(--primary-start))] transition-opacity hover:opacity-75"
            >
              Resend code
            </button>
          </div>

          <p className="mt-5 text-[12px] leading-5 ui-text-muted">
            By continuing you agree to our Terms and Privacy Policy.
          </p>

        </div>
      </div>

      {/* BOTTOM */}
      <p className="text-[12px] ui-text-muted">
        Don't have an account?{" "}
        <button className="font-semibold ui-text-default hover:underline">
          Request access
        </button>
      </p>

    </AuthShell>
  );
}
