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
      <p>This agreement outlines the shared parenting responsibilities between the parties, prioritizing the best interests of the child.</p>
      
      <h3>1. Parenting Time Schedule</h3>
      <p><strong>Primary Residence:</strong> The child shall primarily reside with the Primary Parent (Alex Rivera).</p>
      <p><strong>Visitation Schedule:</strong> The Co-Parent shall have parenting time every other weekend from Friday at 6:00 PM to Sunday at 6:00 PM.</p>
      <p><strong>Holidays:</strong> Major holidays shall be alternated annually. The child effectively spends Mother's Day with the mother and Father's Day with the father.</p>

      <h3>2. Decision Making Authority</h3>
      <p><strong>Medical Decisions:</strong> Both parents shall share joint legal, major decision-making authority regarding the child's non-emergency health care.</p>
      <p><strong>Education:</strong> Both parents agree to mutually decide on the child's enrollment in public or private schooling.</p>

      <h3>3. Financial Responsibilities</h3>
      <p>Each parent shall contribute to the support of the child in accordance with the state child support guidelines. Extraordinary medical expenses shall be shared 50/50.</p>

      <h3>4. Communication Protocols</h3>
      <p>Parents agree to communicate primarily via the Kinship app for all non-emergency matters to maintain a record of agreements.</p>
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
      <p>This agreement defines the role and involvement of the genetic provider, distinguishing biological contribution from legal parentage.</p>

      <h3>1. Genetic Material Provisions</h3>
      <p>The Genetic Provider (Donor) agrees to provide genetic material for the purpose of conception via artificial insemination. The Donor waives all claims to legal parentage.</p>

      <h3>2. Involvement Level</h3>
      <p><strong>Role:</strong> The Donor shall be known to the child as "Uncle [Name]" and shall have the status of extended family/kin.</p>
      <p><strong>Visitation:</strong> The Donor is invited to attend major family gatherings (birthdays, holidays) at the discretion of the Legal Parents.</p>

      <h3>3. Legal Parental Rights</h3>
      <p>The Donor acknowledges they have no legal rights or responsibilities for the child, including custody or financial support.</p>

      <h3>4. Contact Agreements</h3>
      <p>The child may contact the Donor directly upon reaching the age of 16. Prior to that, all communication shall be facilitated by the Legal Parents.</p>
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
      <p>This agreement outlines childcare responsibilities and schedules, ensuring consistent care for the child.</p>

      <h3>1. Care Schedule</h3>
      <p><strong>Regular Hours:</strong> The Care Provider shall provide care Monday through Friday from 8:00 AM to 5:00 PM.</p>
      <p><strong>Overtime:</strong> Any hours worked beyond the agreed schedule shall be compensated at 1.5x the hourly rate.</p>

      <h3>2. Emergency Protocols</h3>
      <p>In case of medical emergency, the Care Provider contacts 911 immediately, then the Parents. The Parents authorize emergency medical treatment.</p>

      <h3>3. Authority Limits</h3>
      <p>The Care Provider may authorize minor educational or recreational activities but must seek Parent approval for any out-of-state travel or medical procedures.</p>

      <h3>4. Compensation</h3>
      <p><strong>Payment:</strong> Services shall be compensated at a rate of $25/hour, paid bi-weekly.</p>
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
      <p>This agreement defines financial and material support commitments to the family unit.</p>

      <h3>1. Financial Contributions</h3>
      <p><strong>Support:</strong> The Resource Provider agrees to contribute $1,500 monthly towards household expenses, payable on the 1st of each month.</p>

      <h3>2. Major Expense Sharing</h3>
      <p><strong>Education Fund:</strong> The Provider will contribute 5% of annual income to a 529 College Savings Plan for the child.</p>

      <h3>3. Inheritance and Future Planning</h3>
      <p>The Resource Provider agrees to name the child as a beneficiary in their life insurance policy (25% share).</p>

      <h3>4. Review Schedule</h3>
      <p>Financial commitments shall be reviewed annually on January 15th to adjust for inflation or income changes.</p>
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
      <p>This protocol outlines the process for a member exiting the crew, minimizing disruption to the family unit.</p>

      <h3>1. Notice Requirements</h3>
      <p><strong>Standard Notice:</strong> A member must provide at least 60 days' written notice before exiting the crew to allow for transition planning.</p>
      
      <h3>2. Transition Period</h3>
      <p>During the notice period, the exiting member agrees to facilitate a smooth handover of responsibilities and assets.</p>

      <h3>3. Child's Best Interest</h3>
      <p>The crew agrees to prioritize the child's emotional stability, maintaining consistent routines during the transition.</p>

      <h3>4. Ongoing Obligations</h3>
      <p>Any financial debts to the crew must be settled prior to departure. Confidentiality regarding family privacy remains in perpetuity.</p>
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
      <p>This document records the shared values and parenting philosophy to ensure a cohesive child-rearing environment.</p>

      <h3>1. Parenting Philosophy</h3>
      <p><strong>Approach:</strong> We commit to Gentle Parenting principles, focusing on connection before correction and avoiding physical discipline.</p>

      <h3>2. Educational Goals</h3>
      <p>We prioritize holistic education, combining public schooling with strong extra-curricular enrichment in arts and nature.</p>

      <h3>3. Religious/Spiritual Considerations</h3>
      <p>The child will be raised with an appreciation for diverse spiritual traditions without forced dogmatic adherence.</p>

      <h3>4. Cultural Practices</h3>
      <p>We actively celebrate dual heritage, incorporating language, food, and festivals from both Latino and Jewish traditions.</p>

      <h3>5. Conflict Resolution</h3>
      <p>Adult conflicts will be resolved through non-violent communication and, if necessary, mediated by a third-party counselor.</p>
    `,
    signers: [],
    createdAt: new Date('2024-01-01')
  }
]

export const getDocumentTemplates = () => mockDocuments
export const getTemplateById = (id: string) => mockDocuments.find(d => d.id === id)
