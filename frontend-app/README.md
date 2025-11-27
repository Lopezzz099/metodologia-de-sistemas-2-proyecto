# Frontend App - API de Fútbol

Frontend en React.js para la consulta y filtrado de información de fútbol.

## 🚀 Características

- **Búsqueda de Partidos**: Filtra por liga, equipo y fecha
- **Búsqueda de Equipos**: Consulta información de equipos y estadísticas
- **Búsqueda de Jugadores**: Encuentra jugadores y sus estadísticas
- **Interfaz Responsive**: Diseñada para funcionar en todos los dispositivos
- **Patrones de Diseño Implementados**:
  - **Singleton**: Cliente HTTP único (ApiClient)
  - **Strategy**: Diferentes estrategias de filtrado
  - **Factory**: Encapsulación de llamadas a la API

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
frontend-app/
├── src/
│   ├── components/          # Componentes React
│   │   ├── FilterPanel.jsx  # Panel de filtros
│   │   ├── ResultsList.jsx  # Lista de resultados
│   │   ├── MatchCard.jsx    # Tarjeta de partido
│   │   ├── TeamCard.jsx     # Tarjeta de equipo
│   │   └── PlayerCard.jsx   # Tarjeta de jugador
│   ├── services/            # Servicios y lógica de negocio
│   │   ├── apiClient.js     # Cliente HTTP (Singleton)
│   │   ├── filterStrategies.js  # Estrategias de filtrado (Strategy)
│   │   └── apiService.js    # Factory para endpoints
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Tecnologías

- **React 18**: Biblioteca de interfaz de usuario
- **Vite**: Herramienta de compilación moderna
- **Axios**: Cliente HTTP
- **CSS3**: Estilos modernos y responsive

## 🔌 Conexión con el Backend

El frontend está configurado para conectarse con el backend en `http://localhost:5000`. 
Las rutas de la API están proxeadas a través de Vite:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

## 📱 Uso

1. Selecciona el tipo de búsqueda (Partidos, Equipos o Jugadores)
2. Aplica los filtros deseados
3. Haz clic en "Buscar"
4. Visualiza los resultados en tarjetas informativas

## 👥 Autores

- Ignacio Martin Lopez
- Nicolas Paez
- Paco Fontana
