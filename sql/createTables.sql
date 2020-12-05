CREATE TABLE IF NOT EXISTS `drivers` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `age` varchar(45) NOT NULL,
  `vehicle_number` varchar(45) NOT NULL,
  `vehicle_model` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

DELETE FROM `drivers`;



CREATE TABLE IF NOT EXISTS `driver_locations` (
  `id` INT NOT NULL,
  `lat` DECIMAL(10,8) NOT NULL,
  `long` DECIMAL(11,8) NOT NULL,
  `driverId` INT NOT NULL,
  PRIMARY KEY (`id`, `long`, `lat`),
  INDEX `driver_idx` (`driverId` ASC) VISIBLE,
  CONSTRAINT `driver`
    FOREIGN KEY (`driverId`)
    REFERENCES `drivers` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

DELETE FROM `driver_locations`;
