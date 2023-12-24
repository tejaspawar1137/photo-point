import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  const stars = [];
  const totalStars = 5; // Total number of stars

  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

  // Render full stars
  for (let i = 1; i <= fullStars; i++) {
    stars.push(<FaStar key={`full_${i}`} className="text-yellow-500 h-5 w-5 sm:h-7 sm:w-7" />);
  }

  // Render half star if present
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 h-5 w-5 sm:h-7 sm:w-7" />);
  }

  // Calculate remaining empty stars to display
  const remainingStars = totalStars - stars.length;
  for (let i = 1; i <= remainingStars; i++) {
    stars.push(<FaRegStar key={`empty_${i}`} className="text-gray-500 h-5 w-5 sm:h-7 sm:w-7" />);
  }

  return <div style={{ display: 'flex' }}>{stars}</div>;
};

export default RatingStars;
