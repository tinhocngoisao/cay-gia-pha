import React from 'react';
import { DongSonDrum, CornerPattern } from '@/components/VietnamesePatterns';

export const RoyalScroll: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 md:py-12 px-3 sm:px-6">
      {/* Edict Container */}
      <div className="relative bg-[#F4EFE6] shadow-2xl p-6 md:p-16 border-x-[6px] border-y-[12px] md:border-x-[12px] md:border-y-[24px] border-[#8C6D53] rounded-sm overflow-hidden">
        {/* Inner border */}
        <div className="absolute inset-1 md:inset-2 border-2 border-[#C89F65] pointer-events-none"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15] mix-blend-multiply">
          <DongSonDrum className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex-shrink-0 max-w-none animate-[spin_240s_linear_infinite]" />
        </div>

        {/* Corners */}
        <CornerPattern className="absolute top-2 left-2 md:top-4 md:left-4 text-[#9B2C2C] w-6 h-6 md:w-8 md:h-8 opacity-80" />
        <CornerPattern className="absolute top-2 right-2 md:top-4 md:right-4 text-[#9B2C2C] w-6 h-6 md:w-8 md:h-8 rotate-90 opacity-80" />
        <CornerPattern className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-[#9B2C2C] w-6 h-6 md:w-8 md:h-8 rotate-180 opacity-80" />
        <CornerPattern className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#9B2C2C] w-6 h-6 md:w-8 md:h-8 -rotate-90 opacity-80" />

        <div className="relative z-10 text-center">
          <div className="inline-block mb-6 md:mb-10">
            <h1 className="font-serif text-2xl md:text-5xl text-[#9B2C2C] font-bold tracking-widest uppercase border-b-2 border-[#9B2C2C] pb-2 md:pb-4 px-4 md:px-8">
              {title}
            </h1>
          </div>
          <div className="font-serif text-base md:text-xl text-[#4A3F35] leading-loose md:leading-loose text-justify text-justify-last-center space-y-4 md:space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
