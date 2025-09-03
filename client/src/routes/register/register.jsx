import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="registerPage h-full flex">
  <div className="formContainer flex-3 h-full flex items-center justify-center">
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Create an Account</h1>
      <input
        name="username"
        type="text"
        placeholder="Username"
        className="p-5 border border-gray-300 rounded-lg"
      />
      <input
        name="email"
        type="text"
        placeholder="Email"
        className="p-5 border border-gray-300 rounded-lg"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="p-5 border border-gray-300 rounded-lg"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`p-5 rounded-lg border-none font-bold cursor-pointer ${
          isLoading ? "bg-teal-200 cursor-not-allowed" : "bg-teal-500 text-white"
        }`}
      >
        Register
      </button>
      {error && <span className="text-red-500">{error}</span>}
      <Link to="/login" className="text-sm text-gray-600 border-b border-gray-300">
        Do you have an account?
      </Link>
    </form>
  </div>

  <div className="imgContainer flex-2 bg-[#fcf5f3] flex items-center justify-center">
    <img src="/bg.png" alt="" className="w-full" />
  </div>
</div>
  );
}

export default Register;
