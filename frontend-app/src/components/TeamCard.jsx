import React from 'react'
import './TeamCard.css'

const TeamCard = ({ team }) => {
  return (
    <div className="team-card">
      <div className="team-card-header">
        <div className="team-card-logo">{team.logo || '👕'}</div>
        <h3 className="team-card-name">{team.name || 'Nombre del Equipo'}</h3>
      </div>

      <div className="team-card-info">
        {team.league && (
          <div className="info-row">
            <span className="info-label">Liga:</span>
            <span className="info-value">{team.league}</span>
          </div>
        )}

        {team.country && (
          <div className="info-row">
            <span className="info-label">País:</span>
            <span className="info-value">{team.country}</span>
          </div>
        )}

        {team.founded && (
          <div className="info-row">
            <span className="info-label">Fundado:</span>
            <span className="info-value">{team.founded}</span>
          </div>
        )}

        {team.stadium && (
          <div className="info-row">
            <span className="info-label">Estadio:</span>
            <span className="info-value">{team.stadium}</span>
          </div>
        )}

        {team.coach && (
          <div className="info-row">
            <span className="info-label">Entrenador:</span>
            <span className="info-value">{team.coach}</span>
          </div>
        )}
      </div>

      {team.stats && (
        <div className="team-card-stats">
          <div className="stat">
            <span className="stat-value">{team.stats.wins || 0}</span>
            <span className="stat-label">Victorias</span>
          </div>
          <div className="stat">
            <span className="stat-value">{team.stats.draws || 0}</span>
            <span className="stat-label">Empates</span>
          </div>
          <div className="stat">
            <span className="stat-value">{team.stats.losses || 0}</span>
            <span className="stat-label">Derrotas</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamCard
