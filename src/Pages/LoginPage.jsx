import { Link } from "react-router-dom";
import FormLogin from "../components/Fragments/FormLogin";
import Navbar from "../components/Elements/Navbar";

const LoginPage = () => {
  return (
    <>
      <Navbar>
        <div className="flex items-center gap-3">
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
      <div className="flex items-center justify-center mt-20 px-4">
        <FormLogin />
      </div>
    </>
  );
};

export default LoginPage;
