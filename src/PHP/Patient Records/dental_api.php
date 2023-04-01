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
      $this->db->where('patient_id', $_GET['patient_id']);
      $this->db->where('status', 0);
      $dental_records = $this->db->get('tbl_dental');
      $dental_array = [];

      foreach ($dental_records as $dental) {
        $this->db->where('patient_id', $dental['patient_id']);
        $dental['dental_chart'] = $this->db->get('tbl_dental_chart');

        array_push($dental_array, $dental);
      }

      if ($dental_records) {
        echo json_encode(array('status' => 'success',
                                  'data' => $dental_array,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      // print_r($payload); return;
      foreach($payload as $dental_record) {
        $dental_record = (array) $dental_record;

        $dental_record['dental_id'] = $this->db->insert('tbl_dental', $dental_record);

        //MANIPULATE IN FRONTEND
        //Check if dental chart exists
        $this->db->where('patient_id', $dental_record['patient_id']);
        $check_dental_chart = $this->db->getValue('tbl_dental_chart', 'count(*)');
        if ($check_dental_chart < 1) {
          $dental_chart = [];
          for ($i = 1; $i <= 32; $i++) {
            $dental_chart_array = array('patient_id' => $dental_record['patient_id'], 'tooth_number' => $i);
            $dental_chart_array['dental_chart_id'] = $this->db->insert('tbl_dental_chart', $dental_chart_array);

            if ($dental_chart_array['dental_chart_id']) {
              array_push($dental_chart, $dental_chart_array);
            }
          }

          $dental_record['dental_chart'] = $dental_chart;
        }

        if ($dental_record['dental_id']) {
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
    }

    public function httpPut($payload)
    {
      $payload = (array) $payload;

      //EDIT DENTAL RECORD
      if (isset($payload['dental_id'])) {

        $this->db->where('dental_id', $payload['dental_id']);
        $dental_record = $this->db->update('tbl_dental', $payload);

        echo json_encode(array('status' => 'success',
                                'data' => $payload,
                                'method' => 'PUT'
                              ));

      //EDIT DENTAL CHART RECORD
      } else if (isset($payload['dental_chart_id'])) {
        $this->db->where('dental_chart_id', $payload['dental_chart_id']);
        $dental_chart = $this->db->update('tbl_dental_chart', $payload);

        echo json_encode(array('status' => 'success',
                                'data' => $payload,
                                'method' => 'PUT'
                              ));
      }
    }

    public function httpDelete($payload)
    {
      $payload = (array) $payload;

      //DELETE DENTAL RECORD
      if (isset($payload['dental_id'])) {

        $this->db->where('dental_id', $payload['dental_id']);
        $dental_record = $this->db->update('tbl_dental', array('status' => 1));

        echo json_encode(array('status' => 'success',
                                'data' => 'Record successfully deleted',
                                'method' => 'DELETE'
                              ));
      }
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
