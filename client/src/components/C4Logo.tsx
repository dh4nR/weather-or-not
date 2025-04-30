import React from 'react';

interface C4LogoProps {
  className?: string;
  size?: number;
}

export default function C4Logo({ className = "", size = 32 }: C4LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* C4 Circle */}
      <circle cx="50" cy="50" r="45" fill="white" stroke="#007BFF" strokeWidth="3" />

      {/* C shape */}
      <path 
        d="M40 30C33 30 27 36 27 45C27 54 33 60 40 60" 
        stroke="#007BFF" 
        strokeWidth="8" 
        strokeLinecap="round"
      />

      {/* 4 shape */}
      <path 
        d="M75 30V60M60 45H75H55" 
        stroke="#007BFF" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Weather elements */}
      <circle cx="35" cy="35" r="5" fill="#FFD700" /> {/* Sun */}
      <path 
        d="M60 25Q66 20 72 25Q78 30 72 35Q66 40 60 35Q54 30 60 25Z" 
        fill="#E0E0E0" 
      /> {/* Cloud */}
    </svg>
  );
}