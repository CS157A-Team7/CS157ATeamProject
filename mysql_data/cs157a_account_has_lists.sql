-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cs157a
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `account_has_lists`
--

DROP TABLE IF EXISTS `account_has_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_has_lists` (
  `username` varchar(45) NOT NULL,
  `list_id` int(10) NOT NULL,
  PRIMARY KEY (`username`,`list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_has_lists`
--

LOCK TABLES `account_has_lists` WRITE;
/*!40000 ALTER TABLE `account_has_lists` DISABLE KEYS */;
INSERT INTO `account_has_lists` VALUES ('alice@aol.com',6),('alice@aol.com',11),('ash_ketchum@hotmail.com',3),('ash_ketchum@hotmail.com',15),('ash_ketchum@hotmail.com',19),('ash_ketchum@hotmail.com',20),('ash_ketchum@hotmail.com',21),('bill@aol.com',12),('bill@aol.com',28),('ching-seh.wu@sjsu.edu',14),('ching-seh.wu@sjsu.edu',23),('ching-seh.wu@sjsu.edu',29),('dr.seuss@yahoo.com',1),('dr.seuss@yahoo.com',16),('emily@yahoo.com',12),('emily@yahoo.com',22),('emily@yahoo.com',28),('eric@gmail.com',7),('eric@gmail.com',8),('freddy.krueger@hotmail.com',24),('holly@gmail.com',31),('holly@gmail.com',32),('josh.peck@aol.com',5),('sam@aol.com',30),('sarah@gmail.com',2),('sarah@gmail.com',13),('sarah@gmail.com',17),('sarah@gmail.com',25),('sarah@gmail.com',28),('ted.mosby@gmail.com',18),('Ted.Stroehmann@yahoo.com',3),('Ted.Stroehmann@yahoo.com',4),('Yu.Narukami@yahoo.jp',9),('Yu.Narukami@yahoo.jp',10);
/*!40000 ALTER TABLE `account_has_lists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-06 11:07:05
