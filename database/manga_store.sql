-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: manga_store
-- ------------------------------------------------------
-- Server version	8.0.46

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

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `manga_id` bigint NOT NULL,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int DEFAULT '0',
  `description` text,
  `image_url` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `genre` varchar(50) DEFAULT NULL,
  `editorial` varchar(100) DEFAULT NULL,
  `presale` tinyint(1) NOT NULL DEFAULT '0',
  `sold` int NOT NULL DEFAULT '0',
  `release_date` date DEFAULT NULL,
  `on_sale` bit(1) DEFAULT NULL,
  `original_price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `mangas_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mangas`
--

LOCK TABLES `mangas` WRITE;
/*!40000 ALTER TABLE `mangas` DISABLE KEYS */;
INSERT INTO `mangas` VALUES (1,'One Piece Vol. 1','Eiichiro Oda',9990,5,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1774317404185_OnePiece1.jpg',1,'2026-03-18 21:36:21','shounen','ivrea',0,0,NULL,NULL,NULL),(2,'Berserk Vol. 1','Kentaro Miura',14990,9,'Berserk narra la historia de Guts, un guerrero solitario marcado por un oscuro destino que recorre un mundo medieval brutal lleno de guerras, demonios y traiciones. Armado con su enorme espada, lucha por sobrevivir mientras busca venganza contra Griffith, el hombre que cambió su vida para siempre tras un trágico acontecimiento conocido como el Eclipse.','/uploads/mangas/1774319732998_Berserk1.jpg',NULL,'2026-03-18 22:19:58','seinen','norma',0,0,NULL,NULL,NULL),(4,'One Piece Vol. 2','Eiichiro Oda',9990,0,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1774317781952_OnePiece2.jpg',NULL,'2026-03-20 23:33:34','shounen','ivrea',0,0,NULL,_binary '\0',NULL),(5,'Naruto Vol.1','Masashi Kishimoto',9990,9,'Naruto sigue la historia de Naruto Uzumaki, un joven ninja rechazado por su aldea que sueña con convertirse en el Hokage, el líder más fuerte y respetado de su pueblo. Mientras entrena y completa misiones junto a sus compañeros, Naruto lucha por demostrar su valor, proteger a quienes quiere y controlar el poder del Kurama, el demonio sellado dentro de él.','/uploads/mangas/1774317467080_Naruto1.jpg',NULL,'2026-03-21 03:52:33','shounen','panini',0,0,NULL,NULL,NULL),(7,'Vagabond Vol. 1','Takehiko Inoue',9990,10,'Vagabond sigue la vida de Miyamoto Musashi, un joven espadachín que recorre el Japón feudal en busca de convertirse en el guerrero más fuerte. A través de intensos duelos, encuentros con poderosos rivales como Sasaki Kojiro y profundas reflexiones sobre la vida y la muerte, Musashi emprende un camino de crecimiento personal, disciplina y autodescubrimiento.','/uploads/mangas/1774319722034_Vagabond1.jpg',NULL,'2026-03-22 06:10:23','seinen','ivrea',0,0,NULL,NULL,NULL),(8,'One Piece Vol. 3','Eiichiro Oda',9990,10,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1774315501810_OnePiece3.jpg',NULL,'2026-03-24 01:25:01','shounen','ivrea',0,0,NULL,NULL,NULL),(9,'Naruto Vol. 2','Masashi Kishimoto',9990,10,'Naruto sigue la historia de Naruto Uzumaki, un joven ninja rechazado por su aldea que sueña con convertirse en el Hokage, el líder más fuerte y respetado de su pueblo. Mientras entrena y completa misiones junto a sus compañeros, Naruto lucha por demostrar su valor, proteger a quienes quiere y controlar el poder del Kurama, el demonio sellado dentro de él.','/uploads/mangas/1774319312155_Naruto2.jpg',NULL,'2026-03-24 02:28:32','shounen','panini',0,0,NULL,NULL,NULL),(10,'Vinland Saga Vol. 1','Makoto Yukimura',9990,9,'Vinland Saga sigue la historia de Thorfinn, un joven guerrero vikingo que crece en medio de la violencia y las guerras por el poder en Europa. Consumido por el deseo de vengar la muerte de su padre, Thorfinn se une al grupo del astuto mercenario Askeladd, iniciando un duro camino de batallas, supervivencia y búsqueda de sentido en un mundo marcado por la guerra.','/uploads/mangas/1774319527882_Vinland1.jpg',NULL,'2026-03-24 02:32:07','seinen','planeta-comic',0,0,NULL,NULL,NULL),(11,'Vinland Saga Vol. 2','Makoto Yukimura',9990,9,'Vinland Saga sigue la historia de Thorfinn, un joven guerrero vikingo que crece en medio de la violencia y las guerras por el poder en Europa. Consumido por el deseo de vengar la muerte de su padre, Thorfinn se une al grupo del astuto mercenario Askeladd, iniciando un duro camino de batallas, supervivencia y búsqueda de sentido en un mundo marcado por la guerra.','/uploads/mangas/1774319556885_Vinland2.jpg',NULL,'2026-03-24 02:32:36','seinen','planeta-comic',0,0,NULL,NULL,NULL),(12,'Berserk Vol. 2','Kentaro Miura',9990,10,'Berserk narra la historia de Guts, un guerrero solitario marcado por un oscuro destino que recorre un mundo medieval brutal lleno de guerras, demonios y traiciones. Armado con su enorme espada, lucha por sobrevivir mientras busca venganza contra Griffith, el hombre que cambió su vida para siempre tras un trágico acontecimiento conocido como el Eclipse.','/uploads/mangas/1774319766356_Berserk2.jpg',NULL,'2026-03-24 02:36:06','seinen','norma',0,0,NULL,NULL,NULL),(13,'20th Century Boys','Naoki Urasawa',9990,9,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1774491239289_20Century1.jpg',NULL,'2026-03-26 02:13:59','seinen','planeta-comic',0,0,NULL,NULL,NULL),(14,'Ao Haru Ride Vol. 13','Io Sakisaka',13990,10,'Ao Haru Ride sigue a Futaba Yoshioka, una chica que se reencuentra en el instituto con Kou, su primer amor de secundaria. Tras separarse abruptamente años atrás por un malentendido, ambos han cambiado. La historia explora el reencuentro, el crecimiento emocional y la superación de traumas del pasado.','/uploads/mangas/1779256438480_AoHaruRideVol1.jpg',NULL,'2026-05-20 05:53:58','shoujo','distrito-manga',0,0,NULL,NULL,NULL),(15,'Monster Vol. 1','Naoki Urasawa',9990,8,'Monster es un aclamado thriller psicológico que sigue al Dr. Kenzo Tenma, un brillante neurocirujano japonés radicado en Alemania. Tras elegir salvar la vida de un niño en lugar del alcalde, Tenma se ve envuelto en una espiral de asesinatos. Descubre que el niño creció para convertirse en \"Johan\", un sociópata manipulador. Tenma emprende una cacería humana por Europa para detenerlo y limpiar su propio nombre','/uploads/mangas/1784134613590_Monster1.jpg',NULL,'2026-07-15 16:56:53','seinen','norma',0,0,NULL,NULL,NULL),(16,'Monster Vol. 2','Naoki Urasawa',9988,10,'Monster es un aclamado thriller psicológico que sigue al Dr. Kenzo Tenma, un brillante neurocirujano japonés radicado en Alemania. Tras elegir salvar la vida de un niño en lugar del alcalde, Tenma se ve envuelto en una espiral de asesinatos. Descubre que el niño creció para convertirse en \"Johan\", un sociópata manipulador. Tenma emprende una cacería humana por Europa para detenerlo y limpiar su propio nombre','/uploads/mangas/1784134638391_Monster2.jpg',NULL,'2026-07-15 16:57:18','seinen','norma',0,0,NULL,NULL,NULL),(17,'Monster Vol. 3','Naoki Urasawa',9990,10,'Monster es un aclamado thriller psicológico que sigue al Dr. Kenzo Tenma, un brillante neurocirujano japonés radicado en Alemania. Tras elegir salvar la vida de un niño en lugar del alcalde, Tenma se ve envuelto en una espiral de asesinatos. Descubre que el niño creció para convertirse en \"Johan\", un sociópata manipulador. Tenma emprende una cacería humana por Europa para detenerlo y limpiar su propio nombre','/uploads/mangas/1784134906647_Monster3.jpg',NULL,'2026-07-15 17:01:46','seinen','norma',0,0,NULL,NULL,NULL),(18,'Monster Vol. 4','Naoki Urasawa',9990,8,'Monster es un aclamado thriller psicológico que sigue al Dr. Kenzo Tenma, un brillante neurocirujano japonés radicado en Alemania. Tras elegir salvar la vida de un niño en lugar del alcalde, Tenma se ve envuelto en una espiral de asesinatos. Descubre que el niño creció para convertirse en \"Johan\", un sociópata manipulador. Tenma emprende una cacería humana por Europa para detenerlo y limpiar su propio nombre','/uploads/mangas/1784134932037_Monster4.jpg',NULL,'2026-07-15 17:02:12','seinen','norma',0,0,NULL,NULL,NULL),(19,'Monster Vol. 5','Naoki Urasawa',9990,8,'Monster es un aclamado thriller psicológico que sigue al Dr. Kenzo Tenma, un brillante neurocirujano japonés radicado en Alemania. Tras elegir salvar la vida de un niño en lugar del alcalde, Tenma se ve envuelto en una espiral de asesinatos. Descubre que el niño creció para convertirse en \"Johan\", un sociópata manipulador. Tenma emprende una cacería humana por Europa para detenerlo y limpiar su propio nombre','/uploads/mangas/1784134951895_Monster5.jpg',NULL,'2026-07-15 17:02:31','seinen','norma',0,0,NULL,NULL,NULL),(20,'Vagabond Vol. 2','Takehiko Inoue',9990,8,'Vagabond sigue la vida de Miyamoto Musashi, un joven espadachín que recorre el Japón feudal en busca de convertirse en el guerrero más fuerte. A través de intensos duelos, encuentros con poderosos rivales como Sasaki Kojiro y profundas reflexiones sobre la vida y la muerte, Musashi emprende un camino de crecimiento personal, disciplina y autodescubrimiento.','/uploads/mangas/1784135334860_Vagabond2.jpg',NULL,'2026-07-15 17:08:54','seinen','ivrea',0,0,NULL,NULL,NULL),(21,'Vagabond Vol. 3','Takehiko Inoue',9990,8,'Vagabond sigue la vida de Miyamoto Musashi, un joven espadachín que recorre el Japón feudal en busca de convertirse en el guerrero más fuerte. A través de intensos duelos, encuentros con poderosos rivales como Sasaki Kojiro y profundas reflexiones sobre la vida y la muerte, Musashi emprende un camino de crecimiento personal, disciplina y autodescubrimiento.','/uploads/mangas/1784135354531_Vagabond3.jpg',NULL,'2026-07-15 17:09:14','seinen','ivrea',0,0,NULL,NULL,NULL),(22,'Vagabond Vol. 4','Takehiko Inoue',9990,8,'Vagabond sigue la vida de Miyamoto Musashi, un joven espadachín que recorre el Japón feudal en busca de convertirse en el guerrero más fuerte. A través de intensos duelos, encuentros con poderosos rivales como Sasaki Kojiro y profundas reflexiones sobre la vida y la muerte, Musashi emprende un camino de crecimiento personal, disciplina y autodescubrimiento.','/uploads/mangas/1784135373549_Vagabond4.jpg',NULL,'2026-07-15 17:09:33','seinen','ivrea',0,0,NULL,NULL,NULL),(23,'Vagabond Vol. 5','Takehiko Inoue',9990,8,'Vagabond sigue la vida de Miyamoto Musashi, un joven espadachín que recorre el Japón feudal en busca de convertirse en el guerrero más fuerte. A través de intensos duelos, encuentros con poderosos rivales como Sasaki Kojiro y profundas reflexiones sobre la vida y la muerte, Musashi emprende un camino de crecimiento personal, disciplina y autodescubrimiento.','/uploads/mangas/1784135483571_Vagabond5.jpg',NULL,'2026-07-15 17:11:23','seinen','ivrea',0,0,NULL,NULL,NULL),(24,'Dragon Ball Super Vol. 1','Akira Toriyama',12000,8,'Dragon Ball Super continúa la historia poco después de la derrota de Majin Buu. Con la paz restaurada en la Tierra, Goku y sus amigos se enfrentan a enemigos y desafíos que superan todo lo conocido hasta entonces, incluyendo dioses de la destrucción, universos paralelos y guerreros con un poder inimaginable.\r\n\r\nA lo largo del manga, Goku y Vegeta buscan superar constantemente sus límites, descubriendo nuevas transformaciones y técnicas mientras participan en torneos, combaten amenazas que ponen en riesgo la existencia de múltiples universos y enfrentan poderosos villanos como Moro y Granolah. La historia expande significativamente el universo de Dragon Ball, introduciendo nuevas deidades, razas y conceptos que elevan la escala de las batallas más allá de lo visto en la serie original.','/uploads/mangas/1784264469681_DBS1.jpg',NULL,'2026-07-17 05:01:09','shounen','panini',0,0,NULL,NULL,NULL),(26,'One Piece Vol. 115','Eiichiro Oda',13000,9,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1784761790392_OnePiece115.jpg',NULL,'2026-07-22 23:09:50','shounen','ivrea',1,0,NULL,_binary '',16000),(27,'20th Century Boys Vol.2','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785900992447_20Century2.jpg',NULL,'2026-08-05 03:36:32','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(28,'20th Century Boys Vol. 3','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785901967781_20Century3.jpg',NULL,'2026-08-05 03:52:47','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(29,'20th Century Boys Vol. 4','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902033301_20Century4.jpg',NULL,'2026-08-05 03:53:53','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(30,'20th Century Boys Vol. 5','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902064176_20Century5.jpg',NULL,'2026-08-05 03:54:24','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(31,'20th Century Boys Vol. 6','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902104265_20Century6.jpg',NULL,'2026-08-05 03:55:04','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(32,'20th Century Boys Vol. 7','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902136151_20Century7.jpg',NULL,'2026-08-05 03:55:36','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(33,'20th Century Boys Vol. 8','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902165755_20Century8.jpg',NULL,'2026-08-05 03:56:05','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(34,'20th Century Boys Vol. 9','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902215534_20Century9.jpg',NULL,'2026-08-05 03:56:55','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(35,'20th Century Boys Vol. 10','Naoki Urasawa',16000,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902255361_20Century10.jpg',NULL,'2026-08-05 03:57:35','seinen','planeta-comic',0,0,'2026-08-04',NULL,NULL),(36,'20th Century Boys Vol. 11','Naoki Urasawa',12990,10,'20th Century Boys sigue a Kenji Endo, un hombre común cuya vida cambia cuando una misteriosa secta liderada por Friend comienza a ejecutar un plan que parece estar basado en un juego que él y sus amigos inventaron cuando eran niños. A medida que los eventos se vuelven cada vez más peligrosos, Kenji deberá descubrir la verdad detrás del pasado y evitar una conspiración que amenaza al mundo.','/uploads/mangas/1785902292248_20Century11.jpg',NULL,'2026-08-05 03:58:12','seinen','planeta-comic',0,0,'2024-07-28',_binary '',16000),(37,'One Piece Vol. 114','Eiichiro Oda',13000,9,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1786577781389_OnePiece114.jpg',NULL,'2026-08-12 23:36:21','shounen','ivrea',1,0,NULL,_binary '',16000),(38,'One Piece Vol. 4','Eiichiro Oda',9990,10,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1786579765610_OnePiece4.jpg',NULL,'2026-08-13 00:09:26','shounen','ivrea',0,0,NULL,_binary '\0',9990),(39,'One Piece Vol. 113','Eiichiro Oda',13000,0,'One Piece sigue la historia de Monkey D. Luffy, un joven pirata que sueña con convertirse en el Rey de los Piratas. Tras obtener poderes de goma al comer una misteriosa fruta, Luffy zarpa al mar para reunir una tripulación y encontrar el legendario tesoro One Piece. En su viaje por la peligrosa Grand Line, enfrentará poderosos enemigos, descubrirá secretos del mundo y vivirá aventuras inolvidables.','/uploads/mangas/1786579868286_OnePiece113.jpg',NULL,'2026-08-13 00:11:08','shounen','ivrea',1,0,NULL,_binary '',16000);
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
  `order_id` bigint NOT NULL,
  `manga_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `manga_id` (`manga_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`manga_id`) REFERENCES `mangas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (2,2,1,1,9990),(3,3,2,1,14990),(4,3,1,1,9990),(5,3,4,1,9990),(6,4,5,1,9990),(7,4,4,1,9990),(8,5,13,1,9990),(9,5,10,1,9990),(10,5,11,1,9990),(11,6,1,1,9990),(12,7,39,1,13000),(13,7,37,1,13000),(14,7,26,1,13000);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `total` double DEFAULT NULL,
  `status` varchar(50) DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,1,9990,'PENDING','2026-03-20 22:26:46','2026-03-20 19:26:46.684028'),(3,1,34970,'PENDING','2026-03-21 03:04:33','2026-03-21 00:04:33.589701'),(4,1,19980,'PENDING','2026-03-26 01:43:24','2026-03-25 22:43:24.808708'),(5,1,29970,'PENDING','2026-03-26 05:19:22','2026-03-26 02:19:22.806549'),(6,1,9990,'PENDING','2026-08-05 03:01:22','2026-08-04 23:01:22.862687'),(7,1,39000,'PENDING','2026-08-13 00:16:34','2026-08-12 20:16:34.573925');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'USER',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Felipe','felipe@test.com','123456','admin','2026-03-18 21:32:08'),(3,'Felipe','felipe@usuario.com','123456','user','2026-05-20 01:36:31'),(4,'radaway','radaway@test.com','123456','USER','2026-08-13 01:12:05'),(5,'usuarioprueba','prueba1@sis.cl','123456','USER','2026-08-13 01:17:54'),(6,'testeo','testeo@test.cl','$2a$10$eormiw1wJO9gk1rLsBbCbeK7sj9w81rJ8z9YeQKfXG5f6kIMPOzN.','USER','2026-08-13 01:46:24'),(7,'Prueba','prueba@test.com','$2a$10$WeO9hrozWj7QEJFV2wb0ROOWIELwHxkvGLotTG/SXJNIUAlfMetEu','USER','2026-08-13 01:49:56'),(8,'yoel','yoel@test.com','$2a$10$UBexODoCXZGOlUDrp3.izOIqQKfyREFpaUctHXwldamdkP3Pa29Ha','USER','2026-08-18 00:17:49'),(9,'admin','admin@mangaxstore.cl','$2a$10$FzOdDCcS/kD6z4YmhruAROJ.wXYXMtP8Q.kA01g6lHImp.4lzbjSm','admin','2026-08-18 00:24:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'manga_store'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-06 12:58:03
