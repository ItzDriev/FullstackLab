import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import About from "./components/About";

function index() {
  return (
    <main className="relative bg-(--mainBG) w-full overflow-x-hidden">
      <Navbar />

      <About />

      <Footer />
    </main>
  );
}

export default index;
