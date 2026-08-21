import { useState } from "react";
import Navbar from "../../layouts/Navigation/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "../../layouts/Navigation/Footer";
import Home from "./components/Home";

function index() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <main className="bg-(--mainBG) w-full h-auto z-10 overflow-x-hidden">
      <Navbar />
      <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
      <div className="z-1 relative flex flex-col">
        <div className="flex w-full h-auto">
          <div
            className={`relative z-19 flex flex-col bg-black/30 shrink-0 transition-all duration-300 ${
              collapsed ? "w-20" : "w-64"
            }`}
          ></div>
          <div className="flex flex-col flex-1 min-w-0">
            <Home />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default index;
