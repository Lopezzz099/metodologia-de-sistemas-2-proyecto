const controlador = require('./controlador');

describe('Controlador de Partidos', () => {
  let dbMock;
  let controller;

  beforeEach(() => {
    dbMock = {
      todos: jest.fn(),
      uno: jest.fn(),
      insertar: jest.fn(),
      actualizar: jest.fn(),
      eliminar: jest.fn(),
      query: jest.fn(),
    };
    controller = controlador(dbMock);
  });

  describe('obtenerPartidos', () => {
    it('debe retornar todos los partidos', async () => {
      const partidos = [
        { id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona', liga: 'La Liga' },
        { id: 2, equipo1: 'Chelsea', equipo2: 'Arsenal', liga: 'Premier League' }
      ];
      dbMock.todos.mockResolvedValue(partidos);

      const result = await controller.obtenerPartidos();

      expect(result).toEqual(partidos);
      expect(dbMock.todos).toHaveBeenCalledWith('partidos');
    });

    it('debe manejar errores al obtener partidos', async () => {
      dbMock.todos.mockRejectedValue(new Error('Error de base de datos'));

      await expect(controller.obtenerPartidos()).rejects.toThrow('Error de base de datos');
    });
  });

  describe('uno', () => {
    it('debe retornar un partido por id', async () => {
      const partido = { id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona' };
      dbMock.uno.mockResolvedValue(partido);

      const result = await controller.uno(1);

      expect(result).toEqual(partido);
      expect(dbMock.uno).toHaveBeenCalledWith('partidos', 1);
    });
  });

  describe('porLiga', () => {
    it('debe buscar partidos por liga', async () => {
      const partidos = [
        { id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona', liga: 'La Liga' },
        { id: 2, equipo1: 'Atlético Madrid', equipo2: 'Sevilla', liga: 'La Liga' }
      ];
      dbMock.query.mockResolvedValue(partidos);

      const result = await controller.porLiga('La Liga');

      expect(result).toEqual(partidos);
      expect(dbMock.query).toHaveBeenCalledWith(
        'SELECT * FROM partidos WHERE liga LIKE ?',
        ['%La Liga%']
      );
    });
  });

  describe('porEquipo', () => {
    it('debe buscar partidos donde participe un equipo', async () => {
      const partidos = [
        { id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona', liga: 'La Liga' },
        { id: 2, equipo1: 'Sevilla', equipo2: 'Real Madrid', liga: 'La Liga' }
      ];
      dbMock.query.mockResolvedValue(partidos);

      const result = await controller.porEquipo('Real Madrid');

      expect(result).toEqual(partidos);
      expect(dbMock.query).toHaveBeenCalledWith(
        'SELECT * FROM partidos WHERE equipo1 LIKE ? OR equipo2 LIKE ?',
        ['%Real Madrid%', '%Real Madrid%']
      );
    });

    it('debe buscar con coincidencia parcial', async () => {
      const partidos = [
        { id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona', liga: 'La Liga' },
        { id: 2, equipo1: 'Real Sociedad', equipo2: 'Valencia', liga: 'La Liga' }
      ];
      dbMock.query.mockResolvedValue(partidos);

      const result = await controller.porEquipo('Real');

      expect(result).toHaveLength(2);
    });
  });

  describe('porRangoFecha', () => {
    it('debe buscar partidos en un rango de fechas', async () => {
      const partidos = [
        { id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona', fecha: '2025-11-25' },
        { id: 2, equipo1: 'Chelsea', equipo2: 'Arsenal', fecha: '2025-11-28' }
      ];
      dbMock.query.mockResolvedValue(partidos);

      const result = await controller.porRangoFecha('2025-11-20', '2025-11-30');

      expect(result).toEqual(partidos);
      expect(dbMock.query).toHaveBeenCalledWith(
        'SELECT * FROM partidos WHERE fecha BETWEEN ? AND ?',
        ['2025-11-20', '2025-11-30']
      );
    });
  });

  describe('insertar', () => {
    it('debe insertar un nuevo partido', async () => {
      const nuevoPartido = {
        equipo1: 'Manchester City',
        equipo2: 'Liverpool',
        liga: 'Premier League',
        fecha: '2025-12-01'
      };
      const resultado = { insertId: 10, affectedRows: 1 };
      dbMock.insertar.mockResolvedValue(resultado);

      const result = await controller.insertar(nuevoPartido);

      expect(result).toEqual(resultado);
      expect(dbMock.insertar).toHaveBeenCalledWith('partidos', nuevoPartido);
    });
  });

  describe('actualizar', () => {
    it('debe actualizar un partido existente', async () => {
      const partidoActualizado = {
        id: 1,
        equipo1: 'Real Madrid',
        equipo2: 'Barcelona',
        res_equipo1: 3,
        res_equipo2: 2,
        jugado: true
      };
      const resultado = { affectedRows: 1 };
      dbMock.actualizar.mockResolvedValue(resultado);

      const result = await controller.actualizar(partidoActualizado);

      expect(result).toEqual(resultado);
      expect(dbMock.actualizar).toHaveBeenCalledWith('partidos', partidoActualizado);
    });
  });

  describe('eliminar', () => {
    it('debe eliminar un partido existente', async () => {
      const partido = [{ id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona' }];
      const resultado = { affectedRows: 1 };
      dbMock.uno.mockResolvedValue(partido);
      dbMock.eliminar.mockResolvedValue(resultado);

      const result = await controller.eliminar(1);

      expect(result).toEqual(resultado);
      expect(dbMock.uno).toHaveBeenCalledWith('partidos', 1);
      expect(dbMock.eliminar).toHaveBeenCalledWith('partidos', 1);
    });

    it('debe lanzar error si el partido no existe', async () => {
      dbMock.uno.mockResolvedValue([]);

      await expect(controller.eliminar(999)).rejects.toThrow('No existe equipo con id 999');
    });

    it('debe lanzar error si no se pudo eliminar', async () => {
      const partido = [{ id: 1, equipo1: 'Real Madrid', equipo2: 'Barcelona' }];
      dbMock.uno.mockResolvedValue(partido);
      dbMock.eliminar.mockResolvedValue({ affectedRows: 0 });

      await expect(controller.eliminar(1)).rejects.toThrow('No se eliminó registro con id 1');
    });
  });
});
