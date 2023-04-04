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
      $this->db->where('date_added', $date_array, 'BETWEEN');
      $patient_count = $this->db->getValue('tbl_patient_info', "count(*)");
      $data_array['patient_count'] = $patient_count;

      //Get OPD count
      $this->db->where('checkup_date', $date_array, 'BETWEEN');
      $opd_count = $this->db->getValue('tbl_opd', "count(*)");
      $data_array['opd_count'] = $opd_count;

      //Get Dental count
      $this->db->where('checkup_date', $date_array, 'BETWEEN');
      $dental_count = $this->db->getValue('tbl_dental', "count(*)");
      $data_array['dental_count'] = $dental_count;

      //Get Prenatal count
      $this->db->where('checkup_date', $date_array, 'BETWEEN');
      $prenatal_count = $this->db->getValue('tbl_prenatal_checkup', "count(*)");
      $data_array['prenatal_count'] = $prenatal_count;

      //Get Immunization count
      $this->db->where('immunization_date', $date_array, 'BETWEEN');
      $immunization_count = $this->db->getValue('tbl_immunization', "count(*)");
      $data_array['immunization_count'] = $immunization_count;

      //MEDICINES
      //Get medicine count
      $medicine_count = $this->db->getValue('tbl_medicine_inventory', "SUM(quantity)");
      $data_array['medicine_count'] = $medicine_count;

      //Get medicine_release count
      $medicine_release_count = $this->db->getValue('tbl_medicine_release', "SUM(quantity)");
      $data_array['medicine_release_count'] = $medicine_release_count;

      //SUPPLIES
      //Get supplies count
      $supply_count = $this->db->getValue('tbl_supplies_inventory', "SUM(quantity)");
      $data_array['supply_count'] = $supply_count;

      //Get supplies release count
      $supply_release_count = $this->db->getValue('tbl_supply_release', "SUM(quantity)");
      $data_array['supply_release_count'] = $supply_release_count;

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
