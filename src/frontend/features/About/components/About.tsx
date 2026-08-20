function about() {
  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      <img
        src="/Zecheii.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-left"
      />

      {/* Dark overlay */}
      <div className="z-10 fixed inset-0 bg-black/67 blur-5xl object-cover object-left" />

      {/* Content layer */}
      <div className="z-10 relative flex flex-col justify-center items-center w-full text-white">
        <section className="flex justify-center items-center w-full h-full">
          {/*Left Side */}
          <section className="flex flex-col justify-center items-center px-20 w-full h-full">
            <h1 className="pb-3 font-montserrat font-bold text-5xl">
              About Me
            </h1>

            {/*Top Box */}
            <div className="bg-(--mainBG)/67 w-full min-h-[30%] border-2 border-red-500 rounded-sm flex flex-col items-center shadow-[0_0_10px_rgba(255,45,45,0.8)]">
              <div className="flex flex-col items-center py-2 font-montserrat font-bold text-lg text-center">
                <div className="flex flex-col items-center w-full">
                  <h1 className="text-white">Credentials</h1>
                  <hr className="mt-1 w-[95%]" />
                </div>
                <div className="flex justify-center items-center gap-15 py-2 text-red-500">
                  <p>
                    SUB 37
                    <br />
                    <span className="font-light text-white">Naxx XP [WR]</span>
                  </p>
                  <span className="text-white text-5xl">·</span>
                  <p>
                    300+
                    <br />
                    <span className="font-light text-white">
                      Naxxes Cleared
                    </span>
                  </p>
                  <span className="text-white text-5xl">·</span>
                  <p>
                    #1 DPS
                    <br />
                    <span className="font-light text-white">
                      World Contender
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/*Bottom Box */}
            <div className="bg-(--mainBG)/70 h-50 w-full rounded-sm border-2 mt-5 "></div>
          </section>
          {/*Right Side */}
          <section className="flex justify-center w-full">
            <div className="top-20 sticky flex justify-center items-center h-[calc(100vh-5rem)]">
              <img
                src="./AntonMonkeySquare.png"
                alt="IRL Picture of Driev chilling in a tree"
                className="top-55 right-[15%] fixed border-3 border-red-500 rounded-lg w-[20%] object-cover aspect-[3/4]"
              />
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}

export default about;
