'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Phả Đồ' },
    { path: '/pha-ky', label: 'Phả Ký' },
    { path: '/toc-uoc', label: 'Tộc Ước' },
    { path: '/huong-hoa', label: 'Hương Hoả' },
    { path: '/ngay-gio', label: 'Ngày Giỗ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E3D9] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 bg-[#8C6D53] text-white rounded-lg shadow-sm">
            <Users size={20} />
          </div>
          <h1 className="font-serif text-xl font-medium tracking-wide text-[#4A3F35]">Gia Phả Dòng Họ</h1>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path}
                href={item.path} 
                className={`font-semibold transition-colors py-5 border-b-2 ${isActive ? 'text-[#9B2C2C] border-[#9B2C2C]' : 'text-[#8C6D53] border-transparent hover:text-[#9B2C2C] hover:border-[#9B2C2C]/30'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-[#8C6D53] hover:bg-[#8C6D53]/10 rounded-full transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#8C6D53] hover:bg-[#8C6D53]/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E8E3D9] bg-[#FDFBF7] overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-2">
              {navItems.map(item => {
                const isActive = pathname === item.path;
                return (
                  <Link 
                    key={item.path}
                    href={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-medium py-3 px-2 rounded-lg transition-colors ${isActive ? 'text-[#9B2C2C] bg-[#9B2C2C]/5' : 'text-[#8C6D53] hover:text-[#9B2C2C] hover:bg-[#8C6D53]/5'}`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
