import React, { useState, useEffect } from "react";
import Navbar from "../components/Elements/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Verify = () => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = Cookies.get("email");
    setEmail(storedEmail);
  }, []); // Empty dependency array to run only once on mount

  const verifyEmail = async (email, token) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/verify",
        {
          email: email,
          token: token,
        }
      );

      const { data } = response;
      const jwtToken = data.token;

      Cookies.set("token", jwtToken, { expires: 7 }); // Save token in cookie for 7 days

      // Remove email from cookie after successful verification
      Cookies.remove("email");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    await verifyEmail(email, token);
  };

  return (
    <>
      <Navbar>
        <div className="flex items-center gap-3 ">
          <Link
            className="px-2 py-2 text-[14px] rounded-[4px] text-[#000000] font-bold "
            to={"/"}
          >
            Log In
          </Link>
          <Link
            className="px-2 py-2 text-[14px] rounded-[4px] text-[#FFFFFF] font-bold bg-[#336FF9]"
            to={"/register"}
          >
            Sign Up
          </Link>
        </div>
      </Navbar>
      <div className="flex items-center justify-center mt-20 mx-4 ">
        <div className="flex flex-col">
          <h1 className="text-[24px] text-[#2F2F2F] font-bold">
            Verify Your Email to Get Started
          </h1>
          <form onSubmit={handleVerify}>
            <div className="max-w-[510px] w-full py-4 pl-4 pr-20 bg-[#FFFFFF] mt-10">
              <p className="text-[#79889D]">
                A confirmation link has been sent to your email address{" "}
                <span className="font-bold">{email}</span> Enter the OTP code to
                verify your account and unlock full access.
              </p>
              <div className="flex flex-col mt-6">
                <label className="text-[14px] mb-1 text-[#2F2F2F] font-semibold">
                  Enter Token
                </label>
                <input
                  type="number"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="px-3 font-semibold rounded-lg bg-[#FFFFFF] focus:outline-none max-w-[400px] h-[40px] border-[#CBD5E1]"
                  placeholder="Token"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#2F2F2F] hover:bg-[#454545] text-white font-bold py-2 w-full px-4 rounded mt-6"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify;
