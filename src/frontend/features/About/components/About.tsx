function about() {
  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      <img
        src="/Zecheii.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-left"
      />

      {/* Dark overlay */}
      <div className="-z-10 fixed inset-0 bg-black/30 blur-5xl object-cover object-left" />

      {/* Content layer */}
      <div className="z-10 relative flex flex-col justify-center items-center w-full text-white">
        <section className="flex justify-center items-center w-full h-full">
          {/*Left Side */}
          <section className="flex flex-col justify-center items-center px-20 w-full h-full">
            <h1 className="pb-3 font-montserrat text-5xl">About Me</h1>

            <div className="bg-(--mainBG)/67 w-[60%] min-h-[30%] border-2 rounded-lg flex flex-col items-center">
              <div className="flex justify-center gap-7 py-2 font-montserrat font-bold text-red-400 text-lg text-center">
                <p>
                  SUB 37
                  <br />
                  <span className="font-light text-white">Naxx XP (WR)</span>
                </p>
                ·
                <p>
                  300+
                  <br />
                  <span className="font-light text-white">Naxxes</span>
                </p>
                ·
                <p>
                  #1 DPS
                  <br />
                  <span className="font-light text-white">World Contender</span>
                </p>
              </div>
              <hr className="w-[85%]" />
            </div>
            <div className="bg-amber-200 w-50 h-100"></div>
            <div className="bg-amber-200 w-50 h-100"></div>
            <div className="bg-amber-200 w-50 h-100"></div>
            <div className="bg-amber-200 w-50 h-100"></div>
          </section>
          {/*Right Side */}
          <section className="flex justify-center w-full">
            <div className="top-20 sticky flex justify-center items-center h-[calc(100vh-5rem)]">
              <img
                src="./AntonMonkeySquare.png"
                alt="IRL Picture of Driev chilling in a tree"
                className="top-55 right-[12.5%] fixed border-3 border-red-500 rounded-lg w-[22.5%] object-cover aspect-[3/4]"
              />
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}

export default about;
