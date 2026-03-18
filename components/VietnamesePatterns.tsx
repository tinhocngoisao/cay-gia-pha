import React from 'react';

export const DongSonDrum = ({ className }: { className?: string }) => {
  return (
    <img 
      src="https://png.pngtree.com/png-clipart/20250103/original/pngtree-vietnamese-culture-drum-pattern-vector-png-image_9803714.png"
      alt="Họa tiết Trống Đồng"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export const CornerPattern = ({ className }: { className?: string }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 0H60V4H4V60H0V0Z" fill="currentColor" />
    <path d="M12 12H48V16H16V48H12V12Z" fill="currentColor" />
    <path d="M24 24H36V28H28V36H24V24Z" fill="currentColor" />
  </svg>
);
