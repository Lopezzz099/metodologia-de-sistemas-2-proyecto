import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TeamCard from '../components/TeamCard'

describe('TeamCard', () => {
  it('renderiza el nombre del equipo correctamente', () => {
    const team = { nombre: 'Real Madrid' }
    render(<TeamCard team={team} />)
    expect(screen.getByText('Real Madrid')).toBeInTheDocument()
  })

  it('muestra nombre por defecto cuando no hay nombre', () => {
    const team = {}
    render(<TeamCard team={team} />)
    expect(screen.getByText('Nombre del Equipo')).toBeInTheDocument()
  })

  it('renderiza la liga cuando está presente', () => {
    const team = { nombre: 'Barcelona', liga: 'La Liga' }
    render(<TeamCard team={team} />)
    expect(screen.getByText('La Liga')).toBeInTheDocument()
  })

  it('renderiza el país cuando está presente', () => {
    const team = { nombre: 'Manchester United', pais: 'Inglaterra' }
    render(<TeamCard team={team} />)
    expect(screen.getByText('Inglaterra')).toBeInTheDocument()
  })

  it('renderiza el año de fundación cuando está presente', () => {
    const team = { nombre: 'AC Milan', fundado: 1899 }
    render(<TeamCard team={team} />)
    expect(screen.getByText('1899')).toBeInTheDocument()
  })

  it('renderiza el estadio cuando está presente', () => {
    const team = { nombre: 'Bayern Munich', estadio: 'Allianz Arena' }
    render(<TeamCard team={team} />)
    expect(screen.getByText('Allianz Arena')).toBeInTheDocument()
  })

  it('renderiza el entrenador cuando está presente', () => {
    const team = { nombre: 'Liverpool', entrenador: 'Jürgen Klopp' }
    render(<TeamCard team={team} />)
    expect(screen.getByText('Jürgen Klopp')).toBeInTheDocument()
  })

  it('renderiza estadísticas de victorias, empates y derrotas', () => {
    const team = {
      nombre: 'Chelsea',
      victorias: 15,
      empates: 5,
      derrotas: 3
    }
    render(<TeamCard team={team} />)
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('muestra 0 en estadísticas cuando no hay valores', () => {
    const team = { nombre: 'Juventus' }
    render(<TeamCard team={team} />)
    expect(screen.getAllByText('0')).toHaveLength(3)
  })

  it('renderiza todos los datos de un equipo completo', () => {
    const team = {
      nombre: 'Paris Saint-Germain',
      liga: 'Ligue 1',
      pais: 'Francia',
      fundado: 1970,
      estadio: 'Parc des Princes',
      entrenador: 'Luis Enrique',
      victorias: 20,
      empates: 3,
      derrotas: 2
    }
    render(<TeamCard team={team} />)
    expect(screen.getByText('Paris Saint-Germain')).toBeInTheDocument()
    expect(screen.getByText('Ligue 1')).toBeInTheDocument()
    expect(screen.getByText('Francia')).toBeInTheDocument()
    expect(screen.getByText('1970')).toBeInTheDocument()
    expect(screen.getByText('Parc des Princes')).toBeInTheDocument()
    expect(screen.getByText('Luis Enrique')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
