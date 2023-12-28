import React from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaSearchLocation,
  FaPhone,
  FaMailBulk,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      className="bg-black text-center bg-opacity-80 text-white py-7 overflow-y-hidden"
    >
      <div className="container mx-auto flex flex-col items-center ">
        <p
          style={{ color: "white" }}
          className="text-4xl font-bold font-Audrey"
        >
          Dheeraj Photo Point
        </p>
        <p style={{ color: "white" }} className="mb-4 font-sans"> 
          create something Special
        </p>
        <div className=" flex flex-row  space-x-4 mb-4 sm:items-center sm:justify-center">
          <a
            href="https://www.facebook.com/Dheerajphotopoint/"
            target="_blank"
            className="text-gray-300 hover:text-white"
          >
            <FaFacebookF size={30} /> {/* Facebook icon */}
          </a>
          <a
            href="https://www.instagram.com/dheerajphotopoint/"
            target="_blank"
            className="text-gray-300 hover:text-white"
          >
            <FaInstagram size={30} /> {/* Instagram icon */}
          </a>
          <a
            href="https://www.youtube.com/channel/UCnt-ChxgdqiBkPioJqbhQ0g"
            target="_blank"
            className="text-gray-300 hover:text-white"
          >
            <FaYoutube size={30} /> {/* YouTube icon */}
          </a>
          <a
            href="https://wa.me/919335531881"
            target="_blank"
            className="text-gray-300 hover:text-white"
          >
            <FaWhatsapp size={30} /> {/* WhatsApp icon */}
          </a>
        </div>
        <a
          style={{ color: "white" }}
          href="mailto:dheerajphotopoint@gmail.com"
          className="text-lg mb-2 flex items-center gap-2 "
        >
          <FaMailBulk size={18} />
          dheerajphotopoint@gmail.com
        </a>
        <p
          style={{ color: "white" }}
          className="text-lg mb-6 flex items-center gap-2"
        >
          <FaPhone size={18} />
          <a href="tel:+919335531881" className="ml-2">
            +91 9335531881
          </a>
          , <a href="tel:+917905200245">+91 7905200245</a>
        </p>
        <p style={{ color: "white" }} className="mb-4 flex items-center  gap-2">
          <span className=" sm:block hidden">
            <FaSearchLocation size={18} />
          </span>
          Dheeraj Photo Point, Thakurganj Chauraha, Chowk, Lucknow, 226003
        </p>

        <p className="text-sm text-gray-500 mb-4">
          &copy; 2023 Dheeraj Photo Point. All rights reserved Dheeraj Photo
          Point.
        </p>
        <p className="text-sm text-gray-500">
          &copy; Creator of this Website:{" "}
          <a
            style={{ color: "white" }}
            href="https://www.linkedin.com/in/abhay-ratnakar-4925b221b/"
            target="_blank"
            className="text-white ml-2 mr-2"
          >
            @Abhay Ratnakar
          </a>
          X
          <a
            style={{ color: "white" }}
            className="text-white ml-2"
            href="https://www.linkedin.com/in/dhruv-kumar-sharma-419a4a204/"
            target="_blank"
          >
            @Dhruv Kumar Sharma{" "}
          </a>
          Contact Us -{" "}
          <a
            style={{ color: "white" }}
            href="tel:+916397618319"
            className="text-white ml-2"
          >
            +91 6397618319
          </a>
          ,{" "}
          <a
            style={{ color: "white" }}
            href="tel:+919548673363"
            className="text-white ml-2"
          >
            +91 9548673363
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
