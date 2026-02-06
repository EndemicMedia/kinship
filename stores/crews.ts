import { defineStore } from 'pinia'
import type { Crew } from '~/types/app'
import { mockCrews } from '~/data/mock-crews'

interface CrewsState {
  crews: Crew[]
  activeCrewId: string | null
  loading: boolean
}

export const useCrewsStore = defineStore('crews', {
  state: (): CrewsState => ({
    crews: [...mockCrews],
    activeCrewId: null,
    loading: false
  }),

  getters: {
    userCrews: (state) => (userId: string) => {
      return state.crews.filter(crew => 
        crew.members.some(member => member.userId === userId)
      )
    },

    getCrewById: (state) => (id: string) => {
      return state.crews.find(crew => crew.id === id)
    }
  },

  actions: {
    setActiveCrew(crewId: string): void {
      this.activeCrewId = crewId
    }
  }
})
