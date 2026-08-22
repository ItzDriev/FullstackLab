import { useAuth } from "../../../context/AuthContext";
import PFP from "./PFP";

function ProfileHeader() {
  const auth = useAuth();
  return (
    <header className="flex justify-center mt-5 px-2 w-full lg:h-[25vh]">
      <div className="flex lg:flex-row flex-col justify-center lg:justify-start items-center gap-4 lg:gap-0 bg-(--mainBGAccent) px-6 lg:px-[15%] py-6 lg:py-0 rounded-3xl w-full h-full">
        <PFP className="" />
        <div className="lg:ml-5 min-w-0 font-montserrat text-white text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl break-words">
            {auth.user?.username}
          </h1>
          <h1 className="text-xl">
            <span className="text-red-400">Role:</span> {auth.user?.role}
          </h1>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
