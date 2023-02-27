-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: mmm-db.cnahoybhx1pt.ap-south-1.rds.amazonaws.com    Database: mmm-dev
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` int NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cities`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `stateId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48357 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_transaction_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_transaction_log` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `operation` int NOT NULL,
  `external_id` varchar(255) DEFAULT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_747faf1a1b45a0cdf9fd9ad4eb5` (`userBasicId`),
  CONSTRAINT `FK_747faf1a1b45a0cdf9fd9ad4eb5` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connects`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connects` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `connectPrice` int NOT NULL,
  `discountType` int NOT NULL,
  `discount` int NOT NULL,
  `discountedPrice` int NOT NULL,
  `firstTimeBenifitMins` int NOT NULL,
  `secondTimeBenifitMins` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `countries`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shortName` varchar(3) NOT NULL,
  `name` varchar(150) NOT NULL,
  `phoneCode` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coupons`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupons` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `couponCode` varchar(255) NOT NULL,
  `discountType` int NOT NULL,
  `validTill` timestamp NOT NULL,
  `discount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `otps`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otps` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `phoneNumber` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(255) NOT NULL,
  `validTill` timestamp NOT NULL,
  `isVerified` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile_visit`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_visit` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `visitedById` varchar(36) DEFAULT NULL,
  `visitedToId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dcded7da4647664a31959bd8da4` (`visitedById`),
  KEY `FK_c38e06a7f33f14ddfef2c5d6598` (`visitedToId`),
  CONSTRAINT `FK_c38e06a7f33f14ddfef2c5d6598` FOREIGN KEY (`visitedToId`) REFERENCES `user_basics` (`id`),
  CONSTRAINT `FK_dcded7da4647664a31959bd8da4` FOREIGN KEY (`visitedById`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recharge_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recharge_history` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `actualAmount` int NOT NULL,
  `discountedAmount` int NOT NULL,
  `isCouponApplied` tinyint NOT NULL,
  `couponCode` varchar(255) DEFAULT NULL,
  `connectCount` int NOT NULL,
  `date` varchar(255) NOT NULL,
  `modeOfPayment` int NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `paymentStatus` int NOT NULL,
  `failureReason` varchar(255) NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aa5b59cfcabf8547788a6e95642` (`userBasicId`),
  CONSTRAINT `FK_aa5b59cfcabf8547788a6e95642` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referrals`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referrals` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `states`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `countryId` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4122 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_abouts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_abouts` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `name` varchar(255) NOT NULL,
  `dateOfBirth` varchar(255) NOT NULL,
  `maritalStatus` int NOT NULL,
  `childrenStatus` int NOT NULL,
  `numberOfChildren` int DEFAULT NULL,
  `abilityStatus` int NOT NULL,
  `profileUpdationStatus` int NOT NULL,
  `height` decimal(10,0) NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1c8af90e9b6ecc8a99ca3b5bacb` (`userBasicId`),
  CONSTRAINT `FK_1c8af90e9b6ecc8a99ca3b5bacb` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_basics`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_basics` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `relationship` int NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `gender` int NOT NULL,
  `countryCode` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activationStatus` int NOT NULL,
  `lifecycleStatus` int NOT NULL,
  `registrationStep` int NOT NULL DEFAULT '1',
  `displayId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_59ba2361583edfcd1da1f18949` (`email`),
  UNIQUE KEY `IDX_a54ecd385b1d2d20228ab754c7` (`phoneNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_bios`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_bios` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `aboutMe` varchar(255) NOT NULL,
  `profileUpdationStatus` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fae63e7857da34b49fd268ca1c4` (`userBasicId`),
  CONSTRAINT `FK_fae63e7857da34b49fd268ca1c4` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_careers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_careers` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `employedIn` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `highestEducation` varchar(255) NOT NULL,
  `profileUpdationStatus` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  `country` int NOT NULL,
  `state` int NOT NULL,
  `city` int NOT NULL,
  `annualIncome` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a21f8cc680012ab301be39752ec` (`userBasicId`),
  CONSTRAINT `FK_a21f8cc680012ab301be39752ec` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_connect_duration_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_connect_duration_logs` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `usedDuration` int NOT NULL,
  `userConnectDurationId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dc4701389f787631b1c115c7f8c` (`userConnectDurationId`),
  CONSTRAINT `FK_dc4701389f787631b1c115c7f8c` FOREIGN KEY (`userConnectDurationId`) REFERENCES `user_connect_durations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_connect_durations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_connect_durations` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `userOneBasicId` varchar(255) NOT NULL,
  `userTwoBasicId` varchar(255) NOT NULL,
  `usedDuration` int NOT NULL,
  `totalDuration` int NOT NULL,
  `isFirstTime` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_connect_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_connect_logs` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `prevConnectBalance` int NOT NULL,
  `currentConnectBalance` int NOT NULL,
  `changeAmount` int NOT NULL,
  `operation` int NOT NULL,
  `reason` varchar(255) NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9668d7ad27dd1e6e28ae4849525` (`userBasicId`),
  CONSTRAINT `FK_9668d7ad27dd1e6e28ae4849525` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_connects`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_connects` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `connectBalance` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9d3e6ed62b94c8244a84ab324ce` (`userBasicId`),
  CONSTRAINT `FK_9d3e6ed62b94c8244a84ab324ce` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_family_backgrounds`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_family_backgrounds` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `familyStatus` int NOT NULL DEFAULT '2',
  `familyValues` int NOT NULL DEFAULT '1',
  `familyType` int NOT NULL,
  `profileUpdationStatus` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  `country` int NOT NULL,
  `state` int NOT NULL,
  `city` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_90d4d2b2ee966e6987afac4a862` (`userBasicId`),
  CONSTRAINT `FK_90d4d2b2ee966e6987afac4a862` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_family_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_family_details` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `fatherOccupation` int NOT NULL DEFAULT '1',
  `motherOccupation` int NOT NULL DEFAULT '0',
  `numberOfBrothers` int NOT NULL,
  `marriedNumberOfBrothers` int NOT NULL,
  `numberOfSisters` int NOT NULL,
  `marriedNumberOfSisters` int NOT NULL,
  `profileUpdationStatus` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a9d6aeabdae1ce91e5f29542de9` (`userBasicId`),
  CONSTRAINT `FK_a9d6aeabdae1ce91e5f29542de9` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_habits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_habits` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `eatingHabit` int NOT NULL,
  `smokingHabit` int NOT NULL,
  `drinkingHabit` int NOT NULL,
  `profileUpdationStatus` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f45c7f85013a5a9548ba9b34c66` (`userBasicId`),
  CONSTRAINT `FK_f45c7f85013a5a9548ba9b34c66` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_images`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_images` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `imageURL` varchar(255) NOT NULL,
  `thumbnailURL` varchar(255) DEFAULT NULL,
  `isDefault` tinyint NOT NULL DEFAULT '0',
  `profileUpdationStatus` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_79dbf5e0fcf677f82e157fb2b19` (`userBasicId`),
  CONSTRAINT `FK_79dbf5e0fcf677f82e157fb2b19` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_logins`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_logins` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `deviceType` varchar(255) NOT NULL,
  `deviceId` varchar(255) NOT NULL,
  `authToken` varchar(255) NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9bf9e17a31e6e372d86c26a406a` (`userBasicId`),
  CONSTRAINT `FK_9bf9e17a31e6e372d86c26a406a` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_preferences`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `minAge` int DEFAULT NULL,
  `maxAge` int DEFAULT NULL,
  `minHeight` int DEFAULT NULL,
  `maxHeight` int DEFAULT NULL,
  `maritalStatus` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `caste` varchar(255) DEFAULT NULL,
  `motherTongue` varchar(255) DEFAULT NULL,
  `highestEducation` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `dietaryHabits` varchar(255) DEFAULT NULL,
  `drinkingHabits` varchar(255) NOT NULL,
  `smokingHabits` varchar(255) DEFAULT NULL,
  `challenged` varchar(255) DEFAULT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  `maxIncome` varchar(255) DEFAULT NULL,
  `minIncome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d6fdb246fc1fe7ddcfd22a1ea29` (`userBasicId`),
  CONSTRAINT `FK_d6fdb246fc1fe7ddcfd22a1ea29` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_religions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_religions` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `religion` varchar(255) NOT NULL,
  `cast` varchar(255) DEFAULT NULL,
  `gothra` varchar(255) DEFAULT NULL,
  `motherTongue` varchar(255) NOT NULL,
  `isManglik` int NOT NULL DEFAULT '1',
  `profileUpdationStatus` int NOT NULL,
  `userBasicId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_86f8b1ac832a8cb7074d0783ff9` (`userBasicId`),
  CONSTRAINT `FK_86f8b1ac832a8cb7074d0783ff9` FOREIGN KEY (`userBasicId`) REFERENCES `user_basics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_requests`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_requests` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(255) NOT NULL DEFAULT 'system_user',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `requestingUserBasicId` varchar(255) NOT NULL,
  `requestedUserBasicId` varchar(255) NOT NULL,
  `userRequestStatus` int NOT NULL,
  `userRequestState` int NOT NULL,
  `requestDate` varchar(255) NOT NULL,
  `acceptanceRejectionDate` varchar(255) DEFAULT NULL,
  `operation` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `users_view`
--

SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `users_view` (
  `id` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `gender` tinyint NOT NULL,
  `countryCode` tinyint NOT NULL,
  `phoneNumber` tinyint NOT NULL,
  `registrationStep` tinyint NOT NULL,
  `activationStatus` tinyint NOT NULL,
  `lifecycleStatus` tinyint NOT NULL,
  `createdAt` tinyint NOT NULL,
  `displayId` tinyint NOT NULL,
  `relationship` tinyint NOT NULL,
  `isActive` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `dateOfBirth` tinyint NOT NULL,
  `age` tinyint NOT NULL,
  `maritalStatus` tinyint NOT NULL,
  `childrenStatus` tinyint NOT NULL,
  `abilityStatus` tinyint NOT NULL,
  `height` tinyint NOT NULL,
  `eatingHabit` tinyint NOT NULL,
  `smokingHabit` tinyint NOT NULL,
  `drinkingHabit` tinyint NOT NULL,
  `religion` tinyint NOT NULL,
  `cast` tinyint NOT NULL,
  `gothra` tinyint NOT NULL,
  `motherTongue` tinyint NOT NULL,
  `isManglik` tinyint NOT NULL,
  `employedIn` tinyint NOT NULL,
  `occupation` tinyint NOT NULL,
  `annualIncome` tinyint NOT NULL,
  `highestEducation` tinyint NOT NULL,
  `careerCountryId` tinyint NOT NULL,
  `careerCountry` tinyint NOT NULL,
  `careerState` tinyint NOT NULL,
  `careerCity` tinyint NOT NULL,
  `familyStatus` tinyint NOT NULL,
  `familyValues` tinyint NOT NULL,
  `familyType` tinyint NOT NULL,
  `familyCountry` tinyint NOT NULL,
  `familyState` tinyint NOT NULL,
  `familyCity` tinyint NOT NULL,
  `fatherOccupation` tinyint NOT NULL,
  `motherOccupation` tinyint NOT NULL,
  `numberOfBrothers` tinyint NOT NULL,
  `marriedNumberOfBrothers` tinyint NOT NULL,
  `numberOfSisters` tinyint NOT NULL,
  `marriedNumberOfSisters` tinyint NOT NULL,
  `aboutMe` tinyint NOT NULL,
  `imageURL` tinyint NOT NULL,
  `thumbnailURL` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `users_view_admin`
--

SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `users_view_admin` (
  `id` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `gender` tinyint NOT NULL,
  `countryCode` tinyint NOT NULL,
  `phoneNumber` tinyint NOT NULL,
  `registrationStep` tinyint NOT NULL,
  `activationStatus` tinyint NOT NULL,
  `lifecycleStatus` tinyint NOT NULL,
  `createdAt` tinyint NOT NULL,
  `displayId` tinyint NOT NULL,
  `relationship` tinyint NOT NULL,
  `isActive` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `dateOfBirth` tinyint NOT NULL,
  `age` tinyint NOT NULL,
  `maritalStatus` tinyint NOT NULL,
  `childrenStatus` tinyint NOT NULL,
  `abilityStatus` tinyint NOT NULL,
  `height` tinyint NOT NULL,
  `eatingHabit` tinyint NOT NULL,
  `smokingHabit` tinyint NOT NULL,
  `drinkingHabit` tinyint NOT NULL,
  `religion` tinyint NOT NULL,
  `cast` tinyint NOT NULL,
  `gothra` tinyint NOT NULL,
  `motherTongue` tinyint NOT NULL,
  `isManglik` tinyint NOT NULL,
  `employedIn` tinyint NOT NULL,
  `occupation` tinyint NOT NULL,
  `annualIncome` tinyint NOT NULL,
  `highestEducation` tinyint NOT NULL,
  `careerCountryId` tinyint NOT NULL,
  `careerCountry` tinyint NOT NULL,
  `careerState` tinyint NOT NULL,
  `careerCity` tinyint NOT NULL,
  `familyStatus` tinyint NOT NULL,
  `familyValues` tinyint NOT NULL,
  `familyType` tinyint NOT NULL,
  `familyCountry` tinyint NOT NULL,
  `familyState` tinyint NOT NULL,
  `familyCity` tinyint NOT NULL,
  `fatherOccupation` tinyint NOT NULL,
  `motherOccupation` tinyint NOT NULL,
  `numberOfBrothers` tinyint NOT NULL,
  `marriedNumberOfBrothers` tinyint NOT NULL,
  `numberOfSisters` tinyint NOT NULL,
  `marriedNumberOfSisters` tinyint NOT NULL,
  `aboutMe` tinyint NOT NULL,
  `imageURL` tinyint NOT NULL,
  `thumbnailURL` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'mmm-dev'
--

--
-- Final view structure for view `users_view`
--

/*!50001 DROP TABLE IF EXISTS `users_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `users_view` AS select `ub`.`id` AS `id`,`ub`.`email` AS `email`,`ub`.`gender` AS `gender`,`ub`.`countryCode` AS `countryCode`,`ub`.`phoneNumber` AS `phoneNumber`,`ub`.`registrationStep` AS `registrationStep`,`ub`.`activationStatus` AS `activationStatus`,`ub`.`lifecycleStatus` AS `lifecycleStatus`,`ub`.`createdAt` AS `createdAt`,`ub`.`displayId` AS `displayId`,`ub`.`relationship` AS `relationship`,`ub`.`isActive` AS `isActive`,`ua`.`name` AS `name`,`ua`.`dateOfBirth` AS `dateOfBirth`,(date_format(from_days((to_days(now()) - to_days(`ua`.`dateOfBirth`))),'%Y') + 0) AS `age`,`ua`.`maritalStatus` AS `maritalStatus`,`ua`.`childrenStatus` AS `childrenStatus`,`ua`.`abilityStatus` AS `abilityStatus`,`ua`.`height` AS `height`,`uh`.`eatingHabit` AS `eatingHabit`,`uh`.`smokingHabit` AS `smokingHabit`,`uh`.`drinkingHabit` AS `drinkingHabit`,`ur`.`religion` AS `religion`,`ur`.`cast` AS `cast`,`ur`.`gothra` AS `gothra`,`ur`.`motherTongue` AS `motherTongue`,`ur`.`isManglik` AS `isManglik`,`uc`.`employedIn` AS `employedIn`,`uc`.`occupation` AS `occupation`,`uc`.`annualIncome` AS `annualIncome`,`uc`.`highestEducation` AS `highestEducation`,`uc`.`country` AS `careerCountryId`,`co`.`name` AS `careerCountry`,`st`.`name` AS `careerState`,`ci`.`name` AS `careerCity`,`ufb`.`familyStatus` AS `familyStatus`,`ufb`.`familyValues` AS `familyValues`,`ufb`.`familyType` AS `familyType`,`co1`.`name` AS `familyCountry`,`st1`.`name` AS `familyState`,`ci1`.`name` AS `familyCity`,`ufd`.`fatherOccupation` AS `fatherOccupation`,`ufd`.`motherOccupation` AS `motherOccupation`,`ufd`.`numberOfBrothers` AS `numberOfBrothers`,`ufd`.`marriedNumberOfBrothers` AS `marriedNumberOfBrothers`,`ufd`.`numberOfSisters` AS `numberOfSisters`,`ufd`.`marriedNumberOfSisters` AS `marriedNumberOfSisters`,`ubio`.`aboutMe` AS `aboutMe`,`ui`.`imageURL` AS `imageURL`,`ui`.`thumbnailURL` AS `thumbnailURL` from ((((((((((((((`user_basics` `ub` left join `user_family_details` `ufd` on(((`ub`.`id` = `ufd`.`userBasicId`) and (`ufd`.`profileUpdationStatus` = 0)))) left join `user_abouts` `ua` on(((`ub`.`id` = `ua`.`userBasicId`) and (`ua`.`profileUpdationStatus` = 0)))) left join `user_careers` `uc` on(((`ub`.`id` = `uc`.`userBasicId`) and (`uc`.`profileUpdationStatus` = 0)))) left join `user_family_backgrounds` `ufb` on(((`ub`.`id` = `ufb`.`userBasicId`) and (`ufb`.`profileUpdationStatus` = 0)))) left join `user_religions` `ur` on(((`ub`.`id` = `ur`.`userBasicId`) and (`ur`.`profileUpdationStatus` = 0)))) left join `user_images` `ui` on(((`ub`.`id` = `ui`.`userBasicId`) and (`ui`.`isDefault` = 1)))) left join `user_bios` `ubio` on(((`ub`.`id` = `ubio`.`userBasicId`) and (`ubio`.`profileUpdationStatus` = 0)))) left join `user_habits` `uh` on(((`ub`.`id` = `uh`.`userBasicId`) and (`uh`.`profileUpdationStatus` = 0)))) left join `countries` `co` on((`uc`.`country` = `co`.`id`))) left join `states` `st` on((`uc`.`state` = `st`.`id`))) left join `cities` `ci` on((`uc`.`city` = `ci`.`id`))) left join `countries` `co1` on((`ufb`.`country` = `co1`.`id`))) left join `states` `st1` on((`ufb`.`state` = `st1`.`id`))) left join `cities` `ci1` on((`ufb`.`city` = `ci1`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `users_view_admin`
--

/*!50001 DROP TABLE IF EXISTS `users_view_admin`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `users_view_admin` AS select `ub`.`id` AS `id`,`ub`.`email` AS `email`,`ub`.`gender` AS `gender`,`ub`.`countryCode` AS `countryCode`,`ub`.`phoneNumber` AS `phoneNumber`,`ub`.`registrationStep` AS `registrationStep`,`ub`.`activationStatus` AS `activationStatus`,`ub`.`lifecycleStatus` AS `lifecycleStatus`,`ub`.`createdAt` AS `createdAt`,`ub`.`displayId` AS `displayId`,`ub`.`relationship` AS `relationship`,`ub`.`isActive` AS `isActive`,`ua`.`name` AS `name`,`ua`.`dateOfBirth` AS `dateOfBirth`,(date_format(from_days((to_days(now()) - to_days(`ua`.`dateOfBirth`))),'%Y') + 0) AS `age`,`ua`.`maritalStatus` AS `maritalStatus`,`ua`.`childrenStatus` AS `childrenStatus`,`ua`.`abilityStatus` AS `abilityStatus`,`ua`.`height` AS `height`,`uh`.`eatingHabit` AS `eatingHabit`,`uh`.`smokingHabit` AS `smokingHabit`,`uh`.`drinkingHabit` AS `drinkingHabit`,`ur`.`religion` AS `religion`,`ur`.`cast` AS `cast`,`ur`.`gothra` AS `gothra`,`ur`.`motherTongue` AS `motherTongue`,`ur`.`isManglik` AS `isManglik`,`uc`.`employedIn` AS `employedIn`,`uc`.`occupation` AS `occupation`,`uc`.`annualIncome` AS `annualIncome`,`uc`.`highestEducation` AS `highestEducation`,`uc`.`country` AS `careerCountryId`,`co`.`name` AS `careerCountry`,`st`.`name` AS `careerState`,`ci`.`name` AS `careerCity`,`ufb`.`familyStatus` AS `familyStatus`,`ufb`.`familyValues` AS `familyValues`,`ufb`.`familyType` AS `familyType`,`co1`.`name` AS `familyCountry`,`st1`.`name` AS `familyState`,`ci1`.`name` AS `familyCity`,`ufd`.`fatherOccupation` AS `fatherOccupation`,`ufd`.`motherOccupation` AS `motherOccupation`,`ufd`.`numberOfBrothers` AS `numberOfBrothers`,`ufd`.`marriedNumberOfBrothers` AS `marriedNumberOfBrothers`,`ufd`.`numberOfSisters` AS `numberOfSisters`,`ufd`.`marriedNumberOfSisters` AS `marriedNumberOfSisters`,`ubio`.`aboutMe` AS `aboutMe`,`ui`.`imageURL` AS `imageURL`,`ui`.`thumbnailURL` AS `thumbnailURL` from ((((((((((((((`user_basics` `ub` left join `user_family_details` `ufd` on(((`ub`.`id` = `ufd`.`userBasicId`) and (`ufd`.`profileUpdationStatus` <= 1)))) left join `user_abouts` `ua` on(((`ub`.`id` = `ua`.`userBasicId`) and (`ua`.`profileUpdationStatus` <= 1)))) left join `user_careers` `uc` on(((`ub`.`id` = `uc`.`userBasicId`) and (`uc`.`profileUpdationStatus` <= 1)))) left join `user_family_backgrounds` `ufb` on(((`ub`.`id` = `ufb`.`userBasicId`) and (`ufb`.`profileUpdationStatus` <= 1)))) left join `user_religions` `ur` on(((`ub`.`id` = `ur`.`userBasicId`) and (`ur`.`profileUpdationStatus` <= 1)))) left join `user_images` `ui` on(((`ub`.`id` = `ui`.`userBasicId`) and (`ui`.`isDefault` = 1)))) left join `user_bios` `ubio` on(((`ub`.`id` = `ubio`.`userBasicId`) and (`ubio`.`profileUpdationStatus` <= 1)))) left join `user_habits` `uh` on(((`ub`.`id` = `uh`.`userBasicId`) and (`uh`.`profileUpdationStatus` <= 1)))) left join `countries` `co` on((`uc`.`country` = `co`.`id`))) left join `states` `st` on((`uc`.`state` = `st`.`id`))) left join `cities` `ci` on((`uc`.`city` = `ci`.`id`))) left join `countries` `co1` on((`ufb`.`country` = `co1`.`id`))) left join `states` `st1` on((`ufb`.`state` = `st1`.`id`))) left join `cities` `ci1` on((`ufb`.`city` = `ci1`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-28 14:49:45
