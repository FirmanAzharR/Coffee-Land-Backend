-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2021 at 07:37 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffeeland`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_updated_at` datetime NOT NULL,
  `category_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `category_created_at`, `category_updated_at`, `category_status`) VALUES
(1, 'Coffee', '2020-12-16 08:47:02', '0000-00-00 00:00:00', 1),
(2, 'Non Coffee', '2020-12-16 08:47:09', '0000-00-00 00:00:00', 1),
(3, 'Food', '2020-12-16 08:47:13', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id_coupon` int(11) NOT NULL,
  `coupon_name` varchar(100) NOT NULL,
  `coupon_code` varchar(10) NOT NULL,
  `coupon_discon` int(11) NOT NULL,
  `cupon_min` int(11) NOT NULL,
  `cupon_max` int(11) NOT NULL,
  `coupon_start` date NOT NULL,
  `coupon_end` date NOT NULL,
  `coupon_information` text NOT NULL,
  `coupon_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `coupon_updated_at` datetime NOT NULL,
  `coupon_status` int(1) NOT NULL,
  `coupon_img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id_coupon`, `coupon_name`, `coupon_code`, `coupon_discon`, `cupon_min`, `cupon_max`, `coupon_start`, `coupon_end`, `coupon_information`, `coupon_created_at`, `coupon_updated_at`, `coupon_status`, `coupon_img`) VALUES
(27, 'Red velvet', 'GFINTN3', 30, 30000, 25000, '2021-01-08', '2021-01-09', 'Now Red velvet have special discount. only this day', '2021-01-11 15:44:00', '2021-02-18 00:19:06', 1, '2021-01-11T15-40-15.479Zredvelvet.jpg'),
(28, 'Cappucino Coffee', 'CAP123', 20, 30000, 20000, '2021-01-09', '2021-01-10', 'Discount 20% for Cappucino Coffee', '2021-01-11 17:51:32', '2021-02-18 00:19:43', 1, '2021-01-11T10-51-32.115Zcoba.png'),
(31, 'Cold Brew Coffee', 'CLD123', 20, 15000, 10000, '2021-01-09', '2021-01-09', 'Discount 20% for weekend', '2021-01-11 22:41:44', '2021-02-18 00:17:56', 1, '2021-01-11T15-41-44.381Zcoldbrew.png');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_discon` int(11) NOT NULL,
  `product_information` text NOT NULL,
  `product_size` varchar(10) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_img` varchar(100) NOT NULL,
  `product_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` datetime NOT NULL,
  `product_status` int(1) NOT NULL,
  `product_stock` int(11) NOT NULL,
  `delivery_hour_start` varchar(5) NOT NULL,
  `delivery_hour_end` varchar(5) NOT NULL,
  `delivery_methods` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_discon`, `product_information`, `product_size`, `product_price`, `product_img`, `product_created_at`, `product_updated_at`, `product_status`, `product_stock`, `delivery_hour_start`, `delivery_hour_end`, `delivery_methods`) VALUES
(70, 2, 'Red Velvet', 20, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia, culpa veritatis dicta aperiam adipisci iusto odio debitis fuga itaque unde. Ab dolore dolorem id eius? Esse eaque eveniet voluptates?\nLorem ipsum dolor sit amet consectetur adipisicing elit. Est quia, culpa veritatis dicta aperiam adipisci iusto odio debitis fuga itaque unde. Ab dolore dolorem id eius? Esse eaque eveniet voluptates?\nLorem ipsum dolor sit amet consectetur adipisicing elit. Est quia, culpa veritatis dicta aperiam adipisci iusto odio debitis fuga itaque unde. Ab dolore dolorem id eius? Esse eaque eveniet voluptates?', '1,2,3', 23000, '2021-02-13T06-27-12.083Z2021-01-12T13-13-00.470Zredvelvet.jpg', '2021-02-13 13:12:19', '2021-02-13 14:22:56', 1, 10, '10:00', '14:00', '1,2,3'),
(78, 1, 'Cold Brew', 10, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia, culpa veritatis dicta aperiam adipisci iusto odio debitis fuga itaque unde. Ab dolore dolorem id eius? Esse eaque eveniet voluptates? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia, culpa veritatis dicta aperiam adipisci iusto odio debitis fuga itaque unde. Ab dolore dolorem id eius? Esse eaque eveniet voluptates? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia, culpa veritatis dicta aperiam adipisci iusto odio debitis fuga itaque unde. Ab dolore dolorem id eius? Esse eaque eveniet voluptates?', '1,3,2', 30000, '2021-02-11T17-25-04.261Z2021-01-06T03-36-12.974Zcoldbrew.png', '2021-02-13 12:39:52', '2021-02-22 14:49:42', 1, 20, '09:00', '13:00', '1,3');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `transaction_number` varchar(5) NOT NULL,
  `address` text NOT NULL,
  `payment` varchar(50) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `transaction_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status_confirm` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `customer_id`, `transaction_number`, `address`, `payment`, `sub_total`, `tax`, `discount`, `total`, `transaction_created_at`, `status_confirm`) VALUES
(40, 14, 'feNZz', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Cash on delivery', 139000, 10000, 25000, 124000, '2021-01-10 14:37:55', 1),
(42, 14, '8DAAv', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Cash on delivery', 20000, 10000, 4000, 26000, '2021-02-12 00:59:33', 1),
(45, 14, 'tcSdZ', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Card', 27000, 10000, 5400, 31600, '2021-03-12 09:36:02', 0),
(46, 14, '0wk9x', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Cash on delivery', 20000, 10000, 0, 30000, '2021-02-12 21:24:18', 0),
(48, 14, 'DR4Oz', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Card', 27000, 10000, 0, 37000, '2019-02-12 22:35:47', 0),
(50, 15, 'ODmuC', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Card', 81000, 10000, 16200, 74800, '2021-02-16 00:35:28', 1),
(51, 15, 'UN3TR', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Cash on delivery', 36800, 10000, 7360, 39440, '2021-02-16 08:32:27', 0),
(52, 14, 'ECciz', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Card', 94300, 10000, 18860, 85440, '2021-02-18 00:37:55', 0),
(53, 14, '60nZK', 'Jl. Purbaya, No.109, Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Cash on delivery', 27000, 10000, 5400, 31600, '2021-02-19 10:55:13', 0),
(55, 14, '2S0MC', 'Jl.Purbaya No.109, Warak kidul, Sumberadi, Mlati, Sleman, Yogyakarta ', 'Card', 18400, 10000, 0, 28400, '2021-02-22 15:15:06', 1),
(56, 14, 'TAj87', 'Jl.Purbaya No.109, Warak kidul, Sumberadi, Mlati, Sleman, Yogyakarta ', 'Cash on delivery', 18400, 10000, 0, 28400, '2021-02-23 11:59:07', 1),
(57, 15, 'qC9L9', 'Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'Card', 27000, 10000, 0, 37000, '2021-02-23 12:19:27', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE `transaction_details` (
  `detail_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(5) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `delivery` varchar(50) NOT NULL,
  `detail_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_details`
--

INSERT INTO `transaction_details` (`detail_id`, `transaction_id`, `product_id`, `size`, `quantity`, `price`, `delivery`, `detail_created_at`) VALUES
(52, 40, 35, 'R', 1, 25000, 'Dine In', '2021-02-10 14:37:56'),
(53, 40, 35, 'L', 1, 28500, 'Dine In', '2021-02-10 14:37:56'),
(54, 40, 70, 'R', 1, 25000, 'Dine In', '2021-02-10 14:37:56'),
(55, 40, 70, 'L', 1, 28500, 'Dine In', '2021-02-10 14:37:56'),
(56, 40, 70, 'XL', 1, 32000, 'Dine In', '2021-02-10 14:37:56'),
(58, 42, 70, 'R', 1, 20000, 'Dine In', '2021-02-12 00:59:33'),
(62, 45, 78, 'R', 1, 27000, 'Dine In', '2021-02-12 09:36:02'),
(63, 46, 70, 'R', 1, 20000, 'Dine In', '2021-02-12 21:24:18'),
(65, 48, 78, 'R', 1, 27000, 'Dine In', '2021-02-12 22:35:47'),
(67, 50, 78, 'R', 2, 54000, 'Dine In', '2021-02-15 10:35:38'),
(68, 51, 70, 'R', 2, 36800, 'Dine In', '2021-02-16 08:32:27'),
(69, 52, 78, 'R', 2, 54000, 'Dine In', '2021-02-18 00:37:55'),
(70, 52, 70, 'R', 1, 18400, 'Dine In', '2021-02-18 00:37:55'),
(71, 53, 78, 'R', 1, 27000, 'Dine In', '2021-02-19 10:55:13'),
(73, 55, 70, 'R', 1, 18400, 'Dine In', '2021-02-22 15:15:06'),
(74, 56, 70, 'R', 1, 18400, 'Dine In', '2021-02-23 11:59:07'),
(75, 57, 78, 'R', 1, 27000, 'Dine In', '2021-02-23 12:19:27');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_role` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_phone` varchar(15) NOT NULL,
  `user_password` varchar(150) NOT NULL,
  `user_status` int(11) NOT NULL,
  `user_img` varchar(50) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime DEFAULT NULL,
  `key_reset` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_role`, `user_name`, `first_name`, `last_name`, `user_address`, `user_email`, `user_phone`, `user_password`, `user_status`, `user_img`, `user_created_at`, `user_updated_at`, `key_reset`) VALUES
(14, 1, 'Firman Azhar R', 'Firman', 'Azhar', 'Jl.Purbaya No.109, Warak kidul, Sumberadi, Mlati, Sleman, Yogyakarta ', 'firmanazhar14@gmail.com', '083122494951', '$2b$10$mtR9YJPVRDquPvXZ5m5exOi398/qOPFOSaXctyU3ube.AT1UaOSiq', 2, '2021-02-22T08-48-43.492Zupin.jpg', '2021-02-06 12:43:07', '2021-02-22 15:48:43', 'f0f733b905bf0c8a5639868e05c648'),
(15, 2, 'Alifia Intan', 'Alifia', 'Intan', 'Warak Kidul, Sumberadi, Mlati, Sleman, Yogyakarta, Indonesia', 'alifia@gmail.com', '087657452132', '$2b$10$7346W2KKHMn.8AN75ty9M.DaC0vcafsZ8okG.Z/3VhLGM5Rb/IZrS', 2, '2021-02-13T08-25-42.348Zalucard.jpg', '2021-02-13 14:57:13', '2021-02-13 15:25:42', 'df93bbf32fae46f9a3820ac99bae5b');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD KEY `id_coupon` (`id_coupon`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `id_product_detail` (`product_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id_coupon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `transaction_details`
--
ALTER TABLE `transaction_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
