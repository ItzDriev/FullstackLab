import React, { useState } from "react";
import { KeyRound, User } from "lucide-react";
import InputField from "../../../components/InputField";
import BigButton from "../../../components/BigButton";
import NavLink from "../../../layouts/Navigation/NavLink";

interface Props {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ setRegister }: Props) {
  const [passShown, setPassShown] = useState(false);
  return (
    <main className="flex justify-center items-center bg-(--navBG)/80 shadow-[0_4px_12px_rgba(0,0,0,0.25),0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-lg border border-red-500 w-1/4 h-3/4">
      {/*Cool red corners */}
      <div className="-top-3 -left-3 absolute border-red-500 border-t-2 border-l-2 w-20 h-20"></div>
      <div className="-right-3 -bottom-3 absolute border-red-500 border-r-2 border-b-2 w-20 h-20"></div>

      {/*The actual form */}
      <form className="w-44/50 h-45/50">
        <div className="pb-4 border-red-500 border-b">
          <h1 className="text-white text-2xl">Authentication</h1>
          <h2 className="font-light text-red-400">Login</h2>
        </div>

        <div className="mt-7 text-white">
          <label
            htmlFor="username"
            className="block mb-1 font-light text-white"
          >
            Username
          </label>
          <div className="flex items-center gap-3 pb-3 border-red-500 border-b">
            <User className="text-[#94A3B8]" size={30} />
            <InputField
              id="username"
              placeholder={"Enter Username"}
              type="text"
              className="border-none rounded-md w-full h-10"
            />
          </div>
        </div>
        <div className="mt-7 text-white">
          <label
            htmlFor="password"
            className="block mb-1 font-light text-white"
          >
            Password
          </label>
          <div className="relative flex items-center gap-3 pb-3 border-red-500 border-b">
            <KeyRound className="text-[#94A3B8]" size={30} />
            <InputField
              id="password"
              placeholder={"Enter Password"}
              type={passShown ? "text" : "Password"}
              className="pr-9 border-none rounded-md w-full h-10"
            />
            <div
              className="right-3 absolute flex justify-center ml-2 w-6 cursor-pointer"
              onClick={() => setPassShown(!passShown)}
            >
              {passShown ? (
                <i className="ml-2 text-[#94A3B8] text-xl cursor-pointer fa-fw fa-solid fa-eye" />
              ) : (
                <i className="ml-2 text-[#94A3B8] text-xl cursor-pointer fa-fw fa-sharp fa-solid fa-eye-slash" />
              )}
            </div>
          </div>
        </div>
        <BigButton className="mt-15 w-full" text={"Login"}></BigButton>
        <div className="flex justify-between items-center gap-3 mt-3 pb-10 border-red-500 border-b">
          <NavLink
            to={"/Recover"}
            text={"Recover Access"}
            className="text-[#94A3B8]! text-xs!"
          />
          <span
            className="px-2 py-1 rounded-xs text-[#94A3B8]! text-[1.2rem] text-xs! text-center cursor-pointer"
            onClick={() => setRegister(true)}
          >
            Register New User
          </span>
        </div>
      </form>
    </main>
  );
}

export default LoginForm;
