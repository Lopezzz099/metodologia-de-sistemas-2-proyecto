const controlador = require('./controlador');

describe('Controlador de Equipos', () => {
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

  describe('obtenerEquipos', () => {
    it('debe retornar todos los equipos', async () => {
      const equipos = [
        { id: 1, nombre: 'Real Madrid', liga: 'La Liga' },
        { id: 2, nombre: 'Barcelona', liga: 'La Liga' }
      ];
      dbMock.todos.mockResolvedValue(equipos);

      const result = await controller.obtenerEquipos();

      expect(result).toEqual(equipos);
      expect(dbMock.todos).toHaveBeenCalledWith('equipos');
    });

    it('debe manejar errores al obtener equipos', async () => {
      dbMock.todos.mockRejectedValue(new Error('Error de base de datos'));

      await expect(controller.obtenerEquipos()).rejects.toThrow('Error de base de datos');
    });
  });

  describe('uno', () => {
    it('debe retornar un equipo por id', async () => {
      const equipo = { id: 1, nombre: 'Real Madrid', liga: 'La Liga' };
      dbMock.uno.mockResolvedValue(equipo);

      const result = await controller.uno(1);

      expect(result).toEqual(equipo);
      expect(dbMock.uno).toHaveBeenCalledWith('equipos', 1);
    });
  });

  describe('porNombre', () => {
    it('debe buscar equipos por nombre', async () => {
      const equipos = [{ id: 1, nombre: 'Real Madrid', liga: 'La Liga' }];
      dbMock.query.mockResolvedValue(equipos);

      const result = await controller.porNombre('Real');

      expect(result).toEqual(equipos);
      expect(dbMock.query).toHaveBeenCalledWith(
        'SELECT * FROM equipos WHERE nombre LIKE ?',
        ['%Real%']
      );
    });

    it('debe buscar con coincidencia parcial', async () => {
      const equipos = [
        { id: 1, nombre: 'Real Madrid', liga: 'La Liga' },
        { id: 2, nombre: 'Real Sociedad', liga: 'La Liga' }
      ];
      dbMock.query.mockResolvedValue(equipos);

      const result = await controller.porNombre('Real');

      expect(result).toHaveLength(2);
    });
  });

  describe('porLiga', () => {
    it('debe buscar equipos por liga', async () => {
      const equipos = [
        { id: 1, nombre: 'Real Madrid', liga: 'La Liga' },
        { id: 2, nombre: 'Barcelona', liga: 'La Liga' }
      ];
      dbMock.query.mockResolvedValue(equipos);

      const result = await controller.porLiga('La Liga');

      expect(result).toEqual(equipos);
      expect(dbMock.query).toHaveBeenCalledWith(
        'SELECT * FROM equipos WHERE liga LIKE ?',
        ['%La Liga%']
      );
    });
  });

  describe('insertar', () => {
    it('debe insertar un nuevo equipo', async () => {
      const nuevoEquipo = {
        nombre: 'Chelsea',
        liga: 'Premier League',
        pais: 'Inglaterra'
      };
      const resultado = { insertId: 5, affectedRows: 1 };
      dbMock.insertar.mockResolvedValue(resultado);

      const result = await controller.insertar(nuevoEquipo);

      expect(result).toEqual(resultado);
      expect(dbMock.insertar).toHaveBeenCalledWith('equipos', nuevoEquipo);
    });
  });

  describe('actualizar', () => {
    it('debe actualizar un equipo existente', async () => {
      const equipoActualizado = {
        id: 1,
        nombre: 'Real Madrid',
        liga: 'La Liga',
        victorias: 20
      };
      const resultado = { affectedRows: 1 };
      dbMock.actualizar.mockResolvedValue(resultado);

      const result = await controller.actualizar(equipoActualizado);

      expect(result).toEqual(resultado);
      expect(dbMock.actualizar).toHaveBeenCalledWith('equipos', equipoActualizado);
    });
  });

  describe('eliminar', () => {
    it('debe eliminar un equipo existente', async () => {
      const equipo = [{ id: 1, nombre: 'Real Madrid' }];
      const resultado = { affectedRows: 1 };
      dbMock.uno.mockResolvedValue(equipo);
      dbMock.eliminar.mockResolvedValue(resultado);

      const result = await controller.eliminar(1);

      expect(result).toEqual(resultado);
      expect(dbMock.uno).toHaveBeenCalledWith('equipos', 1);
      expect(dbMock.eliminar).toHaveBeenCalledWith('equipos', 1);
    });

    it('debe lanzar error si el equipo no existe', async () => {
      dbMock.uno.mockResolvedValue([]);

      await expect(controller.eliminar(999)).rejects.toThrow('No existe equipo con id 999');
    });

    it('debe lanzar error si no se pudo eliminar', async () => {
      const equipo = [{ id: 1, nombre: 'Real Madrid' }];
      dbMock.uno.mockResolvedValue(equipo);
      dbMock.eliminar.mockResolvedValue({ affectedRows: 0 });

      await expect(controller.eliminar(1)).rejects.toThrow('No se eliminó registro con id 1');
    });
  });
});
