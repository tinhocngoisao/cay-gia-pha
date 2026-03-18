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
          <div className="h-24 bg-[#8C6D53] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative w-24 h-24 -mt-12 mx-auto mb-4 rounded-full border-4 border-white bg-[#E8E3D9] overflow-hidden shadow-md flex items-center justify-center">
              {member.imageUrl ? (
                <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
              ) : (
                <User size={40} className="text-[#8C6D53]/50" />
              )}
            </div>

            <div className="text-center mb-6">
              <h2 className="font-serif text-3xl font-medium text-[#4A3F35] mb-1">{member.name}</h2>
              {member.title && (
                <span className="inline-block px-3 py-1 bg-[#5A5A40]/10 text-[#5A5A40] text-sm font-medium rounded-full">
                  {member.title}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E8E3D9] shadow-sm">
                <div className="p-2 bg-[#8C6D53]/10 rounded-xl text-[#8C6D53]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-[#8C6D53] uppercase tracking-wider font-semibold mb-0.5">Năm sinh - Năm mất</p>
                  <p className="text-[#4A3F35] font-medium">
                    {member.birthYear || 'Chưa rõ'} - {member.deathYear || 'Nay'}
                  </p>
                </div>
              </div>

              {member.description && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E8E3D9] shadow-sm">
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
