'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FamilyMember } from '@/lib/data';
import { X, Calendar, User, Info } from 'lucide-react';
import Image from 'next/image';

interface MemberDetailsModalProps {
  member: FamilyMember | null;
  onClose: () => void;
}

export function MemberDetailsModal({ member, onClose }: MemberDetailsModalProps) {
  if (!member) return null;

  const isAlive = member.isAlive !== false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl border border-[#E8E3D9]"
        >
          {/* Header Pattern */}
          <div className={`h-28 relative overflow-hidden ${isAlive ? 'bg-gradient-to-r from-[#E5C07B] to-[#FDF5D3]' : 'bg-gradient-to-r from-[#8C6D53] to-[#C8BCA7]'}`}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            {member.generation && (
              <div className="absolute top-4 left-4 bg-black/20 text-white text-xs px-3 py-1 rounded-full font-[family-name:var(--font-be-vietnam)] backdrop-blur-md">
                Đời thứ {member.generation}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className={`relative w-28 h-28 -mt-14 mx-auto mb-4 rounded-full border-4 border-white overflow-hidden shadow-lg flex items-center justify-center ${isAlive ? 'bg-[#FFFDF0]' : 'bg-[#F5F5F5]'}`}>
              {member.imageUrl ? (
                <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
              ) : (
                <span className={`text-4xl font-[family-name:var(--font-playfair)] ${isAlive ? 'text-[#8C6D53]' : 'text-[#666]'}`}>
                  {member.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="text-center mb-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#4A3F35] mb-1">{member.name}</h2>
              {member.title && (
                <span className="inline-block px-3 py-1 bg-[#9B2C2C]/10 text-[#9B2C2C] text-sm font-semibold rounded-full uppercase tracking-wider mt-2">
                  {member.title}
                </span>
              )}
            </div>

            <div className="space-y-4 font-[family-name:var(--font-be-vietnam)]">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E3D9] shadow-sm">
                <div className="p-2 bg-[#8C6D53]/10 rounded-xl text-[#8C6D53]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-[#8C6D53] uppercase tracking-wider font-semibold mb-0.5">Năm sinh - Năm mất</p>
                  <p className="text-[#4A3F35] font-medium">
                    {member.deathYear 
                      ? `${member.birthYear || 'Chưa rõ'} - ${member.deathYear}` 
                      : (isAlive && member.birthYear ? `Sinh năm ${member.birthYear}` : `${member.birthYear || 'Chưa rõ'} - ${isAlive ? 'Nay' : 'Chưa rõ'}`)}
                  </p>
                  {member.lunarDeathDate && (
                    <p className="text-xs text-[#9B2C2C] mt-1 font-medium">
                      Ngày giỗ (Âm lịch): {member.lunarDeathDate}
                    </p>
                  )}
                </div>
              </div>

              {member.description && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E3D9] shadow-sm">
                  <div className="p-2 bg-[#5A5A40]/10 rounded-xl text-[#5A5A40] shrink-0">
                    <Info size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[#5A5A40] uppercase tracking-wider font-semibold mb-1">Tiểu sử</p>
                    <p className="text-[#4A3F35] text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
