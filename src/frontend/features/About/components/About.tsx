import React from "react";

function about() {
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
        <section className="flex justify-center items-center w-full h-full">
          <div className="flex flex-col items-center px-20 w-full">
            <h1 className="font-montserrat text-5xl">About Me</h1>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              unde fugit minus beatae blanditiis alias dolorum iste quos
              praesentium, soluta doloremque voluptatum sint dolore quaerat
              tenetur vitae sapiente itaque ducimus.
            </p>
          </div>
          <div className="flex justify-center w-full">
            <img
              src="./AntonMonkeySquare.png"
              alt="IRL Picture of Driev chilling in a tree"
              className="border-3 rounded-full w-[45%]"
            />
          </div>
        </section>
      </div>
    </section>
  );
}

export default about;
