'use client';

import React, { useState } from 'react';
import { familyData, FamilyMember } from '@/lib/data';
import { FamilyTree } from '@/components/FamilyTree';
import { MemberDetailsModal } from '@/components/MemberDetailsModal';
import { DongSonDrum, CornerPattern } from '@/components/VietnamesePatterns';
import { motion } from 'motion/react';
import { Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  return (
    <main className="min-h-screen bg-[#C8BCA7] text-[#4A3F35] selection:bg-[#8C6D53]/20">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3F35] mb-6 leading-tight">
            Cây Gia Phả <br className="md:hidden" />
            <span className="text-[#8C6D53] italic">Dòng Họ Cao</span>
          </h2>
          <p className="max-w-2xl mx-auto text-[#5A5A40] text-lg md:text-xl leading-relaxed mb-10 font-[family-name:var(--font-crimson)]">
            Lưu giữ truyền thống, kết nối thế hệ. Nơi ghi chép lại cội nguồn và những câu chuyện đáng tự hào của gia tộc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-[family-name:var(--font-be-vietnam)]">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('family-tree')?.offsetTop || 0, behavior: 'smooth' })}
              className="px-8 py-3 bg-[#8C6D53] text-white rounded-full font-medium hover:bg-[#7A5D43] transition-colors shadow-sm flex items-center gap-2"
            >
              <Users size={18} />
              <span>Xem Phả Đồ</span>
            </button>
            <Link 
              href="/ngay-gio"
              className="px-8 py-3 bg-white text-[#8C6D53] border border-[#8C6D53]/30 rounded-full font-medium hover:bg-[#8C6D53]/5 transition-colors shadow-sm flex items-center gap-2"
            >
              <Calendar size={18} />
              <span>Xem Ngày Giỗ</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section id="family-tree" className="py-6 md:py-12 px-2 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden min-h-[600px]">
        <div className="bg-[#F4EFE6] rounded-xl shadow-xl border border-[#C89F65] p-2 sm:p-4 md:p-8 relative overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.35] mix-blend-multiply">
            <DongSonDrum className="w-[1000px] h-[1000px] md:w-[1400px] md:h-[1400px] flex-shrink-0 max-w-none animate-[spin_180s_linear_infinite]" />
          </div>
          
          {/* Corners */}
          <CornerPattern className="absolute top-2 left-2 md:top-3 md:left-3 text-[#9B2C2C] w-8 h-8 md:w-14 md:h-14 opacity-80" />
          <CornerPattern className="absolute top-2 right-2 md:top-3 md:right-3 text-[#9B2C2C] w-8 h-8 md:w-14 md:h-14 rotate-90 opacity-80" />
          <CornerPattern className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-[#9B2C2C] w-8 h-8 md:w-14 md:h-14 rotate-180 opacity-80" />
          <CornerPattern className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-[#9B2C2C] w-8 h-8 md:w-14 md:h-14 -rotate-90 opacity-80" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <FamilyTree data={familyData} onMemberClick={setSelectedMember} />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#8C6D53]/60 text-sm border-t border-[#E8E3D9] mt-12">
        <p>© {new Date().getFullYear()} Trang thông tin Dòng họ Cao. Lưu truyền muôn đời.</p>
      </footer>

      {/* Modals */}
      <MemberDetailsModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </main>
  );
}
