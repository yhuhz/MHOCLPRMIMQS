<?php
// Tells the browser to allow code from any origin to access
header("Access-Control-Allow-Origin: *");
// Tells browsers whether to expose the response to the frontend JavaScript code when the request's credentials mode (Request.credentials) is include
header("Access-Control-Allow-Credentials: true");
// Specifies one or more methods allowed when accessing a resource in response to a preflight request
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
// Used in response to a preflight request which includes the Access-Control-Request-Headers to indicate which HTTP headers can be used during the actual request
header("Access-Control-Allow-Headers: Content-Type");

require_once('../include/MysqliDb.php');
date_default_timezone_set('Asia/Manila');

class API
{
    public function __construct()
    {
        $this->db = new MysqliDB('localhost', 'root', '', 'mhoclprmimqs');
    }

    public function httpGet()
    {

      $dashboard_filter = (array) json_decode($_GET['dashboard_filter']);
      // print_r($dashboard_filter['filter']); return;

      $date_array = [];

      if ($dashboard_filter['filter'] === 'This Week') {
        $today = new DateTime();
        $week_start = clone $today;
        $week_start->modify('last Sunday');
        $week_end = clone $week_start;
        $week_end->modify('+6 days');

        $today = date_format($today, "Y-m-d");
        $week_start = date_format($week_start, "Y-m-d");
        $week_end = date_format($week_end, "Y-m-d");

        $date_array = [$week_start, $week_end];
        // print_r($date_array); return;

      } else if ($dashboard_filter['filter'] === 'This Month') {
        $date_array = [date('Y-m-01'), date('Y-m-t')];
      } else if ($dashboard_filter['filter'] === 'This Year') {
        $date_array = [date('Y-01-01'), date('Y-12-31')];
      }

      $data_array = [];

      //PATIENTS
      //Get Patient count
      $this->db->where('status', [0, 1], 'BETWEEN');
      $this->db->where('date_added', $date_array, 'BETWEEN');
      $patient_count = $this->db->getValue('tbl_patient_info', "count(*)");
      $data_array['patient_count'] = $patient_count;

      //Get OPD count
      $this->db->where('status', 0);
      $this->db->where('checkup_date', $date_array, 'BETWEEN');
      $opd_count = $this->db->getValue('tbl_opd', "count(*)");
      $data_array['opd_count'] = $opd_count;

      //Get Dental count
      $this->db->where('status', 0);
      $this->db->where('checkup_date', $date_array, 'BETWEEN');
      $dental_count = $this->db->getValue('tbl_dental', "count(*)");
      $data_array['dental_count'] = $dental_count;

      //Get Prenatal count
      $this->db->where('status', 0);
      $this->db->where('checkup_date', $date_array, 'BETWEEN');
      $prenatal_count = $this->db->getValue('tbl_prenatal_checkup', "count(*)");
      $data_array['prenatal_count'] = $prenatal_count;

      //Get Immunization count
      $this->db->where('status', 0);
      $this->db->where('immunization_date', $date_array, 'BETWEEN');
      $immunization_count = $this->db->getValue('tbl_immunization', "count(*)");
      $data_array['immunization_count'] = $immunization_count;

      //MEDICINES
      $this->db->where('status', 0);
      $medicine_count = $this->db->get('tbl_medicine_inventory');

      $med_array = [];

      foreach ($medicine_count as $medicine) {
          $this->db->where('medicine_id', $medicine['medicine_id']);
          $this->db->where('status', 0);
          $count = $this->db->getValue('tbl_medicine_release', "SUM(quantity)");
          $medicine['in_stock'] = $medicine['quantity'] - $count;
          $to_push = array('med_classification' => $medicine['med_classification'], 'in_stock' => $medicine['in_stock']);
          array_push($med_array, $to_push);
      }

      $merged_elements = array_reduce($med_array, function($result, $element) {
          $classification = $element["med_classification"];
          if (!array_key_exists($classification, $result)) {
              $result[$classification] = array("med_classification" => $classification, "in_stock" => 0);
          }
          $result[$classification]["in_stock"] += $element["in_stock"];
          return $result;
      }, array());

      $output = array();
      foreach ($merged_elements as $element) {
        $classification = $element["med_classification"];
        array_push($output, $element);
      }

      $data_array['medicine_count'] = $output;

      //SUPPLIES
      $this->db->where('status', 0);
      $supply_count = $this->db->get('tbl_supplies_inventory');

      $supply_array = [];

      foreach ($supply_count as $supply) {
          $this->db->where('supply_id', $supply['supply_id']);
          $this->db->where('status', 0);
          $count = $this->db->getValue('tbl_supply_release', "SUM(quantity)");
          $supply['in_stock'] = $supply['quantity'] - $count;
          $to_push = array('supply_type' => $supply['supply_type'], 'in_stock' => $supply['in_stock']);
          array_push($supply_array, $to_push);
      }

      $merged_elements = array_reduce($supply_array, function($result, $element) {
          $classification = $element["supply_type"];
          if (!array_key_exists($classification, $result)) {
              $result[$classification] = array("supply_type" => $classification, "in_stock" => 0);
          }
          $result[$classification]["in_stock"] += $element["in_stock"];
          return $result;
      }, array());

      $output = array();
      foreach ($merged_elements as $element) {
        $classification = $element["supply_type"];
        array_push($output, $element);
      }

      $data_array['supply_count'] = $output;


      //DISEASES
      //Get diseases count
      $this->db->where('date_added', $date_array, 'BETWEEN');
      $this->db->groupBy("opd_disease");
      $this->db->orderBy("opd_disease", "ASC");
      $disease_count = $this->db->get('tbl_opd_disease', null, "opd_disease, COUNT(*) as count");

      $data_array['diseases'] = $disease_count;
      $data_array['disease_count'] = count($disease_count);


        echo json_encode(array('status' => 'success',
                                  'data' => $data_array,
                                  'method' => 'GET'
                                ));

    }

    public function httpPost($payload)
    {

    }

    public function httpPut($payload)
    {

    }

    public function httpDelete($payload)
    {

    }
}
/* END OF CLASS */


$received_data = json_decode(file_get_contents('php://input'));
$request_method = $_SERVER['REQUEST_METHOD'];

$api = new API;

if ($request_method == 'GET') {
    $api->httpGet($received_data);
}
if ($request_method == 'POST') {
    $api->httpPost($received_data);
}
if ($request_method == 'PUT') {
    $api->httpPut($received_data);
}
if ($request_method == 'DELETE') {
    $api->httpDelete($received_data);
}
