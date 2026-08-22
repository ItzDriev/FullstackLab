import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProfileIconProps {
  className?: string;
  dropDown?: boolean;
}

function ProfileIcon({ className = "", dropDown = true }: ProfileIconProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const auth = useAuth();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavigate(path: string) {
    navigate(path);
    setOpen(false);
  }

  async function handleLogout() {
    await auth.logout();
    setOpen(false);
    navigate("/login");
  }

  return (
    <div className="z-[100] relative mr-8" ref={dropdownRef}>
      <div
        className={`flex justify-center items-center rounded-full w-12 h-12 font-bold text-2xl cursor-pointer select-none overflow-hidden ${className}`}
        onClick={() => setOpen(!open)}
      >
        {auth.user?.profilePicture ? (
          <img
            src={auth.user.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center bg-red-500 w-full h-full text-white">
            {auth.user?.username.charAt(0)}
          </div>
        )}
      </div>

      {open && dropDown && (
        <div className="-right-5 absolute bg-[#0a1628] shadow-lg mt-2 border border-[#122030] rounded w-48">
          <div className="px-4 py-3 border-[#122030] border-b">
            <p className="font-bold text-white text-sm">
              {auth.user?.username}
            </p>
          </div>

          <button
            onClick={() => handleNavigate(`/profile/${auth.user?.username}`)}
            className="hover:bg-[#122030] px-4 py-2 w-full text-[#94A3B8] hover:text-white text-sm text-left transition-colors cursor-pointer"
          >
            Profile
          </button>
          <button
            onClick={() => handleNavigate("/settings")}
            className="hover:bg-[#122030] px-4 py-2 w-full text-[#94A3B8] hover:text-white text-sm text-left transition-colors cursor-pointer"
          >
            Settings
          </button>
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="hover:bg-[#122030] px-4 py-2 w-full text-[#94A3B8] hover:text-white text-sm text-left transition-colors cursor-pointer"
          >
            Dashboard
          </button>

          <div className="border-[#122030] border-t">
            <button
              onClick={handleLogout}
              className="hover:bg-[#122030] px-4 py-2 w-full text-red-400 hover:text-red-300 text-sm text-left transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
