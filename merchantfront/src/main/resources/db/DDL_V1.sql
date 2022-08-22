CREATE TABLE `ordermaster` (
  `orderId` binary(16) NOT NULL,
  `productId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `paid` bit(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `fromDate` datetime DEFAULT NULL,
  `toDate` datetime DEFAULT NULL,
  `adultQty` int DEFAULT NULL,
  `childQty` int DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB ;

CREATE TABLE `payment` (
  `id` binary(16) NOT NULL,
  `orderId` binary(16) DEFAULT NULL,
  `amount` decimal(9,2) DEFAULT NULL,
  `currency` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `paid` bit(1) DEFAULT NULL,
  `refund` bit(1) DEFAULT NULL,
  `chargeback` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;

CREATE TABLE `paymentstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentId` binary(16) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `trackingId` varchar(255) DEFAULT NULL,
  `txnInfo` varchar(255) DEFAULT NULL,
  `billingDescriptor` varchar(255) DEFAULT NULL,
  `responseCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `currency` varchar(5) DEFAULT NULL,
  `availableQty` int DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `providerId` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB ;

CREATE TABLE `userdetail` (
  `userId` int NOT NULL,
  `addressLine1` varchar(255) DEFAULT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `postcode` varchar(45) DEFAULT NULL,
  `consent` bit(1) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `admin` bit(1) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB;
