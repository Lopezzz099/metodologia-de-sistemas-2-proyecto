import React from 'react'
import './MatchCard.css'

const MatchCard = ({ match }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="match-card">
      <div className="match-header">
        <span className="match-league">{match.liga || 'Liga'}</span>
        <span className="match-date">{formatDate(match.fecha)}</span>
      </div>

      <div className="match-teams">
        <div className="team home">
          <div className="team-logo">🏠</div>
          <span className="team-name">{match.equipo1 || 'Equipo Local'}</span>
          <span className="team-score">{match.res_equipo1 !== undefined && match.res_equipo1 !== null ? match.res_equipo1 : '-'}</span>
        </div>

        <div className="match-vs">VS</div>

        <div className="team away">
          <div className="team-logo">✈️</div>
          <span className="team-name">{match.equipo2 || 'Equipo Visitante'}</span>
          <span className="team-score">{match.res_equipo2 !== undefined && match.res_equipo2 !== null ? match.res_equipo2 : '-'}</span>
        </div>
      </div>

      <div className="match-status">
        <span className={`status-badge ${match.jugado ? 'finished' : 'scheduled'}`}>
          {match.jugado ? 'Finalizado' : 'Programado'}
        </span>
      </div>

      {match.estadio && (
        <div className="match-venue">
          📍 {match.estadio}
        </div>
      )}
    </div>
  )
}

export default MatchCard
