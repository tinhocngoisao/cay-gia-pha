'use client';

import React, { useState } from 'react';
import { familyData, FamilyMember } from '@/lib/data';
import { FamilyTree } from '@/components/FamilyTree';
import { MemberDetailsModal } from '@/components/MemberDetailsModal';
import { DongSonDrum, CornerPattern } from '@/components/VietnamesePatterns';
import { motion } from 'motion/react';
import { Users, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  return (
    <main className="min-h-screen bg-[#C8BCA7] text-[#4A3F35] font-sans selection:bg-[#8C6D53]/20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E3D9] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#8C6D53] text-white rounded-lg shadow-sm">
              <Users size={20} />
            </div>
            <h1 className="font-serif text-xl font-medium tracking-wide text-[#4A3F35]">Gia Phả Dòng Họ</h1>
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            <Link href="/" className="text-[#9B2C2C] font-semibold transition-colors border-b-2 border-[#9B2C2C] py-5">Phả Đồ</Link>
            <Link href="#" className="text-[#8C6D53] hover:text-[#9B2C2C] font-medium transition-colors py-5 border-b-2 border-transparent hover:border-[#9B2C2C]/30">Phả Ký</Link>
            <Link href="#" className="text-[#8C6D53] hover:text-[#9B2C2C] font-medium transition-colors py-5 border-b-2 border-transparent hover:border-[#9B2C2C]/30">Tộc Ước</Link>
            <Link href="#" className="text-[#8C6D53] hover:text-[#9B2C2C] font-medium transition-colors py-5 border-b-2 border-transparent hover:border-[#9B2C2C]/30">Hương Hoả</Link>
            <Link href="#" className="text-[#8C6D53] hover:text-[#9B2C2C] font-medium transition-colors py-5 border-b-2 border-transparent hover:border-[#9B2C2C]/30">Ngày Giỗ</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#8C6D53] hover:bg-[#8C6D53]/10 rounded-full transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#4A3F35] mb-6 leading-tight">
            Cây Gia Phả <br className="md:hidden" />
            <span className="text-[#8C6D53] italic">Dòng Họ Cao</span>
          </h2>
          <p className="max-w-2xl mx-auto text-[#5A5A40] text-lg md:text-xl leading-relaxed mb-10">
            Lưu giữ truyền thống, kết nối thế hệ. Nơi ghi chép lại cội nguồn và những câu chuyện đáng tự hào của gia tộc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-[#8C6D53] text-white rounded-full font-medium hover:bg-[#7A5D43] transition-colors shadow-sm flex items-center gap-2">
              <Users size={18} />
              <span>Xem Phả Đồ</span>
            </button>
            <button className="px-8 py-3 bg-white text-[#8C6D53] border border-[#8C6D53]/30 rounded-full font-medium hover:bg-[#8C6D53]/5 transition-colors shadow-sm flex items-center gap-2">
              <BookOpen size={18} />
              <span>Đọc Gia Huấn</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Tree Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden">
        <div className="bg-[#F4EFE6] rounded-xl shadow-xl border-4 border-[#C89F65] p-4 md:p-8 relative overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.35] mix-blend-multiply">
            <DongSonDrum className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] animate-[spin_180s_linear_infinite]" />
          </div>
          
          {/* Corners */}
          <CornerPattern className="absolute top-3 left-3 text-[#9B2C2C] w-10 h-10 md:w-14 md:h-14 opacity-80" />
          <CornerPattern className="absolute top-3 right-3 text-[#9B2C2C] w-10 h-10 md:w-14 md:h-14 rotate-90 opacity-80" />
          <CornerPattern className="absolute bottom-3 right-3 text-[#9B2C2C] w-10 h-10 md:w-14 md:h-14 rotate-180 opacity-80" />
          <CornerPattern className="absolute bottom-3 left-3 text-[#9B2C2C] w-10 h-10 md:w-14 md:h-14 -rotate-90 opacity-80" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <FamilyTree data={familyData} onMemberClick={setSelectedMember} />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#8C6D53]/60 text-sm border-t border-[#E8E3D9] mt-12">
        <p>© {new Date().getFullYear()} Gia Phả Dòng Họ. Lưu truyền muôn đời.</p>
      </footer>

      {/* Modals */}
      <MemberDetailsModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </main>
  );
}
