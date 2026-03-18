'use client';

import React, { useState } from 'react';
import { FamilyMember } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface FamilyTreeProps {
  data: FamilyMember;
  onMemberClick: (member: FamilyMember) => void;
}

export function FamilyTree({ data, onMemberClick }: FamilyTreeProps) {
  return (
    <div className="w-full overflow-x-auto py-12 px-4 md:px-8 hide-scrollbar">
      <div className="min-w-max flex justify-center">
        <TreeNode member={data} onMemberClick={onMemberClick} isRoot />
      </div>
    </div>
  );
}

interface TreeNodeProps {
  member: FamilyMember;
  onMemberClick: (member: FamilyMember) => void;
  isRoot?: boolean;
}

function TreeNode({ member, onMemberClick, isRoot = false }: TreeNodeProps) {
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Content Row */}
      <div className="flex justify-center relative z-10">
        {/* Left Balancer (only if spouse exists) */}
        {member.spouse && (
          <div className="w-[160px] md:w-[208px] shrink-0"></div>
        )}
        
        {/* Blood Member */}
        <div className="flex items-start relative">
          <MemberCard member={member} onClick={() => onMemberClick(member)} />
          
          {/* Absolute Spouse */}
          {member.spouse && (
            <div className="absolute left-full top-0 flex items-start">
              <div className="w-8 md:w-12 h-[2px] bg-[#C89F65] mt-[35px] md:mt-[47px] shrink-0"></div>
              <MemberCard member={member.spouse} onClick={() => onMemberClick(member.spouse!)} isSpouse />
            </div>
          )}
        </div>
        
        {/* Right Balancer */}
        {member.spouse && (
          <div className="w-[160px] md:w-[208px] shrink-0"></div>
        )}
      </div>

      {/* Children */}
      {hasChildren && (
        <>
          {/* Vertical line down from parent */}
          <div className="w-[2px] h-8 bg-[#C89F65]"></div>
          
          <div className="flex justify-center relative">
            {member.children!.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === member.children!.length - 1;
              const isOnly = member.children!.length === 1;

              return (
                <div key={child.id} className="relative flex flex-col items-center pt-8 px-2 md:px-4">
                  {/* Horizontal line connecting children */}
                  {!isOnly && (
                    <div className={cn(
                      "absolute top-0 h-[2px] bg-[#C89F65]",
                      isFirst ? "left-1/2 right-0" : 
                      isLast ? "left-0 right-1/2" : 
                      "left-0 right-0"
                    )}></div>
                  )}
                  
                  {/* Vertical line down to child */}
                  <div className="absolute top-0 left-1/2 w-[2px] h-8 bg-[#C89F65] -translate-x-1/2"></div>
                  
                  <TreeNode member={child} onMemberClick={onMemberClick} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

interface MemberCardProps {
  member: FamilyMember;
  onClick: () => void;
  isSpouse?: boolean;
}

function MemberCard({ member, onClick, isSpouse }: MemberCardProps) {
  const isMale = member.gender === 'male';
  
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center p-3 md:p-4 rounded-2xl shadow-sm border transition-all duration-300 w-32 md:w-40 bg-white group",
        isMale ? "border-[#8C6D53]/30 hover:border-[#8C6D53] hover:shadow-md" : "border-[#5A5A40]/30 hover:border-[#5A5A40] hover:shadow-md",
        isSpouse && "opacity-90"
      )}
    >
      <div className={cn(
        "w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 flex items-center justify-center text-lg font-serif",
        isMale ? "bg-[#8C6D53]/10 text-[#8C6D53]" : "bg-[#5A5A40]/10 text-[#5A5A40]"
      )}>
        {member.name.charAt(0)}
      </div>
      
      <div className="text-center w-full">
        <h3 className="font-serif font-medium text-[#4A3F35] text-sm md:text-base leading-tight mb-1 line-clamp-2">
          {member.name}
        </h3>
        <p className="text-[10px] md:text-xs text-[#8C6D53] opacity-80">
          {member.birthYear ? member.birthYear : '?'} - {member.deathYear ? member.deathYear : 'Nay'}
        </p>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-0 group-hover:opacity-20 transition-opacity rounded-tl-xl" style={{ color: isMale ? '#8C6D53' : '#5A5A40' }}></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-0 group-hover:opacity-20 transition-opacity rounded-br-xl" style={{ color: isMale ? '#8C6D53' : '#5A5A40' }}></div>
    </motion.button>
  );
}
