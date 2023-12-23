import React from "react";
import { FaCamera, FaVideo, FaRing } from "react-icons/fa";
import NavBar from "../Navbar/page";
import Footer from "../Footer";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-10 text-black">
        <h1 className="text-4xl font-bold mb-8 text-black">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <FaCamera className="text-5xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-black">
              Photography Experts
            </h2>
            <p className="text-gray-600">
              Our team of photography experts is passionate about capturing
              beautiful and timeless moments.
            </p>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <FaVideo className="text-5xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Video Production</h2>
            <p className="text-gray-600">
              We specialize in video production, turning your love story into a
              cinematic masterpiece.
            </p>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <FaRing className="text-5xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Wedding Experts</h2>
            <p className="text-gray-600">
              As wedding experts, we understand the significance of your special
              day and strive to make it unforgettable.
            </p>
          </div>
        </div>

        {/* Additional Content */}
        <div className="mt-8">
          <h1 className="text-4xl font-bold font-sans mb-5 mt-20">
            Hire Us for Your Unforgettable Wedding Experience
          </h1>
          <hr className="mt-10"></hr>
          <p className="text-lg text-gray-800 mt-10">
            [Your Wedding Photography Studio] is committed to providing
            high-quality photography and videography services. Our team is
            dedicated to capturing the essence of your love story and creating
            memories that last a lifetime.
          </p>
          <p className="text-gray-800">
            Congratulations on your upcoming celebration of love! At [Your
            Wedding Photography Studio], we understand the significance of your
            wedding day, and we're here to transform it into a timeless
            masterpiece. Why Choose [Your Wedding Photography Studio]? Capturing
            Moments, Creating Memories
          </p>
          <p className="text-gray-800 mt-20">
            <span className="font-bold text-2xl font-sans">
              Why Choose [Your Wedding Photography Studio] ?
            </span>
          </p>
          <ul className="list-disc list-inside text-gray-800 mt-10 ml-6">
            <li className="mt-5">
              Experienced and passionate team of photographers and videographers
            </li>
            <li className="mt-5">Keen eye for detail and storytelling</li>
            <li className="mt-5">
              Customizable packages to suit your unique style and budget
            </li>
            <li className="mt-5">
              No two love stories are the same, and neither should be the way
              they are captured. We offer customizable packages to suit your
              unique style
            </li>
            <li className="mt-5">
              Experienced and passionate team of photographers and videographers
            </li>
            <li className="mt-5">Keen eye for detail and storytelling</li>
            <li className="mt-5">
              Customizable packages to suit your unique style and budget
            </li>
            <li className="mt-5">
              No two love stories are the same, and neither should be the way
              they are captured. We offer customizable packages to suit your
              unique style
            </li>
          </ul>
        </div>
        <h1 className=" mt-20 font-bold font-sans text-center text-4xl text-blue-500 mb-10">
          Video Services
        </h1>
        <hr className="mb-10"></hr>
        <span className="text-2xl font-bold mt-10">Weading Video –</span>
        <p className=" mb-5 mt-5">
          Video contents have become a key tool for building brands. In fact,
          brand video is the latest form or approach of marketing, which is
          getting popular among people. Brand videos or online videos have found
          a significant status for brand engagement like blogs and newsletters.
          These videos make a better impact by mean of sharing wonderful stories
          to appeal to the audience.
        </p>
        <span className="text-2xl font-bold mt-10">Brand Video –</span>
        <p className=" mb-5 mt-5">
          Video contents have become a key tool for building brands. In fact,
          brand video is the latest form or approach of marketing, which is
          getting popular among people. Brand videos or online videos have found
          a significant status for brand engagement like blogs and newsletters.
          These videos make a better impact by mean of sharing wonderful stories
          to appeal to the audience.
        </p>
        <span className="text-2xl font-bold mt-10">Social Video –</span>
        <p className=" mb-5 mt-5">
          A social video is a short video that is created precisely to enhance
          audience engagement. Social videos are effective for driving and
          growing engagement of audiences and to highlight a single story. They
          are shared through social media networks.
        </p>
        <span className="text-2xl font-bold mt-10">Corporate Video –</span>
        <p className=" mb-5 mt-5">
          Corporate videos help in promoting a brand by using visual content. It
          thus helps is the marketing of your brand and company. With best
          corporate videos, companies are likely to elevate their brands and
          business to a great level. These videos help in creating a bond with
          the audience or clients.
        </p>
        <span className="text-2xl font-bold mt-10">Testimonial Videos –</span>
        <p className=" mb-5 mt-5">
          Testimonial Video is a video that captures the views and opinions of a
          customer or client as they talk about a product or service that they
          have used or liked. It is one of the most dynamic forms of marketing
          tool that can be efficiently used to impress new consumers.
          Testimonial videos offer huge opportunity for companies to entice
          prospective customers.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
