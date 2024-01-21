"use client";
import React from "react";
import Link from "next/link"; 
// SwiperSlider.js
export const ServiceCard = ({ imageUrl , title, description, link }:any) => {

  return (
    <Link href={link}>
      <div
        className="bg-gray-200 pb-2 rounded-lg shadow-md transition-transform hover:shadow-lg hover:scale-105 focus:scale-[1.02] hover:bg-gray-100 mb-5" 
      >
        <img
          src={imageUrl}
          alt={title}
          className="mb-5 sm:mb-8 rounded-md w-full h-52 sm:h-64 object-cover" />
        <h3 className=" text-[1.7rem] sm:text-3xl font-Poppins   text-indigo-800 sm:pb-2 sm:pb-0 px-2 ">{title}</h3>
        <p style={{color:'black'}} className="text-black font-PoppinsRegular text-[0.9rem] sm:text-lg pl-2 pb-3 sm:pt-2 sm:pb-4 px-2">{description}</p>
      </div>
    </Link>
  );
};
