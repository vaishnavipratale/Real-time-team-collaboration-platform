import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../features/onboarding/components/AuthShell";
import { BrandHeader, WelcomePill } from "../features/onboarding/components/AuthPrimitives";

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      alert("Please enter your email or phone number.");
      return;
    }
    navigate("/check-otp", { state: { identifier } });
  };

  const rightPanel = (
    <div className="flex flex-col gap-8">
      {/* Feature cards */}
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

      {/* Tagline */}
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

      {/* TOP ROW — Nova logo + moon icon */}
      <BrandHeader />

      {/* CENTER — form, vertically centered in remaining space */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="w-full max-w-[380px]">

          <WelcomePill text="Welcome back" />

          <h1 className="mt-4 text-[32px] font-semibold leading-[1.15] ui-text-heading">
            Sign in to your workspace
          </h1>
          <p className="mt-3 text-[14px] leading-6 ui-text-muted">
            Use your work email or phone — we'll send a one-time code.
          </p>

          <label className="mt-6 block">
            <span className="text-[13px] font-semibold ui-text-default">
              Email or phone number
            </span>
            <input
              className="ui-input mt-1.5 h-10 rounded-xl text-[13px]"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="alex@nova.com or +1 555 123 4567"
            />
          </label>

          <button
            type="button"
            onClick={handleSendOtp}
            className="ui-gradient mt-2.5 h-10 w-full rounded-xl text-[13px] font-bold text-white"
          >
            Send OTP →
          </button>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[rgb(var(--form-border-muted))]" />
            <span className="text-[12px] ui-text-muted">or continue with</span>
            <span className="h-px flex-1 bg-[rgb(var(--form-border-muted))]" />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="h-10 rounded-xl border border-[rgb(var(--form-border))] bg-[rgb(var(--form-bg))] text-[13px] font-semibold ui-text-default transition-colors hover:bg-[rgb(var(--form-border-muted))]">
              Google
            </button>
            <button className="h-10 rounded-xl border border-[rgb(var(--form-border))] bg-[rgb(var(--form-bg))] text-[13px] font-semibold ui-text-default transition-colors hover:bg-[rgb(var(--form-border-muted))]">
              SSO
            </button>
          </div>

          <p className="mt-5 text-[12px] leading-5 ui-text-muted">
            By continuing you agree to our Terms and Privacy Policy.
          </p>

        </div>
      </div>

      {/* BOTTOM — anchored to bottom-left, below logo */}
      <p className="text-[12px] ui-text-muted">
        Don't have an account?{" "}
        <button className="font-semibold ui-text-default hover:underline">
          Request access
        </button>
      </p>

    </AuthShell>
  );
}