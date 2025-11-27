# Proyecto: API de Fútbol - Consulta y Filtrado de Artículos

## 1. Nombres de los integrantes
- Ignacio Martin Lopez  
- Nicolas Paez  
- Paco Fontana  

---

## 2. Temática elegida  
La temática elegida es una **aplicación de fútbol** que gestione datos relacionados al fútbol (estadísticas, partidos, jugadores, equipos) de forma local y permita filtrarlos según criterios seleccionados (liga, equipo, fecha, jugador, etc.). 

---

## 3. Patrones

- **Singleton:**  
  Para manejar una única instancia de conexión a la base de datos (MySQL con XAMPP), evitando múltiples conexiones innecesarias.

- **Strategy:**  
  Para los distintos filtros que se puedan aplicar (por liga, por fecha, por equipo, por jugador). Cada filtro puede ser una "estrategia" que se aplica de forma independiente.

- **Factory:**  
  Para encapsular la creación de consultas a la base de datos (por ejemplo: obtenerEquipos, obtenerJugadores, obtenerEquipos), para que el resto del código sólo invoque métodos simples sin preocuparse de los detalles internos.  

---

## 4. Primeros avances
- Se definió la estructura principal de la aplicación: un **backend con Node.js + Express** que gestionará los datos de fútbol almacenados localmente y un **frontend en React.js** que mostrará los datos.  
- Se configuró **XAMPP** con MySQL para la base de datos local que almacenará la información de equipos, jugadores, partidos y ligas.
- Se diseñó un modelo de datos preliminar con atributos como:  
  - Equipo  
  - Jugador  
  - Liga  
  - Fecha de partido  
  - Resultado / información relevante  
- En el frontend con **React.js**, se planifica una interfaz sencilla con:  
  - Barra de búsqueda / filtros (equipo, liga, fecha, jugador).  
  - Listado de resultados con datos obtenidos de la base de datos local. 

---

## 5. Decisiones y argumentación
- **Tecnologías:**  
  - **Node.js + Express:** para construir el backend y manejar las consultas a la base de datos.  
  - **React.js:** para crear un frontend interactivo y dinámico que permita a los usuarios consultar y filtrar la información.  
  - **XAMPP con MySQL:** para la gestión de la base de datos local que almacenará toda la información de fútbol (equipos, jugadores, partidos, ligas).  

- **Arquitectura:**  
  En el frontend se seguirá una arquitectura basada en **componentes de React**, lo que facilita la reutilización y la separación de responsabilidades.  

- **Patrones de diseño aplicados:**  
  - **Singleton:** para gestionar una única instancia de conexión con la base de datos MySQL.  
  - **Strategy:** para implementar los distintos filtros (por equipo, liga, fecha o jugador).  
  - **Factory:** para encapsular las consultas a la base de datos y simplificar el acceso desde los controladores.  

- **Justificación:**  
  Estas decisiones permiten crear una aplicación sencilla pero escalable, con control total sobre los datos al gestionarlos de forma local. El uso de React.js en el frontend mejora la experiencia de usuario al interactuar con los filtros, mientras que Node.js con Express en el backend ofrece flexibilidad y rapidez en el desarrollo. XAMPP con MySQL proporciona una solución robusta y fácil de configurar para el almacenamiento local. Los patrones seleccionados ayudan a mantener el código organizado y fácil de mantener. 
