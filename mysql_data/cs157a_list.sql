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
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,'Homework','Homework I need to get done.'),(2,'House Chores','Chores I need to get done for today.'),(3,'Programming Tasks','Task I need to get done for the day'),(4,'Food Prep','Dishes I need to prep for the day'),(5,'Yard Work','Yard work I need to get done.'),(6,'Errands','Errands I need to run.'),(7,'Things I need to watch','Movies I need to watch'),(8,'Jobs to Apply to','Jobs I need to apply to'),(9,'Things to look up on',NULL),(10,'Games to play','Games I got to play'),(11,'Game Dev stuff','Task I need to do for Game Dev'),(12,'Essay Research','Things I need to research for my paper'),(13,'Things I need to research for my Novel',NULL),(14,'Finals to study for',NULL),(15,'Shows to watch','Shows I need to watch for motivation for finals :('),(16,'Dr. Seuss books','Getting all the Dr. Seuss books'),(17,'Garden Tools','Tools I need to buy!'),(18,'Sitcom DVD box sets','Don\'t really need them, but why not.'),(19,'Pokemon Plushies','Gotta have them all!'),(20,'Switch games','I need mroe GAMES!'),(21,'Board games','New additions for Game Night!'),(22,'Gift cards','Places that I shop from.'),(23,'Textbooks','Need to get these ASAP!'),(24,'Vegan Food','The only stuff I like.'),(25,'Things I want','Random stuff I want'),(26,'Secret','For my secret collection.'),(27,'Art supplies','Things I need to resupply on'),(28,'BBQ Stuff','Favorite BBQ stuff'),(29,'Dr. Mike\'s wedding',NULL),(30,'Figurines','I need them!');
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-04 15:16:51
