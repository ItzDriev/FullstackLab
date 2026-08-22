import Navbar from "../../layouts/Navigation/Navbar";
import Footer from "../../layouts/Navigation/Footer";
import Booking from "./components/Booking";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function index() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn && !auth.loading) {
      navigate("/login");
    }
  }, [auth.loading, auth.isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <Booking />
      <Footer />
    </>
  );
}

export default index;
