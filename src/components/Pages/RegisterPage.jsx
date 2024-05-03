import { Link } from "react-router-dom";
import Navbar from "../Elements/Navbar";
import FormRegister from "../Fragments/FormRegister";

const RegisterPage = () => {
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
      <div className="flex items-center justify-center min-h-screen ">
        <FormRegister />
      </div>
    </>
  );
};

export default RegisterPage;
