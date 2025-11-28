const controlador = require('./controlador');

describe('Controlador de Jugadores', () => {
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

  describe('obtenerJugadores', () => {
    it('debe retornar todos los jugadores', async () => {
      const jugadores = [
        { id: 1, nombre: 'Lionel Messi', equipo: 'Inter Miami' },
        { id: 2, nombre: 'Cristiano Ronaldo', equipo: 'Al Nassr' }
      ];
      dbMock.todos.mockResolvedValue(jugadores);

      const result = await controller.obtenerJugadores();

      expect(result).toEqual(jugadores);
      expect(dbMock.todos).toHaveBeenCalledWith('jugadores');
    });

    it('debe manejar errores al obtener jugadores', async () => {
      dbMock.todos.mockRejectedValue(new Error('Error de base de datos'));

      await expect(controller.obtenerJugadores()).rejects.toThrow('Error de base de datos');
    });
  });

  describe('uno', () => {
    it('debe retornar un jugador por id', async () => {
      const jugador = { id: 1, nombre: 'Lionel Messi', equipo: 'Inter Miami' };
      dbMock.uno.mockResolvedValue(jugador);

      const result = await controller.uno(1);

      expect(result).toEqual(jugador);
      expect(dbMock.uno).toHaveBeenCalledWith('jugadores', 1);
    });
  });

  describe('porNombre', () => {
    it('debe buscar jugadores por nombre', async () => {
      const jugadores = [{ id: 1, nombre: 'Lionel Messi', equipo: 'Inter Miami' }];
      dbMock.query.mockResolvedValue(jugadores);

      const result = await controller.porNombre('Messi');

      expect(result).toEqual(jugadores);
      expect(dbMock.query).toHaveBeenCalledWith(
        'SELECT * FROM jugadores WHERE nombre LIKE ?',
        ['%Messi%']
      );
    });

    it('debe buscar con coincidencia parcial', async () => {
      const jugadores = [
        { id: 1, nombre: 'Lionel Messi', equipo: 'Inter Miami' },
        { id: 2, nombre: 'Lionel Scaloni', equipo: 'Argentina' }
      ];
      dbMock.query.mockResolvedValue(jugadores);

      const result = await controller.porNombre('Lionel');

      expect(result).toHaveLength(2);
    });
  });

  describe('porEquipo', () => {
    it('debe buscar jugadores por equipo', async () => {
      const jugadores = [
        { id: 1, nombre: 'Lionel Messi', equipo: 'Inter Miami' },
        { id: 2, nombre: 'Sergio Busquets', equipo: 'Inter Miami' }
      ];
      dbMock.query.mockResolvedValue(jugadores);

      const result = await controller.porEquipo('Inter Miami');

      expect(result).toEqual(jugadores);
      expect(dbMock.query).toHaveBeenCalledWith(
        'SELECT * FROM jugadores WHERE equipo LIKE ?',
        ['%Inter Miami%']
      );
    });
  });

  describe('insertar', () => {
    it('debe insertar un nuevo jugador', async () => {
      const nuevoJugador = {
        nombre: 'Kylian Mbappé',
        equipo: 'Real Madrid',
        posicion: 'Delantero',
        edad: 25
      };
      const resultado = { insertId: 5, affectedRows: 1 };
      dbMock.insertar.mockResolvedValue(resultado);

      const result = await controller.insertar(nuevoJugador);

      expect(result).toEqual(resultado);
      expect(dbMock.insertar).toHaveBeenCalledWith('jugadores', nuevoJugador);
    });
  });

  describe('actualizar', () => {
    it('debe actualizar un jugador existente', async () => {
      const jugadorActualizado = {
        id: 1,
        nombre: 'Lionel Messi',
        equipo: 'Inter Miami',
        goles: 30
      };
      const resultado = { affectedRows: 1 };
      dbMock.actualizar.mockResolvedValue(resultado);

      const result = await controller.actualizar(jugadorActualizado);

      expect(result).toEqual(resultado);
      expect(dbMock.actualizar).toHaveBeenCalledWith('jugadores', jugadorActualizado);
    });
  });

  describe('eliminar', () => {
    it('debe eliminar un jugador existente', async () => {
      const jugador = [{ id: 1, nombre: 'Lionel Messi' }];
      const resultado = { affectedRows: 1 };
      dbMock.uno.mockResolvedValue(jugador);
      dbMock.eliminar.mockResolvedValue(resultado);

      const result = await controller.eliminar(1);

      expect(result).toEqual(resultado);
      expect(dbMock.uno).toHaveBeenCalledWith('jugadores', 1);
      expect(dbMock.eliminar).toHaveBeenCalledWith('jugadores', 1);
    });

    it('debe lanzar error si el jugador no existe', async () => {
      dbMock.uno.mockResolvedValue([]);

      await expect(controller.eliminar(999)).rejects.toThrow('No existe equipo con id 999');
    });

    it('debe lanzar error si no se pudo eliminar', async () => {
      const jugador = [{ id: 1, nombre: 'Lionel Messi' }];
      dbMock.uno.mockResolvedValue(jugador);
      dbMock.eliminar.mockResolvedValue({ affectedRows: 0 });

      await expect(controller.eliminar(1)).rejects.toThrow('No se eliminó registro con id 1');
    });
  });
});
