-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema agilefood
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema agilefood
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `agilefood` DEFAULT CHARACTER SET latin1 ;
USE `agilefood` ;

-- -----------------------------------------------------
-- Table `agilefood`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agilefood`.`productos` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `precio` DECIMAL(10,0) NOT NULL,
  `descuento` INT NULL DEFAULT NULL,
  `categoria` VARCHAR(100) NULL DEFAULT NULL,
  `clasificacion` VARCHAR(100) NULL DEFAULT NULL,
  `puntaje` DECIMAL(2,2) NULL DEFAULT NULL,
  `stock` INT NOT NULL,
  `descripcion` VARCHAR(300) NULL DEFAULT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idProducto`),
  CONSTRAINT `producto-carrito`
    FOREIGN KEY (`idProducto`)
    REFERENCES `agilefood`.`carritos` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `agilefood`.`carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agilefood`.`carritos` (
  `idcarrito` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idProducto` INT NOT NULL,
  PRIMARY KEY (`idcarrito`),
  INDEX `carrito-usuario_idx` (`idUsuario` ASC),
  INDEX `carrito-producto_idx` (`idProducto` ASC),
  CONSTRAINT `carrito-usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `agilefood`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `carrito-producto`
    FOREIGN KEY (`idProducto`)
    REFERENCES `agilefood`.`productos` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agilefood`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agilefood`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  `dni` INT(8) NULL,
  `email` VARCHAR(100) NOT NULL,
  `constraseña` VARCHAR(100) NOT NULL,
  `idDomicilio` INT NULL DEFAULT NULL,
  `categoria` VARCHAR(100) NULL DEFAULT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  INDEX `usuario-carrito_idx` (`idUsuario` ASC),
  PRIMARY KEY (`idUsuario`),
  CONSTRAINT `usuario-carrito`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `agilefood`.`carritos` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `usuario-domicilio`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `agilefood`.`domicilios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `agilefood`.`domicilios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agilefood`.`domicilios` (
  `idDomicilio` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(11) NOT NULL,
  `calle` VARCHAR(100) NOT NULL,
  `altura` INT(11) NOT NULL,
  `departamento` VARCHAR(100) NULL DEFAULT NULL,
  `localidad` VARCHAR(100) NOT NULL,
  `provincia` VARCHAR(100) NOT NULL,
  `pais` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(300) NULL DEFAULT NULL,
  `codigo_postal` INT(11) NOT NULL,
  PRIMARY KEY (`idDomicilio`),
  INDEX `carrito-usuario_idx` (`idUsuario` ASC),
  CONSTRAINT `domicilio-usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `agilefood`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
