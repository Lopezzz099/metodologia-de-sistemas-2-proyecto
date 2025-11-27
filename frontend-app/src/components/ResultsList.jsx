import React from 'react'
import MatchCard from './MatchCard'
import TeamCard from './TeamCard'
import PlayerCard from './PlayerCard'
import './ResultsList.css'

const ResultsList = ({ results, searchType }) => {
  if (!results || results.length === 0) {
    return (
      <div className="results-list empty">
        <div className="empty-state">
          <div className="empty-icon">—</div>
          <h2>No hay resultados</h2>
          <p>Utiliza los filtros de arriba para buscar partidos, equipos o jugadores</p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-list">
      <div className="results-header">
        <h2>
          {searchType === 'matches' && 'Partidos'}
          {searchType === 'teams' && 'Equipos'}
          {searchType === 'players' && 'Jugadores'}
        </h2>
        <span className="results-count">{results.length} resultado(s)</span>
      </div>

      <div className="results-grid">
        {searchType === 'matches' && results.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
        
        {searchType === 'teams' && results.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
        
        {searchType === 'players' && results.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
    </div>
  )
}

export default ResultsList
