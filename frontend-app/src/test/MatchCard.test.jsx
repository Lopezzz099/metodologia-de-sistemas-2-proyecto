import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MatchCard from '../components/MatchCard'

describe('MatchCard', () => {
  it('renderiza los nombres de los equipos', () => {
    const match = {
      equipo1: 'Real Madrid',
      equipo2: 'Barcelona'
    }
    render(<MatchCard match={match} />)
    expect(screen.getByText('Real Madrid')).toBeInTheDocument()
    expect(screen.getByText('Barcelona')).toBeInTheDocument()
  })

  it('muestra nombres por defecto cuando no hay equipos', () => {
    const match = {}
    render(<MatchCard match={match} />)
    expect(screen.getByText('Equipo Local')).toBeInTheDocument()
    expect(screen.getByText('Equipo Visitante')).toBeInTheDocument()
  })

  it('renderiza la liga cuando está presente', () => {
    const match = { equipo1: 'Liverpool', equipo2: 'Chelsea', liga: 'Premier League' }
    render(<MatchCard match={match} />)
    expect(screen.getByText('Premier League')).toBeInTheDocument()
  })

  it('muestra "Liga" por defecto cuando no hay liga', () => {
    const match = {}
    render(<MatchCard match={match} />)
    expect(screen.getByText('Liga')).toBeInTheDocument()
  })

  it('formatea y muestra la fecha correctamente', () => {
    const match = {
      equipo1: 'Bayern Munich',
      equipo2: 'Borussia Dortmund',
      fecha: '2025-11-28'
    }
    render(<MatchCard match={match} />)
    expect(screen.getByText(/27 de noviembre de 2025/i)).toBeInTheDocument()
  })

  it('muestra "Fecha" cuando no hay fecha', () => {
    const match = {}
    render(<MatchCard match={match} />)
    expect(screen.getByText('Fecha')).toBeInTheDocument()
  })

  it('renderiza los resultados cuando están presentes', () => {
    const match = {
      equipo1: 'Manchester City',
      equipo2: 'Arsenal',
      res_equipo1: 3,
      res_equipo2: 1
    }
    render(<MatchCard match={match} />)
    expect(screen.getAllByText('3')).toHaveLength(1)
    expect(screen.getAllByText('1')).toHaveLength(1)
  })

  it('muestra guiones cuando no hay resultados', () => {
    const match = {
      equipo1: 'Juventus',
      equipo2: 'Inter Milan'
    }
    render(<MatchCard match={match} />)
    expect(screen.getAllByText('-')).toHaveLength(2)
  })

  it('renderiza resultado cero correctamente', () => {
    const match = {
      equipo1: 'Atlético Madrid',
      equipo2: 'Sevilla',
      res_equipo1: 0,
      res_equipo2: 0
    }
    render(<MatchCard match={match} />)
    expect(screen.getAllByText('0')).toHaveLength(2)
  })

  it('muestra estado "Finalizado" cuando el partido fue jugado', () => {
    const match = {
      equipo1: 'PSG',
      equipo2: 'Lyon',
      jugado: true
    }
    render(<MatchCard match={match} />)
    expect(screen.getByText('Finalizado')).toBeInTheDocument()
  })

  it('muestra estado "Programado" cuando el partido no fue jugado', () => {
    const match = {
      equipo1: 'Milan',
      equipo2: 'Napoli',
      jugado: false
    }
    render(<MatchCard match={match} />)
    expect(screen.getByText('Programado')).toBeInTheDocument()
  })

  it('renderiza el estadio cuando está presente', () => {
    const match = {
      equipo1: 'Real Madrid',
      equipo2: 'Atlético Madrid',
      estadio: 'Santiago Bernabéu'
    }
    render(<MatchCard match={match} />)
    expect(screen.getByText(/Santiago Bernabéu/)).toBeInTheDocument()
  })

  it('no muestra el estadio cuando no está presente', () => {
    const match = {
      equipo1: 'Valencia',
      equipo2: 'Villarreal'
    }
    render(<MatchCard match={match} />)
    expect(screen.queryByText(/📍/)).not.toBeInTheDocument()
  })

  it('renderiza un partido completo con todos los datos', () => {
    const match = {
      equipo1: 'Manchester United',
      equipo2: 'Liverpool',
      res_equipo1: 2,
      res_equipo2: 3,
      liga: 'Premier League',
      fecha: '2025-11-28',
      estadio: 'Old Trafford',
      jugado: true
    }
    render(<MatchCard match={match} />)
    expect(screen.getByText('Manchester United')).toBeInTheDocument()
    expect(screen.getByText('Liverpool')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Premier League')).toBeInTheDocument()
    expect(screen.getByText(/27 de noviembre de 2025/i)).toBeInTheDocument()
    expect(screen.getByText(/Old Trafford/)).toBeInTheDocument()
    expect(screen.getByText('Finalizado')).toBeInTheDocument()
  })
})
