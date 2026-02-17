import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registered successfully");
      navigate("/");

    } catch (error) {
      alert("Registration failed");
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
        onSubmit={handleRegister}
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
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full p-3 mb-4
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-400
            transition-all duration-300
          "
          required
        />

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
          Register
        </button>

        {/* Login Link */}
        <p className="mt-5 text-center text-gray-600">
          Already have an account?
          <Link
            to="/"
            className="
              text-indigo-600 font-semibold ml-1
              hover:underline
            "
          >
            Login
          </Link>
        </p>

      </form>

    </div>

  );
}

export default Register;
