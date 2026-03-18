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
}

export const familyData: FamilyMember = {
  id: '1',
  name: 'Cao Văn A',
  birthYear: '1900',
  deathYear: '1980',
  deathDate: '1980-03-15',
  lunarDeathDate: '29/01',
  gender: 'male',
  title: 'Thủy Tổ',
  description: 'Người khai sáng dòng họ Cao tại làng X, xã Y, huyện Z.',
  spouse: {
    id: '1-s',
    name: 'Trần Thị B',
    birthYear: '1905',
    deathYear: '1985',
    deathDate: '1985-08-20',
    lunarDeathDate: '05/07',
    gender: 'female',
  },
  children: [
    {
      id: '2',
      name: 'Cao Văn C',
      birthYear: '1925',
      deathYear: '2000',
      deathDate: '2000-11-05',
      lunarDeathDate: '10/10',
      gender: 'male',
      title: 'Trưởng Nam',
      spouse: {
        id: '2-s',
        name: 'Lê Thị D',
        birthYear: '1930',
        deathYear: '2010',
        deathDate: '2010-02-14',
        lunarDeathDate: '01/01',
        gender: 'female',
      },
      children: [
        {
          id: '4',
          name: 'Cao Văn E',
          birthYear: '1955',
          gender: 'male',
          spouse: {
            id: '4-s',
            name: 'Phạm Thị F',
            birthYear: '1960',
            gender: 'female',
          },
          children: [
            {
              id: '7',
              name: 'Cao Văn G',
              birthYear: '1985',
              gender: 'male',
            },
            {
              id: '8',
              name: 'Cao Thị H',
              birthYear: '1988',
              gender: 'female',
            }
          ]
        },
        {
          id: '5',
          name: 'Cao Thị I',
          birthYear: '1960',
          gender: 'female',
        }
      ]
    },
    {
      id: '3',
      name: 'Cao Văn K',
      birthYear: '1930',
      deathYear: '1995',
      deathDate: '1995-06-12',
      lunarDeathDate: '15/05',
      gender: 'male',
      children: [
        {
          id: '6',
          name: 'Cao Văn L',
          birthYear: '1965',
          gender: 'male',
          children: [
            {
              id: '9',
              name: 'Cao Văn M',
              birthYear: '1995',
              gender: 'male',
            }
          ]
        }
      ]
    }
  ]
};
