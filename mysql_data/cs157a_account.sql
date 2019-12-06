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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('alice@aol.com','be291720fb3b4f4ddef85fc9d5db360e'),('another.user@gmail.com','c1e72a9a76e78ffc5ec25c22097ad117'),('ash_ketchum@hotmail.com','e7ceed80cb0072b5bb44a382942917bb'),('bill@aol.com','88e160ee7c882b8ec6ac8ea47a210a3a'),('ching-seh.wu@sjsu.edu','06e36249d57436bf1c963c7cdf859b5b'),('dr.seuss@yahoo.com','9b32418c826a7de5f5baac397b4ed2cb'),('emily@yahoo.com','f8b4cbcfe2c53245815a786f684d4947'),('eric@gmail.com','6e1614a7baf22cc87c0dd35fc0f12e93'),('freddy.krueger@hotmail.com','76e081625586fccc2d54054f25050406'),('holly@gmail.com','b9fbb86c466fd803bab77478aa31c419'),('jason.vorhees@gmail.com','e778a0d2ef87f07fc0599c0b40ecd33e'),('josh.peck@aol.com','1f6f7b5b7fe94d315d2b500b0d0d1b16'),('sam@aol.com','2e6a07f88296238ce947210b950b44bd'),('sarah@gmail.com','7b7d5e7bc24697940b9985b7033f0b2e'),('ted.mosby@gmail.com','22300e065792ab59064d0fe676fe880a'),('Ted.Stroehmann@yahoo.com','22300e065792ab59064d0fe676fe880a'),('Yu.Narukami@yahoo.jp','a704dd0f4fd563425c0c83588b97eaba');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-06 11:07:04
