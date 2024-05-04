import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const FormLogin = () => {
  const [isLoginMessage, setIsLoginMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); // Mencegah perilaku default form submit
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/login",
        {
          email,
          password,
        }
      );

      // Simpan token di cookie
      Cookies.set("token", response.data.token, { expires: 7 }); // Token berlaku selama 7 hari

      // Redirect ke halaman dashboard
      window.location.href = "/dashboard";
      setIsLoginMessage(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Email is not verified"
      ) {
        console.error("Login error:", error.response.data.error);
        window.location.href = "/verify";
      }
      setIsLoginMessage(true);
      console.error("Login error:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-end w-[400px]"
    >
      <h1 className="text-[24px] text-[#2F2F2F] font-semibold">
        Welcome Back!
      </h1>
      <p className="text-[14px] text-[#2F2F2F] font-semibold mt-2">
        Sign in below to access your workspace and continue your projects. Let's
        pick up where you left off!
      </p>
      <div className="flex flex-col mt-6">
        <label
          htmlFor="email"
          className="text-[14px] text-[#2F2F2F] font-semibold"
        >
          Email Address
        </label>
        <input
          type="email"
          className="px-3 font-semibold rounded-lg bg-[#FFFFFF] focus:outline-none max-w-[400px] h-[40px] border-[#CBD5E1]"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-6">
        <label
          htmlFor="password"
          className="text-[14px] text-[#2F2F2F] font-semibold flex items-center justify-between"
        >
          <p>Password</p>
          <p className="underline">Forgot?</p>
        </label>
        <input
          type="password"
          className="px-3 font-semibold rounded-lg bg-[#FFFFFF] focus:outline-none max-w-[400px] h-[40px] border-[#CBD5E1]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-[#2F2F2F] hover:bg-[#454545] text-white font-bold py-2 w-full px-4 rounded mt-6"
        type="submit"
      >
        Sign In
      </button>

      {isLoginMessage && (
        <div className="p-4 bg-[#FBDFDF] mt-6 rounded">
          <p className="text-[14px] text-[#79889D]">
            The email and password you entered don't match. Please try again
          </p>
        </div>
      )}

      <p className="text-center text-[14px] text-[#2F2F2F] mt-6 font-semibold">
        Don't have an account?{" "}
        <Link className="underline" to={"/register"}>
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default FormLogin;
