-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-03-2021 a las 00:35:22
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nerv`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades`
--

CREATE TABLE `unidades` (
  `NumUnidad` varchar(2) NOT NULL,
  `Children` varchar(200) DEFAULT NULL,
  `Pais` varchar(50) DEFAULT NULL,
  `Imagen` varchar(400) DEFAULT NULL,
  `Created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `unidades`
--

INSERT INTO `unidades` (`NumUnidad`, `Children`, `Pais`, `Imagen`, `Created_at`) VALUES
('00', 'Rei Ayanami', 'Japón', 'media/eva00.png', '2021-03-04 17:51:04'),
('01', 'Shinji Ikari', 'Japón', 'media/eva01.gif', '2021-03-04 17:51:04'),
('02', 'Asuka Langley', 'Alemania', 'media/eva02.png', '2021-03-04 17:51:04'),
('03', 'David Guzmán Leyva', 'Mexico', 'media/evaNuevo.jpg', '2021-03-05 17:43:41'),
('04', 'Diego Emilio', 'Mexico', 'media/evaNuevo.jpg', '2021-03-08 21:02:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `username` varchar(50) NOT NULL,
  `name` varchar(400) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`username`, `name`, `password`) VALUES
('Davidguzley', 'David Guzmán Leyva', '$2a$12$5izGhqS53mHfV7EUFMjjdOPvm9GcGI9GTVegPQ0FjYUu0NGquIyme'),
('Fantillaguzman', 'Oscar Guzman Gutierrez', '$2a$12$N1stTt43yCDjPrnaRd/V7uEEzui3I6HjmVCXjmz/iKZAvZWOAQYQi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `unidades`
--
ALTER TABLE `unidades`
  ADD PRIMARY KEY (`NumUnidad`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
