import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-10 overflow-y-hidden">
      <div className="container mx-auto flex flex-col items-center ">
        <p className="text-4xl font-bold   font-sans">Dheeraj Studio</p>
        <p className="mb-4 font-sans"> create Something Special</p>
        <p className="text-lg mb-2 ">Email: info@example.com</p>
        <p className="text-lg mb-6">Phone: (123) 456-7890</p>
        <p className="mb-4">
          #6, 1st C Main Road, Jakkasandra, Koramangala 1st Block, Bengaluru -
          560 034
        </p>

        <div className="lg: flex lg:flex-row sm: flex-col space-x-4 mb-8 sm: items-center sm: justify-center">
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-facebook-f">Facebook</i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-twitter">X</i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-instagram">Instagram</i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-twitter">X</i>
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <i className="fab fa-twitter">Youtube</i>
          </a>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          &copy; 2023 Your Website. All rights reserved Dheeraj Studio.
        </p>
        <p className="text-sm text-gray-500">
          &copy; Creater of this Website
          <a href="https://www.linkedin.com/in/abhay-ratnakar-4925b221b/"  target="blank"
          className="text-white ml-2 mr-2"
          >
            @Abhay Ratnakar
          </a>
          X 
          <a
          className="text-white ml-2"
          href="https://www.linkedin.com/in/dhruv-kumar-sharma-419a4a204/" target="blank">@Dhruv Kumar Sharma </a>
          Contect Us - +91 6397618319 , +91 9548673363.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
