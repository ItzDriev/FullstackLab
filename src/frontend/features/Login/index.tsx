import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";

function index() {
  const [register, setRegister] = useState(false);
  return (
    <main className="bg-(--mainBG) w-full h-auto">
      <Navbar />
      <img
        src="/Zecheii.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-left translate-x-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 blur-5xl" />
      <div className="w-full h-[calc(100vh-4rem)] bg-(--mainBG) flex justify-center items-center">
        {register ? (
          <RegistrationForm setRegister={setRegister}></RegistrationForm>
        ) : (
          <LoginForm setRegister={setRegister}></LoginForm>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default index;
