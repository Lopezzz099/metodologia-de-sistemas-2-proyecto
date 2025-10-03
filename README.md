# Proyecto: API de Fútbol - Consulta y Filtrado de Artículos

## 1. Nombres de los integrantes
- Ignacio Martin Lopez  
- Nicolas Paez  
- Paco Fontana  

---

## 2. Temática elegida  
La temática elegida es una **API de fútbol** que utilice la **BeSoccer API** para consultar datos relacionados al fútbol (estadísticas, partidos, jugadores, equipos) y permita filtrarlos según criterios seleccionados (liga, equipo, fecha, jugador, etc.).  

Referencia de la documentación oficial de BeSoccer:  
[Documentación BeSoccer API](https://api.besoccer.com/es/documentacion) 

---

## 3. Patrones

- **Singleton:**  
  Para manejar una única instancia de cliente HTTP (por ejemplo, configuración de Axios o fetch) o de cliente para llamadas a BeSoccer, evitando instancias múltiples innecesarias.

- **Strategy:**  
  Para los distintos filtros que se puedan aplicar (por liga, por fecha, por equipo, por jugador). Cada filtro puede ser una "estrategia" que se aplica de forma independiente.

- **Factory:**  
  Para encapsular las llamadas a los distintos endpoints de BeSoccer (por ejemplo: getMatches, getPlayers, getTeams), para que el resto del código sólo invoque métodos simples sin preocuparse de los detalles internos.  

---

## 4. Primeros avances
- Se definió la estructura principal de la aplicación: un **backend con Node.js + Express** que consumirá la API de BeSoccer y un **frontend en React.js** que mostrará los datos.  
- Se diseñó un modelo de datos preliminar con atributos como:  
  - Equipo  
  - Jugador  
  - Liga  
  - Fecha de partido  
  - Resultado / información relevante  
- En el frontend con **React.js**, se planifica una interfaz sencilla con:  
  - Barra de búsqueda / filtros (equipo, liga, fecha, jugador).  
  - Listado de resultados con datos obtenidos de la API. 

---

## 5. Decisiones y argumentación
- **Tecnologías:**  
  - **Node.js + Express:** para construir el backend y manejar las consultas a la API de BeSoccer.  
  - **React.js:** para crear un frontend interactivo y dinámico que permita a los usuarios consultar y filtrar la información.  
  - **MongoDB (opcional):** si se requiere persistencia o almacenamiento de ciertos datos localmente.  

- **Arquitectura:**  
  En el frontend se seguirá una arquitectura basada en **componentes de React**, lo que facilita la reutilización y la separación de responsabilidades.  

- **Patrones de diseño aplicados:**  
  - **Singleton:** para gestionar la instancia de conexión con la API de BeSoccer.  
  - **Strategy:** para implementar los distintos filtros (por equipo, liga, fecha o jugador).  
  - **Factory:** para encapsular las llamadas a la API y simplificar el acceso desde los controladores.  

- **Justificación:**  
  Estas decisiones permiten crear una aplicación sencilla pero escalable. El uso de React.js en el frontend mejora la experiencia de usuario al interactuar con los filtros, mientras que Node.js con Express en el backend ofrece flexibilidad y rapidez en el desarrollo. Los patrones seleccionados ayudan a mantener el código organizado y fácil de mantener. 
