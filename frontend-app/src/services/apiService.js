import apiClient from './apiClient'
import FilterContext from './filterStrategies'

class ApiServiceFactory {
  constructor() {
    this.filterContext = new FilterContext()
  }

  async getMatches(filters = {}) {
    let endpoint = '/partidos'
    
    if (filters.league) {
      endpoint = `/partidos/liga/${encodeURIComponent(filters.league)}`
    } else if (filters.team) {
      endpoint = `/partidos/equipo/${encodeURIComponent(filters.team)}`
    } else if (filters.dateFrom && filters.dateTo) {
      endpoint = `/partidos/fecha/${encodeURIComponent(filters.dateFrom)}/${encodeURIComponent(filters.dateTo)}`
    }
    
    const data = await apiClient.get(endpoint)
    return this.filterContext.applyFilters(data, filters)
  }

  async getTeams(filters = {}) {
    let endpoint = '/equipos'
    
    if (filters.team) {
      endpoint = `/equipos/nombre/${encodeURIComponent(filters.team)}`
    } else if (filters.league) {
      endpoint = `/equipos/liga/${encodeURIComponent(filters.league)}`
    }
    
    const data = await apiClient.get(endpoint)
    return this.filterContext.applyFilters(data, filters)
  }

  async getPlayers(filters = {}) {
    let endpoint = '/jugadores'
    
    if (filters.player) {
      endpoint = `/jugadores/nombre/${encodeURIComponent(filters.player)}`
    } else if (filters.team) {
      endpoint = `/jugadores/equipo/${encodeURIComponent(filters.team)}`
    }
    
    const data = await apiClient.get(endpoint)
    return this.filterContext.applyFilters(data, filters)
  }
}

export const apiService = new ApiServiceFactory()
