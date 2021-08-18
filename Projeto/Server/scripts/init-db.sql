-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mathool
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mathool
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mathool` DEFAULT CHARACTER SET utf8 ;
USE `mathool` ;

-- -----------------------------------------------------
-- Table `mathool`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `guid` VARCHAR(38) NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `classCode` VARCHAR(10) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `guid_UNIQUE` (`guid` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`Questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`Questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `level` INT NOT NULL,
  `operation` CHAR NOT NULL,
  `expression` VARCHAR(45) NOT NULL,
  `expectedResult` FLOAT NOT NULL,
  `isLast` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_question_users_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_question_users`
    FOREIGN KEY (`userId`)
    REFERENCES `mathool`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`Variables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`Variables` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `value` INT NOT NULL,
  `questionId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_variables_question_idx` (`questionId` ASC) VISIBLE,
  CONSTRAINT `fk_variables_question`
    FOREIGN KEY (`questionId`)
    REFERENCES `mathool`.`Questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `questionId` INT NOT NULL,
  `userId` INT NOT NULL,
  `isLast` TINYINT(1) NOT NULL DEFAULT 1,
  `rightAnswer` TINYINT(1) NULL,
  `response` FLOAT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_answers_question_idx` (`questionId` ASC) VISIBLE,
  INDEX `fk_answers_users_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_answers_question`
    FOREIGN KEY (`questionId`)
    REFERENCES `mathool`.`Questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_answers_users`
    FOREIGN KEY (`userId`)
    REFERENCES `mathool`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('QUESTION_CREATED', 'ANSWER_CREATED') NOT NULL,
  `userId` INT NOT NULL,
  `questionId` INT NULL,
  `answerId` INT NULL,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_logs_question_idx` (`questionId` ASC) VISIBLE,
  INDEX `fk_logs_answers_idx` (`answerId` ASC) VISIBLE,
  INDEX `fk_logs_users_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_logs_question`
    FOREIGN KEY (`questionId`)
    REFERENCES `mathool`.`Questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_logs_answers`
    FOREIGN KEY (`answerId`)
    REFERENCES `mathool`.`answers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_logs_users`
    FOREIGN KEY (`userId`)
    REFERENCES `mathool`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
