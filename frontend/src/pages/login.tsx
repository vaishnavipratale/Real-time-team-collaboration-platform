import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (email.trim()) {
      navigate("/check-otp");
    } else {
      alert("Please enter your work email or phone number.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        minHeight: "100vh",
        display: "flex",
        backgroundColor: darkMode ? "#0f0f13" : "#f5f5f7",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 32px 48px 40px;
          background: ${darkMode ? "#111116" : "#ffffff"};
          position: relative;
          min-height: 100vh;
        }

        .right-panel {
          flex: 1;
          background: ${darkMode ? "#1a1a24" : "#eef0f7"};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        .logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #4f6ef7, #5b8cf5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: -0.5px;
        }

        .logo-name {
          font-size: 16px;
          font-weight: 600;
          color: ${darkMode ? "#e8e8f0" : "#111118"};
          letter-spacing: -0.2px;
        }

        .dark-toggle {
          background: none;
          border: 1px solid ${darkMode ? "#2a2a38" : "#e0e0e8"};
          border-radius: 8px;
          padding: 7px 10px;
          cursor: pointer;
          color: ${darkMode ? "#8888aa" : "#888899"};
          font-size: 15px;
          display: flex;
          align-items: center;
          transition: all 0.2s;
        }

        .dark-toggle:hover {
          background: ${darkMode ? "#22222e" : "#f0f0f6"};
        }

        .form-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 380px;
          margin: 0 auto;
          width: 100%;
          padding: 60px 0;
        }

        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: ${darkMode ? "#1e1e2c" : "#f0f0f8"};
          border: 1px solid ${darkMode ? "#2d2d40" : "#e2e2ee"};
          border-radius: 100px;
          padding: 5px 14px 5px 10px;
          font-size: 12.5px;
          color: ${darkMode ? "#9090b8" : "#7777a0"};
          margin-bottom: 28px;
          width: fit-content;
        }

        .welcome-icon {
          font-size: 14px;
        }

        .headline {
          font-size: 38px;
          font-weight: 300;
          line-height: 1.18;
          letter-spacing: -1.2px;
          color: ${darkMode ? "#c0c0d8" : "#8888aa"};
          margin-bottom: 14px;
        }

        .subtext {
          font-size: 14px;
          color: ${darkMode ? "#6666888" : "#888899"};
          margin-bottom: 36px;
          line-height: 1.5;
        }

        .field-label {
          font-size: 13px;
          font-weight: 500;
          color: ${darkMode ? "#9090b0" : "#555568"};
          margin-bottom: 8px;
          letter-spacing: 0.1px;
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid ${darkMode ? "#28283a" : "#e0e0ec"};
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          background: ${darkMode ? "#16161f" : "#ffffff"};
          color: ${darkMode ? "#d0d0e8" : "#222230"};
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 16px;
        }

        .input-field::placeholder {
          color: ${darkMode ? "#44445a" : "#b0b0c0"};
        }

        .input-field:focus {
          border-color: #4f6ef7;
          box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.12);
        }

        .otp-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #5165f6, #6378f8);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14.5px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          letter-spacing: 0.1px;
          box-shadow: 0 4px 14px rgba(79, 110, 247, 0.3);
        }

        .otp-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(79, 110, 247, 0.4);
          background: linear-gradient(135deg, #4255f0, #5568f6);
        }

        .otp-btn:active {
          transform: translateY(0);
        }

        .divider-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 22px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: ${darkMode ? "#22223a" : "#e8e8f0"};
        }

        .divider-text {
          font-size: 12.5px;
          color: ${darkMode ? "#55556a" : "#aaaabc"};
        }

        .social-row {
          display: flex;
          gap: 10px;
        }

        .social-btn {
          flex: 1;
          padding: 11px;
          border: 1.5px solid ${darkMode ? "#28283a" : "#e0e0ec"};
          border-radius: 10px;
          background: ${darkMode ? "#16161f" : "#ffffff"};
          color: ${darkMode ? "#c0c0d8" : "#333344"};
          font-size: 13.5px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .social-btn:hover {
          background: ${darkMode ? "#1e1e2c" : "#f5f5fc"};
          border-color: ${darkMode ? "#3535508" : "#ccccdc"};
        }

        .terms-text {
          font-size: 11.5px;
          color: ${darkMode ? "#44445a" : "#aaaabc"};
          text-align: center;
          margin-top: 20px;
          line-height: 1.6;
        }

        .terms-text a {
          color: ${darkMode ? "#6666aa" : "#6666aa"};
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .bottom-link {
          font-size: 12.5px;
          color: ${darkMode ? "#55556a" : "#aaaabc"};
          margin-top: auto;
        }

        .bottom-link a {
          color: ${darkMode ? "#8888cc" : "#4444aa"};
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }

        /* Right Panel */
        .activity-cards {
          width: 100%;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 48px;
        }

        .activity-card {
          background: ${darkMode ? "#1e1e2c" : "#ffffff"};
          border-radius: 14px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid ${darkMode ? "#28283a" : "transparent"};
        }

        .card-left {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          flex: 1;
        }

        .card-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .card-content {}

        .card-title {
          font-size: 13.5px;
          font-weight: 600;
          color: ${darkMode ? "#d0d0e8" : "#111122"};
          margin-bottom: 3px;
          letter-spacing: -0.1px;
        }

        .card-desc {
          font-size: 12.5px;
          color: ${darkMode ? "#66668a" : "#888899"};
          line-height: 1.4;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22cc88;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .tagline {
          text-align: center;
        }

        .tagline-main {
          font-size: 28px;
          font-weight: 300;
          letter-spacing: -0.8px;
          color: ${darkMode ? "#5555777" : "#c0c0d4"};
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .tagline-main strong {
          color: ${darkMode ? "#9898cc" : "#9898cc"};
          font-weight: 500;
        }

        .tagline-sub {
          font-size: 13.5px;
          color: ${darkMode ? "#44445a" : "#aaaabc"};
          line-height: 1.6;
        }
      `}</style>

      {/* LEFT PANEL */}
      <div className="left-panel">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="logo-row">
            <div className="logo-icon">N</div>
            <span className="logo-name">Nova</span>
          </div>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀" : "☾"}
          </button>
        </div>

        {/* Form */}
        <div className="form-area">
          <div className="welcome-badge">
            <span className="welcome-icon">👋</span>
            Welcome back
          </div>

          <h1 className="headline">
            Sign in to your<br />workspace
          </h1>

          <p className="subtext">
            Use your work email or phone — we'll send a one-time code.
          </p>

          <label className="field-label">Email or phone number</label>
          <input
            type="text"
            className="input-field"
            placeholder="alex@nova.com or +1 555 123 4567"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="otp-btn" onClick={handleSendOTP}>
            Send OTP →
          </button>

          <div className="divider-row">
            <div className="divider-line" />
            <span className="divider-text">or continue with</span>
            <div className="divider-line" />
          </div>

          <div className="social-row">
            <button className="social-btn">Google</button>
            <button className="social-btn">SSO</button>
          </div>

          <p className="terms-text">
            By continuing you agree to our{" "}
            <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>

        {/* Footer */}
        <div className="bottom-link">
          Don't have an account? <a href="#">Request access</a>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="activity-cards">
          {/* Card 1 */}
          <div className="activity-card">
            <div className="card-left">
              <div className="card-icon" style={{ background: "linear-gradient(135deg, #e8f0ff, #d0e0ff)" }}>
                ⚡
              </div>
              <div className="card-content">
                <div className="card-title">Real-time editing</div>
                <div className="card-desc">Maya is editing 'Q4 Roadmap' · 3 collaborators online</div>
              </div>
            </div>
            <div className="dot" />
          </div>

          {/* Card 2 */}
          <div className="activity-card">
            <div className="card-left">
              <div className="card-icon" style={{ background: "linear-gradient(135deg, #e8f0ff, #d8e8ff)" }}>
                👤
              </div>
              <div className="card-content">
                <div className="card-title">#engineering</div>
                <div className="card-desc">Jordan: Shipped the new auth flow 🎉</div>
              </div>
            </div>
            <div className="dot" />
          </div>

          {/* Card 3 */}
          <div className="activity-card">
            <div className="card-left">
              <div className="card-icon" style={{ background: "linear-gradient(135deg, #e8f0ff, #ddeeff)" }}>
                🛡
              </div>
              <div className="card-content">
                <div className="card-title">Permissions updated</div>
                <div className="card-desc">Sam was granted Admin access to Nova Labs</div>
              </div>
            </div>
            <div className="dot" />
          </div>
        </div>

        <div className="tagline">
          <div className="tagline-main">
            Where modern teams <strong>ship together.</strong>
          </div>
          <div className="tagline-sub">
            Docs, chat, and projects — unified in one beautifully fast workspace.
          </div>
        </div>
      </div>
    </div>
  );
}