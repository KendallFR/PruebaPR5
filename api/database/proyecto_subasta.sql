-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-02-2026 a las 15:47:15
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
-- Base de datos: `proyecto_subasta`
--
CREATE DATABASE IF NOT EXISTS `proyecto_subasta` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `proyecto_subasta`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carta`
--

CREATE TABLE `carta` (
  `idcarta` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idEstadoCarta` int(11) NOT NULL,
  `idCondicion` int(11) NOT NULL,
  `fechaRegistro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `carta`
--

INSERT INTO `carta` (`idcarta`, `nombre`, `descripcion`, `idUsuario`, `idEstadoCarta`, `idCondicion`, `fechaRegistro`) VALUES
(1, 'Pikachu', 'carta pokemon tcg', 1, 1, 1, '2026-02-11 08:55:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carta_categoria`
--

CREATE TABLE `carta_categoria` (
  `idCarta` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `carta_categoria`
--

INSERT INTO `carta_categoria` (`idCarta`, `idCategoria`) VALUES
(1, 1),
(1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `descripcion`) VALUES
(1, 'Pokemon'),
(2, 'Objeto'),
(3, 'Entrenador'),
(4, 'Electrico'),
(5, 'Fuego'),
(6, 'Agua');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicion`
--

CREATE TABLE `condicion` (
  `idCondicion` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `condicion`
--

INSERT INTO `condicion` (`idCondicion`, `descripcion`) VALUES
(1, 'Nuevo'),
(2, 'Usado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_carta`
--

CREATE TABLE `estado_carta` (
  `idEstadoCarta` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estado_carta`
--

INSERT INTO `estado_carta` (`idEstadoCarta`, `descripcion`) VALUES
(1, 'Activo'),
(2, 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_facturacion`
--

CREATE TABLE `estado_facturacion` (
  `idEstadoFacturacion` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_subasta`
--

CREATE TABLE `estado_subasta` (
  `idEstadoSubasta` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estado_subasta`
--

INSERT INTO `estado_subasta` (`idEstadoSubasta`, `descripcion`) VALUES
(1, 'Activa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_usuario`
--

CREATE TABLE `estado_usuario` (
  `idEstadoUsuario` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estado_usuario`
--

INSERT INTO `estado_usuario` (`idEstadoUsuario`, `descripcion`) VALUES
(1, 'Activo'),
(2, 'Bloqueado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacion`
--

CREATE TABLE `facturacion` (
  `idFacturacion` int(11) NOT NULL,
  `idEstadoFacturacion` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaFactura` datetime NOT NULL,
  `resultado` varchar(45) NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `idSubasta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen_carta`
--

CREATE TABLE `imagen_carta` (
  `id` int(11) NOT NULL,
  `idCarta` int(11) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `imagen_carta`
--

INSERT INTO `imagen_carta` (`id`, `idCarta`, `imagen`) VALUES
(1, 1, 'pikachu-g025.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puja`
--

CREATE TABLE `puja` (
  `idPuja` int(11) NOT NULL,
  `montoOfertado` decimal(10,0) NOT NULL,
  `fechaPuja` datetime NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idSubasta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `puja`
--

INSERT INTO `puja` (`idPuja`, `montoOfertado`, `fechaPuja`, `idUsuario`, `idSubasta`) VALUES
(1, 1, '2026-02-11 08:55:00', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombre`) VALUES
(1, 'Vendedor'),
(2, 'Comprador'),
(3, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subasta`
--

CREATE TABLE `subasta` (
  `idSubasta` int(11) NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaCierre` datetime NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `incrementoMin` decimal(10,0) NOT NULL,
  `idEstadoSubasta` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCarta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `subasta`
--

INSERT INTO `subasta` (`idSubasta`, `fechaInicio`, `fechaCierre`, `precio`, `incrementoMin`, `idEstadoSubasta`, `idUsuario`, `idCarta`) VALUES
(1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `cedula` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idEstadoUsuario` int(11) NOT NULL,
  `fechaRegistro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `cedula`, `nombre`, `email`, `password`, `idRol`, `idEstadoUsuario`, `fechaRegistro`) VALUES
(1, '119330734', 'Dilan Sanchez Acuña', 'endrascorplay@gmail.com', '123456', 1, 1, '2026-02-11 08:55:00'),
(2, '1111111', 'jose ', 'ee', '11', 1, 1, '2026-02-11 08:55:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carta`
--
ALTER TABLE `carta`
  ADD PRIMARY KEY (`idcarta`),
  ADD KEY `fk_carta_usuario_idx` (`idUsuario`),
  ADD KEY `fk_carta_estado_idx` (`idEstadoCarta`),
  ADD KEY `fk_carta_condicion_idx` (`idCondicion`);

--
-- Indices de la tabla `carta_categoria`
--
ALTER TABLE `carta_categoria`
  ADD PRIMARY KEY (`idCarta`,`idCategoria`),
  ADD KEY `kf_categoria_idx` (`idCategoria`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `condicion`
--
ALTER TABLE `condicion`
  ADD PRIMARY KEY (`idCondicion`);

--
-- Indices de la tabla `estado_carta`
--
ALTER TABLE `estado_carta`
  ADD PRIMARY KEY (`idEstadoCarta`);

--
-- Indices de la tabla `estado_facturacion`
--
ALTER TABLE `estado_facturacion`
  ADD PRIMARY KEY (`idEstadoFacturacion`);

--
-- Indices de la tabla `estado_subasta`
--
ALTER TABLE `estado_subasta`
  ADD PRIMARY KEY (`idEstadoSubasta`);

--
-- Indices de la tabla `estado_usuario`
--
ALTER TABLE `estado_usuario`
  ADD PRIMARY KEY (`idEstadoUsuario`);

--
-- Indices de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD PRIMARY KEY (`idFacturacion`),
  ADD KEY `fk_facturacion_usuario_idx` (`idUsuario`),
  ADD KEY `fk_estado_facturacion_idx` (`idEstadoFacturacion`),
  ADD KEY `fk_facturacion_subasta_idx` (`idSubasta`);

--
-- Indices de la tabla `imagen_carta`
--
ALTER TABLE `imagen_carta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_imagen_carta_idx` (`idCarta`);

--
-- Indices de la tabla `puja`
--
ALTER TABLE `puja`
  ADD PRIMARY KEY (`idPuja`),
  ADD KEY `fk_puja_usuario_idx` (`idUsuario`),
  ADD KEY `fk_puja_subasta_idx` (`idSubasta`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `subasta`
--
ALTER TABLE `subasta`
  ADD PRIMARY KEY (`idSubasta`),
  ADD KEY `fk_subasta_estado_idx` (`idEstadoSubasta`),
  ADD KEY `fk_subasta_usuario_idx` (`idUsuario`),
  ADD KEY `fk_subasta_carta_idx` (`idCarta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `cedula_UNIQUE` (`cedula`),
  ADD UNIQUE KEY `correo_UNIQUE` (`email`),
  ADD KEY `fk_usuario_rol_idx` (`idRol`),
  ADD KEY `fk_usuario_estado_idx` (`idEstadoUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carta`
--
ALTER TABLE `carta`
  MODIFY `idcarta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `condicion`
--
ALTER TABLE `condicion`
  MODIFY `idCondicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_carta`
--
ALTER TABLE `estado_carta`
  MODIFY `idEstadoCarta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_facturacion`
--
ALTER TABLE `estado_facturacion`
  MODIFY `idEstadoFacturacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_subasta`
--
ALTER TABLE `estado_subasta`
  MODIFY `idEstadoSubasta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estado_usuario`
--
ALTER TABLE `estado_usuario`
  MODIFY `idEstadoUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  MODIFY `idFacturacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagen_carta`
--
ALTER TABLE `imagen_carta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `puja`
--
ALTER TABLE `puja`
  MODIFY `idPuja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `subasta`
--
ALTER TABLE `subasta`
  MODIFY `idSubasta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carta`
--
ALTER TABLE `carta`
  ADD CONSTRAINT `fk_carta_condicion` FOREIGN KEY (`idCondicion`) REFERENCES `condicion` (`idCondicion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_carta_estadoCarta` FOREIGN KEY (`idEstadoCarta`) REFERENCES `estado_carta` (`idEstadoCarta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_carta_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `carta_categoria`
--
ALTER TABLE `carta_categoria`
  ADD CONSTRAINT `fk_carta` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`idcarta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `kf_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD CONSTRAINT `fk_estado_facturacion` FOREIGN KEY (`idEstadoFacturacion`) REFERENCES `estado_facturacion` (`idEstadoFacturacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturacion_subasta` FOREIGN KEY (`idSubasta`) REFERENCES `subasta` (`idSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturacion_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `imagen_carta`
--
ALTER TABLE `imagen_carta`
  ADD CONSTRAINT `fk_imagen_carta` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`idcarta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `puja`
--
ALTER TABLE `puja`
  ADD CONSTRAINT `fk_puja_subasta` FOREIGN KEY (`idSubasta`) REFERENCES `subasta` (`idSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_puja_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `subasta`
--
ALTER TABLE `subasta`
  ADD CONSTRAINT `fk_subasta_carta` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`idcarta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_subasta_estado` FOREIGN KEY (`idEstadoSubasta`) REFERENCES `estado_subasta` (`idEstadoSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_subasta_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_estado` FOREIGN KEY (`idEstadoUsuario`) REFERENCES `estado_usuario` (`idEstadoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
