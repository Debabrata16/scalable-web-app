import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      login(res.data.token);

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (

    <div className="
      min-h-screen
      flex justify-center items-center
      bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200
      animate-fadeIn
    ">

      <form
        onSubmit={handleLogin}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-xl
          w-full max-w-md
          transition-all duration-300
          hover:shadow-2xl hover:-translate-y-1
        "
      >
        

        <h2 className="
          text-3xl font-bold text-center mb-6
          text-indigo-600
        ">
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full p-3 mb-4
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-400
            transition-all duration-300
          "
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full p-3 mb-4
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-400
            transition-all duration-300
          "
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            bg-indigo-600 text-white
            p-3 rounded-lg
            font-semibold
            transition-all duration-300
            hover:bg-indigo-700 hover:scale-105
            active:scale-95
            shadow-md hover:shadow-lg
          "
        >
          Login
        </button>

        {/* Register Link */}
        <p className="mt-5 text-center text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="
              text-indigo-600 font-semibold ml-1
              hover:underline
            "
          >
            Register
          </Link>
        </p>

      </form>

    </div>

  );
}

export default Login;
