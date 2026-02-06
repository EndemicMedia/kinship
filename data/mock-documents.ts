// Mock legal document templates for Kinship app

export const mockDocuments = [
  {
    id: 'template-1',
    crewId: '',
    title: 'Co-Parenting Agreement Template',
    type: 'co-parenting',
    status: 'draft',
    content: `
      <h2>Co-Parenting Agreement</h2>
      <p>This agreement outlines the shared parenting responsibilities between the parties...</p>
      <h3>1. Parenting Time Schedule</h3>
      <p>[Details about custody schedule]</p>
      <h3>2. Decision Making Authority</h3>
      <p>[Major decision processes]</p>
      <h3>3. Financial Responsibilities</h3>
      <p>[Child support and expense sharing]</p>
      <h3>4. Communication Protocols</h3>
      <p>[How parents will communicate]</p>
    `,
    signers: [],
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'template-2',
    crewId: '',
    title: 'Genetic Provider Agreement Template',
    type: 'genetic-provider',
    status: 'draft',
    content: `
      <h2>Genetic Provider Agreement</h2>
      <p>This agreement defines the role and involvement of the genetic provider...</p>
      <h3>1. Genetic Material Provisions</h3>
      <p>[Details about genetic contribution]</p>
      <h3>2. Involvement Level</h3>
      <p>[Defined role in child\'s life]</p>
      <h3>3. Legal Parental Rights</h3>
      <p>[Legal status clarification]</p>
      <h3>4. Contact Agreements</h3>
      <p>[Scheduled visits and communication]</p>
    `,
    signers: [],
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'template-3',
    crewId: '',
    title: 'Care Provider Agreement Template',
    type: 'care-provider',
    status: 'draft',
    content: `
      <h2>Care Provider Agreement</h2>
      <p>This agreement outlines childcare responsibilities and schedules...</p>
      <h3>1. Care Schedule</h3>
      <p>[Regular childcare hours]</p>
      <h3>2. Emergency Protocols</h3>
      <p>[Emergency contact and procedures]</p>
      <h3>3. Authority Limits</h3>
      <p>[What decisions care provider can make]</p>
      <h3>4. Compensation (if applicable)</h3>
      <p>[Payment or barter arrangements]</p>
    `,
    signers: [],
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'template-4',
    crewId: '',
    title: 'Resource Provider Agreement Template',
    type: 'resource-provider',
    status: 'draft',
    content: `
      <h2>Resource Provider Agreement</h2>
      <p>This agreement defines financial and material support commitments...</p>
      <h3>1. Financial Contributions</h3>
      <p>[Monthly/annual support amounts]</p>
      <h3>2. Major Expense Sharing</h3>
      <p>[Medical, education, etc.]</p>
      <h3>3. Inheritance and Future Planning</h3>
      <p>[Long-term financial considerations]</p>
      <h3>4. Review Schedule</h3>
      <p>[When agreements will be reviewed]</p>
    `,
    signers: [],
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'template-5',
    crewId: '',
    title: 'Exit Protocol Template',
    type: 'exit',
    status: 'draft',
    content: `
      <h2>Crew Exit Protocol</h2>
      <p>This protocol outlines the process for a member exiting the crew...</p>
      <h3>1. Notice Requirements</h3>
      <p>[How much notice must be given]</p>
      <h3>2. Transition Period</h3>
      <p>[Handover and adjustment time]</p>
      <h3>3. Child\'s Best Interest</h3>
      <p>[Ensuring continuity of care]</p>
      <h3>4. Ongoing Obligations</h3>
      <p>[What responsibilities continue after exit]</p>
    `,
    signers: [],
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'template-6',
    crewId: '',
    title: 'Values Alignment Statement',
    type: 'values',
    status: 'draft',
    content: `
      <h2>Values Alignment Statement</h2>
      <p>This document records the shared values and parenting philosophy...</p>
      <h3>1. Parenting Philosophy</h3>
      <p>[Attachment, gentle parenting, etc.]</p>
      <h3>2. Educational Goals</h3>
      <p>[Public, private, homeschool, etc.]</p>
      <h3>3. Religious/Spiritual Considerations</h3>
      <p>[How faith will be handled]</p>
      <h3>4. Cultural Practices</h3>
      <p>[Traditions and celebrations]</p>
      <h3>5. Conflict Resolution</h3>
      <p>[How disagreements will be handled]</p>
    `,
    signers: [],
    createdAt: new Date('2024-01-01')
  }
]

export const getDocumentTemplates = () => mockDocuments
export const getTemplateById = (id: string) => mockDocuments.find(d => d.id === id)
