export type Gender = 'male' | 'female';

export interface FamilyMember {
  id: string;
  name: string;
  birthYear?: string;
  deathYear?: string;
  gender: Gender;
  title?: string;
  description?: string;
  imageUrl?: string;
  spouse?: FamilyMember; // Simplified: one spouse for display
  children?: FamilyMember[];
}

export const familyData: FamilyMember = {
  id: '1',
  name: 'Nguyễn Văn A',
  birthYear: '1900',
  deathYear: '1980',
  gender: 'male',
  title: 'Thủy Tổ',
  description: 'Người khai sáng dòng họ Nguyễn tại làng X, xã Y, huyện Z.',
  spouse: {
    id: '1-s',
    name: 'Trần Thị B',
    birthYear: '1905',
    deathYear: '1985',
    gender: 'female',
  },
  children: [
    {
      id: '2',
      name: 'Nguyễn Văn C',
      birthYear: '1925',
      deathYear: '2000',
      gender: 'male',
      title: 'Trưởng Nam',
      spouse: {
        id: '2-s',
        name: 'Lê Thị D',
        birthYear: '1930',
        deathYear: '2010',
        gender: 'female',
      },
      children: [
        {
          id: '4',
          name: 'Nguyễn Văn E',
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
              name: 'Nguyễn Văn G',
              birthYear: '1985',
              gender: 'male',
            },
            {
              id: '8',
              name: 'Nguyễn Thị H',
              birthYear: '1988',
              gender: 'female',
            }
          ]
        },
        {
          id: '5',
          name: 'Nguyễn Thị I',
          birthYear: '1960',
          gender: 'female',
        }
      ]
    },
    {
      id: '3',
      name: 'Nguyễn Văn K',
      birthYear: '1930',
      deathYear: '1995',
      gender: 'male',
      children: [
        {
          id: '6',
          name: 'Nguyễn Văn L',
          birthYear: '1965',
          gender: 'male',
          children: [
            {
              id: '9',
              name: 'Nguyễn Văn M',
              birthYear: '1995',
              gender: 'male',
            }
          ]
        }
      ]
    }
  ]
};
