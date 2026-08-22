import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navigation/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import { useAuth } from "../../context/AuthContext";

function index() {
  const auth = useAuth();
  const navigate = useNavigate();

  /*
    Wait for auth.loading to finish before deciding - on the first render
    isAdmin is always false because checkAuth() hasn't resolved yet.
  */
  useEffect(() => {
    if (!auth.loading && !auth.isAdmin) {
      navigate("/");
    }
  }, [auth.loading, auth.isAdmin, navigate]);

  return (
    <>
      <Navbar />
      {auth.loading || !auth.isAdmin ? (
        <div className="bg-(--mainBG) w-full min-h-[calc(100vh-4rem)]" />
      ) : (
        <AdminDashboard />
      )}
    </>
  );
}

export default index;
