import { useAuth } from "../../../context/AuthContext";
import PFP from "./PFP";

function ProfileHeader() {
  const auth = useAuth();
  return (
    <header className="flex justify-center gap-20 mt-5 w-full h-[25vh]">
      <div className="bg-(--mainBGAccent) w-[98%]  rounded-3xl h-full flex items-center  px-[15%]">
        <PFP className="" />
        <div className="ml-5 font-montserrat text-white text-center">
          <h1 className="text-8xl">{auth.user?.username}</h1>
          <h1 className="text-xl">NAME NAME NAME</h1>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
