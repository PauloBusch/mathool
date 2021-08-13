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
-- Table `mathool`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`users` (
  `id` INT NOT NULL,
  `guid` VARCHAR(38) NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  `class_code` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `guid_UNIQUE` (`guid` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `level` INT NOT NULL,
  `operation` CHAR NOT NULL,
  `expression` VARCHAR(45) NOT NULL,
  `expected_result` FLOAT NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_question_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_question_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mathool`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`variables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`variables` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `value` INT NOT NULL,
  `question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_variables_question_idx` (`question_id` ASC) VISIBLE,
  CONSTRAINT `fk_variables_question`
    FOREIGN KEY (`question_id`)
    REFERENCES `mathool`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`answers` (
  `id` INT NOT NULL,
  `question_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `is_last` TINYINT(1) NULL,
  `right_answer` TINYINT(1) NULL,
  `response` FLOAT NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_answers_question_idx` (`question_id` ASC) VISIBLE,
  INDEX `fk_answers_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_answers_question`
    FOREIGN KEY (`question_id`)
    REFERENCES `mathool`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_answers_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mathool`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mathool`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mathool`.`logs` (
  `id` INT NOT NULL,
  `type` ENUM('QUESTION_CREATED', 'ANSWER_CREATED') NOT NULL,
  `user_id` INT NOT NULL,
  `question_id` INT NULL,
  `answer_id` INT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_logs_question_idx` (`question_id` ASC) VISIBLE,
  INDEX `fk_logs_answer_idx` (`answer_id` ASC) VISIBLE,
  INDEX `fk_logs_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_logs_question`
    FOREIGN KEY (`question_id`)
    REFERENCES `mathool`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_logs_answers`
    FOREIGN KEY (`answer_id`)
    REFERENCES `mathool`.`answers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_logs_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mathool`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
