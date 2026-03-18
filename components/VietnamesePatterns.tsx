import React from 'react';

export const DongSonDrum = ({ className }: { className?: string }) => {
  const rays = Array.from({ length: 14 });
  const birds = Array.from({ length: 6 });
  
  return (
    <svg viewBox="0 0 500 500" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer rings */}
      <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="4" fill="none" />
      <circle cx="250" cy="250" r="232" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="250" cy="250" r="215" stroke="currentColor" strokeWidth="12" strokeDasharray="4 8" fill="none" />
      <circle cx="250" cy="250" r="198" stroke="currentColor" strokeWidth="1" fill="none" />
      
      {/* Chim Lạc ring */}
      <circle cx="250" cy="250" r="160" stroke="currentColor" strokeWidth="1" fill="none" />
      <g transform="translate(250, 250)">
        {birds.map((_, i) => (
          <g key={i} transform={`rotate(${i * (360 / 6)}) translate(0, -178)`}>
             {/* Stylized flying bird (Chim Lạc) */}
             <path d="M-25,0 C-10,-15 10,-15 25,0 C10,5 0,5 -25,0 Z" fill="currentColor" />
             <path d="M-5,-5 C-15,-20 -25,-25 -35,-10 C-20,-5 -10,-2 -5,-5 Z" fill="currentColor" />
          </g>
        ))}
      </g>
      <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="1" fill="none" />
      
      {/* Inner geometric ring */}
      <circle cx="250" cy="250" r="125" stroke="currentColor" strokeWidth="8" strokeDasharray="15 10" fill="none" />
      <circle cx="250" cy="250" r="110" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Center Star */}
      <g transform="translate(250, 250)">
        {rays.map((_, i) => (
          <polygon key={i} points="0,-15 8,-60 0,-100 -8,-60" fill="currentColor" transform={`rotate(${i * (360 / 14)})`} />
        ))}
        <circle r="25" fill="currentColor" />
        <circle r="10" fill="#F4EFE6" /> {/* Match container background color */}
      </g>
    </svg>
  );
};

export const CornerPattern = ({ className }: { className?: string }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 0H60V4H4V60H0V0Z" fill="currentColor" />
    <path d="M12 12H48V16H16V48H12V12Z" fill="currentColor" />
    <path d="M24 24H36V28H28V36H24V24Z" fill="currentColor" />
  </svg>
);
