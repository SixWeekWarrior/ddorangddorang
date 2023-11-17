CREATE DATABASE  IF NOT EXISTS `ddorangddorang` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ddorangddorang`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: ddorangddorang.cdf2cvjss4gv.ap-northeast-2.rds.amazonaws.com    Database: ddorangddorang
-- ------------------------------------------------------
-- Server version	8.0.33

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `manito_id` bigint NOT NULL,
  `maniti_id` bigint NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_sent_by_me` tinyint(1) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='채팅방을 관리하는 테이블입니다';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chat_id` bigint NOT NULL,
  `sender_id` bigint NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='채팅방의 메세지를 관리하는 테이블입니다.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hint`
--

DROP TABLE IF EXISTS `hint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hint` (
  `id` bigint NOT NULL,
  `master_code_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaj4f9h6o2dbdqd1qqj6r3agg2` (`master_code_id`),
  KEY `FKprku6b7r561rcocfno0exchh6` (`user_id`),
  CONSTRAINT `FKaj4f9h6o2dbdqd1qqj6r3agg2` FOREIGN KEY (`master_code_id`) REFERENCES `master_code` (`id`),
  CONSTRAINT `FKprku6b7r561rcocfno0exchh6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hint_seq`
--

DROP TABLE IF EXISTS `hint_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hint_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `master_code`
--

DROP TABLE IF EXISTS `master_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_code` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `master_code_seq`
--

DROP TABLE IF EXISTS `master_code_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_code_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT',
  `sender` bigint NOT NULL,
  `receiver` bigint NOT NULL,
  `mission_perform_id` bigint DEFAULT NULL,
  `to_manito` tinyint(1) NOT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `fk_message_play_send_idx` (`sender`),
  KEY `fk_message_play_receive_idx` (`receiver`),
  KEY `fk_message_missonperform_idx` (`mission_perform_id`),
  CONSTRAINT `fk_message_missonperform` FOREIGN KEY (`mission_perform_id`) REFERENCES `mission_perform` (`id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `participant` (`id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `participant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT',
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `mission_type` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mission_code_type_idx` (`mission_type`),
  CONSTRAINT `fk_mission_code_type` FOREIGN KEY (`mission_type`) REFERENCES `master_code` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mission_perform`
--

DROP TABLE IF EXISTS `mission_perform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission_perform` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT',
  `player_id` bigint NOT NULL COMMENT 'AUTO_INCREMENT',
  `mission_id` bigint NOT NULL,
  `received_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '미션을 변경한 경우 CURRENT_TIMESTAMP가 아닌 이전 미션의 received_at을 참조',
  `performed_at` datetime DEFAULT NULL,
  `reaction` bigint DEFAULT NULL,
  `proof` text,
  `discard` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_missionperform_play_idx` (`player_id`),
  KEY `fk_missionperform_mission_idx` (`mission_id`),
  KEY `fk_missionperform_code_reaction_idx` (`reaction`),
  CONSTRAINT `fk_missionperform_code_reaction` FOREIGN KEY (`reaction`) REFERENCES `master_code` (`id`),
  CONSTRAINT `fk_missionperform_mission` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`id`),
  CONSTRAINT `mission_perform_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `participant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nickname_prefix`
--

DROP TABLE IF EXISTS `nickname_prefix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nickname_prefix` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adjective` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nickname_suffix`
--

DROP TABLE IF EXISTS `nickname_suffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nickname_suffix` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `is_read` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `mission_perform_id` bigint DEFAULT NULL,
  `receiver_id` bigint DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtd96grnx4w2sm4ej51f5a3rkm` (`mission_perform_id`),
  KEY `FK7xx6ca7v3siac1ar6chiamvud` (`receiver_id`),
  KEY `FKq6xar68vvhwmbetaplcyc7q84` (`room_id`),
  KEY `FKrme5q5o5g3dq47j3bimtbrjqc` (`sender_id`),
  CONSTRAINT `FK7xx6ca7v3siac1ar6chiamvud` FOREIGN KEY (`receiver_id`) REFERENCES `participant` (`id`),
  CONSTRAINT `FKq6xar68vvhwmbetaplcyc7q84` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `FKrme5q5o5g3dq47j3bimtbrjqc` FOREIGN KEY (`sender_id`) REFERENCES `participant` (`id`),
  CONSTRAINT `FKtd96grnx4w2sm4ej51f5a3rkm` FOREIGN KEY (`mission_perform_id`) REFERENCES `mission_perform` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opinion`
--

DROP TABLE IF EXISTS `opinion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opinion` (
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnifwjuxuse33c615nw3cb6r7x` (`user_id`),
  CONSTRAINT `FKnifwjuxuse33c615nw3cb6r7x` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT',
  `user_id` bigint NOT NULL,
  `room_id` bigint NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `manito` bigint DEFAULT NULL COMMENT '게임이 시작될 때 지정',
  `maniti` bigint DEFAULT NULL COMMENT '게임이 시작될 때 지정',
  `mission` int NOT NULL DEFAULT '0',
  `is_kicked_out` tinyint(1) DEFAULT '0',
  `changes` smallint NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `guess` bigint DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `game_count` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_play_user_idx` (`user_id`),
  KEY `fk_play_user_mantio_idx` (`manito`),
  KEY `fk_play_user_maniti_idx` (`maniti`),
  KEY `fk_play_room_idx` (`room_id`),
  KEY `guess` (`guess`),
  CONSTRAINT `FK6urix8695eogaruawu46907yj` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `fk_play_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `fk_play_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKj2ywtc5meno2ouhf5pcq9rsbh` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`guess`) REFERENCES `user` (`id`),
  CONSTRAINT `participant_ibfk_2` FOREIGN KEY (`maniti`) REFERENCES `participant` (`id`) ON DELETE SET NULL,
  CONSTRAINT `participant_ibfk_3` FOREIGN KEY (`manito`) REFERENCES `participant` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `reporter` bigint DEFAULT NULL,
  `reportee` bigint DEFAULT NULL,
  `room` bigint DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `reporter` (`reporter`),
  KEY `reportee` (`reportee`),
  KEY `room` (`room`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`reporter`) REFERENCES `user` (`id`),
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`reportee`) REFERENCES `user` (`id`),
  CONSTRAINT `report_ibfk_3` FOREIGN KEY (`room`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT',
  `admin_id` bigint NOT NULL,
  `is_open` tinyint(1) NOT NULL COMMENT '공개면 1, 비공개면 0',
  `min_member` int NOT NULL,
  `head_count` int DEFAULT NULL,
  `max_member` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `started_at` datetime DEFAULT NULL,
  `profile_image` text,
  `deleted_at` datetime DEFAULT NULL COMMENT '마니또 방 생성자가 게임 시작 전 방을 삭제하면 TRUE로 변경',
  `duration` int NOT NULL,
  `access_code` int NOT NULL,
  `campus` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_room_user_idx` (`admin_id`),
  CONSTRAINT `fk_room_user` FOREIGN KEY (`admin_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKjd33lev83kthoqjae6nwu1jks` FOREIGN KEY (`admin_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT',
  `refresh_token` varchar(255) DEFAULT NULL,
  `game_count` int DEFAULT '0',
  `room_id` bigint DEFAULT NULL,
  `status` bigint DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `generation` int DEFAULT NULL,
  `is_major` bit(1) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `campus` int DEFAULT NULL COMMENT '0=서울 1=대전 2=구미 3=부울경 4=광주',
  `floor` int DEFAULT NULL,
  `profile_image` text,
  `hate` varchar(255) DEFAULT NULL,
  `mbti` varchar(255) DEFAULT NULL,
  `worry` text,
  `report_count` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `class` int DEFAULT NULL,
  `likes` varchar(255) DEFAULT NULL,
  `provider_type` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_room_idx` (`room_id`),
  KEY `fk_user_code_status_idx` (`status`),
  CONSTRAINT `fk_user_code_status` FOREIGN KEY (`status`) REFERENCES `master_code` (`id`),
  CONSTRAINT `fk_user_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `FKg1p6foq337jdu60aec050rusk` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=903 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 23:39:24
