import { useLogin } from "../../actions/useLogin";
import Navbar from "../Elements/Navbar";
import Cookies from "js-cookie";

const Dashboard = () => {
  useLogin();

  const handleLogout = () => {
    Cookies.remove("token");
  };
  return (
    <>
      <Navbar>
        <button
          onClick={handleLogout}
          className="px-2 py-2 text-[14px] rounded-[4px] text-black font-bold bg-[#336FF9]"
        >
          Logout
        </button>
      </Navbar>
      <div className="flex items-center justify-center mt-20">
        <div className="flex flex-col">
          <h1 className="text-[24px] text-[#2F2F2F] font-bold">Dashboard</h1>
          <div className="max-w-[510px] w-full py-4 pl-4 pr-10 bg-[#FFFFFF] mt-10">
            <p className="text-[#79889D]">
              Welcome to your dashboard! Explore and manage your account
              effortlessly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
