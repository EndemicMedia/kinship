// Mock accountability incidents for Kinship app

export const mockIncidents = {
  'crew-1': [
    {
      id: 'inc-1',
      crewId: 'crew-1',
      reportedBy: 'user-4',
      severity: 2,
      description: 'Child had difficulty with bedtime routine three nights this week. Showing signs of resistance and tantrums.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: 'resolved',
      actions: [
        'Primary parent implemented consistent bedtime routine',
        'Care provider adjusted evening activities to be calmer',
        'All crew members using same sleep cues'
      ],
      involvedParties: ['user-1', 'user-4']
    },
    {
      id: 'inc-2',
      crewId: 'crew-1',
      reportedBy: 'user-1',
      severity: 1,
      description: 'Minor disagreement about screen time limits during my parenting time.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'addressed',
      actions: [
        'Crew discussed at weekly check-in',
        'Agreed on consistent 1-hour daily limit',
        'Documented in shared notes'
      ],
      involvedParties: ['user-1', 'user-3']
    }
  ],
  'crew-2': [],
  'crew-3': []
}

export const getIncidentsForCrew = (crewId: string) => mockIncidents[crewId] || []

export const severityLabels = {
  1: 'Minor - Primary Parent Addresses',
  2: 'Pattern - Full Crew Discussion',
  3: 'Serious - Crew + Professional Help',
  4: 'Critical - Immediate Mobilization',
  5: 'Legal - Court Coordination'
}

export const severityColors = {
  1: 'bg-emerald-100 text-emerald-800',
  2: 'bg-teal-100 text-teal-800',
  3: 'bg-amber-100 text-amber-800',
  4: 'bg-orange-100 text-orange-800',
  5: 'bg-rose-100 text-rose-800'
}
