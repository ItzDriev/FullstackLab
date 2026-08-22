import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import Booking from "./components/BookingForm";

function index() {
  return (
    <main className="relative bg-(--mainBG) w-full overflow-x-hidden">
      <Navbar />

      <Booking />

      <Footer />
    </main>
  );
}

export default index;
