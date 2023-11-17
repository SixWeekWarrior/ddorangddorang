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
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `hint`
--

LOCK TABLES `hint` WRITE;
/*!40000 ALTER TABLE `hint` DISABLE KEYS */;
INSERT INTO `hint` VALUES (1,1001,105,'빨간색'),(2,1002,105,'조금 슬픔'),(3,1001,54,'Red'),(4,1002,54,'Good'),(54,1001,2,'검정'),(55,1002,2,'안 좋음'),(102,1001,103,'빨간색'),(103,1002,103,'좋음'),(152,1001,652,'하얀색'),(153,1002,652,'활기참');
/*!40000 ALTER TABLE `hint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `hint_seq`
--

LOCK TABLES `hint_seq` WRITE;
/*!40000 ALTER TABLE `hint_seq` DISABLE KEYS */;
INSERT INTO `hint_seq` VALUES (251);
/*!40000 ALTER TABLE `hint_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `master_code`
--

LOCK TABLES `master_code` WRITE;
/*!40000 ALTER TABLE `master_code` DISABLE KEYS */;
INSERT INTO `master_code` VALUES (1,'참여 중인 방이 없음'),(2,'참여 중인 방이 있음, 방장'),(3,'참여 중인 방이 있음, 방장이 아님'),(4,'게임 플레이 중'),(5,'방 참여 신청 후 수락 대기중'),(1001,'옷 색깔'),(1002,'기분');
/*!40000 ALTER TABLE `master_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `master_code_seq`
--

LOCK TABLES `master_code_seq` WRITE;
/*!40000 ALTER TABLE `master_code_seq` DISABLE KEYS */;
INSERT INTO `master_code_seq` VALUES (1);
/*!40000 ALTER TABLE `master_code_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `mission`
--

LOCK TABLES `mission` WRITE;
/*!40000 ALTER TABLE `mission` DISABLE KEYS */;
INSERT INTO `mission` VALUES (1,'좋아하는 음식 알아내기','좋아하는 음식을 알아내는 것',1),(2,'초콜렛 건네주기','초콜렛을 건네주는 것',2),(3,'아침 인사하기','아침 인사를 하는 것',2),(4,'칭찬하기','칭찬을 하는 것',2),(5,'뺴빼로 건네주기','빼뺴로를 건네주는 것',2),(6,'사탕 건네주기','사탕을 건네주는 것',2),(7,'마이쮸 건네주기','마이쮸를 건네주는 것',2);
/*!40000 ALTER TABLE `mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `mission_perform`
--

LOCK TABLES `mission_perform` WRITE;
/*!40000 ALTER TABLE `mission_perform` DISABLE KEYS */;
INSERT INTO `mission_perform` VALUES (51,54,3,'2023-11-14 04:46:31','2023-11-14 04:53:39',NULL,NULL,0,NULL),(52,55,2,'2023-11-14 04:46:31',NULL,NULL,NULL,1,NULL),(53,56,3,'2023-11-14 04:46:31','2023-11-14 05:36:48',NULL,NULL,0,NULL),(54,57,4,'2023-11-14 04:46:31',NULL,NULL,NULL,1,NULL),(61,54,1,'2023-11-15 09:00:01','2023-11-15 14:54:17',NULL,NULL,0,NULL),(62,55,4,'2023-11-15 09:00:01',NULL,NULL,NULL,1,NULL),(63,56,5,'2023-11-15 09:00:01',NULL,NULL,NULL,1,NULL),(64,57,6,'2023-11-15 09:00:01',NULL,NULL,NULL,1,NULL),(67,54,7,'2023-11-16 09:00:01',NULL,NULL,NULL,1,'2023-11-16 06:40:44'),(68,55,6,'2023-11-16 09:00:01',NULL,NULL,NULL,1,NULL),(69,56,2,'2023-11-16 09:00:01',NULL,NULL,NULL,1,NULL),(70,57,3,'2023-11-16 09:00:01','2023-11-16 09:57:00',NULL,NULL,0,NULL),(71,54,6,'2023-11-16 15:40:44','2023-11-16 15:40:47',NULL,NULL,0,NULL),(72,54,5,'2023-11-17 09:00:00',NULL,NULL,NULL,1,NULL),(73,55,1,'2023-11-17 09:00:01',NULL,NULL,NULL,1,NULL),(74,56,4,'2023-11-17 09:00:01',NULL,NULL,NULL,1,NULL),(75,57,2,'2023-11-17 09:00:01',NULL,NULL,NULL,1,NULL),(76,54,4,'2023-11-17 09:00:01',NULL,NULL,NULL,0,NULL),(77,55,7,'2023-11-17 09:00:01',NULL,NULL,NULL,0,NULL),(78,56,6,'2023-11-17 09:00:01',NULL,NULL,NULL,0,NULL),(79,57,7,'2023-11-17 09:00:01',NULL,NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `mission_perform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `nickname_prefix`
--

LOCK TABLES `nickname_prefix` WRITE;
/*!40000 ALTER TABLE `nickname_prefix` DISABLE KEYS */;
INSERT INTO `nickname_prefix` VALUES (0,'가냘픈'),(1,'가는'),(2,'가엾은'),(3,'가파른'),(4,'같은'),(5,'거센'),(6,'거친'),(7,'검은'),(8,'게으른'),(9,'고달픈'),(10,'고른'),(11,'고마운'),(12,'고운'),(13,'고픈'),(14,'곧은'),(15,'괜찮은'),(16,'구석진'),(17,'굳은'),(18,'굵은'),(19,'귀여운'),(20,'그런'),(21,'그른'),(22,'그리운'),(23,'기다란'),(24,'기쁜'),(25,'긴'),(26,'깊은'),(27,'깎아지른'),(28,'깨끗한'),(29,'나쁜'),(30,'나은'),(31,'난데없는'),(32,'날랜'),(33,'날카로운'),(34,'낮은'),(35,'너그러운'),(36,'너른'),(37,'널따란'),(38,'넓은'),(39,'네모난'),(40,'노란'),(41,'높은'),(42,'누런'),(43,'눅은'),(44,'느닷없는'),(45,'느린'),(46,'늦은'),(47,'다른'),(48,'더러운'),(49,'더운'),(50,'덜된'),(51,'동그란'),(52,'돼먹잖은'),(53,'된'),(54,'둥그런'),(55,'둥근'),(56,'뒤늦은'),(57,'드문'),(58,'딱한'),(59,'때늦은'),(60,'뛰어난'),(61,'뜨거운'),(62,'막다른'),(63,'많은'),(64,'매운'),(65,'먼'),(66,'멋진'),(67,'메마른'),(68,'메스꺼운'),(69,'모난'),(70,'못난'),(71,'못된'),(72,'못생긴'),(73,'무거운'),(74,'무딘'),(75,'무른'),(76,'무서운'),(77,'미끄러운'),(78,'미운'),(79,'바람직한'),(80,'반가운'),(81,'밝은'),(82,'밤늦은'),(83,'보드라운'),(84,'보람찬'),(85,'부드러운'),(86,'부른'),(87,'붉은'),(88,'비싼'),(89,'빠른'),(90,'빨간'),(91,'뻘건'),(92,'뼈저린'),(93,'뽀얀'),(94,'뿌연'),(95,'새로운'),(96,'서툰'),(97,'섣부른'),(98,'설운'),(99,'성가신'),(100,'센'),(101,'수줍은'),(102,'쉬운'),(103,'스스러운'),(104,'슬픈'),(105,'시원찮은'),(106,'싫은'),(107,'싼'),(108,'쌀쌀맞은'),(109,'쏜살같은'),(110,'쓰디쓴'),(111,'쓰린'),(112,'쓴'),(113,'아니꼬운'),(114,'아닌'),(115,'아름다운'),(116,'아쉬운'),(117,'아픈'),(118,'안된'),(119,'안쓰러운'),(120,'안타까운'),(121,'않은'),(122,'알맞은'),(123,'약빠른'),(124,'약은'),(125,'얇은'),(126,'얕은'),(127,'어두운'),(128,'어려운'),(129,'어린'),(130,'언짢은'),(131,'엄청난'),(132,'없는'),(133,'여문'),(134,'열띤'),(135,'예쁜'),(136,'올바른'),(137,'옳은'),(138,'외로운'),(139,'우스운'),(140,'의심스런'),(141,'이른'),(142,'익은'),(143,'있는'),(144,'작은'),(145,'잘난'),(146,'잘빠진'),(147,'잘생긴'),(148,'재미있는'),(149,'적은'),(150,'젊은'),(151,'점잖은'),(152,'조그만'),(153,'좁은'),(154,'좋은'),(155,'주제넘은'),(156,'줄기찬'),(157,'즐거운'),(158,'지나친'),(159,'지혜로운'),(160,'질긴'),(161,'짓궂은'),(162,'짙은'),(163,'짠'),(164,'짧은'),(165,'케케묵은'),(166,'큰'),(167,'탐스러운'),(168,'턱없는'),(169,'푸른'),(170,'한결같은'),(171,'흐린'),(172,'희망찬'),(173,'흰'),(174,'힘겨운');
/*!40000 ALTER TABLE `nickname_prefix` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `nickname_suffix`
--

LOCK TABLES `nickname_suffix` WRITE;
/*!40000 ALTER TABLE `nickname_suffix` DISABLE KEYS */;
INSERT INTO `nickname_suffix` VALUES (0,'고양이'),(1,'강아지'),(2,'거북이'),(3,'토끼'),(4,'뱀'),(5,'사자'),(6,'호랑이'),(7,'표범'),(8,'치타'),(9,'하이에나'),(10,'기린'),(11,'코끼리'),(12,'코뿔소'),(13,'하마'),(14,'악어'),(15,'펭귄'),(16,'부엉이'),(17,'올빼미'),(18,'곰'),(19,'돼지'),(20,'소'),(21,'닭'),(22,'독수리'),(23,'타조'),(24,'고릴라'),(25,'오랑우탄'),(26,'침팬지'),(27,'원숭이'),(28,'코알라'),(29,'캥거루'),(30,'고래'),(31,'상어'),(32,'칠면조'),(33,'직박구리'),(34,'쥐'),(35,'청설모'),(36,'메추라기'),(37,'앵무새'),(38,'삵'),(39,'스라소니'),(40,'판다'),(41,'오소리'),(42,'오리'),(43,'거위'),(44,'백조'),(45,'두루미'),(46,'고슴도치'),(47,'두더지'),(48,'우파루파'),(49,'맹꽁이'),(50,'너구리'),(51,'개구리'),(52,'두꺼비'),(53,'카멜레온'),(54,'이구아나'),(55,'노루'),(56,'제비'),(57,'까치'),(58,'고라니'),(59,'수달'),(60,'당나귀'),(61,'순록'),(62,'염소'),(63,'공작'),(64,'바다표범'),(65,'들소'),(66,'박쥐'),(67,'참새'),(68,'물개'),(69,'바다사자'),(70,'살모사'),(71,'구렁이'),(72,'얼룩말'),(73,'산양'),(74,'멧돼지'),(75,'카피바라'),(76,'도롱뇽'),(77,'북극곰'),(78,'퓨마'),(79,'미어캣'),(80,'코요테'),(81,'라마'),(82,'딱따구리'),(83,'기러기'),(84,'비둘기'),(85,'스컹크'),(86,'돌고래'),(87,'까마귀'),(88,'매'),(89,'낙타'),(90,'여우'),(91,'사슴'),(92,'늑대'),(93,'재규어'),(94,'알파카'),(95,'양'),(96,'다람쥐'),(97,'담비');
/*!40000 ALTER TABLE `nickname_suffix` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `opinion`
--

LOCK TABLES `opinion` WRITE;
/*!40000 ALTER TABLE `opinion` DISABLE KEYS */;
INSERT INTO `opinion` VALUES ('2023-11-07 14:01:51.134496',NULL,11,2,'앱을 너무 잘만들었네요'),('2023-11-07 14:08:08.309238',NULL,12,2,'앱을 너무 잘만들었네요'),('2023-11-16 08:32:08.170876',NULL,14,2,'안녕하세요.\n개발자 여러분\n수고가 많으십니다.'),('2023-11-16 18:01:00.560313',NULL,15,105,'앱 너무 좋아요!!!'),('2023-11-16 18:01:01.162344',NULL,16,105,'앱 너무 좋아요!!!');
/*!40000 ALTER TABLE `opinion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `participant`
--

LOCK TABLES `participant` WRITE;
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
INSERT INTO `participant` VALUES (54,105,40,'서툰 칠면조',57,55,0,0,1,NULL,103,0,1),(55,703,40,'긴 코끼리',54,56,0,0,0,NULL,NULL,NULL,0),(56,103,40,'굳은 까마귀',55,57,0,0,0,NULL,NULL,NULL,4),(57,2,40,'그런 참새',56,54,0,0,0,NULL,NULL,NULL,1),(63,802,45,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0),(64,802,46,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0),(66,652,48,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,1),(67,852,49,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (40,105,1,4,4,32,'2023-11-14 04:23:43','2023-11-14 04:46:31',NULL,NULL,4,1057,0),(44,753,1,2,2,70,'2023-11-14 06:52:06','2023-11-14 06:55:13',NULL,NULL,20,92,1),(45,802,1,6,1,70,'2023-11-14 07:18:37',NULL,NULL,NULL,15,3001,4),(46,802,1,30,1,70,'2023-11-14 08:18:44',NULL,NULL,'2023-11-15 15:48:25',15,6342,4),(48,652,1,2,1,31,'2023-11-15 15:06:58',NULL,NULL,NULL,30,5525,3),(49,852,1,8,1,25,'2023-11-16 10:09:30',NULL,NULL,NULL,20,1465,0),(50,752,1,2,2,36,'2023-11-16 18:02:02',NULL,NULL,NULL,21,7503,3),(51,752,1,2,2,100,'2023-11-16 18:22:46',NULL,NULL,NULL,15,3851,3),(52,902,1,6,1,100,'2023-11-17 19:39:23',NULL,NULL,NULL,30,6788,0);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDE0MjczMzB9.EtEtbEITHGtA_2424z_M5uS-DzJuHTHfDh-EnRSCp97ZgS0R64GgVy2loeRUkkLpMpu__AEUYvNghqnbZBpUyQ',1,40,4,'이효식','lhslhs9394@gmail.com',NULL,9,_binary '',0,0,8,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/54bc5202-5f73-445d-80a2-c4d761fb837c.jpg','starboard','ISFP','cnc',0,NULL,2,'ddrrff','Google','ROLE_USER'),(3,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMjg2NTV9.1EVYjkexsgOZmv6SQboNVdOXaB59Ft3-KfqibwiTQEQOl5pyFEpwm-VB3GYNuXF8m0Agf6fftprXWHXjlmDmKQ',0,NULL,1,'이효식2','lhs9394@hanyang.ac.kr',NULL,9,_binary '',0,0,8,NULL,'startboard','ISFP','Nothing',0,NULL,2,'ddrrff','Google','ROLE_USER'),(54,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDA3MjE2OTF9.gm2zWp6UTaV-Od7oLLP6cv3YDX4JvDzUfcu7HPnbgrnPNejn8ueC6q8q_PCdOmDw814M07C7vcoI5-38CB_5bw',1,NULL,1,'류나연','yoonayeon@gmail.com',NULL,9,_binary '\0',0,0,8,'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg','startboard','ISFP','Nothing',0,NULL,1,'ddrrff','Google','ROLE_USER'),(102,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEyMjE0OTB9.ayZwi2CDi_Je-18koAyUXuHwfpq9C5Nn6YtDAbA5bb8SD1ZrO-HpH9T3HtXbDQTFDTarcmlxDxqw4QAvmvVbKw',0,NULL,1,'이효식3','networks.hy2019@gmail.com',NULL,9,_binary '',1,0,5,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/lhs.png','','','',0,NULL,3,'','Google','ROLE_USER'),(103,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMzIzMDl9.FmdaDer5zUkg14X1Q23alROQIHHworGi4aBtZJBx92uBNqesutyjgL-2efzBcrUHwmcwJHTOLTTgV2kduMQuHw',4,40,4,'홍재연','jejesyon@gmail.com',NULL,9,_binary '',1,0,8,'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg','박우현','이효식 ','이효식 ',0,NULL,2,'이효식 ','Google','ROLE_USER'),(104,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDA2MzMyNjJ9.6GNhepElaL28dJVvnr5WUPVsLb15SPEetMHPz0_Z1Ar-pVK0AGZbuUdGNdhS2obvYp5suhHSr3I88ZYRJzKecw',1,NULL,1,'백승일','sibaek31@gmail.com',NULL,9,_binary '',1,0,12,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjahHS49K6IYtzZfbh3v3aMTBh6ySPeZeNlA&usqp=CAU','Redis','ISTP','Redis',0,NULL,4,'','Google','ROLE_USER'),(105,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMzQ4MTB9.OwdQkctGRsQgfjTOk-BV_RjMCs3K7UfBuKeopONCGCrYER5Y479fwymWiO1VhjvXWLI10T6aMBPjN-BYxXcGQQ',1,40,4,'이연주','yjleeyjlee9@gmail.com',NULL,9,_binary '\0',0,0,15,'','젤리','INFJ','살이 야금야금 찐다',0,NULL,8,'아이스 카페라떼','Google','ROLE_USER'),(152,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDExNDYzMzN9.3R-MC11kQxRGrlHzApnLGFt1M5oc-FDHrM0fP0_PBe_PE2bPlz20VYJV0kp-rWcplEhEILS2Uqwqrc3H9mcbfg',1,NULL,1,'박우현','0x847769a@gmail.com',NULL,9,_binary '',1,0,15,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/85225aba-2a51-4284-bba1-c7d75cf20dd7.JPG','star\'t\'board','ESFP','배포 혼내주기',0,NULL,7,'','Google','ROLE_USER'),(303,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEwNjQ4OTl9.g99d3TTHOahH3Ust8hcYxEOjvBFBoz4IDQ6mNx57j3YrioPV2aMn46Pp7avnnXiYGv-TxKLJl43Sxnz4xRtPWA',0,NULL,1,'박우현2','parkstarboard@gmail.com',NULL,9,_binary '',1,0,8,NULL,'아침','ESFP','마니또 매칭',0,NULL,2,'잠','Google','ROLE_USER'),(552,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDExMzc0NDV9.4vKqEvMM8L4cOI7NHbw6bdDY4KdqTR9GEpT5TRPA5ftopixi1Sizn-XRYAsnKFDPo2xWN_xENmJd1djPtjcgPQ',0,NULL,1,'박우현3','parkrightnow@gmail.com',NULL,9,_binary '',1,3,4,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/557d250d-30b8-4dcb-a1ee-017de221cd7f.jpg','','','',0,NULL,5,'','Google','ROLE_USER'),(652,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMjAzMzJ9.8KblLaTF1mZI8POB9VKfkMhXsQYMQxLmS3MQeLqYOKM1hYr-lN3cad7i6o94lHYdq6YgzRtUQrRpLrczi864DA',1,48,2,'이연주2','yj.thexplorer@gmail.com',NULL,10,_binary '',0,3,3,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/04be697e-d31f-4788-afa1-ed6169896606.jpg','용','ISFJ','얄',0,NULL,5,'룰','Google','ROLE_USER'),(703,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMzAxOTZ9.V3FRTzH8U9x2LDFMYCE9D7B3LE6H1YRjSchg75hq6Gjy-gSYzJjMk4oQee98NCCGavJh7Ad-T9u4Y6Y6j4Ltug',0,40,4,'김데모','ddorangddorang.demo@gmail.com',NULL,9,_binary '\0',1,0,8,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/4a353d2c-5d46-4e8e-82cb-df9b0855726f.jpg','구글 플레이 콘솔 앱 거절됨','CUTE','구글 플레이 배포',0,NULL,2,'삼성 청년 SW 아카데미 자율 프로젝트','Google','ROLE_USER'),(752,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMzYyMTR9.Yw7DV0B6o8fNHpOKCvD0QBvQ6CJ-MU8SIew-fwJPxqisPliSPNzimfZ-mmpGIupfCUtmuy1-quhbEZAZ5rsHgQ',0,51,2,'이연주3','testforssafy@gmail.com',NULL,9,_binary '',0,3,6,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/738dca3e-e22e-455f-b30b-a8168523ca5f.jpg','유','야','요',0,NULL,5,'여','Google','ROLE_USER'),(753,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMjAzMTJ9.LAfjEE-g8vLrRGPrILKOQrQn6xM29so6fvMf3DhmGVHk-LtaOa7Yq6pTmOgS2ZLfL1Ts7HRFw3XtL94l6fzfGg',0,48,5,'이연주4','testforssafy2@gmail.com',NULL,9,_binary '\0',1,1,20,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/01302880-a146-4053-bfb1-fb561f68dc18.jpg','니','냐','뇨',0,NULL,3,'뉴','Google','ROLE_USER'),(802,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMzYxOTN9.NKKMa1uPrX93GKJmjak_RMDcaHo_z70VaLz9X8XyWWUWtD8Nm5mA5tcJJWzDJ-t-SwysZrz2YgBjYyj9aRBulg',2,51,3,'김채연','sixweekwarrior.ssafy@gmail.com',NULL,9,_binary '\0',0,0,14,'https://www.handmk.com/news/photo/202306/16714_40371_5250.jpg','','','',0,NULL,5,'','Google','ROLE_USER'),(852,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzNDc2MzV9.pOMIQR-q8PFZfwN67rjQHEyhaa4sjKWGa2Sdu2DM33nVDAQx4SCvZ6hJYGtS-yZ1xlkJXJw2MSl_ciA4id45tg',0,49,2,'이현석','hslee0912@gmail.com',NULL,9,_binary '',1,0,8,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/4dbc8c70-c9d3-4fe1-a793-4a7a014eb539.jpg','예의 없는 사람','ISFJ','교육생들 취업문제',0,NULL,2,'영화보기','Google','ROLE_USER'),(853,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMDY5NzN9.uxgq_BHBW2sOqkcv52lyYkDmeIaaoHIrQwGm9MZ3ceEpCxrEn_vPc4vCMCRCkziX_qc5JqQF_BXD7amadAi3Lw',0,NULL,1,'지용현','yung5487@gmail.com',NULL,9,_binary '',1,0,17,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/c2b1f741-88da-4224-af84-f2adfae15a82.jpg','점심고르기','ISFP','점심 뭐먹지',0,NULL,18,'점심고르기','Google','ROLE_USER'),(854,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDEzMDcwMjV9.UnvvegfDSUi-6eXgcGHIlluMAJkRHspI_6F0xEDuI_etsx33gxucAjVdVNo7y3zIBBVZ9n0yhV2liIQsveH2zQ',0,NULL,1,'오윤식','ysoh310@gmail.com',NULL,9,_binary '\0',1,0,8,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/76c9b354-8be5-4da8-903e-473e54498c4d.jpg','열무김치','ESTP','배고파',0,NULL,8,'민트초코','Google','ROLE_USER'),(902,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE3MDE0MjczNzR9.Agm4SVcnJ19yHGNnFxLQw1zBkGqPDb4xTOVlMFVYPrzhIEoxvvD-8EUHSxl9-0Qe5-BfJocdbXbqzXtolqeS2w',0,52,2,'킹메이커','jeonht043@gmail.com',NULL,9,_binary '\0',0,0,20,'https://ddorangddorang.s3.ap-northeast-2.amazonaws.com/profile/a69269c5-3a80-4548-90a9-b6256fd37e2f.jpg','like','null','null',0,NULL,17,'@#$%^&*()÷=/_×<+>[]-\'\":;,?','Google','ROLE_USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (1001);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 23:39:43
