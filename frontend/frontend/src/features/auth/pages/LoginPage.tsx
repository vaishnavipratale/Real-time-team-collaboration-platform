import LoginForm from "../components/LoginForm";

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-orange-200">

      <div className="bg-white w-[380px] p-8 rounded-xl shadow-lg">

        <div className="flex justify-center mb-6">
          <div className="text-4xl">📷</div>
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">
          Login
        </h2>

        <LoginForm />

      </div>

    </div>
  );
}