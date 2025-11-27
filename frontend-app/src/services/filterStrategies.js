class FilterStrategy {
  apply(data, filters) {
    throw new Error('Este método debe ser implementado por las subclases')
  }
}

class LeagueFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.league) return data
    return data.filter(item => 
      item.league?.toLowerCase().includes(filters.league.toLowerCase())
    )
  }
}

class TeamFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.team) return data
    const teamLower = filters.team.toLowerCase()
    return data.filter(item => {
      const homeTeam = item.homeTeam?.toLowerCase() || ''
      const awayTeam = item.awayTeam?.toLowerCase() || ''
      const team = item.team?.toLowerCase() || ''
      const name = item.name?.toLowerCase() || ''
      
      return homeTeam.includes(teamLower) || 
             awayTeam.includes(teamLower) || 
             team.includes(teamLower) ||
             name.includes(teamLower)
    })
  }
}

class PlayerFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.player) return data
    return data.filter(item => 
      item.name?.toLowerCase().includes(filters.player.toLowerCase())
    )
  }
}

class DateFilterStrategy extends FilterStrategy {
  apply(data, filters) {
    if (!filters.dateFrom && !filters.dateTo) return data
    
    return data.filter(item => {
      if (!item.date) return true
      
      const itemDate = new Date(item.date)
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
