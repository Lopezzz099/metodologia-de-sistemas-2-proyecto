const crearError = require('./errors');

describe('Middleware de Errors', () => {
  it('debe crear un error con mensaje', () => {
    const mensaje = 'Error de prueba';
    const error = crearError(mensaje);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(mensaje);
  });

  it('debe crear un error con mensaje y código de estado', () => {
    const mensaje = 'No encontrado';
    const codigo = 404;
    const error = crearError(mensaje, codigo);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(mensaje);
    expect(error.statusCode).toBe(codigo);
  });

  it('debe crear un error sin código de estado', () => {
    const mensaje = 'Error sin código';
    const error = crearError(mensaje);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(mensaje);
    expect(error.statusCode).toBeUndefined();
  });

  it('debe crear diferentes errores con diferentes códigos', () => {
    const error400 = crearError('Bad Request', 400);
    const error401 = crearError('Unauthorized', 401);
    const error403 = crearError('Forbidden', 403);
    const error404 = crearError('Not Found', 404);
    const error500 = crearError('Internal Server Error', 500);

    expect(error400.statusCode).toBe(400);
    expect(error401.statusCode).toBe(401);
    expect(error403.statusCode).toBe(403);
    expect(error404.statusCode).toBe(404);
    expect(error500.statusCode).toBe(500);
  });

  it('debe mantener el mensaje original del error', () => {
    const mensajeLargo = 'Este es un mensaje de error muy largo que debe ser preservado exactamente como fue ingresado';
    const error = crearError(mensajeLargo, 500);

    expect(error.message).toBe(mensajeLargo);
  });
});
