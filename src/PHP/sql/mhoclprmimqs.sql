-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2023 at 10:28 PM
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
-- Database: `mhoclprmimqs`
--
CREATE DATABASE IF NOT EXISTS `mhoclprmimqs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mhoclprmimqs`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dental`
--

CREATE TABLE `tbl_dental` (
  `dental_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `checkup_date` date NOT NULL,
  `complaint` varchar(5000) NOT NULL,
  `temperature` int(11) NOT NULL,
  `blood_pressure` varchar(200) NOT NULL,
  `checkup_results` varchar(5000) NOT NULL,
  `next_checkup` date NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_dental`
--

INSERT INTO `tbl_dental` (`dental_id`, `doctor_id`, `patient_id`, `checkup_date`, `complaint`, `temperature`, `blood_pressure`, `checkup_results`, `next_checkup`, `status`) VALUES
(1, 68, '03212301', '2023-03-28', 'Toothache', 37, '120/60', 'Rotten tooth #4. Need to be extracted.', '2023-03-31', 0),
(8, 68, '03212302', '2023-03-28', '', 0, '', '', '0000-00-00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dental_chart`
--

CREATE TABLE `tbl_dental_chart` (
  `dental_chart_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `tooth_number` varchar(200) NOT NULL,
  `tooth_score` int(11) NOT NULL DEFAULT 0,
  `comments` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_dental_chart`
--

INSERT INTO `tbl_dental_chart` (`dental_chart_id`, `patient_id`, `tooth_number`, `tooth_score`, `comments`) VALUES
(34, '03212302', '1', 2, 'Tooth is decayed'),
(35, '03212302', '2', 0, ''),
(36, '03212302', '3', 0, ''),
(37, '03212302', '4', 0, ''),
(38, '03212302', '5', 0, ''),
(39, '03212302', '6', 0, ''),
(40, '03212302', '7', 0, ''),
(41, '03212302', '8', 0, ''),
(42, '03212302', '9', 0, ''),
(43, '03212302', '10', 0, ''),
(44, '03212302', '11', 0, ''),
(45, '03212302', '12', 0, ''),
(46, '03212302', '13', 0, ''),
(47, '03212302', '14', 0, ''),
(48, '03212302', '15', 0, ''),
(49, '03212302', '16', 0, ''),
(50, '03212302', '17', 0, ''),
(51, '03212302', '18', 0, ''),
(52, '03212302', '19', 0, ''),
(53, '03212302', '20', 0, ''),
(54, '03212302', '21', 0, ''),
(55, '03212302', '22', 0, ''),
(56, '03212302', '23', 0, ''),
(57, '03212302', '24', 0, ''),
(58, '03212302', '25', 0, ''),
(59, '03212302', '26', 0, ''),
(60, '03212302', '27', 0, ''),
(61, '03212302', '28', 0, ''),
(62, '03212302', '29', 0, ''),
(63, '03212302', '30', 0, ''),
(64, '03212302', '31', 0, ''),
(65, '03212302', '32', 0, '');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `immunization_id` int(11) NOT NULL,
  `immunizer_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `immunization_date` date NOT NULL,
  `next_immunization_date` date DEFAULT NULL,
  `vaccine_used` varchar(5000) NOT NULL,
  `comments` varchar(5000) DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_immunization`
--

INSERT INTO `tbl_immunization` (`immunization_id`, `immunizer_id`, `patient_id`, `immunization_date`, `next_immunization_date`, `vaccine_used`, `comments`, `status`) VALUES
(1, 71, '03232307', '2023-04-04', '2023-06-25', 'MMR Vaccine', 'No allergic reactions', 0),
(2, 71, '03232306', '2023-04-04', '2023-05-16', 'MMR Vaccine', 'No allergic reactions', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine_inventory`
--

CREATE TABLE `tbl_medicine_inventory` (
  `medicine_id` int(11) NOT NULL,
  `generic_name` varchar(500) NOT NULL,
  `brand_name` varchar(500) DEFAULT NULL,
  `med_classification` varchar(200) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_medicine_inventory`
--

INSERT INTO `tbl_medicine_inventory` (`medicine_id`, `generic_name`, `brand_name`, `med_classification`, `dosage_strength`, `dosage_form`, `ptr_number`, `batch_lot_number`, `mfg_date`, `exp_date`, `quantity`, `procured_by`, `date_added`, `added_by`, `status`) VALUES
(1, 'Paracetamol', 'Biogesic', 'Analgesic', '500mg/2mg', 'Tablet', '22-11-2101', '13-08-713', '2023-03-01', '2026-03-01', 500, 'DOH', '2023-04-01', 69, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine_release`
--

CREATE TABLE `tbl_medicine_release` (
  `med_release_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `medicine_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `release_date` date NOT NULL,
  `released_by` int(11) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_medicine_release`
--

INSERT INTO `tbl_medicine_release` (`med_release_id`, `patient_id`, `doctor_id`, `department`, `medicine_id`, `quantity`, `release_date`, `released_by`, `status`) VALUES
('', NULL, 69, 1, 1, 200, '2023-04-04', 69, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opd`
--

CREATE TABLE `tbl_opd` (
  `opd_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `checkup_date` date NOT NULL,
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

--
-- Dumping data for table `tbl_opd`
--

INSERT INTO `tbl_opd` (`opd_id`, `patient_id`, `checkup_date`, `temperature`, `blood_pressure`, `height`, `weight`, `pulse_rate`, `oxygen_sat`, `complaint`, `preliminary_checkup_done_by`, `doctor_id`, `checkup_results`, `next_checkup`, `status`) VALUES
(1, '03212301', '2023-03-14', 35, '120/60', 163, 70, 72, 75, 'Pain in the ass', 69, 72, 'Patient has no jowa', '2023-03-25', 0),
(2, '03212301', '2023-03-08', 37, '120/60', 163, 70, 70, 72, 'Pain when urinating', 73, 69, 'Patient has UTI. Prescribed antibiotics. Patient should drink lots of fluids.', '2023-03-25', 0),
(4, '03212302', '2023-01-12', 37, '120/60', 163, 70, 70, 72, 'Heartbroken', 73, 67, 'tesxt test', NULL, 0),
(7, '03212301', '2023-04-06', 37, '120/60', 175, 63, 75, 88, 'Loss of apetite', 69, 69, NULL, NULL, 0),
(8, '03212301', '2023-03-14', 35, '120/60', 163, 70, 72, 75, 'Pain in the ass', 71, 68, 'Patient has no jowa', '2023-03-25', 0),
(10, '03212301', '2023-04-07', 38, '110/20', 167, 74, 88, 88, 'test', 69, 67, NULL, NULL, 1),
(11, '03212301', '2023-04-20', 38, '120/60', 178, 56, 88, 88, 'test test', 70, 68, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opd_disease`
--

CREATE TABLE `tbl_opd_disease` (
  `opd_disease_id` int(11) NOT NULL,
  `opd_id` int(11) NOT NULL,
  `opd_disease` varchar(200) NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_opd_disease`
--

INSERT INTO `tbl_opd_disease` (`opd_disease_id`, `opd_id`, `opd_disease`, `date_added`) VALUES
(5, 2, 'UTI', '2023-03-14'),
(45, 8, 'Heartbroken', '0000-00-00'),
(46, 8, 'Mahilig uminom', '0000-00-00'),
(87, 1, 'Heartbroken', '0000-00-00'),
(88, 1, 'Mahilig uminom', '0000-00-00'),
(93, 4, 'test', '0000-00-00'),
(94, 4, 'test', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opd_lab_results`
--

CREATE TABLE `tbl_opd_lab_results` (
  `lab_result_id` int(11) NOT NULL,
  `opd_id` int(11) NOT NULL,
  `lab_result` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_opd_lab_results`
--

INSERT INTO `tbl_opd_lab_results` (`lab_result_id`, `opd_id`, `lab_result`) VALUES
(7, 2, 'Blood in urine'),
(8, 2, 'Bacteria in urine'),
(32, 8, 'Walang jowa'),
(53, 1, 'Walang jowa'),
(56, 4, 'test');

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
  `sex` int(2) NOT NULL COMMENT '0 - male, 1 - female',
  `birthdate` date NOT NULL,
  `barangay` varchar(200) NOT NULL,
  `address` varchar(5000) NOT NULL,
  `phone_number` varchar(200) DEFAULT NULL,
  `added_by` int(11) NOT NULL,
  `date_added` date NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deceased, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_patient_info`
--

INSERT INTO `tbl_patient_info` (`patient_id`, `household_id`, `last_name`, `first_name`, `middle_name`, `suffix`, `sex`, `birthdate`, `barangay`, `address`, `phone_number`, `added_by`, `date_added`, `status`) VALUES
('03212301', 1, 'Grajo', 'Julius Albert', 'Areola', NULL, 0, '1996-09-09', 'Tagaytay', 'Camalig', '094685123123', 69, '2023-03-21', 0),
('03212302', 2, 'Basmayor', 'Mark Kenneth', 'Bataller', NULL, 0, '1978-10-10', 'Outside Camalig', 'Bacacay, Albay', '09269851328', 69, '2023-03-21', 0),
('03212303', 3, 'Boco', 'Roseler', 'Nasol', 'Jr', 0, '1969-02-10', 'Tagaytay', ' Tagaytay, Camalig, Albay', '09269874567', 69, '2023-03-21', 0),
('03232301', 2, 'Basmayor', 'Pia', 'Areola', NULL, 1, '1997-12-05', 'Bantonan', 'Bantonan, Camalig, Albay', '09812251321', 69, '2023-03-23', 0),
('03232302', 4, 'Abaranto', 'Cecillo', 'Romulo', NULL, 0, '1996-09-09', 'Tagaytay', 'Tagaytay, Camalig, Albay', '09269851328', 69, '2023-03-23', 0),
('03232303', 4, 'Abaranto', 'Elsie', 'Azuela', NULL, 1, '1995-06-09', 'Outside Camalig', 'Daraga, Albay', '09268151356', 69, '2023-03-23', 0),
('03232304', 5, 'Melgar', 'Layla', 'Poland', NULL, 1, '1999-10-03', 'Salugan', 'Salugan, Camalig, Albay', '09471924505', 69, '2023-03-23', 0),
('03232305', 5, 'Melgar', 'Roldan', 'Abrique', NULL, 0, '1995-09-10', 'Taloto', 'Taloto, Camalig, Albay', '09260051398', 69, '2023-03-23', 0),
('03232306', 5, 'Melgar', 'Jennifer', 'Abisado', NULL, 1, '2022-12-30', 'Gotob', 'Gotob, Camalig, Albay', '09461805143', 69, '2023-03-23', 0),
('03232307', 6, 'Bas', 'Ederson', 'Abuela', NULL, 0, '2022-08-03', 'Outside Camalig', 'Pawa, Albay', '09269952365', 69, '2023-03-23', 0),
('03232308', 6, 'Bas', 'Shenna Marie', 'Moya', NULL, 1, '1998-06-04', 'Miti', 'Miti, Camalig, Albay', '09269761328', 69, '2023-03-23', 0),
('03232309', 6, 'Bas', 'Regina', 'Abiera', NULL, 1, '1994-11-13', 'Bongabong', 'Bongabong, Camalig, Albay', '09267743557', 69, '2023-03-23', 0),
('03232310', 7, 'Malaya', 'Mercy', 'Abad', NULL, 1, '2023-01-04', 'Outside Camalig', 'Maroroy, Albay', '09819858325', 69, '2023-03-23', 0),
('03232311', 7, 'Malaya', 'Hannah Mae', 'Villa', NULL, 1, '2000-01-15', 'Binitayan', 'Binitayan, Camalig, Albay', '09260733629', 69, '2023-03-23', 0),
('03232312', 8, 'Arena', 'Marissa Joy', 'Nueva', NULL, 1, '1992-01-07', 'Binitayan', 'Binitayan, Camalig, Albay', '09269899328', 69, '2023-03-23', 0),
('03232313', 8, 'Arena', 'Maricel', 'Abes', NULL, 1, '1998-11-22', 'Binitayan', 'Binitayan, Camalig, Albay', '09818851324', 69, '2023-03-23', 0),
('03232314', 8, 'Arena', 'Joselito', 'Pascual', 'Jr', 0, '1993-06-09', 'Binitayan', 'Binitayan, Camalig, Albay', '09260091325', 69, '2023-03-23', 0),
('03232315', 8, 'Arena', 'Rofino', 'Abra', 'Sr', 0, '1938-06-07', 'Comun', 'Comun, Camalig, Albay', '09268824369', 69, '2023-03-23', 0),
('03232316', 9, 'Cabala', 'Francis', 'Escudero', NULL, 0, '1992-04-06', 'Outside Camalig', 'Legazpi, City', '09267851355', 69, '2023-03-23', 0),
('03232317', 9, 'Cabala', 'Albert', 'Balbin', NULL, 0, '1995-11-08', 'Caguiba', 'Caguiba, Camalig, Albay', '09260081356', 69, '2023-03-23', 0),
('03232318', 9, 'Cabala', 'John Paul', 'Masarate', NULL, 0, '1998-10-05', 'Caguiba', 'Caguiba, Camalig, Albay', '09817544359', 69, '2023-03-23', 0),
('03232319', 9, 'Cabala', 'Joel', 'Asejo', NULL, 0, '1997-05-03', 'Outside Camalig', 'Oas, Albay', '09260045524', 69, '2023-03-23', 0),
('03232320', 10, 'Dalit', 'Ruby', 'Reales', NULL, 1, '1999-09-17', 'Bariw', 'Bariw, Camalig, Albay', '09266851395', 69, '2023-03-23', 0),
('03232321', 10, 'Dalit', 'Maribel', 'Asignado', NULL, 1, '1983-10-18', 'Outside Camalig', 'Matnog, Albay', '09260051324', 69, '2023-03-23', 0),
('03232322', 10, 'Dalit', 'Peralta', 'Perez', NULL, 0, '1997-09-05', 'Outside Camalig', 'Malilipot, Albay', '09268853421', 69, '2023-03-23', 0),
('03232323', 11, 'Ronda', 'Roselyn', 'Agnote', NULL, 1, '1998-03-24', 'Outside Camalig', 'Polangui, Albay', '09268951322', 69, '2023-03-23', 0),
('03232324', 11, 'Ronda', 'Julius', 'Arnaldo', NULL, 0, '1998-04-09', 'Calabidongan', 'Calabidongan, Camalig, Albay', '09266651323', 69, '2023-03-23', 0),
('03232325', 11, 'Ronda', 'Francia', 'Panalo', NULL, 1, '1999-03-24', 'Ilawod', 'Ilawod, Camalig, Albay', '09260043224', 69, '2023-03-23', 0),
('03232326', 12, 'Alcala', 'Roberto', 'Abraham', NULL, 0, '1998-09-02', 'Ilawod', 'Ilawod, Camalig, Albay', '09264151325', 69, '2023-03-23', 0),
('03232327', 12, 'Alcala', 'Ruffa Mae', 'Israel', NULL, 1, '1999-11-26', 'Outside Camalig', 'Ligao, Albay', '09260895432', 69, '2023-03-23', 0),
('03232328', 12, 'Alcala', 'Rafael', 'Bola', NULL, 0, '1995-12-28', 'Magogon', 'Magogon, Camalig, Albay', '09269851355', 69, '2023-03-23', 0),
('03232329', 12, 'Alcala', 'Alexa', 'Esplana', NULL, 1, '1999-09-11', 'Magogon', 'Magogon, Camalig, Albay', '09260081906', 69, '2023-03-23', 0),
('03232330', 13, 'Andes', 'John', 'Arena', NULL, 0, '1991-12-05', 'Magogon', 'Magogon, Camalig, Albay', '09812756436', 69, '2023-03-23', 0),
('03232331', 13, 'Andes', 'Lizbit', 'Reblando', NULL, 1, '1990-08-13', 'Maninila', 'Maninila, Camalig, Albay', '09268851356', 69, '2023-03-23', 0),
('03232332', 13, 'Andes', 'Mary Rose', 'Montega', NULL, 1, '1999-12-15', 'Outside Camalig', 'Pioduran, Albay', '09815567432', 69, '2023-03-23', 0),
('03232333', 13, 'Andes', 'Raul', 'Almayda', NULL, 0, '1996-11-02', 'Gotob', 'Gotob, Camalig, Albay', '09268889421', 69, '2023-03-23', 0),
('03232334', 13, 'Andes', 'Leandro', 'Alagaban', NULL, 0, '1997-01-08', 'Gotob', 'Gotob, Camalig, Albay', '09265851355', 69, '2023-03-23', 0),
('03232335', 14, 'Armenta', 'Celest Emarie', 'Areola', NULL, 1, '2000-05-19', 'Palanog', 'Palanog, Camalig, Albay', '09816643521', 69, '2023-03-23', 0),
('03232336', 14, 'Armenta', 'Robert', 'Umayan', NULL, 0, '1997-10-09', 'Palanog', 'Palanog, Camalig, Albay', '09266455137', 69, '2023-03-23', 0),
('03232337', 14, 'Armenta', 'Jared Leonard', 'Ariel', NULL, 0, '2000-07-03', 'Cotmon', 'Cotmon, Camalig, Albay', '09264891376', 69, '2023-03-23', 0),
('03232338', 15, 'Miralles', 'Jonalyn', 'Azupardo', NULL, 1, '1986-10-06', 'Cotmon', 'Cotmon, Camalig, Albay', '09269856751', 69, '2023-03-23', 0),
('03232339', 15, 'Miralles', 'Jairus Lim', 'Barcebal', NULL, 0, '1996-09-09', 'Manawan', 'Manawan, Camalig, Albay', '09260042321', 69, '2023-03-23', 0),
('03232340', 15, 'Miralles', 'Michell', 'Ayala', NULL, 1, '1999-12-27', 'Manawan', 'Manawan, Camalig, Albay', '09263351358', 69, '2023-03-23', 0),
('03232341', 16, 'Cruz', 'Jose Rolando', 'Bente', NULL, 0, '1994-04-08', 'Quitinday', 'Quitinday, Camalig, Albay', '09812265324', 69, '2023-03-23', 0),
('03232342', 16, 'Cruz', 'Lilibeth', 'Berces', NULL, 1, '1990-05-21', 'Quitinday', 'Quitinday, Camalig, Albay', '09264532221 ', 69, '2023-03-23', 0),
('03232343', 16, 'Cruz', 'Veronica', 'Gonzales', NULL, 1, '1991-05-29', 'Outside Camalig', 'Malinaw, Albay', '09265551384', 69, '2023-03-23', 0),
('03232344', 16, 'Cruz', 'Josephine', 'Abaranto', NULL, 1, '1990-08-20', 'Gapo', 'Gapo, Camalig, Albay', '09819954324', 69, '2023-03-23', 0),
('03232345', 17, 'Hiram', 'Demetrio', 'Abonda', NULL, 0, '1990-10-22', 'Gapo', 'Gapo, Camalig, Albay', '09267746432', 69, '2023-03-23', 0),
('03232346', 17, 'Hiram', 'Jomar', 'Banalnal', NULL, 0, '2000-09-04', 'Anoling', 'Anoling, Camalig, Albay', '09263351384', 69, '2023-03-23', 0),
('03232347', 18, 'Reolo', 'Marelyn', 'Lucio', NULL, 1, '1991-11-23', 'Anoling', 'Anoling, Camalig, Albay', '09817745632', 69, '2023-03-23', 0),
('03232348', 18, 'Reolo', 'Samuel', 'Israel', NULL, 0, '1992-05-30', 'Mabunga', 'Mabunga, Camalig, Albay', '09260084532', 69, '2023-03-23', 0),
('03232349', 18, 'Reolo', 'Arnold', 'Arnulfo', NULL, 0, '1999-04-03', 'Mabunga', 'Mabunga, Camalig, Albay', '09815649642', 69, '2023-03-23', 0),
('04032301', 1, 'Cruz', 'Lance', 'Baller', NULL, 0, '2020-03-28', 'Tagaytay', 'Tagaytay, Camalig, Albay', '09269851328', 69, '2023-04-03', 0),
('04032302', 2, 'Hiram', 'John Mark', 'Bataller', NULL, 0, '2020-03-22', 'Anoling', 'Anoling, Camalig, Albay', '09269851328', 69, '2023-04-03', 0),
('04032303', 3, 'Andes', 'Asley Zeah', 'zuela', NULL, 1, '2020-03-10', 'Gotob', 'Gotob, Camalig, Albay', '09268151356', 69, '2023-04-03', 0),
('04032304', 4, 'Datun', 'Althea Zamarrah', 'Areola', NULL, 1, '2020-03-07', 'Bantonan', 'Bantonan, Camalig, Albay', '09812251321', 69, '2023-04-03', 0),
('04032305', 5, 'Largo', 'John Louie', 'Dexisne', NULL, 0, '2023-03-20', 'Salugan', 'Salugan, Camalig, Albay', '09471924505', 69, '2023-04-03', 0),
('04032306', 6, 'Villa', 'Achiles Jacob', 'Abuela', NULL, 0, '2023-03-11', 'Taloto', 'Taloto, Camalig, Albay', '09260051398', 69, '2023-04-03', 0),
('04032307', 7, 'Zeus', 'Ruffa Mae', 'Abes', NULL, 1, '2000-12-30', 'Gotob', 'Gotob, Camalig, Albay', '09461805143', 69, '2023-04-03', 0),
('04032308', 8, 'Moya', 'Jayley Rose', 'Andes', NULL, 1, '2020-03-18', 'Bariw', 'Bariw, Camalig, Albay', '09269952365', 69, '2023-04-03', 0),
('04032309', 9, 'Yap', 'John Albet', 'Alejo', NULL, 0, '2023-03-23', 'Miti', 'Miti, Camalig, Albay', '09269761328', 69, '2023-04-03', 0),
('04032310', 10, 'Atun', 'Rhian Mae', 'Abiera', NULL, 1, '2023-03-19', 'Bongabong', 'Bongabong, Camalig, Albay', '09267743557', 69, '2023-04-03', 0),
('04042301', 1, 'De La Cruz', 'Antonio', NULL, NULL, 0, '2015-04-04', 'Baligang', 'Baligang, Camalig', '09451237851', 69, '2023-04-04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_prenatal`
--

CREATE TABLE `tbl_prenatal` (
  `prenatal_id` int(11) NOT NULL,
  `midwife_id` int(11) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `last_menstruation` date NOT NULL,
  `previous_full_term` int(11) NOT NULL,
  `previous_premature` int(11) NOT NULL,
  `midwifes_notes` varchar(5000) DEFAULT NULL,
  `date_added` date NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_prenatal`
--

INSERT INTO `tbl_prenatal` (`prenatal_id`, `midwife_id`, `patient_id`, `last_menstruation`, `previous_full_term`, `previous_premature`, `midwifes_notes`, `date_added`, `status`) VALUES
(1, 71, '03232301', '2023-01-05', 0, 0, 'Pregnancy is normal.', '2023-03-29', 0),
(2, 71, '03232303', '2023-02-03', 1, 1, 'All seems good', '2023-03-29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_prenatal_checkup`
--

CREATE TABLE `tbl_prenatal_checkup` (
  `prenatal_checkup_id` int(11) NOT NULL,
  `prenatal_id` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `temperature` int(11) NOT NULL,
  `blood_pressure` varchar(200) NOT NULL,
  `pulse_rate` int(11) DEFAULT NULL,
  `oxygen_sat` int(11) NOT NULL,
  `checkup_date` date NOT NULL,
  `next_checkup` date DEFAULT NULL,
  `comments` varchar(5000) DEFAULT NULL,
  `status` int(3) NOT NULL COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_prenatal_checkup`
--

INSERT INTO `tbl_prenatal_checkup` (`prenatal_checkup_id`, `prenatal_id`, `height`, `weight`, `temperature`, `blood_pressure`, `pulse_rate`, `oxygen_sat`, `checkup_date`, `next_checkup`, `comments`, `status`) VALUES
(1, 1, 156, 65, 37, '120/60', 77, 77, '2023-03-29', '2023-05-18', 'Pregnancy is normal. Patients needs lot of bed rest and vitamins.', 0),
(2, 2, 175, 58, 37, '120/60', 77, 77, '2023-03-29', '2023-05-01', 'Pregnancy is okay. Patient needs to drink some vitamins.', 0),
(3, 2, 175, 58, 37, '120/60', 77, 77, '2023-05-01', '2023-07-08', 'Pregnancy is okay.', 0),
(4, 2, 175, 58, 37, '120/60', 77, 77, '2023-07-08', '2023-08-02', 'Pregnancy is okay.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pwd`
--

CREATE TABLE `tbl_pwd` (
  `pwd_id` varchar(200) NOT NULL,
  `patient_id` varchar(200) NOT NULL,
  `disability` varchar(500) DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deceased, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pwd`
--

INSERT INTO `tbl_pwd` (`pwd_id`, `patient_id`, `disability`, `status`) VALUES
('12test', '03212302', 'Erectile Dysfunction', 0);

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

--
-- Dumping data for table `tbl_senior_citizen`
--

INSERT INTO `tbl_senior_citizen` (`senior_citizen_id`, `patient_id`, `status`) VALUES
('12xc', '03212302', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplies_inventory`
--

CREATE TABLE `tbl_supplies_inventory` (
  `supply_id` int(11) NOT NULL,
  `supply_name` varchar(200) NOT NULL,
  `supply_type` varchar(200) NOT NULL,
  `mfg_date` date NOT NULL,
  `exp_date` date DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `quantity_type` varchar(200) NOT NULL,
  `date_added` date NOT NULL,
  `added_by` int(11) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_supplies_inventory`
--

INSERT INTO `tbl_supplies_inventory` (`supply_id`, `supply_name`, `supply_type`, `mfg_date`, `exp_date`, `quantity`, `quantity_type`, `date_added`, `added_by`, `status`) VALUES
(1, 'Gloves', 'Gloves', '2022-04-05', '2026-04-15', 600, 'piece', '2023-04-04', 69, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supply_release`
--

CREATE TABLE `tbl_supply_release` (
  `supply_release_id` int(11) NOT NULL,
  `supply_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `release_date` date NOT NULL,
  `released_by` int(11) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 0 COMMENT '0 = active, 1 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_supply_release`
--

INSERT INTO `tbl_supply_release` (`supply_release_id`, `supply_id`, `user_id`, `quantity`, `release_date`, `released_by`, `status`) VALUES
(1, 1, 69, 100, '2023-04-04', 69, 0);

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
(69, 'pogingAdmin69', '$2y$10$W4Q9MuV5gSnxM4oCZI6IGu25yxNiBtgz2pwlbk692WdjT5rLbTDt.', 'Grajo', 'Julius Albert', 'Areola', NULL, '1998-05-05', '09488561235', 0, 6, 'Office Staff', 1, '2023-03-18', 0),
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
-- Indexes for table `tbl_opd_lab_results`
--
ALTER TABLE `tbl_opd_lab_results`
  ADD PRIMARY KEY (`lab_result_id`),
  ADD KEY `lab_result_fk_opd_id` (`opd_id`);

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
  ADD PRIMARY KEY (`supply_id`),
  ADD KEY `supplies_inv_fk_added_by` (`added_by`);

--
-- Indexes for table `tbl_supply_release`
--
ALTER TABLE `tbl_supply_release`
  ADD PRIMARY KEY (`supply_release_id`),
  ADD KEY `supply_release_fk_supply_id` (`supply_id`),
  ADD KEY `supply_release_fk_released_by` (`released_by`),
  ADD KEY `supply_release_fk_user_id` (`user_id`);

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
-- AUTO_INCREMENT for table `tbl_dental`
--
ALTER TABLE `tbl_dental`
  MODIFY `dental_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_dental_chart`
--
ALTER TABLE `tbl_dental_chart`
  MODIFY `dental_chart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `tbl_department`
--
ALTER TABLE `tbl_department`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_household`
--
ALTER TABLE `tbl_household`
  MODIFY `household_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_immunization`
--
ALTER TABLE `tbl_immunization`
  MODIFY `immunization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_medicine_inventory`
--
ALTER TABLE `tbl_medicine_inventory`
  MODIFY `medicine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_opd`
--
ALTER TABLE `tbl_opd`
  MODIFY `opd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_opd_disease`
--
ALTER TABLE `tbl_opd_disease`
  MODIFY `opd_disease_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `tbl_opd_lab_results`
--
ALTER TABLE `tbl_opd_lab_results`
  MODIFY `lab_result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `tbl_prenatal`
--
ALTER TABLE `tbl_prenatal`
  MODIFY `prenatal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_prenatal_checkup`
--
ALTER TABLE `tbl_prenatal_checkup`
  MODIFY `prenatal_checkup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_supplies_inventory`
--
ALTER TABLE `tbl_supplies_inventory`
  MODIFY `supply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_supply_release`
--
ALTER TABLE `tbl_supply_release`
  MODIFY `supply_release_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Constraints for table `tbl_opd_lab_results`
--
ALTER TABLE `tbl_opd_lab_results`
  ADD CONSTRAINT `lab_results_fk_opd_id` FOREIGN KEY (`opd_id`) REFERENCES `tbl_opd` (`opd_id`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `prenatal_checkup_fk_prenatal_id` FOREIGN KEY (`prenatal_id`) REFERENCES `tbl_prenatal` (`prenatal_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pwd`
--
ALTER TABLE `tbl_pwd`
  ADD CONSTRAINT `pwd_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `patient_id` FOREIGN KEY (`patient_id`) REFERENCES `tbl_patient_info` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_supplies_inventory`
--
ALTER TABLE `tbl_supplies_inventory`
  ADD CONSTRAINT `supplies_inv_fk_added_by` FOREIGN KEY (`added_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_supply_release`
--
ALTER TABLE `tbl_supply_release`
  ADD CONSTRAINT `supply_release_fk_released_by` FOREIGN KEY (`released_by`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `supply_release_fk_supply_id` FOREIGN KEY (`supply_id`) REFERENCES `tbl_supplies_inventory` (`supply_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `supply_release_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `fk_dept_id` FOREIGN KEY (`department`) REFERENCES `tbl_department` (`dept_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
