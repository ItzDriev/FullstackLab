function about() {
  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      <img
        src="/Zecheii.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-left"
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/67" />

      {/* Content layer */}
      <div className="z-10 relative w-full text-white">
        <div className="mx-auto px-8 py-16 max-w-6xl">
          <h1 className="pb-6 font-montserrat font-bold text-5xl md:text-7xl">
            About Me
          </h1>

          <div className="gap-10 grid lg:grid-cols-[1.4fr_1fr]">
            {/*Left Side */}
            <div className="flex flex-col gap-5 min-w-0">
              {/*Top Box */}
              <div className="flex flex-col items-center bg-(--mainBG)/67 shadow-[0_0_10px_rgba(255,45,45,0.8)] border-2 border-red-500 rounded-sm w-full">
                <div className="flex flex-col items-center py-4 w-full font-montserrat font-bold text-lg text-center">
                  <div className="flex flex-col items-center w-full">
                    <h2 className="text-white text-3xl">Credentials</h2>
                    <hr className="mt-1 border-red-500/60 w-[95%]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 mt-2 sm:divide-x divide-y sm:divide-y-0 divide-red-500/40 w-full">
                    <p className="px-3 py-3">
                      <span className="text-red-500">SUB 37</span>
                      <br />
                      <span className="font-light text-white text-base">
                        Naxx XP [WR]
                      </span>
                    </p>
                    <p className="px-3 py-3">
                      <span className="text-red-500">300+</span>
                      <br />
                      <span className="font-light text-white text-base">
                        Naxxes Cleared
                      </span>
                    </p>
                    <p className="px-3 py-3">
                      <span className="text-red-500">#1 DPS</span>
                      <br />
                      <span className="font-light text-white text-base">
                        World Contender
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/*Bottom Box */}
              <div className="bg-(--mainBG)/70 shadow-[0_0_10px_rgba(255,45,45,0.8)] border-2 border-red-500 rounded-sm w-full">
                <div className="p-6">
                  <h2 className="font-montserrat font-bold text-red-300 text-2xl">
                    Introduction
                  </h2>
                  <hr className="mt-1 mb-3 border-red-300/60" />
                  <span className="font-bold">
                    Hey, I'm Anton 'Driev' Andersson
                  </span>
                  <p className="mt-1 leading-relaxed">
                    I'm a World of Warcraft player who mains the 'Warrior' class
                    and specializes in high-level PvE raiding performance. I'm
                    the most proficient specifically in the VANILLA version of
                    World of Warcraft, however I am pretty decent in Retail as
                    well despite having barely played it
                  </p>
                </div>
              </div>
            </div>

            {/*Right Side */}
            <div className="min-w-0">
              <img
                src="/AntonMonkeySquare.png"
                alt="IRL Picture of Driev chilling in a tree"
                className="top-24 sticky shadow-[0_0_10px_rgba(255,45,45,0.8)] mx-auto border-3 border-red-500 rounded-lg w-full max-w-sm object-cover aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default about;
