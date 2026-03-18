import React, { useState, useMemo } from 'react';
import { FamilyMember } from '@/lib/data';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List as ListIcon } from 'lucide-react';
import { Solar, Lunar } from 'lunar-javascript';

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

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const AnniversaryCalendar: React.FC<AnniversaryCalendarProps> = ({ data, onMemberClick }) => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth() + 1); // 1-12 (Solar)
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [mode, setMode] = useState<CalendarMode>('monthly');
  
  const allMembers = useMemo(() => getAllMembers(data), [data]);
  
  // Filter members who have passed away and have a lunar death date
  const deceasedMembers = useMemo(() => {
    return allMembers.filter(m => m.deathYear || m.lunarDeathDate || m.deathDate);
  }, [allMembers]);

  // For Yearly View: Group by Lunar Month
  const anniversariesByLunarMonth = useMemo(() => {
    const grouped: Record<number, FamilyMember[]> = {};
    for (let i = 1; i <= 12; i++) grouped[i] = [];
    
    deceasedMembers.forEach(member => {
      if (member.lunarDeathDate) {
        const parts = member.lunarDeathDate.split('/');
        if (parts.length === 2) {
          const month = parseInt(parts[1], 10);
          if (month >= 1 && month <= 12) {
            grouped[month].push(member);
          }
        }
      }
    });
    
    for (let i = 1; i <= 12; i++) {
      grouped[i].sort((a, b) => {
        const dayA = parseInt(a.lunarDeathDate!.split('/')[0], 10);
        const dayB = parseInt(b.lunarDeathDate!.split('/')[0], 10);
        return dayA - dayB;
      });
    }
    return grouped;
  }, [deceasedMembers]);

  // For Monthly View: Get days in selected Solar month
  const { calendarCells, currentMonthAnniversaries } = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Mon=0, Sun=6
    
    const cells = [];
    const monthAnniversaries: { member: FamilyMember, solarDate: number, lunarDateStr: string }[] = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push({ type: 'empty', key: `empty-${i}` });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const solar = Solar.fromYmd(selectedYear, selectedMonth, day);
      const lunar = solar.getLunar();
      
      const lunarDayStr = lunar.getDay().toString().padStart(2, '0');
      const lunarMonthStr = lunar.getMonth().toString().padStart(2, '0');
      const lunarDateString = `${lunarDayStr}/${lunarMonthStr}`;
      
      const dayAnniversaries = deceasedMembers.filter(m => m.lunarDeathDate === lunarDateString);
      
      dayAnniversaries.forEach(member => {
        monthAnniversaries.push({
          member,
          solarDate: day,
          lunarDateStr: `${lunar.getDay()}/${lunar.getMonth()}`
        });
      });

      cells.push({
        type: 'day',
        key: `day-${day}`,
        day,
        lunarDay: lunar.getDay(),
        lunarMonth: lunar.getMonth(),
        isFirstLunarDay: lunar.getDay() === 1,
        anniversaries: dayAnniversaries
      });
    }
    
    return { calendarCells: cells, currentMonthAnniversaries: monthAnniversaries };
  }, [selectedYear, selectedMonth, deceasedMembers]);

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(y => y - 1);
    } else {
      setSelectedMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(y => y + 1);
    } else {
      setSelectedMonth(m => m + 1);
    }
  };

  const getSolarDateStringForLunar = (lunarDateStr: string, year: number) => {
    try {
      const [d, m] = lunarDateStr.split('/').map(Number);
      const lunar = Lunar.fromYmd(year, m, d);
      const solar = lunar.getSolar();
      return `${solar.getDay().toString().padStart(2, '0')}/${solar.getMonth().toString().padStart(2, '0')}/${solar.getYear()}`;
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-[#E8E3D9] p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h3 className="font-serif text-2xl text-[#4A3F35] flex items-center gap-2">
          <CalendarIcon className="text-[#8C6D53]" />
          Lịch Ngày Giỗ
        </h3>
        
        <div className="flex flex-wrap items-center gap-4">
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

          <div className="flex items-center gap-2 bg-[#F4EFE6] rounded-full p-1 border border-[#E8E3D9]">
            {mode === 'monthly' && (
              <button 
                onClick={handlePrevMonth}
                className="p-1.5 rounded-full hover:bg-white text-[#8C6D53] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            
            <div className="flex items-center">
              {mode === 'monthly' && (
                <div className="relative flex items-center hover:bg-white rounded-full transition-colors">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="font-medium text-[#4A3F35] bg-transparent border-none focus:ring-0 text-sm cursor-pointer outline-none appearance-none pl-3 pr-6 py-1.5"
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Tháng {i + 1}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 pointer-events-none text-[#8C6D53]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              )}
              
              <div className="relative flex items-center hover:bg-white rounded-full transition-colors">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="font-medium text-[#4A3F35] bg-transparent border-none focus:ring-0 text-sm cursor-pointer outline-none appearance-none pl-3 pr-6 py-1.5"
                >
                  {Array.from({ length: 10 }).map((_, i) => {
                    const year = today.getFullYear() - 5 + i;
                    return (
                      <option key={year} value={year}>
                        Năm {year}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute right-2 pointer-events-none text-[#8C6D53]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {mode === 'monthly' && (
              <button 
                onClick={handleNextMonth}
                className="p-1.5 rounded-full hover:bg-white text-[#8C6D53] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {mode === 'monthly' ? (
        <>
          <div className="grid grid-cols-7 gap-2 md:gap-3 mb-8">
            {WEEKDAYS.map(day => (
              <div key={day} className="text-center font-medium text-[#8C6D53] text-sm py-2">
                {day}
              </div>
            ))}
            
            {calendarCells.map((cell: any) => {
              if (cell.type === 'empty') {
                return <div key={cell.key} className="min-h-[90px] p-2 rounded-lg bg-transparent"></div>;
              }
              
              const hasAnniversary = cell.anniversaries.length > 0;
              
              return (
                <div 
                  key={cell.key} 
                  className={`min-h-[90px] p-2 rounded-lg border relative ${
                    hasAnniversary 
                      ? 'bg-[#8C6D53]/10 border-[#8C6D53]/40 shadow-sm' 
                      : 'bg-white/50 border-[#E8E3D9] opacity-80'
                  } flex flex-col`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-base font-medium ${hasAnniversary ? 'text-[#9B2C2C]' : 'text-[#4A3F35]'}`}>
                      {cell.day}
                    </span>
                    <span className={`text-[10px] leading-tight ${cell.isFirstLunarDay ? 'text-[#9B2C2C] font-medium' : 'text-[#8C6D53]'}`}>
                      {cell.lunarDay}{cell.isFirstLunarDay ? `/${cell.lunarMonth} ÂL` : ''}
                    </span>
                  </div>
                  
                  <div className="mt-1 flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar">
                    {cell.anniversaries.map((member: FamilyMember) => (
                      <button
                        key={member.id}
                        onClick={() => onMemberClick(member)}
                        className="text-[10px] md:text-xs text-left truncate bg-white px-1.5 py-1 rounded shadow-sm hover:bg-[#8C6D53] hover:text-white transition-colors border border-[#8C6D53]/20"
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
                Danh sách ngày giỗ trong Tháng {selectedMonth}/{selectedYear} (Dương lịch)
              </h4>
              <ul className="space-y-3">
                {currentMonthAnniversaries.map(({ member, solarDate, lunarDateStr }) => (
                  <li key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded-md shadow-sm border border-[#E8E3D9]/50 gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-[#8C6D53]/10 flex flex-col items-center justify-center text-[#9B2C2C] border border-[#8C6D53]/20">
                        <span className="font-bold leading-tight">{solarDate}</span>
                        <span className="text-[10px] opacity-80 leading-none">Th {selectedMonth}</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#4A3F35] text-lg">{member.name}</p>
                        <p className="text-sm text-[#8C6D53]">
                          {member.title ? `${member.title} • ` : ''}
                          Giỗ Âm lịch: {lunarDateStr}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onMemberClick(member)}
                      className="text-sm px-4 py-2 rounded-md bg-[#F4EFE6] text-[#8C6D53] hover:bg-[#8C6D53] hover:text-white transition-colors self-start sm:self-auto shrink-0"
                    >
                      Chi tiết
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12 bg-[#F4EFE6]/50 rounded-lg border border-[#E8E3D9] border-dashed">
              <p className="text-[#8C6D53]">Không có ngày giỗ nào trong Tháng {selectedMonth}/{selectedYear} (Dương lịch)</p>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => {
            const month = i + 1;
            const monthAnniversaries = anniversariesByLunarMonth[month];
            
            return (
              <div key={month} className="bg-white rounded-xl border border-[#E8E3D9] overflow-hidden shadow-sm flex flex-col">
                <div className="bg-[#F4EFE6] px-4 py-3 border-b border-[#E8E3D9] flex justify-between items-center">
                  <h4 className="font-medium text-[#4A3F35]">Tháng {month} Âm lịch</h4>
                  <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-[#8C6D53] border border-[#E8E3D9]">
                    {monthAnniversaries.length} ngày giỗ
                  </span>
                </div>
                <div className="p-4 flex-1">
                  {monthAnniversaries.length > 0 ? (
                    <ul className="space-y-4">
                      {monthAnniversaries.map(member => {
                        const solarDateStr = member.lunarDeathDate ? getSolarDateStringForLunar(member.lunarDeathDate, selectedYear) : 'N/A';
                        
                        return (
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
                              <p className="text-[11px] text-[#8C6D53] mt-0.5">
                                Dương lịch: {solarDateStr}
                              </p>
                            </div>
                          </li>
                        );
                      })}
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
