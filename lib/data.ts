import { Solar } from 'lunar-javascript';

export type Gender = 'male' | 'female';

export interface FamilyMember {
  id: string;
  name: string;
  birthYear?: string;
  deathYear?: string;
  deathDate?: string; // Format: YYYY-MM-DD
  lunarDeathDate?: string; // Format: DD/MM (Âm lịch)
  gender: Gender;
  title?: string;
  description?: string;
  imageUrl?: string;
  spouse?: FamilyMember; // Simplified: one spouse for display
  children?: FamilyMember[];
  generation?: number;
  isAlive?: boolean;
}

// Helper function to auto-calculate lunar date from solar date if missing
const enrichMemberData = (member: FamilyMember): FamilyMember => {
  const enriched = { ...member };
  
  if (enriched.deathDate && !enriched.lunarDeathDate) {
    try {
      const [year, month, day] = enriched.deathDate.split('-').map(Number);
      const solar = Solar.fromYmd(year, month, day);
      const lunar = solar.getLunar();
      enriched.lunarDeathDate = `${lunar.getDay().toString().padStart(2, '0')}/${lunar.getMonth().toString().padStart(2, '0')}`;
    } catch (e) {
      console.error('Error converting date for', member.name, e);
    }
  }

  if (enriched.spouse) {
    enriched.spouse = enrichMemberData(enriched.spouse);
  }

  if (enriched.children) {
    enriched.children = enriched.children.map(enrichMemberData);
  }

  return enriched;
};

const rawFamilyData: FamilyMember = {
  id: '1',
  name: 'Cao Văn A',
  birthYear: '~1716',
  deathYear: '~1807',
  deathDate: '1807-03-15',
  lunarDeathDate: '29/01',
  gender: 'male',
  title: 'Thủy Tổ',
  generation: 1,
  isAlive: false,
  description: 'Người khai sáng dòng họ Cao tại làng X, xã Y, huyện Z.',
  spouse: {
    id: '1-s',
    name: 'Trần Thị B',
    birthYear: '~1720',
    deathYear: '~1810',
    deathDate: '1810-08-20',
    lunarDeathDate: '05/07',
    gender: 'female',
    generation: 1,
    isAlive: false,
  },
  children: [
    {
      id: '2',
      name: 'Cao Văn C',
      birthYear: '1745',
      deathYear: '1820',
      deathDate: '1820-11-05',
      lunarDeathDate: '10/10',
      gender: 'male',
      title: 'Trưởng Họ Đời 2',
      generation: 2,
      isAlive: false,
      spouse: {
        id: '2-s',
        name: 'Lê Thị D',
        birthYear: '1750',
        deathYear: '1830',
        deathDate: '1830-02-14',
        lunarDeathDate: '01/01',
        gender: 'female',
        generation: 2,
        isAlive: false,
      },
      children: [
        {
          id: '4',
          name: 'Cao Văn E',
          birthYear: '1967',
          deathYear: '2020',
          gender: 'male',
          title: 'Trưởng Chi 1',
          generation: 3,
          isAlive: false,
          spouse: {
            id: '4-s',
            name: 'Phạm Thị F',
            birthYear: '1970',
            gender: 'female',
            generation: 3,
            isAlive: true,
          },
          children: [
            {
              id: '7',
              name: 'Cao Văn G',
              birthYear: '2000',
              gender: 'male',
              generation: 4,
              isAlive: true,
            },
            {
              id: '8',
              name: 'Cao Thị H',
              birthYear: '2005',
              gender: 'female',
              generation: 4,
              isAlive: true,
            }
          ]
        },
        {
          id: '5',
          name: 'Cao Thị I',
          birthYear: '1975',
          gender: 'female',
          generation: 3,
          isAlive: true,
        }
      ]
    },
    {
      id: '3',
      name: 'Cao Văn K',
      birthYear: '1750',
      deathYear: '1815',
      deathDate: '1815-06-12',
      lunarDeathDate: '15/05',
      gender: 'male',
      title: 'Trưởng Chi 2',
      generation: 2,
      isAlive: false,
      children: [
        {
          id: '6',
          name: 'Cao Văn L',
          birthYear: '1980',
          gender: 'male',
          generation: 3,
          isAlive: true,
          children: [
            {
              id: '9',
              name: 'Cao Văn M',
              birthYear: '2010',
              gender: 'male',
              generation: 4,
              isAlive: true,
            }
          ]
        }
      ]
    }
  ]
};

export const familyData = enrichMemberData(rawFamilyData);
