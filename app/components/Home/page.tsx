"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Footer";
import Typed from "react-typed";
import Link from "next/link";
import NavBar from "../Navbar/page";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ServiceCard } from "./ServiceCard";
import RatingStars from "../RatingStars";
import Loader from "../Loader/Loader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePageImages = [
  // { url: "/assets/NewImage/newImage1.jpg" },
  // { url: "/assets/NewImage/newImage2.jpg" },
  // { url: "/assets/Image/newImage3.jpg" },
  { url: "/assets/NewImage/newImage8.jpg" },
  { url: "/assets/NewImage/newImage6.jpg" },
  { url: "/assets/Image/home.jpg" },
  { url: "/assets/NewImage/newImage4.jpg" },
  { url: "/assets/NewImage/newImage7.jpg" },
  { url: "/assets/NewImage/newImage9.jpg" },
  { url: "/assets/NewImage/newImage11.jpg" },
  { url: "/assets/NewImage/newImage5.jpg" },
  // { url: "/assets/NewImage/newImage10.jpg" },
];

const HomePage = () => {
  const [loading, setloading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialData = [
    {
      id: 1,
      name: "Sneha Deshmukh",
      text: "I'm extremely pleased with the exceptional photography services provided by Dheeraj Photo Studio. They beautifully captured the essence of our special moments.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahul Kapoor",
      text: "Dheeraj Photo Studio truly goes above and beyond. Their team ensured our wedding memories were flawlessly preserved through their outstanding photography skills.",
      rating: 4,
    },
    {
      id: 3,
      name: "Priya Singhania",
      text: "Incredible experience! The team's dedication and creativity made our family portraits memorable. Highly recommend their services.",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Aarav Mehta",
      text: "Dheeraj Photo Studio is top-notch! Their professionalism and attention to detail in capturing our events were truly commendable.",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Neha Reddy",
      text: "We're delighted with the moments captured by the team. Their expertise in photography is evident in every shot taken.",
      rating: 4.3,
    },
    // Add more testimonials as needed
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
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
    setloading(true);
    const img = new Image();
    img.src = "/assets/NewImage/newImage8.jpg";

    img.onload = () => {
      setloading(false);
    };
  }, []);

  useEffect(() => {
    if (TextView) {
      controls.start("visible");
    }
  }, [controls, TextView]);

  return !loading ? (
    <div className="absolute top-0 bg-white w-full min-h-screen overflow-x-hidden ">
      {/* Main Section */}
      <NavBar content={"white"}></NavBar>
      <div
        // style={{
        //   background:
        //     'url("/assets/Image/home.jpg")no-repeat center center/cover',
        // }}
        className="bg-cover text-center bg-center h-screen flex flex-col items-center justify-center sm:py-10"
      >
        <div>
          <Carousel
          showArrows={false}
            className="absolute z-50 top-0 w-full left-0 h-[100vh]"
            autoPlay={true}
            interval={5000}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            selectedItem={activeIndex}
            onChange={(index) => setActiveIndex(index)}
          >
            {HomePageImages.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image.url}
                  className="h-[100vh] object-cover"
                  alt={`Slide  ${index}`}
                />
              </div>
            ))}
          </Carousel>
          <div
            className="absolute  w-full left-0 top-[35vh] flex flex-col text-center items-center justify-center "
            style={{ zIndex: 60 }}
          >
            <h1
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",color:'white' }}
              className="text-4xl font-Ikaros sm:text-5xl font-[800] font-sans md:text-6xl lg:max-w-[60%] text-center leading-none sm:leading-[3.5rem] md:leading-[4.5rem]"
            >
              Elevating <br /> Moments Through Artistry
            </h1>
            <i
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",color:'white' }}
              className="text-xl font-Ikaros sm:text-2xl font-sans font-semibold mt-16"
            >
              "Capturing Moments, Creating Memories"
            </i>
            <div
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              className="text-2xl font-[800] font-Ikaros uppercase sm:text-3xl md:text-4xl font-sans text-blue-400 p-5"
            >
              <Typed
                strings={[
                  "Photography",
                  "Event Shoot",
                  "Candid Photography",
                  "Cinematography",
                  "Wedding photography",
                  "Pre Wedding Shoot",
                  "Meternity Shoot",
                  "Baby Shoot",
                ]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={1000}
                loop
              />
            </div>
          </div>
        </div>
      </div>

      {/* Studio Rental */}
      <h2 className="text-5xl flex justify-center font-Ikaros uppercase font-bold text-indigo-800 mb-5 mt-16">
        Studio
      </h2>
      <hr></hr>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className="bg-gray-200 text-black flex flex-col md:flex-row items-center justify-evenly p-8 md:p-6 lg:p-10 mt-10 mb-8"
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
          <p style={{color:'black'}} className="text-sm md:text-base lg:text-lg mb-4 md:mb-6">
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
      <section className="bg-white w-full py-10 mt-20 p-4 ">
        <div className="container mx-auto text-center mt-10">
          <h2 className="text-5xl upper font-Ikaros uppercase font-bold text-indigo-800 mb-10 mt-10">
            Services
          </h2>
          <hr></hr>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-10">
            {/* Service 1 */}
            <ServiceCard
              imageUrl="/assets/Image/service1.jpg"
              title="Photgraphy"
              description="Capture beautiful and timeless portraits that tell your unique story."
              link="/components/Services/Photography"
            />

            {/* Service 2 */}
            <ServiceCard
              imageUrl="/assets/Image/service2.jpg"
              title="Videography"
              description="Animating Timeless Narratives: Portraying Your Unique Tale"
              link="/components/Services/VideoProduction"
            />

            {/* Service 3 */}
            <ServiceCard
              imageUrl="/assets/Image/service3.jpg"
              title="And more"
              description="We are open to unique requests. Let us know what you guys need !"
              link="/components/Contact"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-300 mt-20 py-16 p-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-Revaux   font-extrabold text-indigo-800 mb-10">
            Testimonials
          </h2>
          <Slider
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={4000}
          >
            {testimonialData.map((testimonial) => (
              <div key={testimonial.id} className="mx-auto">
                <p style={{color:'black'}} className="text-xl font-Ikaros text-gray-800 mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center mb-2">
                  <RatingStars rating={testimonial.rating} />
                </div>
                <p className="text-xl font-Audrey  text-indigo-500">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* {brand section } */}
      <section className="bg-gray-100 py-16 mt-20">
        <div className="mx-auto text-center">
          <h2 style={{color:'black',opacity:'0.8'}} className="text-5xl sm:text-5xl font-Ikaros uppercase font-bold  mb-8 sm:mb-15">
            Have a look !
          </h2>
          <hr></hr>

          <Slider
            {...settings}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 mt-8 p-5 " // Add gap between images
          >
            {/* Branded Image 2 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="/assets/Image/slider1.jpg"
                alt="Branded Image 2"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>

            {/* Branded Image 3 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="/assets/Image/slider2.jpg"
                alt="Branded Image 3"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>
            {/* Branded Image 4 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {/* Add margin between images */}
              <img
                src="/assets/Image/slider3.jpg"
                alt="Branded Image 4"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>

            {/* Branded Image 5 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="/assets/Image/slider4.jpg"
                alt="Branded Image 5"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>
            {/* Branded Image 6 */}
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="/assets/Image/slider5.jpg"
                alt="Branded Image 6"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="/assets/Image/slider6.jpg"
                alt="Branded Image 6"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md  mx-4">
              {" "}
              {/* Add margin between images */}
              <img
                src="/assets/Image/slider7.jpg"
                alt="Branded Image 6"
                className="w-full h-full object-cover transition-transform transform-gpu hover:scale-105 hover:shadow-lg"
              />
            </div>
          </Slider>
        </div>
      </section>

      <section ref={Textref} className="bg-gray-400 text-white  mt-10 hireUs">
        <div className="   flex  justify-center items-center h-[800px] text-center">
          <div className=" py-10 rounded-xl   flex flex-col  justify-center items-center h-full w-full bg-black bg-opacity-10">
            <h1
              style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",color:'white' }}
              className="text-4xl font-Revaux brightness-200 md:text-5xl font-extrabold mb-4 font-sans"
            >
              Elevate Your Moments with Us
            </h1>
            <div className="w-full flex justify-center">
              <h1
                style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",color:'white' }}
                className="text-lg brightness-200 lg:w-[50%] md:text-xl px-2 font-bold mb-6"
              >
                Your special moments deserve exceptional capture. Let us turn
                your vision into timeless artistry. From weddings to creative
                projects, our team at{" "}
                <span className="text-blue-600 font-extrabold">
                  DHEERAJ PHOTO STUDIO
                </span>{" "}
                is dedicated to creating extraordinary memories.
              </h1>
            </div>
            <Link
              href="components/Contact"
              className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  ) : (
    <div className="h-[90vh]">
      <Loader />
    </div>
  );
};

export default HomePage;
