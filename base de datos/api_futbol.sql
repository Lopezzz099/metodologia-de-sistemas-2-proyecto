CREATE DATABASE IF NOT EXISTS `api_futbol` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_general_ci;

USE `api_futbol`;

-- Base de datos api_futbol completa con estructura + inserts

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `liga` varchar(100) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `fundado` int(4) NOT NULL,
  `estadio` varchar(150) NOT NULL,
  `entrenador` varchar(100) NOT NULL,
  `victorias` int(11) NOT NULL,
  `empates` int(11) NOT NULL,
  `derrotas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `posicion` varchar(50) NOT NULL,
  `equipo` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `numero_camiseta` int(11) NOT NULL,
  `goles` int(11) NOT NULL,
  `asistencias` int(11) NOT NULL,
  `partidos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `partidos` (
  `id` int(11) NOT NULL,
  `liga` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `equipo1` varchar(100) NOT NULL,
  `res_equipo1` int(11),
  `equipo2` varchar(100) NOT NULL,
  `res_equipo2` int(11),
  `jugado` tinyint(1) NOT NULL,
  `estadio` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `equipos` ADD PRIMARY KEY (`id`);
ALTER TABLE `jugadores` ADD PRIMARY KEY (`id`);
ALTER TABLE `partidos` ADD PRIMARY KEY (`id`);

ALTER TABLE `equipos` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `jugadores` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `partidos` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `partidos` (`id`,`liga`,`fecha`,`equipo1`,`res_equipo1`,`equipo2`,`res_equipo2`,`jugado`,`estadio`) VALUES
(NULL,'Premier League','2023-04-12','Manchester United','2','Chelsea','1','1','Old Trafford'),
(NULL,'La Liga','2022-09-21','Barcelona','4','Sevilla','0','1','Camp Nou'),
(NULL,'Serie A','2021-10-03','Juventus','1','Inter','1','1','Allianz Stadium'),
(NULL,'Bundesliga','2020-03-14','Bayern Munich','3','Dortmund','2','1','Allianz Arena'),
(NULL,'Ligue 1','2019-11-07','PSG','5','Lyon','2','1','Parc des Princes'),
(NULL,'MLS','2024-05-18','LA Galaxy','2','Inter Miami','3','1','Dignity Health Sports Park'),
(NULL,'Premier League','2025-01-15','Liverpool',NULL,'Arsenal',NULL,'0','Anfield'),
(NULL,'La Liga','2025-02-20','Atletico Madrid',NULL,'Valencia',NULL,'0','Wanda Metropolitano'),
(NULL,'Serie A','2025-03-02','AC Milan',NULL,'Napoli',NULL,'0','San Siro'),
(NULL,'Bundesliga','2025-04-11','RB Leipzig',NULL,'Leverkusen',NULL,'0','Red Bull Arena'),
(NULL,'Ligue 1','2025-05-05','Marseille',NULL,'Monaco',NULL,'0','Velodrome'),
(NULL,'Copa Libertadores','2018-08-10','River Plate','1','Boca Juniors','0','1','Monumental'),
(NULL,'Copa Sudamericana','2017-06-23','Independiente','3','Racing','1','1','Libertadores de América'),
(NULL,'Liga MX','2021-02-14','América','2','Chivas','2','1','Estadio Azteca'),
(NULL,'Brasileirao','2022-07-30','Flamengo','4','Palmeiras','3','1','Maracaná'),
(NULL,'MLS','2022-09-12','NYCFC','1','Seattle Sounders','0','1','Yankee Stadium'),
(NULL,'Copa Argentina','2025-06-15','San Lorenzo',NULL,'Huracán',NULL,'0','Nuevo Gasómetro'),
(NULL,'Liga Profesional','2025-06-22','Talleres',NULL,'Belgrano',NULL,'0','Mario Alberto Kempes'),
(NULL,'Liga Profesional','2025-07-01','Lanús',NULL,'Banfield',NULL,'0','La Fortaleza'),
(NULL,'Liga Profesional','2025-07-10','Colón',NULL,'River Plate',NULL,'0','Brigadier López');

INSERT INTO `equipos` (`id`,`nombre`,`liga`,`pais`,`fundado`,`estadio`,`entrenador`,`victorias`,`empates`,`derrotas`) VALUES
(NULL,'Liverpool','Premier League','Inglaterra','1892','Anfield','Jürgen Klopp','20','5','3'),
(NULL,'Arsenal','Premier League','Inglaterra','1886','Emirates Stadium','Mikel Arteta','18','7','4'),
(NULL,'Chelsea','Premier League','Inglaterra','1905','Stamford Bridge','Mauricio Pochettino','15','10','5'),
(NULL,'Manchester United','Premier League','Inglaterra','1878','Old Trafford','Erik ten Hag','17','6','6'),
(NULL,'Barcelona','La Liga','España','1899','Camp Nou','Xavi Hernández','22','4','2'),
(NULL,'Real Madrid','La Liga','España','1902','Santiago Bernabéu','Carlo Ancelotti','25','3','1'),
(NULL,'Sevilla','La Liga','España','1890','Ramón Sánchez-Pizjuán','Quique Sánchez Flores','12','8','10'),
(NULL,'Valencia','La Liga','España','1919','Mestalla','Rubén Baraja','10','9','11'),
(NULL,'Juventus','Serie A','Italia','1897','Allianz Stadium','Massimiliano Allegri','21','5','4'),
(NULL,'Napoli','Serie A','Italia','1926','Diego Armando Maradona','Rudi Garcia','19','6','5'),
(NULL,'Inter','Serie A','Italia','1908','Giuseppe Meazza','Simone Inzaghi','23','3','4'),
(NULL,'AC Milan','Serie A','Italia','1899','San Siro','Stefano Pioli','18','8','4'),
(NULL,'River Plate','Liga Profesional','Argentina','1901','Monumental','Martín Demichelis','24','5','3'),
(NULL,'Boca Juniors','Liga Profesional','Argentina','1905','La Bombonera','Diego Martínez','20','7','5'),
(NULL,'Racing Club','Liga Profesional','Argentina','1903','Cilindro de Avellaneda','Gustavo Costas','15','10','7'),
(NULL,'Independiente','Liga Profesional','Argentina','1905','Libertadores de América','Carlos Tevez','14','8','10'),
(NULL,'Flamengo','Brasileirao','Brasil','1895','Maracaná','Tite','23','4','3'),
(NULL,'Palmeiras','Brasileirao','Brasil','1914','Allianz Parque','Abel Ferreira','21','6','3'),
(NULL,'LA Galaxy','MLS','Estados Unidos','1994','Dignity Health Sports Park','Greg Vanney','13','9','8'),
(NULL,'Inter Miami','MLS','Estados Unidos','2018','DRV PNK Stadium','Gerardo Martino','11','8','11');

INSERT INTO `jugadores` (`id`,`nombre`,`posicion`,`equipo`,`nacionalidad`,`edad`,`numero_camiseta`,`goles`,`asistencias`,`partidos`) VALUES
(NULL,'Mohamed Salah','Delantero','Liverpool','Egipto','31','11','18','6','30'),
(NULL,'Virgil van Dijk','Defensor','Liverpool','Países Bajos','32','4','3','1','28'),
(NULL,'Alexis Mac Allister','Mediocampista','Liverpool','Argentina','25','10','5','7','27'),
(NULL,'Darwin Núñez','Delantero','Liverpool','Uruguay','24','9','14','8','29'),
(NULL,'Bukayo Saka','Delantero','Arsenal','Inglaterra','22','7','12','10','31'),
(NULL,'Martin Ødegaard','Mediocampista','Arsenal','Noruega','25','8','7','11','30'),
(NULL,'William Saliba','Defensor','Arsenal','Francia','23','2','1','0','32'),
(NULL,'Robert Lewandowski','Delantero','Barcelona','Polonia','35','9','20','4','28'),
(NULL,'Pedri','Mediocampista','Barcelona','España','21','8','4','9','25'),
(NULL,'Ronald Araújo','Defensor','Barcelona','Uruguay','24','4','2','1','27'),
(NULL,'Julián Álvarez','Delantero','Manchester City','Argentina','23','19','10','6','26'),
(NULL,'Kevin De Bruyne','Mediocampista','Manchester City','Bélgica','32','17','6','12','22'),
(NULL,'Rodri','Mediocampista','Manchester City','España','27','16','3','8','29'),
(NULL,'Edinson Cavani','Delantero','Boca Juniors','Uruguay','36','10','9','3','21'),
(NULL,'Valentín Barco','Defensor','Boca Juniors','Argentina','20','3','2','5','20'),
(NULL,'Darío Benedetto','Delantero','Boca Juniors','Argentina','33','9','11','2','22'),
(NULL,'Miguel Borja','Delantero','River Plate','Colombia','30','9','15','3','24'),
(NULL,'Enzo Díaz','Defensor','River Plate','Argentina','28','13','1','4','23'),
(NULL,'Ignacio Fernández','Mediocampista','River Plate','Argentina','33','10','4','7','25'),
(NULL,'Phil Foden','Delantero','Manchester City','Inglaterra','23','47','9','6','30');

COMMIT;
