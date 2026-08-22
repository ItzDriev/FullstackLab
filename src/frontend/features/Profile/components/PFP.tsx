import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProfileIconProps {
  className?: string;
  dropDown?: boolean;
}

function PFP({ className = "" }: ProfileIconProps) {
  const auth = useAuth();

  return (
    <div
      className={`flex justify-center items-center border-2 font-montserrat border-white rounded-full w-50 h-50 font-bold text-2xl cursor-pointer select-none overflow-hidden ${className}`}
    >
      <div className="flex justify-center items-center bg-red-500 w-full h-full text-[8rem] text-white">
        {auth.user?.username.charAt(0)}
      </div>
    </div>
  );
}

export default PFP;
