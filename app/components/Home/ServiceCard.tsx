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
          className="mb-8 rounded-md w-full h-64 object-cover" />
        <h3 className="text-2xl font-Gentona uppercase font-semibold text-indigo-800 px-2 mb-4">{title}</h3>
        <p className="text-gray-600 font-Ikaros font-bold sm:p-[27px] px-2">{description}</p>
      </div>
    </Link>
  );
};
