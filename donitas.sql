-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2024 a las 20:03:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `donitas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cafes`
--

CREATE TABLE `cafes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagenURL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `correo`, `telefono`, `direccion`) VALUES
(1, 'Ana Garc?a', 'ana.garcia@gmail.com', '3326759948', 'Calle Luna 123, Ciudad A'),
(2, 'Luis Hern?ndez', 'luishernandez@gmail.com', '3345896654', 'Av. Sol 456, Ciudad B'),
(3, 'Mar?a Torres', 'mariatorres@gmail.com', '3302489975', 'Blvd. Estrella 789, Ciudad C'),
(4, 'Carlos D?az', 'carlosdiaz@gmail.com', '3302156987', 'Calle Cometa 101, Ciudad D'),
(5, 'Laura Mart?nez', 'lauramartinez@gmail.com', '3325469987', 'Av. Planeta 202, Ciudad E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_dona` int(11) DEFAULT NULL,
  `id_cafe` int(11) DEFAULT NULL,
  `tipo_venta` enum('Individual','Caja de 6','Caja de 12') DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id_detalle`, `id_pedido`, `id_dona`, `id_cafe`, `tipo_venta`, `cantidad`, `subtotal`) VALUES
(1, 1, NULL, NULL, 'Caja de 6', 1, 72.00),
(2, 2, NULL, NULL, 'Individual', 2, 61.00),
(3, 3, NULL, NULL, 'Individual', 1, 43.00),
(4, 4, 4, NULL, 'Caja de 12', 1, 150.00),
(5, 5, 5, NULL, 'Individual', 2, 91.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donas`
--

CREATE TABLE `donas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagenURL` varchar(255) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donas`
--

INSERT INTO `donas` (`id`, `nombre`, `descripcion`, `precio`, `imagenURL`, `cantidad`) VALUES
(4, 'Dona Azucarada', 'Espolvoreada con az?car', 10.00, 'https://cdn7.kiwilimon.com/recetaimagen/20183/640x640/10954.png.webp', 5),
(5, 'Dona de Vainilla', 'Con cobertura de vainilla', 25.50, 'https://cuk-it.com/wp-content/uploads/2021/07/donas-web05.webp', 15),
(6, 'Americano', 'Cafe de tamaño mediano', 25.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjTdw9Bp6_c5yk6CU1WKwezo96RBahJ8bjQ&s', 7),
(7, 'Espresso', 'Cafe espresso de tamaño chico', 20.00, 'https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2013/04/cafe-espresso.jpg', 7),
(11, 'Waffles', 'platillo con 3 waffles con chocolate', 35.00, 'https://th.bing.com/th/id/R.1a510664d021d8c6b1740dc2708ed8cf?rik=1uEaPUGljSsbsA&riu=http%3a%2f%2fwww.organizedmom.net%2fwp-content%2fuploads%2f2018%2f02%2fwaffles1.jpg&ehk=kCLmUByTjiaMJDx6vYBKoxnjFzfFnIgRGt5R95z69tI%3d&risl=&pid=ImgRaw&r=0', 25),
(12, 'Dona especial', 'dona especial', 1500.00, 'https://th.bing.com/th/id/OIP.G0LR4cUGd7cc4a4WAeHDIgHaHa?rs=1&pid=ImgDetMain', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('Pendiente','Enviado','Entregado') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_cliente`, `fecha`, `total`, `estado`) VALUES
(1, 1, '2024-10-18 10:00:00', 75.00, 'Pendiente'),
(2, 2, '2024-10-18 11:00:00', 50.00, 'Enviado'),
(3, 3, '2024-10-17 09:30:00', 100.00, 'Entregado'),
(4, 4, '2024-10-17 12:15:00', 40.00, 'Pendiente'),
(5, 5, '2024-10-16 14:45:00', 85.00, 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `email`, `admin`) VALUES
(1, 'Max', '3504', 'a21100318@ceti.mx', 1),
(2, 'Vane', '12345', 'a21100297@ceti.mx', 1),
(4, 'Ulises', 'Gym', 'a21100319@ceti.mx', 0),
(5, 'Jose', '123456', 'fakedcrane3504@gmail.com', 0),
(6, 'Kike', '123456', 'juanmaxemin@gmail.com', 0),
(7, 'Joshua', '123456', 'a21100320@ceti.mx', 0),
(8, 'Rodrigo', '123456789', 'a21100123@ceti.mx', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cafes`
--
ALTER TABLE `cafes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_dona` (`id_dona`),
  ADD KEY `id_cafe` (`id_cafe`);

--
-- Indices de la tabla `donas`
--
ALTER TABLE `donas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cafes`
--
ALTER TABLE `cafes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `donas`
--
ALTER TABLE `donas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`id_dona`) REFERENCES `donas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `detalle_pedidos_ibfk_3` FOREIGN KEY (`id_cafe`) REFERENCES `cafes` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
