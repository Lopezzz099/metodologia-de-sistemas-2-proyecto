import React from 'react'
import './PlayerCard.css'

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <div className="player-card-header">
        <div className="player-avatar">{player.avatar || '⚽'}</div>
        <div className="player-basic-info">
          <h3 className="player-name">{player.name || 'Nombre del Jugador'}</h3>
          {player.position && (
            <span className="player-position">{player.position}</span>
          )}
        </div>
      </div>

      <div className="player-card-info">
        {player.team && (
          <div className="info-row">
            <span className="info-label">Equipo:</span>
            <span className="info-value">{player.team}</span>
          </div>
        )}

        {player.nationality && (
          <div className="info-row">
            <span className="info-label">Nacionalidad:</span>
            <span className="info-value">{player.nationality}</span>
          </div>
        )}

        {player.age && (
          <div className="info-row">
            <span className="info-label">Edad:</span>
            <span className="info-value">{player.age} años</span>
          </div>
        )}

        {player.number && (
          <div className="info-row">
            <span className="info-label">Número:</span>
            <span className="info-value">#{player.number}</span>
          </div>
        )}
      </div>

      {player.stats && (
        <div className="player-stats">
          {player.stats.goals !== undefined && (
            <div className="stat">
              <span className="stat-value">{player.stats.goals}</span>
              <span className="stat-label">Goles</span>
            </div>
          )}
          {player.stats.assists !== undefined && (
            <div className="stat">
              <span className="stat-value">{player.stats.assists}</span>
              <span className="stat-label">Asistencias</span>
            </div>
          )}
          {player.stats.matches !== undefined && (
            <div className="stat">
              <span className="stat-value">{player.stats.matches}</span>
              <span className="stat-label">Partidos</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PlayerCard
