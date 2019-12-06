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
-- Table structure for table `friends_with`
--

DROP TABLE IF EXISTS `friends_with`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends_with` (
  `Username 1` varchar(45) NOT NULL,
  `Username 2` varchar(45) NOT NULL,
  PRIMARY KEY (`Username 1`,`Username 2`),
  KEY `Username 2_idx` (`Username 2`),
  CONSTRAINT `Username1` FOREIGN KEY (`Username 1`) REFERENCES `account` (`username`),
  CONSTRAINT `Username2` FOREIGN KEY (`Username 2`) REFERENCES `account` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends_with`
--

LOCK TABLES `friends_with` WRITE;
/*!40000 ALTER TABLE `friends_with` DISABLE KEYS */;
INSERT INTO `friends_with` VALUES ('ching-seh.wu@sjsu.edu','alice@aol.com'),('emily@yahoo.com','alice@aol.com'),('ching-seh.wu@sjsu.edu','ash_ketchum@hotmail.com'),('ash_ketchum@hotmail.com','bill@aol.com'),('ching-seh.wu@sjsu.edu','bill@aol.com'),('holly@gmail.com','bill@aol.com'),('ching-seh.wu@sjsu.edu','emily@yahoo.com'),('dr.seuss@yahoo.com','eric@gmail.com'),('dr.seuss@yahoo.com','freddy.krueger@hotmail.com'),('ching-seh.wu@sjsu.edu','josh.peck@aol.com'),('ash_ketchum@hotmail.com','sam@aol.com'),('dr.seuss@yahoo.com','sam@aol.com'),('ching-seh.wu@sjsu.edu','sarah@gmail.com'),('ching-seh.wu@sjsu.edu','Ted.Stroehmann@yahoo.com'),('dr.seuss@yahoo.com','Yu.Narukami@yahoo.jp'),('eric@gmail.com','Yu.Narukami@yahoo.jp');
/*!40000 ALTER TABLE `friends_with` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-06 11:07:06
