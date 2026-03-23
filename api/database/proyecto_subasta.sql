-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto_subasta
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carta`
--

DROP TABLE IF EXISTS `carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carta` (
  `idCarta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idEstadoCarta` int(11) NOT NULL,
  `idCondicion` int(11) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  PRIMARY KEY (`idCarta`),
  KEY `fk_carta_usuario_idx` (`idUsuario`),
  KEY `fk_carta_estado_idx` (`idEstadoCarta`),
  KEY `fk_carta_condicion_idx` (`idCondicion`),
  CONSTRAINT `fk_carta_condicion` FOREIGN KEY (`idCondicion`) REFERENCES `condicion` (`idCondicion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_carta_estadoCarta` FOREIGN KEY (`idEstadoCarta`) REFERENCES `estado_carta` (`idEstadoCarta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_carta_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta`
--

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;
INSERT INTO `carta` VALUES (1,'Pikachu','carta pokemon tcg',1,1,1,'2026-02-11 08:55:00'),(2,'Pocion','carta pokemon tcg',1,1,2,'2026-02-11 08:55:00'),(3,'Poliwhirl','Carta pokemon tcg',1,1,3,'2026-02-11 08:55:00'),(4,'Latios','Pokemon legendario',1,1,1,'2026-03-22 23:20:08'),(5,'Latias','Pokemon legendario',1,1,1,'2026-03-22 23:20:26'),(6,'Mew','Pokemon legendario',1,1,1,'2026-03-22 23:21:12');
/*!40000 ALTER TABLE `carta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carta_categoria`
--

DROP TABLE IF EXISTS `carta_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carta_categoria` (
  `idCarta` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  PRIMARY KEY (`idCarta`,`idCategoria`),
  KEY `kf_categoria_idx` (`idCategoria`),
  CONSTRAINT `fk_carta` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`idCarta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `kf_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta_categoria`
--

LOCK TABLES `carta_categoria` WRITE;
/*!40000 ALTER TABLE `carta_categoria` DISABLE KEYS */;
INSERT INTO `carta_categoria` VALUES (1,1),(1,4),(2,2),(3,1),(3,6),(4,1),(4,6),(5,1),(5,6),(6,1),(6,4),(6,5),(6,6);
/*!40000 ALTER TABLE `carta_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Pokemon'),(2,'Objeto'),(3,'Entrenador'),(4,'Electrico'),(5,'Fuego'),(6,'Agua');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condicion`
--

DROP TABLE IF EXISTS `condicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condicion` (
  `idCondicion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idCondicion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condicion`
--

LOCK TABLES `condicion` WRITE;
/*!40000 ALTER TABLE `condicion` DISABLE KEYS */;
INSERT INTO `condicion` VALUES (1,'Nuevo'),(2,'Usado'),(3,'Gradeada');
/*!40000 ALTER TABLE `condicion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_carta`
--

DROP TABLE IF EXISTS `estado_carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_carta` (
  `idEstadoCarta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoCarta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_carta`
--

LOCK TABLES `estado_carta` WRITE;
/*!40000 ALTER TABLE `estado_carta` DISABLE KEYS */;
INSERT INTO `estado_carta` VALUES (1,'Disponible'),(2,'No Disponible'),(3,'Agotada');
/*!40000 ALTER TABLE `estado_carta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_facturacion`
--

DROP TABLE IF EXISTS `estado_facturacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_facturacion` (
  `idEstadoFacturacion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoFacturacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_facturacion`
--

LOCK TABLES `estado_facturacion` WRITE;
/*!40000 ALTER TABLE `estado_facturacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado_facturacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_subasta`
--

DROP TABLE IF EXISTS `estado_subasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_subasta` (
  `idEstadoSubasta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoSubasta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_subasta`
--

LOCK TABLES `estado_subasta` WRITE;
/*!40000 ALTER TABLE `estado_subasta` DISABLE KEYS */;
INSERT INTO `estado_subasta` VALUES (1,'Activa'),(2,'Finalizada'),(3,'Cancelada');
/*!40000 ALTER TABLE `estado_subasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_usuario`
--

DROP TABLE IF EXISTS `estado_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_usuario` (
  `idEstadoUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_usuario`
--

LOCK TABLES `estado_usuario` WRITE;
/*!40000 ALTER TABLE `estado_usuario` DISABLE KEYS */;
INSERT INTO `estado_usuario` VALUES (1,'Activo'),(2,'Bloqueado'),(3,'Inactivo');
/*!40000 ALTER TABLE `estado_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturacion`
--

DROP TABLE IF EXISTS `facturacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturacion` (
  `idFacturacion` int(11) NOT NULL AUTO_INCREMENT,
  `idEstadoFacturacion` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaFactura` datetime NOT NULL,
  `resultado` varchar(45) NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `idSubasta` int(11) NOT NULL,
  PRIMARY KEY (`idFacturacion`),
  KEY `fk_facturacion_usuario_idx` (`idUsuario`),
  KEY `fk_estado_facturacion_idx` (`idEstadoFacturacion`),
  KEY `fk_facturacion_subasta_idx` (`idSubasta`),
  CONSTRAINT `fk_estado_facturacion` FOREIGN KEY (`idEstadoFacturacion`) REFERENCES `estado_facturacion` (`idEstadoFacturacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_facturacion_subasta` FOREIGN KEY (`idSubasta`) REFERENCES `subasta` (`idSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_facturacion_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturacion`
--

LOCK TABLES `facturacion` WRITE;
/*!40000 ALTER TABLE `facturacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `facturacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen_carta`
--

DROP TABLE IF EXISTS `imagen_carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen_carta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCarta` int(11) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_imagen_carta_idx` (`idCarta`),
  CONSTRAINT `fk_imagen_carta` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`idCarta`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen_carta`
--

LOCK TABLES `imagen_carta` WRITE;
/*!40000 ALTER TABLE `imagen_carta` DISABLE KEYS */;
INSERT INTO `imagen_carta` VALUES (1,1,'pikachu-g025.png'),(2,1,'tcg-card-back.jpg'),(3,2,'pocion-g188.png'),(4,2,'tcg-card-back.jpg'),(5,3,'poliwhirl-g176.jpg'),(6,3,'tcg-card-back.jpg'),(7,4,'carta-69c0cd887a2ee.jpg'),(8,4,'carta-69c0cd887df9f.jpg'),(9,5,'carta-69c0cd9a72a03.jpg'),(10,6,'carta-69c0cdc850151.jpg'),(11,6,'carta-69c0cdc854cd7.jpg');
/*!40000 ALTER TABLE `imagen_carta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puja`
--

DROP TABLE IF EXISTS `puja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puja` (
  `idPuja` int(11) NOT NULL AUTO_INCREMENT,
  `montoOfertado` decimal(10,0) NOT NULL,
  `fechaPuja` datetime NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idSubasta` int(11) NOT NULL,
  PRIMARY KEY (`idPuja`),
  KEY `fk_puja_usuario_idx` (`idUsuario`),
  KEY `fk_puja_subasta_idx` (`idSubasta`),
  CONSTRAINT `fk_puja_subasta` FOREIGN KEY (`idSubasta`) REFERENCES `subasta` (`idSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_puja_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puja`
--

LOCK TABLES `puja` WRITE;
/*!40000 ALTER TABLE `puja` DISABLE KEYS */;
INSERT INTO `puja` VALUES (1,1,'2026-02-11 08:55:00',2,1),(2,1000,'2026-02-11 08:55:00',2,1),(3,50000,'2026-08-11 08:55:00',2,2),(4,200,'2026-03-04 18:00:00',2,3),(5,1500,'2026-03-04 18:00:00',2,4),(6,4000,'2026-03-04 18:00:00',2,4);
/*!40000 ALTER TABLE `puja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Vendedor'),(2,'Comprador'),(3,'Administrador');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subasta`
--

DROP TABLE IF EXISTS `subasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subasta` (
  `idSubasta` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime NOT NULL,
  `fechaCierre` datetime NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `incrementoMin` decimal(10,0) NOT NULL,
  `idEstadoSubasta` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCarta` int(11) NOT NULL,
  PRIMARY KEY (`idSubasta`),
  KEY `fk_subasta_estado_idx` (`idEstadoSubasta`),
  KEY `fk_subasta_usuario_idx` (`idUsuario`),
  KEY `fk_subasta_carta_idx` (`idCarta`),
  CONSTRAINT `fk_subasta_carta` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`idCarta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_subasta_estado` FOREIGN KEY (`idEstadoSubasta`) REFERENCES `estado_subasta` (`idEstadoSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_subasta_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subasta`
--

LOCK TABLES `subasta` WRITE;
/*!40000 ALTER TABLE `subasta` DISABLE KEYS */;
INSERT INTO `subasta` VALUES (1,'2026-03-01 18:00:00','2026-03-05 18:00:00',2,2,1,1,1),(2,'2026-02-10 18:00:00','2026-02-28 18:00:00',5,10,2,1,1),(3,'2026-03-02 18:00:00','2026-03-10 18:00:00',1000,100,2,1,2),(4,'2026-03-02 18:00:00','2026-03-10 18:00:00',20000,1000,2,1,3),(5,'2026-03-23 05:25:00','2026-10-22 05:21:00',10000,100,1,1,4),(6,'2026-03-22 09:22:00','2026-11-13 05:22:00',20000,111,1,1,5),(7,'2026-03-21 05:22:00','2026-10-08 05:22:00',90000,2000,1,1,2),(8,'2026-03-23 05:26:00','2026-11-19 05:23:00',40000,135,1,1,3),(9,'2026-03-23 05:26:00','2026-05-03 05:28:00',12312,5555,1,1,6);
/*!40000 ALTER TABLE `subasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idEstadoUsuario` int(11) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `cedula_UNIQUE` (`cedula`),
  UNIQUE KEY `correo_UNIQUE` (`email`),
  KEY `fk_usuario_rol_idx` (`idRol`),
  KEY `fk_usuario_estado_idx` (`idEstadoUsuario`),
  CONSTRAINT `fk_usuario_estado` FOREIGN KEY (`idEstadoUsuario`) REFERENCES `estado_usuario` (`idEstadoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'119330734','Dilan Sanchez Acuña','endrascorplay@gmail.com','123456',1,1,'2026-02-11 08:55:00'),(2,'1111111','jose ','ee','11',2,1,'2026-02-11 08:55:00'),(3,'5343545','Kendall','admin554@gmail.com','123456',3,1,'2026-03-02 08:55:00');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-22 23:26:04
