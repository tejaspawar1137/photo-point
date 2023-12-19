"use client";
import React, { useEffect } from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css"; // Import the styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Footer";
import Typed from "react-typed";
import Link from "next/link";
import NavBar from "../Navbar/page";
import { easeIn, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ServiceCard } from "./ServiceCard";

const HomePage = () => {
  const testimonialData = [
    {
      id: 1,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Jane Smith",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 1,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 1,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 1,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // Add more testimonials as needed
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 3 } },
  };
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  // text animation
  const controls = useAnimation();
  const [Textref, TextView] = useInView({
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 3 } },
  };

  useEffect(() => {
    if (TextView) {
      controls.start("visible");
    }
  }, [controls, TextView]);

  return (
    <div className="absolute bg-gray-100 w-full min-h-screen overflow-x-hidden ">
      {/* Main Section */}
      <NavBar></NavBar>
      <div className="bg-cover bg-center homePage min-h-screen flex flex-col items-center justify-center text-white sm:p-10">
        <h1 className="text-5xl font-sans sm: p-10">
          Contemporary and Off-Beat
        </h1>
        <p className="text-4xl font-sans ">Wedding Stories </p>
        <p className="text-3xl font-sans ">For the Modern Couple</p>
        <div className="text-5xl ffont-sans text-white p-5">
          <Typed
            strings={[
              "Indian Wedding Photography!",
              "Films for the Modern Couple!",
              // Add more text as needed
            ]}
            typeSpeed={50}
            backSpeed={50}
            backDelay={1000}
            loop
          />
        </div>
      </div>

      {/* Studio Rental */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className="bg-gray-200 text-black flex flex-col md:flex-row items-center justify-evenly p-8 md:p-6 lg:p-10 mb-8 mt-16"
      >
        <div className="md:order-2 md:ml-4 lg:ml-10 md:mt-4 lg:mt-10 relative">
          <div className="overflow-y-hidden">
            {/* Responsive YouTube video iframe */}
            <iframe
              src="https://www.youtube.com/embed/1jfBjq0LU7k?si=yYWN2zaVhRY_VNA9&amp;autoplay=1"
              title="YouTube video player"
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full md:w-96 lg:w-[800px] lg:h-[500px] md:h-72 lg:h-106"
            ></iframe>
          </div>
        </div>

        <div className="md:order-1 md:mt-10 md:text-center md:p-4 lg:p-8">
          <div className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-indigo-800 sm: mt-[60px]">
            Studio Rental
          </div>
          <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6">
            "Capture the moments that matter most in our premier photo studio,
            specializing in exquisite wedding photoshoots, enchanting
            pre-wedding sessions, and unforgettable birthday celebrations. Let
            us turn your special moments into timeless memories." Feel free to
            customize the wording based on your specific offerings and style.
          </p>
          <a
            href="/components/Contact"
            className=" sm:mt-10 bg-indigo-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-md lg:mt-2 md:mt-5 hover:bg-indigo-700 transition duration-300"
          >
            Book Now
          </a>
        </div>
      </motion.div>

      {/* Services section */}
      <section className="bg-white  py-10 mt-20 p-4 ">
        <div className="container mx-auto text-center mt-10">
          <h2 className="text-5xl font-sans font-bold text-indigo-800 mb-10 mt-10">
            Our Photography Services
          </h2>
          <hr></hr>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-10">
            {/* Service 1 */}
            <ServiceCard
              imageUrl="https://res.cloudinary.com/ds5fdn2yu/image/upload/v1702985674/ougvf31qkd4u2lursmio.jpg"
              title="Portrait Photography"
              description="Capture beautiful and timeless portraits that tell your unique story."
              link="/components/Services/Photography"
            />

            {/* Service 2 */}
            <ServiceCard
              imageUrl="https://res.cloudinary.com/ds5fdn2yu/image/upload/v1702985886/db9eq8j6ckv1j4znagd5.jpg"
              title="Portrait Photography"
              description="Capture beautiful and timeless portraits that tell your unique story."
              link="/components/Services/Photography"
            />

            {/* Service 3 */}
            <ServiceCard
              imageUrl="https://res.cloudinary.com/ds5fdn2yu/image/upload/v1702985789/vbtaqg0a65o7mhzt0zkn.jpg"
              title="Portrait Photography"
              description="Capture beautiful and timeless portraits that tell your unique story."
              link="/components/Services/Photography"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-300 mt-20 py-16 p-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-indigo-800 mb-10">
            Testimonials
          </h2>
          {/* <p className="text-2xl ">Over the last decade we've worked with hundreds of happy couples. Here's what a few of them had to say!</p> */}
          <Slider
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={3000}
          >
            {testimonialData.map((testimonial) => (
              <div key={testimonial.id} className="mx-auto ">
                <p className="text-lg text-gray-800 mb-4">{testimonial.text}</p>
                <p className="text-md font-semibold text-indigo-500">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* {brand section } */}
      {/* {brand section } */}
      <section className="bg-gray-100 py-16 mt-20">
        <div className="mx-auto text-center">
          <h2 className="text-5xl sm:text-5xl font-sans text-gray-800 mb-8 sm:mb-20">
            Our Partners
          </h2>
          <hr></hr>

          <Slider
            {...settings}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 mt-8 p-5 " // Add gap between images
          >
            {/* Branded Image 1 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  object-contain">
              <img
                src="https://res.cloudinary.com/dnsydvkyd/image/upload/v1702985483/w4stfswa9mczq9pjuhbk.jpg"
                alt="Branded Image 1"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>

            {/* Branded Image 2 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="https://res.cloudinary.com/ds5fdn2yu/image/upload/v1702986098/bpbbmsaha7uucbxkqnux.jpg"
                alt="Branded Image 2"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>

            {/* Branded Image 3 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="https://res.cloudinary.com/ds5fdn2yu/image/upload/v1702985302/iqusrjsn1cclsgyivxav.jpg"
                alt="Branded Image 3"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>

            {/* Branded Image 4 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="https://res.cloudinary.com/dnsydvkyd/image/upload/v1702986719/u52c4rlr4ksmhpzdbsa4.jpg"
                alt="Branded Image 4"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>

            {/* Branded Image 5 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="https://res.cloudinary.com/ds5fdn2yu/image/upload/v1702986653/rpbb4pqo1oi5rzzmocf4.jpg"
                alt="Branded Image 5"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>
          </Slider>
        </div>
      </section>

      {/* Hire Us Section */}
      <section
        ref={Textref}
        className="bg-gray-400 text-white py-16 mt-10 p-5 mb-10  hireUs"
      >
        <div className="container mx-auto text-center">
          <div className="mb-8 hireus h-[400px]"></div>
          <motion.h2
            className="text-5xl font-extrabold mb-8 font-sans"
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            Hire Us for Your Next Project
          </motion.h2>
          <motion.p
            className="text-1xl font-bold  "
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            Your wedding day is a once-in-a-lifetime moment, and we're here to
            make it unforgettable. Get in touch with us to discuss how we can
            bring your vision to life and capture the moments that will be
            cherished for generations. Ready to bring your ideas to life? The
            team at [Your Creative Studio Name] is here to turn your vision into
            reality. Whether it's a special event, a creative project, or
            professional photography services, we've got you covered. Let's
            create something extraordinary together!
          </motion.p>

          <motion.p
            className="text-1xl mb-10 font-bold"
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            No two love stories are the same, and neither should be the way they
            are captured. We offer customizable packages to suit your unique
            style, preferences, and budget. From intimate elopements to grand
            celebrations, we tailor our services to ensure your wedding
            photography is as unique as your love story. Professionalism You Can
            Trust.
          </motion.p>

          <Link
            href="components/Contact"
            className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
          >
            Get in Touch
          </Link>
          
        </div>
        
      {/* Dark overlay */}
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
