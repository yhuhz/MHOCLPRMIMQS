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
      $payload = (array) json_decode($_GET['payload']);
      if (isset($payload['record_id'])) {
        $this->db->where('dental_id', $payload['record_id']);
      }
      $this->db->where('status', 0);
      $dental_records = $this->db->get('tbl_dental');
      $dental_records = $dental_records[0];

      if (isset($dental_records['doctor_id'])) {
        $this->db->where('user_id', $dental_records['doctor_id']);
        $doctor_name = $this->db->get('tbl_users', null, 'CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS name');
        $dental_records['doctor_name'] = $doctor_name[0]['name'];
        }

      $this->db->where('patient_id', $dental_records['patient_id']);
      $dental_chart = $this->db->get('tbl_dental_chart');


        echo json_encode(array('status' => 'success',
                                  'record' => $dental_records,
                                  'array' => $dental_chart,
                                  'method' => 'GET'
                                ));


    }

    public function httpPost($payload)
    {
      // print_r($payload); return;
      $payload = (array) $payload;
      $dental_record = $payload;
      $dental_record['dental_id'] = $this->db->insert('tbl_dental', $dental_record);

        //MANIPULATE IN FRONTEND
        //Check if dental chart exists
        $this->db->where('patient_id', $dental_record['patient_id']);
        $check_dental_chart = $this->db->getValue('tbl_dental_chart', 'count(*)');
        if ($check_dental_chart < 1) {

          for ($i = 1; $i <= 32; $i++) {
            $dental_chart_array = array('patient_id' => $dental_record['patient_id'], 'tooth_number' => $i);
            $dental_chart_array['dental_chart_id'] = $this->db->insert('tbl_dental_chart', $dental_chart_array);

          }
        }



        if ($dental_record['dental_id']) {
          $dental_record['record_id'] = $dental_record['dental_id'];
          unset($dental_record['dental_id']);

          $dental_record['date'] = $dental_record['checkup_date'];
          unset($dental_record['checkup_date']);

          echo json_encode(array('status' => 'success',
                                    'data' => $dental_record,
                                    'method' => 'POST'
                                  ));
        } else {
          echo json_encode(array('status' => 'fail',
                                    'message' => 'Failed to add record',
                                    'method' => 'POST'
                                  ));
          return;
        }

    }

    public function httpPut($payload)
    {
      $payload = (array) $payload;
      // print_r($payload); return;
      $dental_record = (array) $payload['dental_record'];
      $dental_record['dental_id'] = $dental_record['record_id'];
      unset($dental_record['record_id']);
      $dental_chart = (array) $payload['dental_chart'];

      //EDIT DENTAL RECORD
        $this->db->where('dental_id', $dental_record['dental_id']);
        $this->db->update('tbl_dental', $dental_record);
        $this->db->where('user_id', $dental_record['doctor_id']);
        $name = $this->db->get('tbl_users', null, 'CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS name');
         $dental_record['doctor_name'] = $name[0]['name'];

        foreach($dental_chart as $tooth) {
          $tooth = (array) $tooth;
          $this->db->where('dental_chart_id', $tooth['dental_chart_id']);
          $this->db->update('tbl_dental_chart', $tooth);
        }

        $dental_record['record_id'] = $dental_record['dental_id'];
        unset($dental_record['dental_id']);

        echo json_encode(array('status' => 'success',
                                'record' => $dental_record,
                                'array' => $dental_chart,
                                'method' => 'PUT'
                              ));


    }

    public function httpDelete($payload)
    {

      //DELETE DENTAL RECORD

        $this->db->where('dental_id', $_GET['record_id']);
        $dental_record = $this->db->update('tbl_dental', array('status' => 1));

        echo json_encode(array('status' => 'success',
                                'data' => 'Record successfully deleted',
                                'method' => 'DELETE'
                              ));

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
