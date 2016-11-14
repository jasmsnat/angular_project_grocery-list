CREATE TABLE `personrepository`.`grocerylist` (
  `itemid` INT NOT NULL AUTO_INCREMENT,
  `shopdate` DATE NULL,
  `itemname` VARCHAR(45) NULL,
  `unitprice` INT NULL,
  `itemquantity` INT NULL,
  PRIMARY KEY (`itemid`),
  UNIQUE INDEX `itemid_UNIQUE` (`itemid` ASC));

ALTER TABLE `personrepository`.`grocerylist` 
CHANGE COLUMN `shopdate` `shopdate` VARCHAR(10) NULL DEFAULT NULL ;

ALTER TABLE `personrepository`.`grocerylist` 
CHANGE COLUMN `unitprice` `unitprice` DECIMAL(5,2) ZEROFILL NULL DEFAULT NULL ;

ALTER TABLE `personrepository`.`grocerylist` 
CHANGE COLUMN `itemquantity` `itemquantity` INT(2) NULL DEFAULT NULL ;
