-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2023 at 05:55 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dental`
--

CREATE TABLE `tbl_dental` (
  `dental_id` varchar(200) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `checkup_date` date NOT NULL,
  `complaint` varchar(5000) NOT NULL,
  `temperature` int(11) NOT NULL,
  `blood_pressure` varchar(200) NOT NULL,
  `pulse_rate` int(11) NOT NULL,
  `oxygen_sat` int(11) NOT NULL,
  `checkup_results` varchar(5000) NOT NULL,
  `check_up_date` date NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dental_chart`
--

CREATE TABLE `tbl_dental_chart` (
  `dental_chart_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `tooth_number` varchar(200) NOT NULL,
  `tooth_subsection` varchar(200) NOT NULL,
  `result` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_department`
--

CREATE TABLE `tbl_department` (
  `dept_id` int(11) NOT NULL,
  `dept_code` varchar(200) NOT NULL,
  `dept_name` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = suspended, 2 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_department`
--

INSERT INTO `tbl_department` (`dept_id`, `dept_code`, `dept_name`, `status`) VALUES
(1, 'OPD', 'Outpatient Department', 0),
(2, 'DNTL', 'Dental', 1),
(3, 'PNI', 'Prenatal and Immunization', 0),
(4, 'PHM', 'Pharmacy', 0),
(5, 'ADMIN', 'Admin Office', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_household`
--

CREATE TABLE `tbl_household` (
  `household_id` int(11) NOT NULL,
  `household_name` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_household`
--

INSERT INTO `tbl_household` (`household_id`, `household_name`, `status`) VALUES
(1, 'Grajo', 0),
(2, 'Basmayor', 0),
(3, 'Boco', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_immunization`
--

CREATE TABLE `tbl_immunization` (
  `immunization_id` varchar(200) NOT NULL,
  `immunizer_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `immunization_date` date NOT NULL,
  `next_immunization_date` date DEFAULT NULL,
  `comments` varchar(5000) DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lab_results`
--

CREATE TABLE `tbl_lab_results` (
  `lab_result_id` int(11) NOT NULL,
  `opd_id` varchar(200) NOT NULL,
  `lab_result` varchar(5000) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine_inventory`
--

CREATE TABLE `tbl_medicine_inventory` (
  `medicine_id` varchar(200) NOT NULL,
  `generic_name` varchar(500) NOT NULL,
  `brand_name` varchar(500) DEFAULT NULL,
  `med_classification` int(11) NOT NULL,
  `mfg_date` date NOT NULL,
  `exp_date` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `quantity_type` varchar(200) NOT NULL,
  `date_added` date NOT NULL,
  `added_by` int(11) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine_release`
--

CREATE TABLE `tbl_medicine_release` (
  `med_release_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `medicine_id` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL,
  `release_date` date NOT NULL,
  `released_by` int(11) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_med_classification`
--

CREATE TABLE `tbl_med_classification` (
  `med_class_id` int(11) NOT NULL,
  `med_class_name` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opd`
--

CREATE TABLE `tbl_opd` (
  `opd_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `prelim_checkup_date` date NOT NULL,
  `temperature` int(11) DEFAULT NULL COMMENT 'celsius',
  `blood_pressure` varchar(200) DEFAULT NULL,
  `height` int(11) DEFAULT NULL COMMENT 'cm',
  `weight` int(11) DEFAULT NULL COMMENT 'kg',
  `pulse_rate` int(11) DEFAULT NULL COMMENT 'per minute',
  `oxygen_sat` int(11) DEFAULT NULL,
  `complaint` varchar(5000) DEFAULT NULL,
  `preliminary_checkup_done_by` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `checkup_results` varchar(5000) DEFAULT NULL,
  `next_checkup` date DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opd_disease`
--

CREATE TABLE `tbl_opd_disease` (
  `opd_disease_id` int(11) NOT NULL,
  `opd_id` varchar(200) NOT NULL,
  `opd_disease` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_patient_info`
--

CREATE TABLE `tbl_patient_info` (
  `patient_id` varchar(200) NOT NULL,
  `household_id` int(11) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `middle_name` varchar(200) DEFAULT NULL,
  `suffix` varchar(200) DEFAULT NULL,
  `sex` int(2) NOT NULL COMMENT '1 - male, 2 - female',
  `birthdate` date NOT NULL,
  `barangay` varchar(200) NOT NULL,
  `address` varchar(5000) NOT NULL,
  `phone_number` varchar(200) DEFAULT NULL,
  `added_by` int(11) NOT NULL,
  `date_added` date NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deceased, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_prenatal`
--

CREATE TABLE `tbl_prenatal` (
  `prenatal_id` varchar(200) NOT NULL,
  `midwife_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `last_menstruation` date NOT NULL,
  `previous_full_term` int(11) NOT NULL,
  `previous_premature` int(11) NOT NULL,
  `sex` int(3) DEFAULT NULL COMMENT '0 = male, 1 = female',
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_prenatal_checkup`
--

CREATE TABLE `tbl_prenatal_checkup` (
  `prenatal_checkup_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `prenatal_id` varchar(200) NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `temperature` int(11) NOT NULL,
  `blood_pressure` varchar(200) NOT NULL,
  `pulse_rate` int(11) NOT NULL,
  `oxygen_sat` int(11) NOT NULL,
  `checkup_date` date NOT NULL,
  `next_checkup` date NOT NULL,
  `comments` varchar(5000) NOT NULL,
  `status` int(3) NOT NULL COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pwd`
--

CREATE TABLE `tbl_pwd` (
  `pwd_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `disablity` varchar(500) DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deceased, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_queue`
--

CREATE TABLE `tbl_queue` (
  `queue_number` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `department` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_senior_citizen`
--

CREATE TABLE `tbl_senior_citizen` (
  `senior_citizen_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deceased, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplies_inventory`
--

CREATE TABLE `tbl_supplies_inventory` (
  `supply_id` int(11) NOT NULL,
  `supply_name` varchar(200) NOT NULL,
  `supply_type` varchar(200) NOT NULL,
  `mfg_date` int(11) NOT NULL,
  `exp_date` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `quantity_type` varchar(200) NOT NULL,
  `status` int(3) NOT NULL COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supply_release`
--

CREATE TABLE `tbl_supply_release` (
  `supply_release_id` int(11) NOT NULL,
  `supply_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity_released` int(11) NOT NULL,
  `status` int(3) NOT NULL COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `middle_name` varchar(200) DEFAULT NULL,
  `suffix` varchar(200) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `phone_number` varchar(200) NOT NULL,
  `sex` int(3) NOT NULL COMMENT '0 - male, 1 - female',
  `department` int(11) NOT NULL,
  `job_title` varchar(200) NOT NULL,
  `permission_level` int(5) NOT NULL COMMENT '0 - no access, 1 - admin, 2 - doctors, 3 - front_desk, 4 - view',
  `date_added` date NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = suspended, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `password`, `last_name`, `first_name`, `middle_name`, `suffix`, `birthdate`, `phone_number`, `sex`, `department`, `job_title`, `permission_level`, `date_added`, `status`) VALUES
(67, 'basmayormbOPD67', '$2y$10$5yE/uCGotKWaf9WYBH/qNeG9BZhQl9rsTevsxGwgrAEzOHgyj7R8m', 'Basmayor', 'Mark Kenneth', 'Bataller', NULL, '1998-05-05', '09488561235', 0, 1, 'Assistant', 2, '2023-03-18', 0),
(68, 'bocornDNTL68', '$2y$10$rbeyU7K7Y7hkWhuDsvMI1eHIu24ZZO1ugsSyco2eYLePZYlWEj.aS', 'Boco', 'Roseler', 'Nasol', 'Jr', '1998-05-05', '09488561235', 0, 2, 'Doctor', 2, '2023-03-18', 0),
(69, 'pogingAdmin69', '$2y$10$UuVBa0/rMd4qXgP0GhsLvOO0l1GFrA.1DvaRTkgz6FWWFjLIzU7ea', 'Grajo', 'Julius Albert', 'Areola', NULL, '1998-05-05', '09488561235', 0, 5, 'Office Staff', 8, '2023-03-18', 0),
(70, 'ardaleseOPD70', '$2y$10$awwbioJqeSROh.oDfnBC9Ot5.ODWlt6vLnT9kYDHXmYZEydQ646ee', 'Ardales', 'Edmel', NULL, NULL, '1998-05-05', '09488561235', 0, 1, 'Doctor', 2, '2023-03-18', 0),
(71, 'aperinlOPD71', '$2y$10$djgAWdpYRa9n2ALt/qMdCeAmkYvKvzNmjWzHPVYOBHQvpvq41DZte', 'Aperin', 'Lynnette', NULL, NULL, '1998-05-05', '09488561235', 0, 1, 'Midwife', 3, '2023-03-18', 0),
(72, 'esplanasADMIN72', '$2y$10$IULIcy.DfQDA4je.5hQXR.n0EBgVu8pOMTeQ87msXbv2QqrDAVmAy', 'Esplana', 'Samuel', NULL, NULL, '1998-05-05', '09488561235', 0, 5, 'Office Staff', 1, '2023-03-18', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_dental`
--
ALTER TABLE `tbl_dental`
  ADD PRIMARY KEY (`dental_id`),
  ADD KEY `dental_fk_doctor_id` (`doctor_id`),
  ADD KEY `dental_fk_patient_id` (`patient_id`);

--
-- Indexes for table `tbl_dental_chart`
--
ALTER TABLE `tbl_dental_chart`
  ADD PRIMARY KEY (`dental_chart_id`),
  ADD KEY `dental_chart_fk_patient_id` (`patient_id`);

--
-- Indexes for table `tbl_department`
--
ALTER TABLE `tbl_department`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `tbl_household`
--
ALTER TABLE `tbl_household`
  ADD PRIMARY KEY (`household_id`);

--
-- Indexes for table `tbl_immunization`
--
ALTER TABLE `tbl_immunization`
  ADD PRIMARY KEY (`immunization_id`),
  ADD KEY `immunization_fk_immunizer_id` (`immunizer_id`),
  ADD KEY `immunization_fk_patient_id` (`patient_id`);

--
-- Indexes for table `tbl_lab_results`
--
ALTER TABLE `tbl_lab_results`
  ADD PRIMARY KEY (`lab_result_id`),
  ADD KEY `lab_result_fk_opd_id` (`opd_id`);

--
-- Indexes for table `tbl_medicine_inventory`
--
ALTER TABLE `tbl_medicine_inventory`
  ADD PRIMARY KEY (`medicine_id`),
  ADD KEY `med_inv_fk_added_by` (`added_by`),
  ADD KEY `med_inv_fk_med_classification` (`med_classification`);

--
-- Indexes for table `tbl_medicine_release`
--
ALTER TABLE `tbl_medicine_release`
  ADD PRIMARY KEY (`med_release_id`),
  ADD KEY `med_release_fk_med_id` (`medicine_id`),
  ADD KEY `med_release_fk_released_by` (`released_by`),
  ADD KEY `med_release_fk_patient_id` (`patient_id`),
  ADD KEY `med_release_fk_dept_id` (`department`),
  ADD KEY `med_release_fk_doctor_id` (`doctor_id`);

--
-- Indexes for table `tbl_med_classification`
--
ALTER TABLE `tbl_med_classification`
  ADD PRIMARY KEY (`med_class_id`);

--
-- Indexes for table `tbl_opd`
--
ALTER TABLE `tbl_opd`
  ADD PRIMARY KEY (`opd_id`),
  ADD KEY `opd_prelim_fk_added_by` (`preliminary_checkup_done_by`),
  ADD KEY `opd_prelim_fk_patient_id` (`patient_id`);

--
-- Indexes for table `tbl_opd_disease`
--
ALTER TABLE `tbl_opd_disease`
  ADD PRIMARY KEY (`opd_disease_id`),
  ADD KEY `opd_disease_fk_opd_id` (`opd_id`);

--
-- Indexes for table `tbl_patient_info`
--
ALTER TABLE `tbl_patient_info`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `fk_household_id` (`household_id`),
  ADD KEY `fk_added_by` (`added_by`);

--
-- Indexes for table `tbl_prenatal`
--
ALTER TABLE `tbl_prenatal`
  ADD PRIMARY KEY (`prenatal_id`),
  ADD KEY `prenatal_fk_patient_id` (`patient_id`),
  ADD KEY `prenatal_fk_midwife_id` (`midwife_id`);

--
-- Indexes for table `tbl_prenatal_checkup`
--
ALTER TABLE `tbl_prenatal_checkup`
  ADD PRIMARY KEY (`prenatal_checkup_id`),
  ADD KEY `prenatal_checkup_fk_patient_id` (`patient_id`),
  ADD KEY `prenatal_checkup_fk_prenatal_id` (`prenatal_id`);

--
-- Indexes for table `tbl_pwd`
--
ALTER TABLE `tbl_pwd`
  ADD PRIMARY KEY (`pwd_id`),
  ADD KEY `pwd_fk_patient_id` (`patient_id`);

--
-- Indexes for table `tbl_queue`
--
ALTER TABLE `tbl_queue`
  ADD PRIMARY KEY (`queue_number`),
  ADD UNIQUE KEY `patient_id` (`patient_id`),
  ADD KEY `queue_fk_dept_id` (`department`);

--
-- Indexes for table `tbl_senior_citizen`
--
ALTER TABLE `tbl_senior_citizen`
  ADD PRIMARY KEY (`senior_citizen_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `tbl_supplies_inventory`
--
ALTER TABLE `tbl_supplies_inventory`
  ADD PRIMARY KEY (`supply_id`);

--
-- Indexes for table `tbl_supply_release`
--
ALTER TABLE `tbl_supply_release`
  ADD PRIMARY KEY (`supply_release_id`),
  ADD KEY `supply_release_fk_supply_id` (`supply_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_dept_id` (`department`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_dental_chart`
--
ALTER TABLE `tbl_dental_chart`
  MODIFY `dental_chart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_department`
--
ALTER TABLE `tbl_department`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_household`
--
ALTER TABLE `tbl_household`
  MODIFY `household_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_lab_results`
--
ALTER TABLE `tbl_lab_results`
  MODIFY `lab_result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_med_classification`
--
ALTER TABLE `tbl_med_classification`
  MODIFY `med_class_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_opd_disease`
--
ALTER TABLE `tbl_opd_disease`
  MODIFY `opd_disease_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_prenatal_checkup`
--
ALTER TABLE `tbl_prenatal_checkup`
  MODIFY `prenatal_checkup_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_supplies_inventory`
--
ALTER TABLE `tbl_supplies_inventory`
  MODIFY `supply_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_supply_release`
--
ALTER TABLE `tbl_supply_release`
  MODIFY `supply_release_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_dental`
--
ALTER TABLE `tbl_dental`
  ADD CONSTRAINT `dental_fk_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `dental_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_dental_chart`
--
ALTER TABLE `tbl_dental_chart`
  ADD CONSTRAINT `dental_chart_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_immunization`
--
ALTER TABLE `tbl_immunization`
  ADD CONSTRAINT `immunization_fk_immunizer_id` FOREIGN KEY (`immunizer_id`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `immunization_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_lab_results`
--
ALTER TABLE `tbl_lab_results`
  ADD CONSTRAINT `lab_result_fk_opd_id` FOREIGN KEY (`opd_id`) REFERENCES `tbl_opd` (`opd_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_medicine_inventory`
--
ALTER TABLE `tbl_medicine_inventory`
  ADD CONSTRAINT `med_inv_fk_added_by` FOREIGN KEY (`added_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `med_inv_fk_med_classification` FOREIGN KEY (`med_classification`) REFERENCES `tbl_med_classification` (`med_class_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_medicine_release`
--
ALTER TABLE `tbl_medicine_release`
  ADD CONSTRAINT `med_release_fk_dept_id` FOREIGN KEY (`department`) REFERENCES `tbl_department` (`dept_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `med_release_fk_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `med_release_fk_med_id` FOREIGN KEY (`medicine_id`) REFERENCES `tbl_medicine_inventory` (`medicine_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `med_release_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `med_release_fk_released_by` FOREIGN KEY (`released_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_opd`
--
ALTER TABLE `tbl_opd`
  ADD CONSTRAINT `opd_prelim_fk_added_by` FOREIGN KEY (`preliminary_checkup_done_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `opd_prelim_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_opd_disease`
--
ALTER TABLE `tbl_opd_disease`
  ADD CONSTRAINT `opd_disease_fk_opd_id` FOREIGN KEY (`opd_id`) REFERENCES `tbl_opd` (`opd_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_patient_info`
--
ALTER TABLE `tbl_patient_info`
  ADD CONSTRAINT `patient_info_fk_added_by` FOREIGN KEY (`added_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `patient_info_fk_household_id` FOREIGN KEY (`household_id`) REFERENCES `tbl_household` (`household_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_prenatal`
--
ALTER TABLE `tbl_prenatal`
  ADD CONSTRAINT `prenatal_fk_midwife_id` FOREIGN KEY (`midwife_id`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `prenatal_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_prenatal_checkup`
--
ALTER TABLE `tbl_prenatal_checkup`
  ADD CONSTRAINT `prenatal_checkup_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `prenatal_checkup_fk_prenatal_id` FOREIGN KEY (`prenatal_id`) REFERENCES `tbl_prenatal` (`prenatal_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pwd`
--
ALTER TABLE `tbl_pwd`
  ADD CONSTRAINT `pwd_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_queue`
--
ALTER TABLE `tbl_queue`
  ADD CONSTRAINT `queue_fk_dept_id` FOREIGN KEY (`department`) REFERENCES `tbl_department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `queue_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_senior_citizen`
--
ALTER TABLE `tbl_senior_citizen`
  ADD CONSTRAINT `patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_supply_release`
--
ALTER TABLE `tbl_supply_release`
  ADD CONSTRAINT `supply_release_fk_supply_id` FOREIGN KEY (`supply_id`) REFERENCES `tbl_supplies_inventory` (`supply_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `fk_dept_id` FOREIGN KEY (`department`) REFERENCES `tbl_department` (`dept_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
