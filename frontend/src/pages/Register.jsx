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
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-indigo-600 text-white p-2 rounded"
        >
          Register
        </button>

        <p className="mt-3 text-center">
          Already have an account?
          <Link to="/" className="text-indigo-600 ml-1">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;
