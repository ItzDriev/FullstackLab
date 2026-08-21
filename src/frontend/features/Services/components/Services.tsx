import { useNavigate } from "react-router-dom";
import BigButton from "../../../components/BigButton";

function about() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      <img
        src="/Zecheii.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-left"
      />

      {/* Dark overlay */}
      <div className="z-10 fixed inset-0 bg-black/67 blur-5xl object-cover object-left" />

      {/* Content layer */}
      <div className="z-10 relative flex flex-col justify-center items-center w-full text-white">
        <h1 className="mt-40 font-montserrat font-bold text-5xl">
          Available Services
        </h1>
        <section className="flex justify-center gap-15 w-full h-full">
          <article className="flex flex-col bg-(--mainBG)/70 w-[25%] animate-rise h-[50vh] border-t-2 border-red-500 mt-10 transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-[0_0_25px_rgba(255,45,45,0.4)]">
            <div className="flex flex-col gap-4 p-4">
              <h1 className="font-montserrat font-bold text-xl">VOD REVIEW</h1>
              <hr />
              <p className="text-red-400">
                In-depth analysis of your recorded gameplay. Will identify
                critical mistakes in positioning, cooldown usage and general
                awareness that are holding you back
              </p>
              <ul className="flex flex-col gap-4 marker:text-red-500 list-disc list-inside">
                <li>Timestamped Actionable Feedback</li>
                <li>Keybind Feedback</li>
                <li>Written Summary & Goals</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center mt-auto mb-4">
              <BigButton
                text="Book Session"
                className="px-8! py-3! text-sm!"
                onClick={() => navigate("/login")}
              />
            </div>
          </article>
          <article className="flex flex-col bg-(--mainBG)/70 w-[25%] animate-rise h-[50vh] border-t-2 border-red-500 mt-10 transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-[0_0_25px_rgba(255,45,45,0.4)] [animation-delay:150ms]">
            <div className="flex flex-col gap-4 p-4">
              <h1 className="font-montserrat font-bold text-xl">
                HANDS ON SESSION
              </h1>
              <hr />
              <p className="text-red-400">
                Real-time guidance during a live raid. We will focus on applying
                proper fundamentals and adapting to whats happening in the raid.
              </p>
              <ul className="flex flex-col gap-4 marker:text-red-500 list-disc list-inside">
                <li>Voice Comms During Raid</li>
                <li>Live Feedback</li>
                <li>Post Session Q&A</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center mt-auto mb-4">
              <button
                onClick={() => navigate("/services")}
                className="px-8 py-3 border border-[#1a2d42] hover:border-red-500/40 font-bold text-[#94A3B8] hover:text-white text-sm uppercase tracking-[0.3em] transition-all cursor-pointer"
              >
                Book Session
              </button>
            </div>
          </article>
          <article className="flex flex-col bg-(--mainBG)/70 w-[25%] h-[50vh] animate-rise border-t-2 border-red-500 mt-10 transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-[0_0_25px_rgba(255,45,45,0.4)] [animation-delay:300ms]">
            <div className="flex flex-col gap-4 p-4">
              <h1 className="font-montserrat font-bold text-xl">
                MACRO & UI ASSISTANCE
              </h1>
              <hr />
              <p className="text-red-400">
                I will help you setup your UI, Macros and Keybinds in accordance
                to your wished, as well as provide suggestions for what I think
                could be changed.
              </p>
              <ul className="flex flex-col gap-4 marker:text-red-500 list-disc list-inside">
                <li>Addon Recommendations & Setup</li>
                <li>Keybind Feedback</li>
                <li>Macro Guide</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center mt-auto mb-4">
              <BigButton
                text="Book Session"
                className="px-8! py-3! text-sm!"
                onClick={() => navigate("/login")}
              />
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

export default about;
