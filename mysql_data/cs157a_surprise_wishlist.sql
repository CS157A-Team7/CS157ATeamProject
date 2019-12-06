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
-- Table structure for table `surprise_wishlist`
--

DROP TABLE IF EXISTS `surprise_wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surprise_wishlist` (
  `list_id` int(11) NOT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `type` int(1) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surprise_wishlist`
--

LOCK TABLES `surprise_wishlist` WRITE;
/*!40000 ALTER TABLE `surprise_wishlist` DISABLE KEYS */;
INSERT INTO `surprise_wishlist` VALUES (16,'ash_ketchum@hotmail.com',0,'2019-10-08'),(18,'ted.mosby@gmail.com',0,'2019-11-26'),(19,'ash_ketchum@hotmail.com',0,'2019-10-10'),(21,'ash_ketchum@hotmail.com',0,'2019-10-09'),(22,'emily@yahoo.com',0,'2019-12-25'),(25,'sarah@gmail.com',0,NULL),(29,'ching-seh.wu@sjsu.edu',0,'2019-10-31'),(30,'sam@aol.com',0,'2020-05-22'),(32,'holly@gmail.com',0,NULL),(33,'holly@gmail.com',1,NULL),(116,'ash_ketchum@hotmail.com',1,'2019-01-08'),(118,'ted.mosby@gmail.com',1,'2019-11-26'),(121,'ash_ketchum@hotmail.com',1,'2019-10-09'),(122,'emily@yahoo.com',1,'2019-12-25'),(125,'sarah@gmail.com',1,NULL),(129,'ching-seh.wu@sjsu.edu',1,'2019-10-31'),(130,'sam@aol.com',1,'2020-05-22');
/*!40000 ALTER TABLE `surprise_wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-06 11:07:08
