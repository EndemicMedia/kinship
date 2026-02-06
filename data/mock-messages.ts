// Mock chat messages for Kinship app

export const mockMessages = {
  'crew-1': [
    {
      id: 'msg-1',
      crewId: 'crew-1',
      senderId: 'user-1',
      content: 'Hi everyone! Excited to start this journey together. When works for our first video call?',
      type: 'text',
      timestamp: new Date('2024-01-16T10:00:00'),
      readBy: ['user-1', 'user-3', 'user-4']
    },
    {
      id: 'msg-2',
      crewId: 'crew-1',
      senderId: 'user-3',
      content: 'Great to be here! I am free most evenings after 6pm EST.',
      type: 'text',
      timestamp: new Date('2024-01-16T10:15:00'),
      readBy: ['user-1', 'user-3', 'user-4']
    },
    {
      id: 'msg-3',
      crewId: 'crew-1',
      senderId: 'user-4',
      content: 'I have attached the initial values alignment worksheet we discussed.',
      type: 'file',
      attachments: [{
        id: 'att-1',
        name: 'Values_Worksheet.pdf',
        type: 'application/pdf',
        size: 245000,
        url: '#'
      }],
      timestamp: new Date('2024-01-17T14:30:00'),
      readBy: ['user-1', 'user-3', 'user-4']
    },
    {
      id: 'msg-4',
      crewId: 'crew-1',
      senderId: 'user-1',
      content: 'Thanks Priya! I will review this weekend. Marcus, have you had a chance to look at the co-parenting agreement draft?',
      type: 'text',
      timestamp: new Date('2024-01-17T16:00:00'),
      readBy: ['user-1', 'user-3', 'user-4']
    },
    {
      id: 'msg-5',
      crewId: 'crew-1',
      senderId: 'user-3',
      content: 'Yes, I have reviewed it. I have some questions about the visitation schedule section. Can we discuss on our call?',
      type: 'text',
      timestamp: new Date('2024-01-17T18:30:00'),
      readBy: ['user-1', 'user-3', 'user-4']
    },
    {
      id: 'msg-6',
      crewId: 'crew-1',
      senderId: 'system',
      content: 'Document "Co-Parenting Agreement" has been signed by all members',
      type: 'system',
      timestamp: new Date('2024-02-17T09:00:00'),
      readBy: ['user-1', 'user-3', 'user-4']
    },
    {
      id: 'msg-7',
      crewId: 'crew-1',
      senderId: 'user-4',
      content: 'Celebrating this milestone! So grateful for this crew.',
      type: 'text',
      timestamp: new Date('2024-02-17T09:30:00'),
      readBy: ['user-1', 'user-3']
    },
    {
      id: 'msg-8',
      crewId: 'crew-1',
      senderId: 'user-1',
      content: 'Next check-in is scheduled for next week. Please complete the relationship health survey beforehand.',
      type: 'text',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      readBy: ['user-3', 'user-4']
    }
  ],
  'crew-2': [
    {
      id: 'msg-9',
      crewId: 'crew-2',
      senderId: 'user-2',
      content: 'Welcome Marcus! We are so glad you are interested in being our genetic provider.',
      type: 'text',
      timestamp: new Date('2024-01-10T11:00:00'),
      readBy: ['user-2', 'user-3']
    },
    {
      id: 'msg-10',
      crewId: 'crew-2',
      senderId: 'user-3',
      content: 'Thank you! I am honored. I want to make sure we are all aligned on expectations.',
      type: 'text',
      timestamp: new Date('2024-01-10T11:30:00'),
      readBy: ['user-2', 'user-3']
    },
    {
      id: 'msg-11',
      crewId: 'crew-2',
      senderId: 'user-2',
      content: 'Absolutely. We have been working with a family lawyer and can share the draft agreement soon.',
      type: 'text',
      timestamp: new Date('2024-01-10T12:00:00'),
      readBy: ['user-2', 'user-3']
    }
  ],
  'crew-3': []
}

export const getMessagesForCrew = (crewId: string) => mockMessages[crewId] || []
