import React, { useState } from 'react'
import './FilterPanel.css'
import { apiService } from '../services/apiService'

const FilterPanel = ({ onSearch, searchType, setSearchType, setResults, setLoading, setError }) => {
  const [filters, setFilters] = useState({
    league: '',
    team: '',
    player: '',
    dateFrom: '',
    dateTo: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearchTypeChange = (type) => {
    setSearchType(type)
    setFilters({
      league: '',
      team: '',
      player: '',
      dateFrom: '',
      dateTo: ''
    })
    setResults([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let results = []
      
      switch(searchType) {
        case 'matches':
          results = await apiService.getMatches(filters)
          break
        case 'teams':
          results = await apiService.getTeams(filters)
          break
        case 'players':
          results = await apiService.getPlayers(filters)
          break
        default:
          results = []
      }

      setResults(results)
    } catch (err) {
      setError(err.message || 'Error al realizar la búsqueda')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFilters({
      league: '',
      team: '',
      player: '',
      dateFrom: '',
      dateTo: ''
    })
    setResults([])
    setError(null)
  }

  return (
    <div className="filter-panel">
      <div className="search-type-selector">
        <button
          className={`type-btn ${searchType === 'matches' ? 'active' : ''}`}
          onClick={() => handleSearchTypeChange('matches')}
        >
          Partidos
        </button>
        <button
          className={`type-btn ${searchType === 'teams' ? 'active' : ''}`}
          onClick={() => handleSearchTypeChange('teams')}
        >
          Equipos
        </button>
        <button
          className={`type-btn ${searchType === 'players' ? 'active' : ''}`}
          onClick={() => handleSearchTypeChange('players')}
        >
          Jugadores
        </button>
      </div>

      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-grid">
          {searchType === 'matches' && (
            <>
              <div className="filter-field">
                <label htmlFor="league">Liga</label>
                <input
                  type="text"
                  id="league"
                  name="league"
                  value={filters.league}
                  onChange={handleInputChange}
                  placeholder="Ej: La Liga, Premier League"
                />
              </div>

              <div className="filter-field">
                <label htmlFor="team">Equipo</label>
                <input
                  type="text"
                  id="team"
                  name="team"
                  value={filters.team}
                  onChange={handleInputChange}
                  placeholder="Ej: Barcelona, Real Madrid"
                />
              </div>

              <div className="filter-field">
                <label htmlFor="dateFrom">Fecha desde</label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleInputChange}
                />
              </div>

              <div className="filter-field">
                <label htmlFor="dateTo">Fecha hasta</label>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          {searchType === 'teams' && (
            <>
              <div className="filter-field">
                <label htmlFor="team">Nombre del Equipo</label>
                <input
                  type="text"
                  id="team"
                  name="team"
                  value={filters.team}
                  onChange={handleInputChange}
                  placeholder="Ej: Barcelona, Real Madrid"
                />
              </div>

              <div className="filter-field">
                <label htmlFor="league">Liga</label>
                <input
                  type="text"
                  id="league"
                  name="league"
                  value={filters.league}
                  onChange={handleInputChange}
                  placeholder="Ej: La Liga, Premier League"
                />
              </div>
            </>
          )}

          {searchType === 'players' && (
            <>
              <div className="filter-field">
                <label htmlFor="player">Nombre del Jugador</label>
                <input
                  type="text"
                  id="player"
                  name="player"
                  value={filters.player}
                  onChange={handleInputChange}
                  placeholder="Ej: Messi, Cristiano"
                />
              </div>

              <div className="filter-field">
                <label htmlFor="team">Equipo</label>
                <input
                  type="text"
                  id="team"
                  name="team"
                  value={filters.team}
                  onChange={handleInputChange}
                  placeholder="Ej: Barcelona, Real Madrid"
                />
              </div>
            </>
          )}
        </div>

        <div className="filter-actions">
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Limpiar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FilterPanel
