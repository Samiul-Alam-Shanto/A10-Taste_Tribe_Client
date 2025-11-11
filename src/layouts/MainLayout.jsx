import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="bg-[#FEFBF3] pt-16 min-h-[80vh]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
