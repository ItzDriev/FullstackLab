import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function index() {
  const [register, setRegister] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loading && auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth.loading, auth.isLoggedIn, navigate]);

  return (
    <main className="bg-(--mainBG) w-full h-auto">
      <Navbar />
      <img
        src="/Zecheii.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-left"
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
