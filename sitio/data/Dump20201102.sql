-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: agilefood
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carritos` (
  `idcarrito` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  PRIMARY KEY (`idcarrito`),
  KEY `carrito-usuario_idx` (`idUsuario`),
  KEY `carrito-producto_idx` (`idProducto`),
  CONSTRAINT `carrito-producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `carrito-usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (5,'Hamburguesas'),(6,'Empanadas'),(7,'Pizzas'),(8,'Tartas');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasificaciones`
--

DROP TABLE IF EXISTS `clasificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clasificaciones` (
  `idClasificacion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idClasificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasificaciones`
--

LOCK TABLES `clasificaciones` WRITE;
/*!40000 ALTER TABLE `clasificaciones` DISABLE KEYS */;
INSERT INTO `clasificaciones` VALUES (3,'Oferta del dia'),(4,'Más vendidos'),(5,'Sector saludable'),(6,'Bebidas'),(7,'Recomendaciones del chef');
/*!40000 ALTER TABLE `clasificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilios`
--

DROP TABLE IF EXISTS `domicilios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domicilios` (
  `idDomicilio` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `altura` int(11) NOT NULL,
  `departamento` varchar(100) DEFAULT NULL,
  `localidad` varchar(100) NOT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `codigo_postal` int(11) NOT NULL,
  PRIMARY KEY (`idDomicilio`),
  KEY `carrito-usuario_idx` (`idUsuario`),
  CONSTRAINT `domicilio-usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilios`
--

LOCK TABLES `domicilios` WRITE;
/*!40000 ALTER TABLE `domicilios` DISABLE KEYS */;
INSERT INTO `domicilios` VALUES (11,25,'Olegario V. Andrade',976,'','Bella Vista',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `domicilios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descuento` int(2) DEFAULT NULL,
  `idCategoria` int(11) NOT NULL,
  `idClasificacion` int(11) NOT NULL,
  `puntaje` decimal(2,2) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `fk_productos_categoria_idx` (`idCategoria`),
  KEY `fk_producto_clasificacion_idx` (`idClasificacion`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_clasificacion` FOREIGN KEY (`idClasificacion`) REFERENCES `clasificaciones` (`idClasificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (24,'Pizza Fugazzeta',300,5,7,7,NULL,10,'Pizza con una masa alta, crocante, cubierta con muzzarella y cebolla caramelizada, con un pequeño rocio de provolone y oregano','image-1604304153606.jpg'),(25,'Empanada de Jamón y queso',100,10,6,4,NULL,10,'Empanada elaborada con una masa crocante, rellena de jamón y queso','image-1604313911014.jpg'),(29,'Tarta de acelga',250,10,8,5,NULL,5,'Tarta de masa crocante. con un relleno de acelga, morrones, cebolla, huevo, queso y picadillo','image-1604314403319.jpg'),(30,'Hamburguesa con cheddar',320,11,5,4,NULL,12,'Hamburguesa, doble carne, doble queso, huevo, bacón, bañada con cheddar, una delicia!','image-1604314650216.jpg'),(31,'Tarta de Jamón y Queso',300,20,8,3,NULL,15,'Tarta de masa crocante, rellena de jamón, queso, huevo, y finas hiervas.','image-1604314835921.jpg');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` int(8) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `idDomicilio` int(11) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `id_UNIQUE` (`idUsuario`),
  KEY `usuario-carrito_idx` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (25,'Julian','Aquino',NULL,'julian.eduardo.aquino@gmail.com','$2b$10$Hix6xEa0HwuH26D0FdcL.u2Dk2uqrPosdclHd7p9U36.pdCnQ8NFu',11,'Administrador','image-1604274302509.jpg');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-02  9:20:51
