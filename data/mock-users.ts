// Mock user profiles for Kinship app
// Using provider-based terminology

export const mockUsers = [
  {
    id: 'user-1',
    email: 'alex@kinship.app',
    name: 'Alex Rivera',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    location: 'Portland, OR',
    bio: 'Single parent looking to build an intentional parenting crew. I value gentle parenting, open communication, and creating a supportive village for my future child.',
    pronouns: 'they/them',
    role: 'primary-parent',
    status: 'in-crew',
    values: {
      parentingStyle: ['gentle-parenting', 'attachment', 'child-led'],
      religiousViews: 'secular-humanist',
      politicalViews: 'progressive',
      familyStructure: 'non-hierarchical',
      workLife: 'flexible-remote',
      locationPreference: 'urban-walkable'
    },
    seeking: ['co-parent', 'genetic-provider', 'care-provider'],
    availability: 'full-time',
    children: 0,
    languages: ['English', 'Spanish'],
    documentsComplete: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'user-2',
    email: 'jordan@kinship.app',
    name: 'Jordan & Sam Chen',
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    location: 'Brooklyn, NY',
    bio: 'Married couple of 5 years seeking a genetic provider who wants ongoing involvement. We believe in transparent communication and shared decision-making.',
    pronouns: 'she/her & he/him',
    role: 'co-parent',
    status: 'in-crew',
    values: {
      parentingStyle: ['attachment', 'positive-discipline'],
      religiousViews: 'mixed-faith',
      politicalViews: 'progressive',
      familyStructure: 'two-parent-plus',
      workLife: 'dual-income',
      locationPreference: 'urban'
    },
    seeking: ['genetic-provider', 'care-provider'],
    availability: 'full-time',
    children: 0,
    languages: ['English', 'Mandarin'],
    documentsComplete: true,
    createdAt: new Date('2023-11-20')
  },
  {
    id: 'user-3',
    email: 'marcus@kinship.app',
    name: 'Marcus Williams',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    location: 'Brooklyn, NY',
    bio: 'Genetic provider looking to support a family while maintaining clear boundaries and defined involvement. I want to be present but not primary.',
    pronouns: 'he/him',
    role: 'genetic-provider',
    status: 'in-crew',
    values: {
      parentingStyle: ['structured', 'boundary-setting'],
      religiousViews: 'spiritual-not-religious',
      politicalViews: 'moderate',
      familyStructure: 'extended-village',
      workLife: 'full-time-office',
      locationPreference: 'urban'
    },
    seeking: [],
    availability: 'known-involvement',
    children: 0,
    languages: ['English'],
    documentsComplete: true,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'user-4',
    email: 'priya@kinship.app',
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    location: 'Austin, TX',
    bio: 'Solo parent of an 18-month-old seeking care providers and resource providers to build my village. Strong emphasis on cultural traditions and multigenerational support.',
    pronouns: 'she/her',
    role: 'primary-parent',
    status: 'in-crew',
    values: {
      parentingStyle: ['traditional', 'family-centered'],
      religiousViews: 'hindu',
      politicalViews: 'moderate',
      familyStructure: 'multigenerational',
      workLife: 'part-time-flexible',
      locationPreference: 'suburban'
    },
    seeking: ['care-provider', 'resource-provider', 'support-provider'],
    availability: 'full-time',
    children: 1,
    languages: ['English', 'Hindi'],
    documentsComplete: false,
    createdAt: new Date('2023-08-15')
  },
  {
    id: 'user-5',
    email: 'diego@kinship.app',
    name: 'Diego & Roberto',
    avatar: 'https://i.pravatar.cc/150?u=diego',
    location: 'Miami, FL',
    bio: 'Couple together 8 years seeking to expand our family. We value Latino cultural heritage and want co-parents who appreciate bilingual upbringing.',
    pronouns: 'he/him & he/him',
    role: 'co-parent',
    status: 'available',
    values: {
      parentingStyle: ['family-centered', 'cultural-traditions'],
      religiousViews: 'catholic-cultural',
      politicalViews: 'progressive',
      familyStructure: 'co-parenting',
      workLife: 'dual-income',
      locationPreference: 'urban'
    },
    seeking: ['genetic-provider', 'co-parent'],
    availability: 'full-time',
    children: 0,
    languages: ['English', 'Spanish'],
    documentsComplete: false,
    createdAt: new Date('2024-02-01')
  },
  {
    id: 'user-6',
    email: 'taylor@kinship.app',
    name: 'Taylor Reed',
    avatar: 'https://i.pravatar.cc/150?u=taylor',
    location: 'Seattle, WA',
    bio: 'Experienced childcare professional seeking to become a co-parent. I bring 10 years of early childhood education experience and a flexible work schedule.',
    pronouns: 'they/them',
    role: 'co-parent',
    status: 'available',
    values: {
      parentingStyle: ['montessori', 'child-led', 'nature-based'],
      religiousViews: 'secular',
      politicalViews: 'progressive',
      familyStructure: 'co-parenting',
      workLife: 'flexible-consulting',
      locationPreference: 'urban-walkable'
    },
    seeking: ['primary-parent'],
    availability: 'full-time',
    children: 0,
    languages: ['English'],
    documentsComplete: true,
    createdAt: new Date('2024-01-20')
  }
]

export const getCurrentUser = () => mockUsers[0]
export const getUserById = (id: string) => mockUsers.find(u => u.id === id)
export const getAvailableUsers = () => mockUsers.filter(u => u.status === 'available')
