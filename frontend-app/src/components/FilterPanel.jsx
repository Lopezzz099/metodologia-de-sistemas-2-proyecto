import React, { useState, useEffect, useRef } from 'react'
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

  const debounceTimer = useRef(null)

  const performSearch = async (currentFilters, forceSearch = false) => {
    const hasActiveFilter = currentFilters.league || 
                           currentFilters.team || 
                           currentFilters.player || 
                           (currentFilters.dateFrom && currentFilters.dateTo)
    
    if (!hasActiveFilter && !forceSearch) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      let results = []
      
      switch(searchType) {
        case 'matches':
          results = await apiService.getMatches(currentFilters)
          break
        case 'teams':
          results = await apiService.getTeams(currentFilters)
          break
        case 'players':
          results = await apiService.getPlayers(currentFilters)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newFilters = {
      ...filters,
      [name]: value
    }
    setFilters(newFilters)

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(newFilters)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  const getInputsState = () => {
    if (searchType === 'matches') {
      if (filters.dateFrom || filters.dateTo) {
        return {
          league: false,
          team: false,
          dateFrom: true,
          dateTo: true
        }
      }
      if (filters.league) {
        return {
          league: true,
          team: false,
          dateFrom: false,
          dateTo: false
        }
      }
      if (filters.team) {
        return {
          league: false,
          team: true,
          dateFrom: false,
          dateTo: false
        }
      }
      return {
        league: true,
        team: true,
        dateFrom: true,
        dateTo: true
      }
    }
    if (searchType === 'teams') {
      if (filters.team) {
        return { team: true, league: false }
      }
      if (filters.league) {
        return { team: false, league: true }
      }
      return { team: true, league: true }
    }
    if (searchType === 'players') {
      if (filters.player) {
        return { player: true, team: false }
      }
      if (filters.team) {
        return { player: false, team: true }
      }
      return { player: true, team: true }
    }

    return {}
  }

  const inputsState = getInputsState()

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
    performSearch(filters, true)
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
                  disabled={!inputsState.league}
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
                  disabled={!inputsState.team}
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
                  disabled={!inputsState.dateFrom}
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
                  disabled={!inputsState.dateTo}
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
                  disabled={!inputsState.team}
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
                  disabled={!inputsState.league}
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
                  disabled={!inputsState.player}
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
                  disabled={!inputsState.team}
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
