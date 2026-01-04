import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import GeneralBtn from "../../components/Buttons/GeneralBtn";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-base-100 relative pt-24 pb-12 px-4 flex items-center justify-center font-sans">
      <title>Contact - TasteTribe</title>
      {/* Map Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 grayscale contrast-125"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')",
        }}
      ></div>

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-base-300"
        >
          {/* Left: Brand Side */}
          <div className="lg:w-2/5 bg-secondary text-secondary-content p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent rounded-full blur-3xl opacity-20"></div>

            <div>
              <h1 className="text-5xl font-black mb-6">
                Let's Talk <br />
                <span className="text-primary">Food.</span>
              </h1>
              <p className="text-lg opacity-80 leading-relaxed">
                Have a question, a suggestion, or just want to tell us about a
                really good burger you ate? We're all ears.
              </p>
            </div>

            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-base-100/10 rounded-full flex items-center justify-center text-accent">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-bold">Headquarters</p>
                  <p className="opacity-70 text-sm">
                    123 Flavor Ave, Foodville
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-base-100/10 rounded-full flex items-center justify-center text-accent">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="opacity-70 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-base-100/10 rounded-full flex items-center justify-center text-accent">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="opacity-70 text-sm">hello@tastetribe.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Clean Form */}
          <div className="lg:w-3/5 p-12 bg-base-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-secondary">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="input input-lg bg-base-200 rounded-2xl focus:bg-base-100 w-full"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-secondary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input input-lg bg-base-200 rounded-2xl focus:bg-base-100 w-full"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label font-bold text-secondary">
                  Subject
                </label>
                <select className="select select-lg bg-base-200 rounded-2xl focus:bg-base-100 w-full">
                  <option>General Inquiry</option>
                  <option>Report a Bug</option>
                  <option>Partner With Us</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label mb-2 font-bold text-secondary">
                  Message
                </label>
                <textarea
                  className="w-full textarea textarea-lg h-32 bg-base-200 rounded-3xl focus:bg-base-100 p-6"
                  placeholder="Tell us everything..."
                ></textarea>
              </div>
              <div className="pt-4">
                <GeneralBtn>Send Message</GeneralBtn>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default ContactUs;
