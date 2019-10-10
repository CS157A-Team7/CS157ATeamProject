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
-- Table structure for table `collaborates_on`
--

DROP TABLE IF EXISTS `collaborates_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collaborates_on` (
  `username` varchar(45) NOT NULL,
  `list_id` int(11) NOT NULL,
  PRIMARY KEY (`username`,`list_id`),
  KEY `list_id_idx` (`list_id`),
  CONSTRAINT `collaborator` FOREIGN KEY (`username`) REFERENCES `account` (`username`),
  CONSTRAINT `surprise_wishlist_id` FOREIGN KEY (`list_id`) REFERENCES `surprise_wishlist` (`list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaborates_on`
--

LOCK TABLES `collaborates_on` WRITE;
/*!40000 ALTER TABLE `collaborates_on` DISABLE KEYS */;
INSERT INTO `collaborates_on` VALUES ('dr.seuss@yahoo.com',125),('eric@gmail.com',125),('freddy.krueger@hotmail.com',125),('jason.vorhees@gmail.com',125),('sam@aol.com',125),('Yu.Narukami@yahoo.jp',125),('alice@aol.com',129),('ash_ketchum@hotmail.com',129),('bill@aol.com',129),('emily@yahoo.com',129),('josh.peck@aol.com',129),('sam@aol.com',129),('sarah@gmail.com',129),('ted.mosby@gmail.com',129),('Ted.Stroehmann@yahoo.com',129);
/*!40000 ALTER TABLE `collaborates_on` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-10 15:06:39
