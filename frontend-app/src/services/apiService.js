import apiClient from './apiClient'
import FilterContext from './filterStrategies'

class ApiServiceFactory {
  constructor() {
    this.filterContext = new FilterContext()
  }

  async getMatches(filters = {}) {
    try {
      const mockData = this.generateMockMatches()
      
      try {
        const data = await apiClient.get('/matches', filters)
        return this.filterContext.applyFilters(data, filters)
      } catch (error) {
        console.warn('Using mock data for matches:', error.message)
        return this.filterContext.applyFilters(mockData, filters)
      }
    } catch (error) {
      console.error('Error getting matches:', error)
      throw error
    }
  }

  async getTeams(filters = {}) {
    try {
      const mockData = this.generateMockTeams()
      
      try {
        const data = await apiClient.get('/teams', filters)
        return this.filterContext.applyFilters(data, filters)
      } catch (error) {
        console.warn('Using mock data for teams:', error.message)
        return this.filterContext.applyFilters(mockData, filters)
      }
    } catch (error) {
      console.error('Error getting teams:', error)
      throw error
    }
  }

  async getPlayers(filters = {}) {
    try {
      const mockData = this.generateMockPlayers()
      
      try {
        const data = await apiClient.get('/players', filters)
        return this.filterContext.applyFilters(data, filters)
      } catch (error) {
        console.warn('Using mock data for players:', error.message)
        return this.filterContext.applyFilters(mockData, filters)
      }
    } catch (error) {
      console.error('Error getting players:', error)
      throw error
    }
  }

  generateMockMatches() {
    return [
      {
        league: 'La Liga',
        date: '2025-11-28',
        homeTeam: 'FC Barcelona',
        awayTeam: 'Real Madrid',
        homeScore: 2,
        awayScore: 1,
        status: 'Finished',
        venue: 'Camp Nou',
        homeTeamLogo: '🔵',
        awayTeamLogo: '⚪'
      },
      {
        league: 'La Liga',
        date: '2025-11-29',
        homeTeam: 'Atlético Madrid',
        awayTeam: 'Sevilla FC',
        homeScore: 1,
        awayScore: 1,
        status: 'Finished',
        venue: 'Wanda Metropolitano',
        homeTeamLogo: '🔴',
        awayTeamLogo: '🟡'
      },
      {
        league: 'Premier League',
        date: '2025-11-30',
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        homeScore: null,
        awayScore: null,
        status: 'Scheduled',
        venue: 'Old Trafford',
        homeTeamLogo: '🔴',
        awayTeamLogo: '🔴'
      },
      {
        league: 'Premier League',
        date: '2025-12-01',
        homeTeam: 'Chelsea',
        awayTeam: 'Arsenal',
        homeScore: null,
        awayScore: null,
        status: 'Scheduled',
        venue: 'Stamford Bridge',
        homeTeamLogo: '🔵',
        awayTeamLogo: '🔴'
      },
      {
        league: 'Serie A',
        date: '2025-11-27',
        homeTeam: 'Juventus',
        awayTeam: 'Inter Milan',
        homeScore: 3,
        awayScore: 2,
        status: 'Finished',
        venue: 'Allianz Stadium',
        homeTeamLogo: '⚫',
        awayTeamLogo: '🔵'
      }
    ]
  }

  generateMockTeams() {
    return [
      {
        name: 'FC Barcelona',
        league: 'La Liga',
        country: 'España',
        founded: 1899,
        stadium: 'Camp Nou',
        coach: 'Xavi Hernández',
        logo: '🔵',
        stats: {
          wins: 15,
          draws: 3,
          losses: 2
        }
      },
      {
        name: 'Real Madrid',
        league: 'La Liga',
        country: 'España',
        founded: 1902,
        stadium: 'Santiago Bernabéu',
        coach: 'Carlo Ancelotti',
        logo: '⚪',
        stats: {
          wins: 16,
          draws: 2,
          losses: 2
        }
      },
      {
        name: 'Manchester United',
        league: 'Premier League',
        country: 'Inglaterra',
        founded: 1878,
        stadium: 'Old Trafford',
        coach: 'Erik ten Hag',
        logo: '🔴',
        stats: {
          wins: 12,
          draws: 4,
          losses: 4
        }
      },
      {
        name: 'Bayern Munich',
        league: 'Bundesliga',
        country: 'Alemania',
        founded: 1900,
        stadium: 'Allianz Arena',
        coach: 'Thomas Tuchel',
        logo: '🔴',
        stats: {
          wins: 18,
          draws: 1,
          losses: 1
        }
      }
    ]
  }

  generateMockPlayers() {
    return [
      {
        name: 'Lionel Messi',
        team: 'Inter Miami',
        position: 'Delantero',
        nationality: 'Argentina',
        age: 36,
        number: 10,
        avatar: '⭐',
        stats: {
          goals: 12,
          assists: 8,
          matches: 20
        }
      },
      {
        name: 'Cristiano Ronaldo',
        team: 'Al Nassr',
        position: 'Delantero',
        nationality: 'Portugal',
        age: 38,
        number: 7,
        avatar: '👑',
        stats: {
          goals: 15,
          assists: 3,
          matches: 18
        }
      },
      {
        name: 'Kylian Mbappé',
        team: 'Real Madrid',
        position: 'Delantero',
        nationality: 'Francia',
        age: 24,
        number: 9,
        avatar: '⚡',
        stats: {
          goals: 20,
          assists: 10,
          matches: 22
        }
      },
      {
        name: 'Erling Haaland',
        team: 'Manchester City',
        position: 'Delantero',
        nationality: 'Noruega',
        age: 23,
        number: 9,
        avatar: '🤖',
        stats: {
          goals: 25,
          assists: 5,
          matches: 20
        }
      },
      {
        name: 'Vinicius Jr',
        team: 'Real Madrid',
        position: 'Extremo',
        nationality: 'Brasil',
        age: 23,
        number: 20,
        avatar: '🇧🇷',
        stats: {
          goals: 14,
          assists: 12,
          matches: 21
        }
      }
    ]
  }
}

export const apiService = new ApiServiceFactory()
