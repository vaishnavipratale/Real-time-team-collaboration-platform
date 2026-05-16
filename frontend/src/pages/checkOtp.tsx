import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOtpPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
  };

  const handleVerify = () => {
    if (code.every((digit) => digit.length === 1)) {
      navigate("/select-workspace");
    } else {
      alert("Please enter the 6-digit code sent to your email.");
    }
  };

  const handleResend = () => {
    alert("A new code has been sent.");
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
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#ffffff",
          borderRadius: 24,
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
          padding: "42px 36px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#667085",
            fontSize: 13,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
          }}
        >
          Welcome back
        </p>
        <h1
          style={{
            margin: "18px 0 10px",
            fontSize: 36,
            fontWeight: 500,
            color: "#111827",
            lineHeight: 1.1,
          }}
        >
          Check your messages
        </h1>
        <p style={{ margin: 0, color: "#667085", lineHeight: 1.8, fontSize: 15 }}>
          We sent a 6-digit code to pratalevaishnavi440@gmail.com. It expires in 10 minutes.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(56px, 1fr))",
            gap: 12,
            marginTop: 32,
          }}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              style={{
                width: "100%",
                height: 64,
                borderRadius: 16,
                border: "1px solid #d1d5db",
                textAlign: "center",
                fontSize: 24,
                fontWeight: 600,
                color: "#111827",
                outline: "none",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleVerify}
          style={{
            marginTop: 32,
            width: "100%",
            padding: "16px 20px",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg, #4f6ef7, #6378f8)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Verify & continue →
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 22,
            color: "#475569",
            fontSize: 14,
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontWeight: 600 }}
          >
            ← Use a different identifier
          </button>
          <button
            type="button"
            onClick={handleResend}
            style={{ background: "none", border: "none", color: "#4f6ef7", cursor: "pointer", fontWeight: 600 }}
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
}
