import React, { useState, useMemo } from 'react';
import { FamilyMember } from '@/lib/data';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List as ListIcon } from 'lucide-react';

interface AnniversaryCalendarProps {
  data: FamilyMember;
  onMemberClick: (member: FamilyMember) => void;
}

// Flatten the family tree to get all members
const getAllMembers = (member: FamilyMember): FamilyMember[] => {
  let members = [member];
  if (member.spouse) {
    members.push(member.spouse);
  }
  if (member.children) {
    member.children.forEach(child => {
      members = members.concat(getAllMembers(child));
    });
  }
  return members;
};

type CalendarMode = 'monthly' | 'yearly';

export const AnniversaryCalendar: React.FC<AnniversaryCalendarProps> = ({ data, onMemberClick }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // 1-12
  const [mode, setMode] = useState<CalendarMode>('monthly');
  
  const allMembers = useMemo(() => getAllMembers(data), [data]);
  
  // Filter members who have passed away and have a lunar death date
  const deceasedMembers = useMemo(() => {
    return allMembers.filter(m => m.deathYear || m.lunarDeathDate || m.deathDate);
  }, [allMembers]);

  // Group by lunar month
  const anniversariesByMonth = useMemo(() => {
    const grouped: Record<number, FamilyMember[]> = {};
    
    // Initialize 1-12
    for (let i = 1; i <= 12; i++) {
      grouped[i] = [];
    }
    
    deceasedMembers.forEach(member => {
      if (member.lunarDeathDate) {
        // Parse "DD/MM"
        const parts = member.lunarDeathDate.split('/');
        if (parts.length === 2) {
          const month = parseInt(parts[1], 10);
          if (month >= 1 && month <= 12) {
            grouped[month].push(member);
          }
        }
      }
    });
    
    // Sort each month by day
    for (let i = 1; i <= 12; i++) {
      grouped[i].sort((a, b) => {
        const dayA = parseInt(a.lunarDeathDate!.split('/')[0], 10);
        const dayB = parseInt(b.lunarDeathDate!.split('/')[0], 10);
        return dayA - dayB;
      });
    }
    
    return grouped;
  }, [deceasedMembers]);

  const handlePrevMonth = () => {
    setSelectedMonth(prev => prev === 1 ? 12 : prev - 1);
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => prev === 12 ? 1 : prev + 1);
  };

  const currentMonthAnniversaries = anniversariesByMonth[selectedMonth] || [];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-[#E8E3D9] p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h3 className="font-serif text-2xl text-[#4A3F35] flex items-center gap-2">
          <CalendarIcon className="text-[#8C6D53]" />
          Lịch Ngày Giỗ (Âm Lịch)
        </h3>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-[#F4EFE6] rounded-lg p-1 border border-[#E8E3D9]">
            <button
              onClick={() => setMode('monthly')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'monthly' ? 'bg-white text-[#9B2C2C] shadow-sm' : 'text-[#8C6D53] hover:text-[#4A3F35]'}`}
            >
              Lịch Tháng
            </button>
            <button
              onClick={() => setMode('yearly')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'yearly' ? 'bg-white text-[#9B2C2C] shadow-sm' : 'text-[#8C6D53] hover:text-[#4A3F35]'}`}
            >
              Lịch Năm
            </button>
          </div>

          {mode === 'monthly' && (
            <div className="flex items-center gap-2 bg-[#F4EFE6] rounded-full p-1 border border-[#E8E3D9]">
              <button 
                onClick={handlePrevMonth}
                className="p-1.5 rounded-full hover:bg-white text-[#8C6D53] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-medium text-[#4A3F35] min-w-[80px] text-center text-sm">
                Tháng {selectedMonth}
              </span>
              <button 
                onClick={handleNextMonth}
                className="p-1.5 rounded-full hover:bg-white text-[#8C6D53] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {mode === 'monthly' ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 mb-8">
            {/* Render a simple 30-day grid for the lunar month */}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const dayString = day.toString().padStart(2, '0');
              const monthString = selectedMonth.toString().padStart(2, '0');
              const dateString = `${dayString}/${monthString}`;
              
              const dayAnniversaries = currentMonthAnniversaries.filter(
                m => m.lunarDeathDate === dateString
              );
              
              const hasAnniversary = dayAnniversaries.length > 0;
              
              return (
                <div 
                  key={day} 
                  className={`min-h-[90px] p-2 rounded-lg border ${
                    hasAnniversary 
                      ? 'bg-[#8C6D53]/10 border-[#8C6D53]/40 shadow-sm' 
                      : 'bg-white/50 border-[#E8E3D9] opacity-60'
                  } flex flex-col`}
                >
                  <span className={`text-sm font-medium ${hasAnniversary ? 'text-[#9B2C2C]' : 'text-[#8C6D53]'}`}>
                    Mùng {day}
                  </span>
                  
                  <div className="mt-2 flex flex-col gap-1.5">
                    {dayAnniversaries.map(member => (
                      <button
                        key={member.id}
                        onClick={() => onMemberClick(member)}
                        className="text-xs text-left truncate bg-white px-2 py-1.5 rounded shadow-sm hover:bg-[#8C6D53] hover:text-white transition-colors border border-[#8C6D53]/20"
                        title={member.name}
                      >
                        {member.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {currentMonthAnniversaries.length > 0 ? (
            <div className="bg-[#F4EFE6] rounded-lg p-5 border border-[#E8E3D9]">
              <h4 className="font-medium text-[#4A3F35] mb-4 flex items-center gap-2">
                <ListIcon size={18} className="text-[#8C6D53]" />
                Danh sách ngày giỗ trong Tháng {selectedMonth}
              </h4>
              <ul className="space-y-3">
                {currentMonthAnniversaries.map(member => (
                  <li key={member.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm border border-[#E8E3D9]/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#8C6D53]/10 flex flex-col items-center justify-center text-[#9B2C2C] border border-[#8C6D53]/20">
                        <span className="text-xs opacity-80 leading-none">Mùng</span>
                        <span className="font-bold leading-tight">{member.lunarDeathDate?.split('/')[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#4A3F35] text-lg">{member.name}</p>
                        <p className="text-sm text-[#8C6D53]">{member.title || 'Thành viên'}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onMemberClick(member)}
                      className="text-sm px-4 py-2 rounded-md bg-[#F4EFE6] text-[#8C6D53] hover:bg-[#8C6D53] hover:text-white transition-colors"
                    >
                      Chi tiết
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12 bg-[#F4EFE6]/50 rounded-lg border border-[#E8E3D9] border-dashed">
              <p className="text-[#8C6D53]">Không có ngày giỗ nào trong Tháng {selectedMonth}</p>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => {
            const month = i + 1;
            const monthAnniversaries = anniversariesByMonth[month];
            
            return (
              <div key={month} className="bg-white rounded-xl border border-[#E8E3D9] overflow-hidden shadow-sm flex flex-col">
                <div className="bg-[#F4EFE6] px-4 py-3 border-b border-[#E8E3D9] flex justify-between items-center">
                  <h4 className="font-medium text-[#4A3F35]">Tháng {month}</h4>
                  <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-[#8C6D53] border border-[#E8E3D9]">
                    {monthAnniversaries.length} ngày giỗ
                  </span>
                </div>
                <div className="p-4 flex-1">
                  {monthAnniversaries.length > 0 ? (
                    <ul className="space-y-3">
                      {monthAnniversaries.map(member => (
                        <li key={member.id} className="flex items-start gap-3 group">
                          <div className="min-w-[40px] text-center pt-0.5">
                            <span className="text-sm font-bold text-[#9B2C2C]">
                              {member.lunarDeathDate?.split('/')[0]}
                            </span>
                          </div>
                          <div className="flex-1">
                            <button 
                              onClick={() => onMemberClick(member)}
                              className="font-medium text-[#4A3F35] text-left hover:text-[#9B2C2C] transition-colors"
                            >
                              {member.name}
                            </button>
                            <p className="text-xs text-[#8C6D53] mt-0.5">{member.title || 'Thành viên'}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="h-full flex items-center justify-center text-sm text-[#8C6D53]/60 italic py-4">
                      Không có ngày giỗ
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
