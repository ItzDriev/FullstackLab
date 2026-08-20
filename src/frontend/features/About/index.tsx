import React from "react";
import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import About from "./components/About";

function index() {
  return (
    <main className="bg-(--mainBG) w-full h-auto z-10 overflow-x-hidden">
      <Navbar />

      <div className="z-1 relative flex flex-col">
        <div className="flex w-full h-auto">
          <div className="flex flex-col flex-1 min-w-0">
            <About />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default index;
