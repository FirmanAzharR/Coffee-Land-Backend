-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2020 at 10:05 AM
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
  `coupon_code` varchar(10) NOT NULL,
  `product_id` int(11) NOT NULL,
  `coupon_discon` int(11) NOT NULL,
  `cupon_min` int(11) NOT NULL,
  `cupon_max` int(11) NOT NULL,
  `coupon_start` date NOT NULL,
  `coupon_end` date NOT NULL,
  `coupon_information` text NOT NULL,
  `coupon_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `coupon_updated_at` datetime NOT NULL,
  `coupon_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id_coupon`, `coupon_code`, `product_id`, `coupon_discon`, `cupon_min`, `cupon_max`, `coupon_start`, `coupon_end`, `coupon_information`, `coupon_created_at`, `coupon_updated_at`, `coupon_status`) VALUES
(1, 'GFYUMMY01', 15, 30, 30000, 25000, '2020-12-12', '2020-12-15', 'Coupon form postman 2', '2020-12-26 00:05:56', '2020-12-26 00:49:51', 1),
(4, 'GFYUMMY02', 15, 25, 30000, 25000, '2020-12-12', '2020-12-15', 'Coupon form postman', '2020-12-27 16:24:15', '0000-00-00 00:00:00', 1),
(5, 'GFYUMMY03', 15, 25, 30000, 25000, '2020-12-12', '2020-12-15', 'Coupon form postman', '2020-12-27 16:24:21', '0000-00-00 00:00:00', 1),
(6, 'GFYUMMY04', 15, 25, 30000, 25000, '2020-12-12', '2020-12-15', 'Coupon form postman', '2020-12-27 16:24:25', '0000-00-00 00:00:00', 1),
(7, 'GFYUMMY05', 15, 25, 30000, 25000, '2020-12-12', '2020-12-15', 'Coupon form postman', '2020-12-28 08:08:06', '0000-00-00 00:00:00', 1);

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
  `product_img` varchar(100) NOT NULL,
  `product_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` datetime NOT NULL,
  `product_status` int(1) NOT NULL,
  `product_stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_discon`, `product_information`, `product_img`, `product_created_at`, `product_updated_at`, `product_status`, `product_stock`) VALUES
(35, 1, 'Cold Brew x', 10, 'This product updated 1', '2020-12-27T17-46-37.019Zimage 22.png', '2020-12-28 00:47:08', '0000-00-00 00:00:00', 1, 10),
(36, 2, 'Red Velvet 4', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:39:51', '0000-00-00 00:00:00', 1, -2),
(37, 3, 'Vegetable Mix', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:40:30', '0000-00-00 00:00:00', 1, 10),
(38, 3, 'Ayam Katsu', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:40:40', '0000-00-00 00:00:00', 1, 10),
(39, 3, 'Rice Bowl', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:41:01', '0000-00-00 00:00:00', 1, 10),
(40, 3, 'Rice Box', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:41:23', '0000-00-00 00:00:00', 1, 10),
(41, 3, 'Fried Rice', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:41:31', '0000-00-00 00:00:00', 1, 10),
(42, 2, 'Vanila late', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:41:40', '0000-00-00 00:00:00', 1, 10),
(44, 2, 'Lemon Tea', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:41:55', '0000-00-00 00:00:00', 1, 10),
(45, 1, 'Cold Brew', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:42:26', '0000-00-00 00:00:00', 1, 10),
(46, 1, 'Coffe Capucino', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:42:55', '0000-00-00 00:00:00', 1, 10),
(47, 1, 'Coffe Special', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:43:07', '0000-00-00 00:00:00', 1, 10),
(48, 1, 'Coffe Special 2', 0, 'this product Red Velvet inserted from posman', '', '2020-12-26 20:43:11', '0000-00-00 00:00:00', 1, 10),
(49, 1, 'coba', 10, 'This product updated 1', '2020-12-27T17-36-14.423Zcoldbrew.png', '2020-12-28 00:36:14', '0000-00-00 00:00:00', 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `id_product_detail` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_size` int(11) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `p_detail_created_at` datetime DEFAULT NULL,
  `p_detail_updated_at` datetime DEFAULT NULL,
  `p_detail_status` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`id_product_detail`, `id_product`, `id_size`, `product_price`, `p_detail_created_at`, `p_detail_updated_at`, `p_detail_status`) VALUES
(48, 35, 1, 20000, '2020-12-24 20:43:52', NULL, 1),
(49, 35, 2, 30000, '2020-12-24 20:43:52', NULL, 1),
(50, 36, 1, 20000, '2020-12-26 20:39:51', NULL, 1),
(51, 36, 2, 30000, '2020-12-26 20:39:51', NULL, 1),
(52, 37, 1, 27000, '2020-12-26 20:40:30', NULL, 1),
(53, 37, 2, 35000, '2020-12-26 20:40:30', NULL, 1),
(54, 38, 1, 27000, '2020-12-26 20:40:40', NULL, 1),
(55, 38, 2, 35000, '2020-12-26 20:40:40', NULL, 1),
(56, 39, 1, 27000, '2020-12-26 20:41:01', NULL, 1),
(57, 39, 2, 35000, '2020-12-26 20:41:01', NULL, 1),
(58, 40, 1, 27000, '2020-12-26 20:41:23', NULL, 1),
(59, 40, 2, 35000, '2020-12-26 20:41:23', NULL, 1),
(60, 41, 1, 27000, '2020-12-26 20:41:31', NULL, 1),
(61, 41, 2, 35000, '2020-12-26 20:41:31', NULL, 1),
(62, 42, 1, 27000, '2020-12-26 20:41:40', NULL, 1),
(63, 42, 2, 35000, '2020-12-26 20:41:40', NULL, 1),
(66, 44, 1, 27000, '2020-12-26 20:41:55', NULL, 1),
(67, 44, 2, 35000, '2020-12-26 20:41:55', NULL, 1),
(68, 45, 1, 20000, '2020-12-26 20:42:26', NULL, 1),
(69, 45, 2, 25000, '2020-12-26 20:42:26', NULL, 1),
(70, 46, 1, 20000, '2020-12-26 20:42:56', NULL, 1),
(71, 46, 2, 25000, '2020-12-26 20:42:56', NULL, 1),
(72, 47, 1, 20000, '2020-12-26 20:43:07', NULL, 1),
(73, 47, 2, 25000, '2020-12-26 20:43:07', NULL, 1),
(74, 48, 1, 20000, '2020-12-26 20:43:11', NULL, 1),
(75, 48, 2, 25000, '2020-12-26 20:43:11', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `size_name` varchar(3) NOT NULL,
  `size_information` text NOT NULL,
  `size_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `size_updated_at` datetime NOT NULL,
  `size_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `size_name`, `size_information`, `size_created_at`, `size_updated_at`, `size_status`) VALUES
(1, 'R', 'Regular size', '2020-12-16 08:48:29', '0000-00-00 00:00:00', 1),
(2, 'L', 'Large size', '2020-12-16 08:48:32', '0000-00-00 00:00:00', 1),
(3, 'XL', 'Extra Large', '2020-12-16 08:48:35', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `transaction_number` int(11) NOT NULL,
  `address` text NOT NULL,
  `id_payment` int(3) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `transaction_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `customer_id`, `transaction_number`, `address`, `id_payment`, `subtotal`, `transaction_created_at`) VALUES
(2, 3, 541245, 'Sleman, Yogyakarta', 1, 60000, '2020-11-01 00:26:22'),
(3, 3, 541245, 'Sleman, Yogyakarta', 1, 60000, '2020-12-28 00:27:38'),
(4, 3, 541245, 'Sleman, Yogyakarta', 1, 60000, '2020-12-29 00:27:40'),
(5, 3, 541245, 'Sleman, Yogyakarta', 1, 60000, '2020-12-29 00:27:41');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE `transaction_details` (
  `detail_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `id_product_detail` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `deliveryMethod` varchar(50) NOT NULL,
  `detail_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_details`
--

INSERT INTO `transaction_details` (`detail_id`, `transaction_id`, `id_product_detail`, `quantity`, `deliveryMethod`, `detail_created_at`) VALUES
(3, 2, 50, 2, 'Door Delivery', '2020-12-29 00:26:22'),
(4, 2, 50, 1, 'Door Delivery', '2020-12-29 00:26:22'),
(5, 3, 50, 2, 'Door Delivery', '2020-12-29 00:27:38'),
(6, 3, 50, 1, 'Door Delivery', '2020-12-29 00:27:38'),
(7, 4, 50, 2, 'Door Delivery', '2020-12-29 00:27:40'),
(8, 4, 50, 1, 'Door Delivery', '2020-12-29 00:27:40'),
(9, 5, 50, 2, 'Door Delivery', '2020-12-29 00:27:41'),
(10, 5, 50, 1, 'Door Delivery', '2020-12-29 00:27:42');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_role` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_phone` varchar(15) NOT NULL,
  `user_password` varchar(150) NOT NULL,
  `user_status` int(11) NOT NULL,
  `user_img` varchar(50) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_role`, `user_name`, `user_email`, `user_phone`, `user_password`, `user_status`, `user_img`, `user_created_at`, `user_updated_at`) VALUES
(4, 2, 'Alifia', 'alifia@gmail.com', '085123456789', '$2b$10$vVLhKAd2.jKYG6BiBFiIhe6T4ajhzby4ADLiSgm1EEw21M9UZRt6W', 1, 'none', '2020-12-24 18:55:33', '0000-00-00 00:00:00'),
(5, 1, 'Firman update 2', 'firmanazhar14@gmail.com', '083122494953', '$2b$10$01TaKbAi8ChJ/rNCsyU1De1LnPJMEZWWG7xWW939iJ70qTQCoq3CG', 1, 'none', '2020-12-29 00:05:08', '0000-00-00 00:00:00');

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
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD KEY `id_product_detail` (`id_product_detail`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

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
  ADD KEY `id_product_detail` (`id_product_detail`),
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
  MODIFY `id_coupon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `id_product_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaction_details`
--
ALTER TABLE `transaction_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id_category`);

--
-- Constraints for table `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_details_ibfk_2` FOREIGN KEY (`id_size`) REFERENCES `size` (`size_id`);

--
-- Constraints for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_ibfk_1` FOREIGN KEY (`id_product_detail`) REFERENCES `product_details` (`id_product_detail`),
  ADD CONSTRAINT `transaction_details_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
