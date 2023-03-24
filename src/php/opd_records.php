<?php
// Tells the browser to allow code from any origin to access
header("Access-Control-Allow-Origin: *");
// Tells browsers whether to expose the response to the frontend JavaScript code when the request's credentials mode (Request.credentials) is include
header("Access-Control-Allow-Credentials: true");
// Specifies one or more methods allowed when accessing a resource in response to a preflight request
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
// Used in response to a preflight request which includes the Access-Control-Request-Headers to indicate which HTTP headers can be used during the actual request
header("Access-Control-Allow-Headers: Content-Type");

require_once('./include/MysqliDb.php');
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
      $opd_records = $this->db->get('tbl_opd');
      $opd_array = [];

      foreach ($opd_records as $opd) {
        $this->db->where('opd_id', $opd['opd_id']);
        $opd['disease'] = $this->db->get('tbl_opd_disease', null, 'opd_disease_id, opd_disease, status');

        $this->db->where('opd_id', $opd['opd_id']);
        $opd['lab_results'] = $this->db->get('tbl_lab_results', null, 'lab_result_id, lab_result, status');

        array_push($opd_array, $opd);
      }

      if ($opd_records) {
        echo json_encode(array('status' => 'success',
                                  'data' => $opd_array,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      // print_r($payload); return;
      foreach($payload as $opd_record) {
        $opd_record = (array) $opd_record;

        $disease = $this->db->insert('tbl_disease', array('disease' => $opd_record['disease']));
        unset($opd['disease']);

        $lab_results = $this->db->insert('tbl_lab_results', array());
        unset('lab_results')

        $opd_record['date_added'] = date("Y-m-d");
        $opd = $this->db->insert('tbl_patient_info', $patient_info);


        if ($opd) {
          echo json_encode(array('status' => 'success',
                                    'data' => $opd,
                                    'method' => 'POST'
                                  ));
        } else {
          echo json_encode(array('status' => 'fail',
                                    'message' => 'Failed to add patient info',
                                    'method' => 'POST'
                                  ));
          return;
        }
      }


    }

    public function httpPut($payload)
    {
        $payload = (array) $payload;
        // $user_id = $payload['user_id'];

        //EDIT HOUSEHOLD INFO
        $this->db->where('household_id', $payload['household_id']);
        $household = $this->db->update('tbl_household', $payload);

        if ($household) {
          echo json_encode(array('status' => 'success',
                                  'data' => $payload,
                                  'method' => 'PUT'
                                ));
        }


    }

    public function httpDelete($payload)
    {
        $payload = (array) $payload;

        $this->db->where('patient_id', $payload['patient_id']);
        $payload['status'] = 1;
        $delete_user = $this->db->update('tbl_patient_info', $payload);

        if ($delete_user) {
            echo json_encode(array('status' => 'success',
                                'message' => 'User successfully removed',
                                'method' => 'DELETE'
          ));
        } else {
            echo json_encode(array('status' => 'failed'));
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
