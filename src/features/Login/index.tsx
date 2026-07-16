import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import LoginForm from "./components/LoginForm";

function index() {
  return (
    <main className="bg-(--mainBG) w-full h-auto">
      <Navbar />
      <div className="w-full h-[calc(100vh-4rem)] bg-(--mainBG) flex justify-center items-center">
        <LoginForm />
      </div>
      <Footer />
    </main>
  );
}

export default index;
