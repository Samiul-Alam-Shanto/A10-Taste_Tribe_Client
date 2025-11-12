import React from "react";
import { Slide, Fade } from "react-awesome-reveal";
import { FaHome } from "react-icons/fa";
import errorImage from "../../assets/404.gif";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen py-20 bg-base-100 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <Slide direction="left" triggerOnce>
            <div className="flex justify-center">
              <img src={errorImage} alt="A sad, broken robot for a 404 error" />
            </div>
          </Slide>
          <Slide
            direction="right"
            triggerOnce
            className="text-center lg:text-left"
          >
            <Fade cascade damping={0.1} triggerOnce>
              <h1 className="text-6xl lg:text-8xl font-bold text-primary mb-4">
                Oops!
              </h1>
              <h2 className="text-3xl font-semibold text-secondary mb-4">
                Looks like we dropped the plate.
              </h2>
              <p className="text-lg text-base-content/80 mb-8">
                The page you’re looking for doesn’t exist or has been moved.
                Let's get you back to the main menu.
              </p>
              <Link
                to="/"
                className="btn btn-primary btn-lg inline-flex items-center gap-2"
              >
                <FaHome />
                Back to Home
              </Link>
            </Fade>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
