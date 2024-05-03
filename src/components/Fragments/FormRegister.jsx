import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const FormRegister = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isContains, setIsContains] = useState(false);
  const [isIncludes, setIsIncludes] = useState(false);
  const [isContainsNumbers, setIsContainsNumbers] = useState(false);
  const [issymbols, setIssymbols] = useState(false);

  const registerUser = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/register",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      Cookies.set("email", email, { expires: 7 });
      console.log(email);
      // Jika berhasil, lanjutkan dengan halaman berikutnya atau tampilkan pesan sukses

      window.location.href = "/verify";
    } catch (error) {
      // Jika gagal, tangani kesalahan
      if (error.response.status === 400) {
        // Email sudah ada dalam database, tampilkan pesan kesalahan
        setIsEmail(true);
      } else {
        // Tangani kesalahan lainnya
        console.error("Error:", error);
      }
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (username === "" || email === "" || password === "") {
      // Jika email atau password kosong, jangan melanjutkan pendaftaran
      return;
    }
    // Memanggil fungsi registerUser
    await registerUser();
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsContains(newPassword.length >= 8);
    setIsIncludes(/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword));
    setIsContainsNumbers(/\d/.test(newPassword));
    setIssymbols(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword));
  };

  return (
    <form
      className="flex flex-col justify-end w-[400px]    "
      onSubmit={handleRegister}
    >
      <h1 className="text-[24px] text-[#2F2F2F] font-semibold mt-20">
        Sign up to Maia
      </h1>
      <div className="flex flex-col mt-6">
        <label
          htmlFor="username"
          className="text-[14px] mb-1 text-[#2F2F2F] font-semibold"
        >
          Your Name
        </label>
        <input
          value={username}
          onChange={(e) => setusername(e.target.value)}
          type="text"
          className=" px-3 font-semibold rounded-lg bg-[#FFFFFF] focus:outline-none max-w-[400px] h-[40px] border-[#CBD5E1] "
          placeholder="Your Name"
        />
      </div>
      <div className="flex flex-col mt-6">
        <label
          htmlFor="username"
          className="text-[14px] mb-1 text-[#2F2F2F] font-semibold"
        >
          Email Address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className=" px-3 font-semibold rounded-lg bg-[#FFFFFF] focus:outline-none max-w-[400px] h-[40px] border-[#CBD5E1] "
          placeholder="Email"
        />
      </div>

      {isEmail && (
        <div className="mt-6 py-3 pl-3 pr-7 rounded max-w-[400px] w-full bg-[#FFF5F5]">
          <p className="text-[14px] text-[#79889D]">
            Oops! It seems this email is already in use. Please try another
            email address or sign in with your existing account
          </p>
        </div>
      )}

      <div className="flex flex-col mt-6">
        <label
          htmlFor="username"
          className="text-[14px] mb-1 text-[#2F2F2F] font-semibold"
        >
          Create Password
        </label>
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          className=" px-3 font-semibold rounded-lg bg-[#FFFFFF] focus:outline-none max-w-[400px] h-[40px] border-[#CBD5E1] "
          placeholder="Password"
        />
      </div>

      <div
        className={`mt-6 py-3 pl-3 pr-7 rounded max-w-[400px] w-full ${
          !issymbols || !isContains || !isIncludes || !isContainsNumbers
            ? "bg-[#FFF5F5]"
            : "bg-[#FFFFFF] "
        } `}
      >
        <div className="flex items-center ">
          {isContains ? (
            <img className="w-[15px]" src="Vector.png" alt="" />
          ) : (
            <span className="w-[16px] h-[16px] bg-[#FFF5F5] rounded-full border-2 border-[#CBD5E1]"></span>
          )}
          <p className="ml-2 text-[14px] text-[#79889D]">
            Contains at least 8 characters
          </p>
        </div>
        <div className="flex items-center ">
          {isIncludes ? (
            <img className="w-[15px]" src="Vector.png" alt="" />
          ) : (
            <span className="w-[16px] h-[16px] bg-[#FFF5F5] rounded-full border-2 border-[#CBD5E1]"></span>
          )}
          <p className="ml-2 text-[14px] text-[#79889D]">
            Includes both uppercase and lowercase letters
          </p>
        </div>
        <div className="flex items-center ">
          {isContainsNumbers ? (
            <img className="w-[15px]" src="Vector.png" alt="" />
          ) : (
            <span className="w-[16px] h-[16px] bg-[#FFF5F5] rounded-full border-2 border-[#CBD5E1]"></span>
          )}
          <p className="ml-2 text-[14px] text-[#79889D]">
            Contains numbers (e.g., 1, 2, 3)
          </p>
        </div>
        <div className="flex items-center ">
          {issymbols ? (
            <img className="w-[15px]" src="Vector.png" alt="" />
          ) : (
            <span className="w-[16px] h-[16px] bg-[#FFF5F5] rounded-full border-2 border-[#CBD5E1]"></span>
          )}
          <p className="ml-2 text-[14px] text-[#79889D]">
            Includes symbols (e.g., @, #, $)
          </p>
        </div>
      </div>

      <button
        className="bg-[#2F2F2F] hover:bg-[#454545] text-white font-bold py-2 w-full px-4 rounded mt-6"
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="text-center text-[14px] text-[#2F2F2F] mt-6 font-semibold">
        By creating an account you agree with our{" "}
        <span className="underline">Terms of Service and Privacy Policy</span>
      </p>

      <p className="mb-10  text-center text-[14px] text-[#2F2F2F] mt-6 font-semibold">
        Already have an account?{" "}
        <Link className="underline" to={"/"}>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default FormRegister;
