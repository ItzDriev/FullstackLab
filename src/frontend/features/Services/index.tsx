import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import Services from "./components/Services";

function index() {
  return (
    <main className="relative bg-(--mainBG) w-full overflow-x-hidden">
      <Navbar />

      <Services />

      <Footer />
    </main>
  );
}

export default index;
