import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PlayerCard from '../components/PlayerCard'

describe('PlayerCard', () => {
  it('renderiza el nombre del jugador correctamente', () => {
    const player = { nombre: 'Lionel Messi' }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('Lionel Messi')).toBeInTheDocument()
  })

  it('muestra nombre por defecto cuando no hay nombre', () => {
    const player = {}
    render(<PlayerCard player={player} />)
    expect(screen.getByText('Nombre del Jugador')).toBeInTheDocument()
  })

  it('renderiza la posición cuando está presente', () => {
    const player = { nombre: 'Cristiano Ronaldo', posicion: 'Delantero' }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('Delantero')).toBeInTheDocument()
  })

  it('renderiza el equipo cuando está presente', () => {
    const player = { nombre: 'Neymar', equipo: 'Al Hilal' }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('Al Hilal')).toBeInTheDocument()
  })

  it('renderiza la nacionalidad cuando está presente', () => {
    const player = { nombre: 'Kylian Mbappé', nacionalidad: 'Francia' }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('Francia')).toBeInTheDocument()
  })

  it('renderiza la edad cuando está presente', () => {
    const player = { nombre: 'Erling Haaland', edad: 23 }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('23 años')).toBeInTheDocument()
  })

  it('renderiza el número de camiseta cuando está presente', () => {
    const player = { nombre: 'Kevin De Bruyne', numero_camiseta: 17 }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('#17')).toBeInTheDocument()
  })

  it('renderiza estadísticas de goles cuando están presentes', () => {
    const player = { nombre: 'Robert Lewandowski', goles: 25 }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('Goles')).toBeInTheDocument()
  })

  it('renderiza estadísticas de asistencias cuando están presentes', () => {
    const player = { nombre: 'Luka Modrić', asistencias: 10 }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Asistencias')).toBeInTheDocument()
  })

  it('renderiza estadísticas de partidos cuando están presentes', () => {
    const player = { nombre: 'Sergio Ramos', partidos: 30 }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Partidos')).toBeInTheDocument()
  })

  it('renderiza todos los datos de un jugador completo', () => {
    const player = {
      nombre: 'Mohamed Salah',
      posicion: 'Extremo',
      equipo: 'Liverpool',
      nacionalidad: 'Egipto',
      edad: 31,
      numero_camiseta: 11,
      goles: 18,
      asistencias: 12,
      partidos: 28
    }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('Mohamed Salah')).toBeInTheDocument()
    expect(screen.getByText('Extremo')).toBeInTheDocument()
    expect(screen.getByText('Liverpool')).toBeInTheDocument()
    expect(screen.getByText('Egipto')).toBeInTheDocument()
    expect(screen.getByText('31 años')).toBeInTheDocument()
    expect(screen.getByText('#11')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('28')).toBeInTheDocument()
  })

  it('no muestra estadísticas si no están definidas', () => {
    const player = { nombre: 'Virgil van Dijk' }
    render(<PlayerCard player={player} />)
    expect(screen.queryByText('Goles')).not.toBeInTheDocument()
    expect(screen.queryByText('Asistencias')).not.toBeInTheDocument()
    expect(screen.queryByText('Partidos')).not.toBeInTheDocument()
  })

  it('renderiza correctamente con goles en cero', () => {
    const player = { nombre: 'Marc-André ter Stegen', goles: 0 }
    render(<PlayerCard player={player} />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Goles')).toBeInTheDocument()
  })
})
