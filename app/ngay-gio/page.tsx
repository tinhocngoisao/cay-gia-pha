'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { AnniversaryCalendar } from '@/components/AnniversaryCalendar';
import { familyData, FamilyMember } from '@/lib/data';
import { MemberDetailsModal } from '@/components/MemberDetailsModal';
import { DongSonDrum, CornerPattern } from '@/components/VietnamesePatterns';
import { motion } from 'motion/react';

export default function NgayGioPage() {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  return (
    <main className="min-h-screen bg-[#C8BCA7] text-[#4A3F35] font-sans selection:bg-[#8C6D53]/20">
      <Header />
      
      <section className="py-6 md:py-12 px-2 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden min-h-[600px]">
        <div className="bg-[#F4EFE6] rounded-xl shadow-xl border border-[#C89F65] p-2 sm:p-4 md:p-8 relative overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.35] mix-blend-multiply">
            <DongSonDrum className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] flex-shrink-0 max-w-none animate-[spin_180s_linear_infinite]" />
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
            <AnniversaryCalendar data={familyData} onMemberClick={setSelectedMember} />
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
