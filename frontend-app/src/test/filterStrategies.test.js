import { describe, it, expect, beforeEach } from 'vitest'
import FilterContext, {
  LeagueFilterStrategy,
  TeamFilterStrategy,
  PlayerFilterStrategy,
  DateFilterStrategy
} from '../services/filterStrategies'

describe('LeagueFilterStrategy', () => {
  let strategy

  beforeEach(() => {
    strategy = new LeagueFilterStrategy()
  })

  it('retorna todos los datos cuando no hay filtro de liga', () => {
    const data = [
      { liga: 'La Liga' },
      { liga: 'Premier League' }
    ]
    const result = strategy.apply(data, {})
    expect(result).toEqual(data)
  })

  it('filtra por liga correctamente', () => {
    const data = [
      { liga: 'La Liga' },
      { liga: 'Premier League' },
      { liga: 'La Liga' }
    ]
    const result = strategy.apply(data, { league: 'La Liga' })
    expect(result).toHaveLength(2)
    expect(result[0].liga).toBe('La Liga')
  })

  it('filtra de forma case-insensitive', () => {
    const data = [
      { liga: 'La Liga' },
      { liga: 'Premier League' }
    ]
    const result = strategy.apply(data, { league: 'la liga' })
    expect(result).toHaveLength(1)
    expect(result[0].liga).toBe('La Liga')
  })

  it('filtra con coincidencia parcial', () => {
    const data = [
      { liga: 'La Liga' },
      { liga: 'Premier League' }
    ]
    const result = strategy.apply(data, { league: 'Liga' })
    expect(result).toHaveLength(1)
  })
})

describe('TeamFilterStrategy', () => {
  let strategy

  beforeEach(() => {
    strategy = new TeamFilterStrategy()
  })

  it('retorna todos los datos cuando no hay filtro de equipo', () => {
    const data = [
      { equipo1: 'Real Madrid', equipo2: 'Barcelona' },
      { equipo: 'Chelsea' }
    ]
    const result = strategy.apply(data, {})
    expect(result).toEqual(data)
  })

  it('filtra por equipo1 en partidos', () => {
    const data = [
      { equipo1: 'Real Madrid', equipo2: 'Barcelona' },
      { equipo1: 'Chelsea', equipo2: 'Arsenal' }
    ]
    const result = strategy.apply(data, { team: 'Real Madrid' })
    expect(result).toHaveLength(1)
    expect(result[0].equipo1).toBe('Real Madrid')
  })

  it('filtra por equipo2 en partidos', () => {
    const data = [
      { equipo1: 'Real Madrid', equipo2: 'Barcelona' },
      { equipo1: 'Chelsea', equipo2: 'Arsenal' }
    ]
    const result = strategy.apply(data, { team: 'Barcelona' })
    expect(result).toHaveLength(1)
    expect(result[0].equipo2).toBe('Barcelona')
  })

  it('filtra por nombre de equipo', () => {
    const data = [
      { nombre: 'Real Madrid' },
      { nombre: 'Barcelona' }
    ]
    const result = strategy.apply(data, { team: 'Barcelona' })
    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Barcelona')
  })

  it('filtra por equipo del jugador', () => {
    const data = [
      { nombre: 'Messi', equipo: 'Inter Miami' },
      { nombre: 'Ronaldo', equipo: 'Al Nassr' }
    ]
    const result = strategy.apply(data, { team: 'Inter Miami' })
    expect(result).toHaveLength(1)
    expect(result[0].equipo).toBe('Inter Miami')
  })

  it('filtra de forma case-insensitive', () => {
    const data = [
      { equipo1: 'Real Madrid', equipo2: 'Barcelona' }
    ]
    const result = strategy.apply(data, { team: 'real madrid' })
    expect(result).toHaveLength(1)
  })
})

describe('PlayerFilterStrategy', () => {
  let strategy

  beforeEach(() => {
    strategy = new PlayerFilterStrategy()
  })

  it('retorna todos los datos cuando no hay filtro de jugador', () => {
    const data = [
      { nombre: 'Messi' },
      { nombre: 'Ronaldo' }
    ]
    const result = strategy.apply(data, {})
    expect(result).toEqual(data)
  })

  it('filtra por nombre de jugador', () => {
    const data = [
      { nombre: 'Lionel Messi' },
      { nombre: 'Cristiano Ronaldo' }
    ]
    const result = strategy.apply(data, { player: 'Messi' })
    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Lionel Messi')
  })

  it('filtra de forma case-insensitive', () => {
    const data = [
      { nombre: 'Lionel Messi' }
    ]
    const result = strategy.apply(data, { player: 'messi' })
    expect(result).toHaveLength(1)
  })

  it('filtra con coincidencia parcial', () => {
    const data = [
      { nombre: 'Lionel Messi' },
      { nombre: 'Cristiano Ronaldo' }
    ]
    const result = strategy.apply(data, { player: 'Lionel' })
    expect(result).toHaveLength(1)
  })
})

describe('DateFilterStrategy', () => {
  let strategy

  beforeEach(() => {
    strategy = new DateFilterStrategy()
  })

  it('retorna todos los datos cuando no hay filtro de fecha', () => {
    const data = [
      { fecha: '2025-11-28' },
      { fecha: '2025-12-01' }
    ]
    const result = strategy.apply(data, {})
    expect(result).toEqual(data)
  })

  it('filtra por fecha desde', () => {
    const data = [
      { fecha: '2025-11-20' },
      { fecha: '2025-11-28' },
      { fecha: '2025-12-01' }
    ]
    const result = strategy.apply(data, { dateFrom: '2025-11-25' })
    expect(result).toHaveLength(2)
  })

  it('filtra por fecha hasta', () => {
    const data = [
      { fecha: '2025-11-20' },
      { fecha: '2025-11-28' },
      { fecha: '2025-12-01' }
    ]
    const result = strategy.apply(data, { dateTo: '2025-11-28' })
    expect(result).toHaveLength(2)
  })

  it('filtra por rango de fechas', () => {
    const data = [
      { fecha: '2025-11-15' },
      { fecha: '2025-11-25' },
      { fecha: '2025-11-28' },
      { fecha: '2025-12-05' }
    ]
    const result = strategy.apply(data, { dateFrom: '2025-11-20', dateTo: '2025-11-30' })
    expect(result).toHaveLength(2)
  })

  it('incluye elementos sin fecha', () => {
    const data = [
      { fecha: '2025-11-20' },
      { nombre: 'sin fecha' }
    ]
    const result = strategy.apply(data, { dateFrom: '2025-11-25' })
    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('sin fecha')
  })
})

describe('FilterContext', () => {
  let context

  beforeEach(() => {
    context = new FilterContext()
  })

  it('aplica múltiples filtros en secuencia', () => {
    const data = [
      { equipo1: 'Real Madrid', equipo2: 'Barcelona', liga: 'La Liga', fecha: '2025-11-28' },
      { equipo1: 'Chelsea', equipo2: 'Arsenal', liga: 'Premier League', fecha: '2025-11-28' },
      { equipo1: 'Real Madrid', equipo2: 'Sevilla', liga: 'La Liga', fecha: '2025-12-01' }
    ]
    const filters = {
      league: 'La Liga',
      team: 'Real Madrid',
      dateFrom: '2025-11-20',
      dateTo: '2025-11-30'
    }
    const result = context.applyFilters(data, filters)
    expect(result).toHaveLength(1)
    expect(result[0].equipo1).toBe('Real Madrid')
    expect(result[0].equipo2).toBe('Barcelona')
  })

  it('retorna todos los datos cuando no hay filtros', () => {
    const data = [
      { equipo1: 'Real Madrid', equipo2: 'Barcelona' },
      { equipo1: 'Chelsea', equipo2: 'Arsenal' }
    ]
    const result = context.applyFilters(data, {})
    expect(result).toEqual(data)
  })

  it('retorna array vacío cuando ningún elemento coincide', () => {
    const data = [
      { equipo1: 'Real Madrid', equipo2: 'Barcelona', liga: 'La Liga' }
    ]
    const result = context.applyFilters(data, { league: 'Premier League' })
    expect(result).toHaveLength(0)
  })

  it('aplica filtro de jugador correctamente', () => {
    const data = [
      { nombre: 'Lionel Messi', equipo: 'Inter Miami' },
      { nombre: 'Cristiano Ronaldo', equipo: 'Al Nassr' }
    ]
    const result = context.applyFilters(data, { player: 'Messi' })
    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Lionel Messi')
  })
})
