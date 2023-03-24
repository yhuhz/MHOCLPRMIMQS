-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2023 at 05:48 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mhoclprmimqs`
--
CREATE DATABASE IF NOT EXISTS `mhoclprmimqs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mhoclprmimqs`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_department`
--

CREATE TABLE `tbl_department` (
  `dept_id` int(11) NOT NULL,
  `dept_code` varchar(200) NOT NULL,
  `dept_name` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = suspended, 2 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_department`
--

INSERT INTO `tbl_department` (`dept_id`, `dept_code`, `dept_name`, `status`) VALUES
(1, 'OPD', 'Outpatient Department', 0),
(2, 'DNTL', 'Dental', 0),
(3, 'PNI', 'Prenatal and Immunization', 0),
(4, 'PHM', 'Pharmacy', 0),
(5, 'FD', 'Front Desk', 0),
(6, 'ADMIN', 'Admin Office', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_household`
--

CREATE TABLE `tbl_household` (
  `household_id` int(11) NOT NULL,
  `household_name` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_household`
--

INSERT INTO `tbl_household` (`household_id`, `household_name`, `status`) VALUES
(1, 'Grajo', 0),
(2, 'Basmayor', 0),
(3, 'Boco', 0),
(4, 'Abaranto', 0),
(5, 'Melgar', 0),
(6, 'Bas', 0),
(7, 'Malaya', 0),
(8, 'Arena', 0),
(9, 'Cabala', 0),
(10, 'Dalit', 0),
(11, 'Ronda', 0),
(12, 'Alcala', 0),
(13, 'Andes', 0),
(14, 'Armenta', 0),
(15, 'Miralles', 0),
(16, 'Cruz', 0),
(17, 'Hiram', 0),
(18, 'Reolo', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lab_results`
--

CREATE TABLE `tbl_lab_results` (
  `lab_result_id` int(11) NOT NULL,
  `opd_id` int(11) NOT NULL,
  `lab_result` varchar(5000) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_lab_results`
--

INSERT INTO `tbl_lab_results` (`lab_result_id`, `opd_id`, `lab_result`, `status`) VALUES
(1, 1, 'Blood in stool', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine_inventory`
--

CREATE TABLE `tbl_medicine_inventory` (
  `medicine_id` varchar(200) NOT NULL,
  `generic_name` varchar(500) NOT NULL,
  `brand_name` varchar(500) DEFAULT NULL,
  `med_classification` int(11) NOT NULL,
  `dosage_strength` varchar(200) DEFAULT NULL COMMENT 'ex. 500mg / 2mg',
  `dosage_form` varchar(200) NOT NULL,
  `ptr_number` varchar(200) DEFAULT NULL,
  `batch_lot_number` varchar(200) DEFAULT NULL,
  `mfg_date` date NOT NULL,
  `exp_date` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `procured_by` varchar(200) NOT NULL COMMENT 'ex. DOH, LGU, Private Individual',
  `date_added` date NOT NULL,
  `added_by` int(11) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opd`
--

CREATE TABLE `tbl_opd` (
  `opd_id` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_opd`
--

INSERT INTO `tbl_opd` (`opd_id`, `patient_id`, `prelim_checkup_date`, `temperature`, `blood_pressure`, `height`, `weight`, `pulse_rate`, `oxygen_sat`, `complaint`, `preliminary_checkup_done_by`, `doctor_id`, `checkup_results`, `next_checkup`, `status`) VALUES
(1, '03212301', '2023-03-24', 35, '120/60', 163, 70, 72, 75, 'Pain in the ass', 69, 69, 'The patient has a cucumber lodged in his butt.', '2023-03-25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opd_disease`
--

CREATE TABLE `tbl_opd_disease` (
  `opd_disease_id` int(11) NOT NULL,
  `opd_id` int(11) NOT NULL,
  `opd_disease` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_opd_disease`
--

INSERT INTO `tbl_opd_disease` (`opd_disease_id`, `opd_id`, `opd_disease`, `status`) VALUES
(1, 1, 'hemorrhoids', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_patient_info`
--

INSERT INTO `tbl_patient_info` (`patient_id`, `household_id`, `last_name`, `first_name`, `middle_name`, `suffix`, `sex`, `birthdate`, `barangay`, `address`, `phone_number`, `added_by`, `date_added`, `status`) VALUES
('03212301', 1, 'Grajo', 'Julius Albert', 'Areola', NULL, 1, '1996-09-09', 'Tagaytay', 'Camalig', '09269851328', 69, '2023-03-21', 0),
('03212302', 2, 'Basmayor', 'Mark Kenneth', 'Bataller', NULL, 1, '1978-10-10', 'Outside Camalig', 'Bacacay, Albay', '09269851328', 69, '2023-03-21', 0),
('03212303', 3, 'Boco', 'Roseler', 'Nasol', 'Jr', 1, '1969-02-10', 'Tagaytay', ' Tagaytay, Camalig, Albay', '09269874567', 69, '2023-03-21', 0),
('03232301', 2, 'Basmayor', 'Pia', 'Areola', NULL, 2, '1997-12-05', 'Bantonan', 'Bantonan, Camalig, Albay', '09812251321', 69, '2023-03-23', 0),
('03232302', 4, 'Abaranto', 'Cecillo', 'Romulo', NULL, 1, '1996-09-09', 'Tagaytay', 'Tagaytay, Camalig, Albay', '09269851328', 69, '2023-03-23', 0),
('03232303', 4, 'Abaranto', 'Elsie', 'Azuela', NULL, 2, '1995-06-09', 'Outside Camalig', 'Daraga, Albay', '09268151356', 69, '2023-03-23', 0),
('03232304', 5, 'Melgar', 'Layla', 'Poland', NULL, 2, '1999-10-03', 'Salugan', 'Salugan, Camalig, Albay', '09471924505', 69, '2023-03-23', 0),
('03232305', 5, 'Melgar', 'Roldan', 'Abrique', NULL, 1, '1995-09-10', 'Taloto', 'Taloto, Camalig, Albay', '09260051398', 69, '2023-03-23', 0),
('03232306', 5, 'Melgar', 'Jennifer', 'Abisado', NULL, 2, '2000-12-30', 'Gotob', 'Gotob, Camalig, Albay', '09461805143', 69, '2023-03-23', 0),
('03232307', 6, 'Bas', 'Ederson', 'Abuela', NULL, 1, '2004-08-03', 'Outside Camalig', 'Pawa, Albay', '09269952365', 69, '2023-03-23', 0),
('03232308', 6, 'Bas', 'Shenna Marie', 'Moya', NULL, 1, '1998-06-04', 'Miti', 'Miti, Camalig, Albay', '09269761328', 69, '2023-03-23', 0),
('03232309', 6, 'Bas', 'Regina', 'Abiera', NULL, 2, '1994-11-13', 'Bongabong', 'Bongabong, Camalig, Albay', '09267743557', 69, '2023-03-23', 0),
('03232310', 7, 'Malaya', 'Mercy', 'Abad', NULL, 2, '2000-10-17', 'Outside Camalig', 'Maroroy, Albay', '09819858325', 69, '2023-03-23', 0),
('03232311', 7, 'Malaya', 'Hannah Mae', 'Villa', NULL, 2, '2000-01-15', 'Binitayan', 'Binitayan, Camalig, Albay', '09260733629', 69, '2023-03-23', 0),
('03232312', 8, 'Arena', 'Marissa Joy', 'Nueva', NULL, 2, '1992-01-07', 'Binitayan', 'Binitayan, Camalig, Albay', '09269899328', 69, '2023-03-23', 0),
('03232313', 8, 'Arena', 'Maricel', 'Abes', NULL, 2, '1998-11-22', 'Binitayan', 'Binitayan, Camalig, Albay', '09818851324', 69, '2023-03-23', 0),
('03232314', 8, 'Arena', 'Joselito', 'Pascual', 'Jr', 1, '1993-06-09', 'Binitayan', 'Binitayan, Camalig, Albay', '09260091325', 69, '2023-03-23', 0),
('03232315', 8, 'Arena', 'Rofino', 'Abra', 'Sr', 1, '1938-06-07', 'Comun', 'Comun, Camalig, Albay', '09268824369', 69, '2023-03-23', 0),
('03232316', 9, 'Cabala', 'Francis', 'Escudero', NULL, 1, '1992-04-06', 'Outside Camalig', 'Legazpi, City', '09267851355', 69, '2023-03-23', 0),
('03232317', 9, 'Cabala', 'Albert', 'Balbin', NULL, 1, '1995-11-08', 'Caguiba', 'Caguiba, Camalig, Albay', '09260081356', 69, '2023-03-23', 0),
('03232318', 9, 'Cabala', 'John Paul', 'Masarate', NULL, 1, '1998-10-05', 'Caguiba', 'Caguiba, Camalig, Albay', '09817544359', 69, '2023-03-23', 0),
('03232319', 9, 'Cabala', 'Joel', 'Asejo', NULL, 1, '1997-05-03', 'Outside Camalig', 'Oas, Albay', '09260045524', 69, '2023-03-23', 0),
('03232320', 10, 'Dalit', 'Ruby', 'Reales', NULL, 2, '1999-09-17', 'Bariw', 'Bariw, Camalig, Albay', '09266851395', 69, '2023-03-23', 0),
('03232321', 10, 'Dalit', 'Maribel', 'Asignado', NULL, 2, '1983-10-18', 'Outside Camalig', 'Matnog, Albay', '09260051324', 69, '2023-03-23', 0),
('03232322', 10, 'Dalit', 'Peralta', 'Perez', NULL, 2, '1997-09-05', 'Outside Camalig', 'Malilipot, Albay', '09268853421', 69, '2023-03-23', 0),
('03232323', 11, 'Ronda', 'Roselyn', 'Agnote', NULL, 2, '1998-03-24', 'Outside Camalig', 'Polangui, Albay', '09268951322', 69, '2023-03-23', 0),
('03232324', 11, 'Ronda', 'Julius', 'Arnaldo', NULL, 1, '1998-04-09', 'Calabidongan', 'Calabidongan, Camalig, Albay', '09266651323', 69, '2023-03-23', 0),
('03232325', 11, 'Ronda', 'Francia', 'Panalo', NULL, 2, '1999-03-24', 'Ilawod', 'Ilawod, Camalig, Albay', '09260043224', 69, '2023-03-23', 0),
('03232326', 12, 'Alcala', 'Roberto', 'Abraham', NULL, 1, '1998-09-02', 'Ilawod', 'Ilawod, Camalig, Albay', '09264151325', 69, '2023-03-23', 0),
('03232327', 12, 'Alcala', 'Ruffa Mae', 'Israel', NULL, 2, '1999-11-26', 'Outside Camalig', 'Ligao, Albay', '09260895432', 69, '2023-03-23', 0),
('03232328', 12, 'Alcala', 'Rafael', 'Bola', NULL, 1, '1995-12-28', 'Magogon', 'Magogon, Camalig, Albay', '09269851355', 69, '2023-03-23', 0),
('03232329', 12, 'Alcala', 'Alexa', 'Esplana', NULL, 2, '1999-09-11', 'Magogon', 'Magogon, Camalig, Albay', '09260081906', 69, '2023-03-23', 0),
('03232330', 13, 'Andes', 'John', 'Arena', NULL, 1, '1991-12-05', 'Magogon', 'Magogon, Camalig, Albay', '09812756436', 69, '2023-03-23', 0),
('03232331', 13, 'Andes', 'Lizbit', 'Reblando', NULL, 2, '1990-08-13', 'Maninila', 'Maninila, Camalig, Albay', '09268851356', 69, '2023-03-23', 0),
('03232332', 13, 'Andes', 'Mary Rose', 'Montega', NULL, 2, '1999-12-15', 'Outside Camalig', 'Pioduran, Albay', '09815567432', 69, '2023-03-23', 0),
('03232333', 13, 'Andes', 'Raul', 'Almayda', NULL, 1, '1996-11-02', 'Gotob', 'Gotob, Camalig, Albay', '09268889421', 69, '2023-03-23', 0),
('03232334', 13, 'Andes', 'Leandro', 'Alagaban', NULL, 1, '1997-01-08', 'Gotob', 'Gotob, Camalig, Albay', '09265851355', 69, '2023-03-23', 0),
('03232335', 14, 'Armenta', 'Celest Emarie', 'Areola', NULL, 2, '2000-05-19', 'Palanog', 'Palanog, Camalig, Albay', '09816643521', 69, '2023-03-23', 0),
('03232336', 14, 'Armenta', 'Robert', 'Umayan', NULL, 1, '1997-10-09', 'Palanog', 'Palanog, Camalig, Albay', '09266455137', 69, '2023-03-23', 0),
('03232337', 14, 'Armenta', 'Jared Leonard', 'Ariel', NULL, 1, '2000-07-03', 'Cotmon', 'Cotmon, Camalig, Albay', '09264891376', 69, '2023-03-23', 0),
('03232338', 15, 'Miralles', 'Jonalyn', 'Azupardo', NULL, 2, '1986-10-06', 'Cotmon', 'Cotmon, Camalig, Albay', '09269856751', 69, '2023-03-23', 0),
('03232339', 15, 'Miralles', 'Jairus Lim', 'Barcebal', NULL, 1, '1996-09-09', 'Manawan', 'Manawan, Camalig, Albay', '09260042321', 69, '2023-03-23', 0),
('03232340', 15, 'Miralles', 'Michell', 'Ayala', NULL, 2, '1999-12-27', 'Manawan', 'Manawan, Camalig, Albay', '09263351358', 69, '2023-03-23', 0),
('03232341', 16, 'Cruz', 'Jose Rolando', 'Bente', NULL, 1, '1994-04-08', 'Quitinday', 'Quitinday, Camalig, Albay', '09812265324', 69, '2023-03-23', 0),
('03232342', 16, 'Cruz', 'Lilibeth', 'Berces', NULL, 2, '1990-05-21', 'Quitinday', 'Quitinday, Camalig, Albay', '09264532221 ', 69, '2023-03-23', 0),
('03232343', 16, 'Cruz', 'Veronica', 'Gonzales', NULL, 2, '1991-05-29', 'Outside Camalig', 'Malinaw, Albay', '09265551384', 69, '2023-03-23', 0),
('03232344', 16, 'Cruz', 'Josephine', 'Abaranto', NULL, 2, '1990-08-20', 'Gapo', 'Gapo, Camalig, Albay', '09819954324', 69, '2023-03-23', 0),
('03232345', 17, 'Hiram', 'Demetrio', 'Abonda', NULL, 1, '1990-10-22', 'Gapo', 'Gapo, Camalig, Albay', '09267746432', 69, '2023-03-23', 0),
('03232346', 17, 'Hiram', 'Jomar', 'Banalnal', NULL, 1, '2000-09-04', 'Anoling', 'Anoling, Camalig, Albay', '09263351384', 69, '2023-03-23', 0),
('03232347', 18, 'Reolo', 'Marelyn', 'Lucio', NULL, 2, '1991-11-23', 'Anoling', 'Anoling, Camalig, Albay', '09817745632', 69, '2023-03-23', 0),
('03232348', 18, 'Reolo', 'Samuel', 'Israel', NULL, 1, '1992-05-30', 'Mabunga', 'Mabunga, Camalig, Albay', '09260084532', 69, '2023-03-23', 0),
('03232349', 18, 'Reolo', 'Arnold', 'Arnulfo', NULL, 1, '1999-04-03', 'Mabunga', 'Mabunga, Camalig, Albay', '09815649642', 69, '2023-03-23', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pwd`
--

CREATE TABLE `tbl_pwd` (
  `pwd_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `disablity` varchar(500) DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deceased, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_queue`
--

CREATE TABLE `tbl_queue` (
  `queue_number` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `department` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_senior_citizen`
--

CREATE TABLE `tbl_senior_citizen` (
  `senior_citizen_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deceased, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `password`, `last_name`, `first_name`, `middle_name`, `suffix`, `birthdate`, `phone_number`, `sex`, `department`, `job_title`, `permission_level`, `date_added`, `status`) VALUES
(67, 'basmayormbOPD67', '$2y$10$5yE/uCGotKWaf9WYBH/qNeG9BZhQl9rsTevsxGwgrAEzOHgyj7R8m', 'Basmayor', 'Mark Kenneth', 'Bataller', NULL, '1998-05-05', '09488561235', 0, 1, 'Assistant', 2, '2023-03-18', 0),
(68, 'bocornDNTL68', '$2y$10$rbeyU7K7Y7hkWhuDsvMI1eHIu24ZZO1ugsSyco2eYLePZYlWEj.aS', 'Boco', 'Roseler', 'Nasol', 'Jr', '1998-05-05', '09488561235', 0, 2, 'Doctor', 2, '2023-03-18', 0),
(69, 'pogingAdmin69', '$2y$10$Hm2Y.fiN1kGYB1Ye.gDgbOBm1OC4IHGIcN3YnouWTm5lEu3F14NoS', 'Grajo', 'Julius Albert', 'Areola', NULL, '1998-05-05', '09488561235', 0, 6, 'Office Staff', 8, '2023-03-18', 0),
(70, 'ardaleseOPD70', '$2y$10$zcinjgZNSCPgsXHgHO/3Z.lXzG7s10mYtgvcExPP8497OA3lf3p6a', 'Ardales', 'Edmel', NULL, NULL, '1998-05-05', '09488561235', 0, 1, 'Doctor', 2, '2023-03-18', 0),
(71, 'aperinlOPD71', '$2y$10$djgAWdpYRa9n2ALt/qMdCeAmkYvKvzNmjWzHPVYOBHQvpvq41DZte', 'Aperin', 'Lynnette', NULL, NULL, '1998-05-05', '09488561235', 0, 1, 'Midwife', 3, '2023-03-18', 0),
(72, 'esplanasADMIN72', '$2y$10$IULIcy.DfQDA4je.5hQXR.n0EBgVu8pOMTeQ87msXbv2QqrDAVmAy', 'Esplana', 'Samuel', NULL, NULL, '1998-05-05', '09488561235', 0, 6, 'Office Staff', 1, '2023-03-18', 0),
(73, 'de la cruzjsFD73', '$2y$10$A3H06BTjwU1dTNZaGR12Mue7o3Zp.uc1TNat99CHoCqrHHH3OjKT.', 'De La Cruz', 'Juan', 'Santos', NULL, '1998-05-05', '09488561235', 0, 5, 'Front Desk Staff', 2, '2023-03-19', 0);

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
-- Indexes for table `tbl_opd`
--
ALTER TABLE `tbl_opd`
  ADD PRIMARY KEY (`opd_id`),
  ADD KEY `opd_prelim_fk_added_by` (`preliminary_checkup_done_by`),
  ADD KEY `opd_prelim_fk_patient_id` (`patient_id`),
  ADD KEY `opd_doctor_id` (`doctor_id`);

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
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_household`
--
ALTER TABLE `tbl_household`
  MODIFY `household_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_lab_results`
--
ALTER TABLE `tbl_lab_results`
  MODIFY `lab_result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_opd`
--
ALTER TABLE `tbl_opd`
  MODIFY `opd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_opd_disease`
--
ALTER TABLE `tbl_opd_disease`
  MODIFY `opd_disease_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

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
  ADD CONSTRAINT `lab_results_fk_opd_id` FOREIGN KEY (`opd_id`) REFERENCES `tbl_opd` (`opd_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_medicine_inventory`
--
ALTER TABLE `tbl_medicine_inventory`
  ADD CONSTRAINT `med_inv_fk_added_by` FOREIGN KEY (`added_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `opd_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
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
  ADD CONSTRAINT `fk_dept_id` FOREIGN KEY (`department`) REFERENCES `tbl_department` (`dept_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
