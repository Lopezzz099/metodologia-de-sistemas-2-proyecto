class FilterStrategy {
  apply(data, filters) {
    throw new Error('Este método debe ser implementado por las subclases')
  }
}

class LeagueFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.league) return data
    return data.filter(item => 
      item.liga?.toLowerCase().includes(filters.league.toLowerCase())
    )
  }
}

class TeamFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.team) return data
    const teamLower = filters.team.toLowerCase()
    return data.filter(item => {
      const equipo1 = item.equipo1?.toLowerCase() || ''
      const equipo2 = item.equipo2?.toLowerCase() || ''
      const equipo = item.equipo?.toLowerCase() || ''
      const nombre = item.nombre?.toLowerCase() || ''
      
      return equipo1.includes(teamLower) || 
             equipo2.includes(teamLower) || 
             equipo.includes(teamLower) ||
             nombre.includes(teamLower)
    })
  }
}

class PlayerFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.player) return data
    return data.filter(item => 
      item.nombre?.toLowerCase().includes(filters.player.toLowerCase())
    )
  }
}

class DateFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.dateFrom && !filters.dateTo) return data
    
    return data.filter(item => {
      if (!item.fecha) return true
      
      const itemDate = new Date(item.fecha)
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null
      
      if (fromDate && itemDate < fromDate) return false
      if (toDate && itemDate > toDate) return false
      
      return true
    })
  }
}

class FilterContext {
  constructor() {
    this.strategies = [
      new LeagueFilterStrategy(),
      new TeamFilterStrategy(),
      new PlayerFilterStrategy(),
      new DateFilterStrategy()
    ]
  }

  applyFilters(data, filters) {
    let filteredData = data
    
    for (const strategy of this.strategies) {
      filteredData = strategy.apply(filteredData, filters)
    }
    
    return filteredData
  }
}

export default FilterContext
export {
  LeagueFilterStrategy,
  TeamFilterStrategy,
  PlayerFilterStrategy,
  DateFilterStrategy
}
