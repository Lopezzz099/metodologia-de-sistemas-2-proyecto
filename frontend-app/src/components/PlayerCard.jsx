import React from 'react'
import './PlayerCard.css'

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <div className="player-card-header">
        <div className="player-avatar">⚽</div>
        <div className="player-basic-info">
          <h3 className="player-name">{player.nombre || 'Nombre del Jugador'}</h3>
          {player.posicion && (
            <span className="player-position">{player.posicion}</span>
          )}
        </div>
      </div>

      <div className="player-card-info">
        {player.equipo && (
          <div className="info-row">
            <span className="info-label">Equipo:</span>
            <span className="info-value">{player.equipo}</span>
          </div>
        )}

        {player.nacionalidad && (
          <div className="info-row">
            <span className="info-label">Nacionalidad:</span>
            <span className="info-value">{player.nacionalidad}</span>
          </div>
        )}

        {player.edad && (
          <div className="info-row">
            <span className="info-label">Edad:</span>
            <span className="info-value">{player.edad} años</span>
          </div>
        )}

        {player.numero_camiseta && (
          <div className="info-row">
            <span className="info-label">Número:</span>
            <span className="info-value">#{player.numero_camiseta}</span>
          </div>
        )}
      </div>

      <div className="player-stats">
        {player.goles !== undefined && (
          <div className="stat">
            <span className="stat-value">{player.goles}</span>
            <span className="stat-label">Goles</span>
          </div>
        )}
        {player.asistencias !== undefined && (
          <div className="stat">
            <span className="stat-value">{player.asistencias}</span>
            <span className="stat-label">Asistencias</span>
          </div>
        )}
        {player.partidos !== undefined && (
          <div className="stat">
            <span className="stat-value">{player.partidos}</span>
            <span className="stat-label">Partidos</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerCard
