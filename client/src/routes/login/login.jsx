import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data)

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-full">
    <div className="flex-[3] h-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <h1>Welcome back</h1>
        <input
          name="username"
          required
          minLength={3}
          maxLength={20}
          type="text"
          placeholder="Username"
          className="p-[20px] border border-gray-300 rounded-[5px]"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="p-[20px] border border-gray-300 rounded-[5px]"
        />
        <button
          disabled={isLoading}
          className="p-[20px] rounded-[5px] bg-teal-500 text-white font-bold cursor-pointer disabled:bg-[#BED9D8] disabled:cursor-not-allowed"
        >
          Login
        </button>
        {error && <span className="text-red-500">{error}</span>}
        <Link to="/register" className="text-sm text-gray-500 border-b border-gray-500 w-max">
          {"Don't"} you have an account?
        </Link>
      </form>
    </div>
    <div className="flex-[2] bg-[#fcf5f3] flex items-center justify-center">
      <img src="/bg.png" alt="" className="w-full" />
    </div>
  </div>  
  );
}

export default Login;
