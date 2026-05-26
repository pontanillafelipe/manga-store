-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: manga_store
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '8ea6dedf-2310-11f1-b9df-047c161821d4:1-78';

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `manga_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `manga_id` (`manga_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,1,1,2);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Shonen'),(2,'Seinen'),(3,'Shojo'),(4,'Isekai');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mangas`
--

DROP TABLE IF EXISTS `mangas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mangas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int DEFAULT '0',
  `description` text,
  `image_url` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `mangas_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mangas`
--

LOCK TABLES `mangas` WRITE;
/*!40000 ALTER TABLE `mangas` DISABLE KEYS */;
INSERT INTO `mangas` VALUES (1,'One Piece Vol. 1','Eiichiro Oda',9990,6,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1774317404185_OnePiece1.jpg',1,'2026-03-18 21:36:21'),(2,'Berserk Vol. 1','Kentaro Miura',14990,9,'Berserk narra la historia de Guts, un guerrero solitario marcado por un oscuro destino que recorre un mundo medieval brutal lleno de guerras, demonios y traiciones. Armado con su enorme espada, lucha por sobrevivir mientras busca venganza contra Griffith, el hombre que cambió su vida para siempre tras un trágico acontecimiento conocido como el Eclipse.','/uploads/mangas/1774319732998_Berserk1.jpg',NULL,'2026-03-18 22:19:58'),(4,'One Piece Vol. 2','Eiichiro Oda',9990,8,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1774317781952_OnePiece2.jpg',NULL,'2026-03-20 23:33:34'),(5,'Naruto Vol.1','Masashi Kishimoto',9990,9,'Naruto sigue la historia de Naruto Uzumaki, un joven ninja rechazado por su aldea que sueña con convertirse en el Hokage, el líder más fuerte y respetado de su pueblo. Mientras entrena y completa misiones junto a sus compañeros, Naruto lucha por demostrar su valor, proteger a quienes quiere y controlar el poder del Kurama, el demonio sellado dentro de él.','/uploads/mangas/1774317467080_Naruto1.jpg',NULL,'2026-03-21 03:52:33'),(7,'Vagabond Vol. 1','Takehiko Inoue',9990,10,'Vagabond sigue la vida de Miyamoto Musashi, un joven espadachín que recorre el Japón feudal en busca de convertirse en el guerrero más fuerte. A través de intensos duelos, encuentros con poderosos rivales como Sasaki Kojiro y profundas reflexiones sobre la vida y la muerte, Musashi emprende un camino de crecimiento personal, disciplina y autodescubrimiento.','/uploads/mangas/1774319722034_Vagabond1.jpg',NULL,'2026-03-22 06:10:23'),(8,'One Piece Vol. 3','Eiichiro Oda',9990,10,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1774315501810_OnePiece3.jpg',NULL,'2026-03-24 01:25:01'),(9,'Naruto Vol. 2','Masashi Kishimoto',9990,10,'Naruto sigue la historia de Naruto Uzumaki, un joven ninja rechazado por su aldea que sueña con convertirse en el Hokage, el líder más fuerte y respetado de su pueblo. Mientras entrena y completa misiones junto a sus compañeros, Naruto lucha por demostrar su valor, proteger a quienes quiere y controlar el poder del Kurama, el demonio sellado dentro de él.','/uploads/mangas/1774319312155_Naruto2.jpg',NULL,'2026-03-24 02:28:32'),(10,'Vinland Saga Vol. 1','Makoto Yukimura',9990,9,'Vinland Saga sigue la historia de Thorfinn, un joven guerrero vikingo que crece en medio de la violencia y las guerras por el poder en Europa. Consumido por el deseo de vengar la muerte de su padre, Thorfinn se une al grupo del astuto mercenario Askeladd, iniciando un duro camino de batallas, supervivencia y búsqueda de sentido en un mundo marcado por la guerra.','/uploads/mangas/1774319527882_Vinland1.jpg',NULL,'2026-03-24 02:32:07'),(11,'Vinland Saga Vol. 2','Makoto Yukimura',9990,9,'Vinland Saga sigue la historia de Thorfinn, un joven guerrero vikingo que crece en medio de la violencia y las guerras por el poder en Europa. Consumido por el deseo de vengar la muerte de su padre, Thorfinn se une al grupo del astuto mercenario Askeladd, iniciando un duro camino de batallas, supervivencia y búsqueda de sentido en un mundo marcado por la guerra.','/uploads/mangas/1774319556885_Vinland2.jpg',NULL,'2026-03-24 02:32:36'),(12,'Berserk Vol. 2','Kentaro Miura',9990,10,'Berserk narra la historia de Guts, un guerrero solitario marcado por un oscuro destino que recorre un mundo medieval brutal lleno de guerras, demonios y traiciones. Armado con su enorme espada, lucha por sobrevivir mientras busca venganza contra Griffith, el hombre que cambió su vida para siempre tras un trágico acontecimiento conocido como el Eclipse.','/uploads/mangas/1774319766356_Berserk2.jpg',NULL,'2026-03-24 02:36:06'),(13,'20th Century Boys','Naoki Urasawa',9990,9,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1774491239289_20Century1.jpg',NULL,'2026-03-26 02:13:59');
/*!40000 ALTER TABLE `mangas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `manga_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `manga_id` (`manga_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (2,2,1,1,9990),(3,3,2,1,14990),(4,3,1,1,9990),(5,3,4,1,9990),(6,4,5,1,9990),(7,4,4,1,9990),(8,5,13,1,9990),(9,5,10,1,9990),(10,5,11,1,9990);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total` double DEFAULT NULL,
  `status` varchar(50) DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,1,9990,'PENDING','2026-03-20 22:26:46','2026-03-20 19:26:46.684028'),(3,1,34970,'PENDING','2026-03-21 03:04:33','2026-03-21 00:04:33.589701'),(4,1,19980,'PENDING','2026-03-26 01:43:24','2026-03-25 22:43:24.808708'),(5,1,29970,'PENDING','2026-03-26 05:19:22','2026-03-26 02:19:22.806549');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'USER',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Felipe','felipe@test.com','123456','USER','2026-03-18 21:32:08');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'manga_store'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-14 15:58:13
