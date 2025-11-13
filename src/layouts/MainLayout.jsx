import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";

const MainLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      offset: 100,
      once: true,
    });
  }, []);

  const location = useLocation();
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    setIsRouting(true);
    const timeout = setTimeout(() => {
      setIsRouting(false);
    }, 150);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="bg-base-100 py-16 min-h-[80vh]">
        {isRouting ? <UniversalSpinner /> : <Outlet />}
      </main>
      <footer>
        <Footer />
      </footer>
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
