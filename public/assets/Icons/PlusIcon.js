import React from "react";

function PlusIcon({h,w}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg-PlusIcon"
      style={{ width: `${w}px`, height: `${h}px`}}
      fill="currentColor"
      overflow="hidden"
      viewBox="0 0 1024 1024"
    >
      <path
        fill="#38bdf8" 
        d="M512 0a512 512 0 10512 512A512 512 0 00512 0zm213.333 554.667H554.667v170.666a42.667 42.667 0 01-85.334 0V554.667H298.667a42.667 42.667 0 010-85.334h170.666V298.667a42.667 42.667 0 0185.334 0v170.666h170.666a42.667 42.667 0 010 85.334z"
      ><title>Create an image folder , ex - Wedding</title></path>
    </svg>
  );
}

export default PlusIcon;
