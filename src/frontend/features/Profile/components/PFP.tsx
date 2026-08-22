import { useAuth } from "../../../context/AuthContext";

interface ProfileIconProps {
  className?: string;
  dropDown?: boolean;
}

function PFP({ className = "" }: ProfileIconProps) {
  const auth = useAuth();

  return (
    <div
      className={`flex justify-center items-center border-2 font-montserrat border-white rounded-full w-28 h-28 lg:w-50 lg:h-50 shrink-0 font-bold text-2xl cursor-pointer select-none overflow-hidden ${className}`}
    >
      <div className="flex justify-center items-center bg-red-500 w-full h-full text-5xl lg:text-[8rem] text-white">
        {auth.user?.username.charAt(0)}
      </div>
    </div>
  );
}

export default PFP;
