import React from 'react';

interface C4LogoProps {
  className?: string;
  size?: number;
}

export default function C4Logo({ className = "", size = 32 }: C4LogoProps) {
  // We'll use an absolute path to the image directly
  const logoPath = '/c4-logo.png';
  
  return (
    <img 
      src={logoPath}
      width={size} 
      height={size} 
      alt="C4 Logo" 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}