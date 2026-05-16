import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { sendOtp, verifyOtp } from "../../../api/authApi";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await sendOtp(email);
      setStep("OTP");
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await verifyOtp(email, otp);

      const token = res.data.token;

      localStorage.setItem("token", token);

      alert("Login successful");
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {step === "EMAIL" && (
        <>
          <Input
            placeholder="Enter email or mobile"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button onClick={handleSendOtp}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </>
      )}

      {step === "OTP" && (
        <>
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button onClick={handleVerifyOtp}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </>
      )}

    </div>
  );
}