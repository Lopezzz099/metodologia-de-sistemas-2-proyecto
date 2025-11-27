import React from 'react'
import './MatchCard.css'

const MatchCard = ({ match }) => {
  return (
    <div className="match-card">
      <div className="match-header">
        <span className="match-league">{match.league || 'Liga'}</span>
        <span className="match-date">{match.date || 'Fecha'}</span>
      </div>

      <div className="match-teams">
        <div className="team home">
          <div className="team-logo">{match.homeTeamLogo || '🏠'}</div>
          <span className="team-name">{match.homeTeam || 'Equipo Local'}</span>
          <span className="team-score">{match.homeScore !== undefined ? match.homeScore : '-'}</span>
        </div>

        <div className="match-vs">VS</div>

        <div className="team away">
          <div className="team-logo">{match.awayTeamLogo || '✈️'}</div>
          <span className="team-name">{match.awayTeam || 'Equipo Visitante'}</span>
          <span className="team-score">{match.awayScore !== undefined ? match.awayScore : '-'}</span>
        </div>
      </div>

      {match.status && (
        <div className="match-status">
          <span className={`status-badge ${match.status.toLowerCase()}`}>
            {match.status}
          </span>
        </div>
      )}

      {match.venue && (
        <div className="match-venue">
          📍 {match.venue}
        </div>
      )}
    </div>
  )
}

export default MatchCard
