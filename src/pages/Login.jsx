import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
  //  console.log("Stored token:", data.jwt);
      // console.log("FULL RESPONSE:", data);

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("role", data.role);

      // console.log("TOKEN:", data.jwt);

      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[360px]">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center mb-2">CRM Login</h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Sign in to continue
        </p>

        {/* Username */}
        <div className="flex items-center border rounded-lg px-3 mb-4 focus-within:ring-2 focus-within:ring-gray-300">
          <User size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 outline-none text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-lg px-3 mb-6 focus-within:ring-2 focus-within:ring-gray-300">
          <Lock size={18} className="text-gray-400" />

          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 outline-none text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Show/Hide */}
          <button onClick={() => setShow(!show)}>
            {show ? (
              <EyeOff size={18} className="text-gray-400" />
            ) : (
              <Eye size={18} className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
