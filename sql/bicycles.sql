-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2024 a las 00:55:05
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mtb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bicycles`
--

CREATE TABLE `bicycles` (
  `id` int(11) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `material` varchar(100) NOT NULL,
  `tamanio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bicycles`
--

INSERT INTO `bicycles` (`id`, `marca`, `modelo`, `color`, `precio`, `material`, `tamanio`) VALUES
(1, 'Giant', 'Talon 29 2', 'Gris/Naranja', '999.00', 'Aluminio', '29.00'),
(2, 'Scott', 'Aspect 940', 'Negro/Rojo', '799.00', 'Aluminio', '29.00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bicycles`
--
ALTER TABLE `bicycles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bicycles`
--
ALTER TABLE `bicycles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
