import React from 'react'
import './TeamCard.css'

const TeamCard = ({ team }) => {
  return (
    <div className="team-card">
      <div className="team-card-header">
        <div className="team-card-logo">👕</div>
        <h3 className="team-card-name">{team.nombre || 'Nombre del Equipo'}</h3>
      </div>

      <div className="team-card-info">
        {team.liga && (
          <div className="info-row">
            <span className="info-label">Liga:</span>
            <span className="info-value">{team.liga}</span>
          </div>
        )}

        {team.pais && (
          <div className="info-row">
            <span className="info-label">País:</span>
            <span className="info-value">{team.pais}</span>
          </div>
        )}

        {team.fundado && (
          <div className="info-row">
            <span className="info-label">Fundado:</span>
            <span className="info-value">{team.fundado}</span>
          </div>
        )}

        {team.estadio && (
          <div className="info-row">
            <span className="info-label">Estadio:</span>
            <span className="info-value">{team.estadio}</span>
          </div>
        )}

        {team.entrenador && (
          <div className="info-row">
            <span className="info-label">Entrenador:</span>
            <span className="info-value">{team.entrenador}</span>
          </div>
        )}
      </div>

      <div className="team-card-stats">
        <div className="stat">
          <span className="stat-value">{team.victorias || 0}</span>
          <span className="stat-label">Victorias</span>
        </div>
        <div className="stat">
          <span className="stat-value">{team.empates || 0}</span>
          <span className="stat-label">Empates</span>
        </div>
        <div className="stat">
          <span className="stat-value">{team.derrotas || 0}</span>
          <span className="stat-label">Derrotas</span>
        </div>
      </div>
    </div>
  )
}

export default TeamCard
