import { useNavigate } from "react-router-dom";
import BigButton from "../../../components/BigButton";
import useTitle from "../../../hooks/useTitle";
import { useAuth } from "../../../context/AuthContext";

function Home() {
  useTitle("Home");
  const navigate = useNavigate();
  const isLoggedIn = useAuth();

  //const twitchChatSrc = `https://www.twitch.tv/embed/drievtv/chat?parent=${parent}`;
  return (
    <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <img
        src="/Zecheii.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-left translate-x-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 blur-5xl" />

      {/* Content layer */}
      <div className="z-10 relative flex flex-col justify-center items-center w-full h-full text-white">
        <section className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="pb-3 font-montserrat font-bold text-6xl text-center underline-offset-7">
            DRIEV COACHING
          </h1>
          <p className="pb-5 font-montserrat text-lg text-center">
            Top Tier World of Warcraft players who has played at the highest
            level.
            <br /> Offering VOD Reviews, Hands on Coaching and personalized
            <br />
            improvment
          </p>
          <div className="flex gap-4">
            {isLoggedIn ? (
              <BigButton
                text="Get Started"
                className="px-8! py-3! text-sm!"
                onClick={() => navigate("/login")}
              />
            ) : (
              <></>
            )}

            <button
              onClick={() => navigate("/services")}
              className="px-8 py-3 border border-[#1a2d42] hover:border-red-500/40 font-bold text-[#94A3B8] hover:text-white text-sm uppercase tracking-widest transition-all cursor-pointer"
            >
              Browse Services
            </button>
          </div>
        </section>
        {/* 
        <section className="w-full h-full">
          <h1>PENIS</h1>
        </section>
        */}
      </div>
    </section>
  );
}

export default Home;
