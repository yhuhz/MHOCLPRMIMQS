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

    public function httpGet($payload)
    {

      $payload = (array) json_decode($_GET['payload']);
      if (isset($payload['record_id'])) {
        $this->db->where('opd_id', $payload['record_id']);
      }
      $this->db->where('status', 0);
      $opd_record = $this->db->get('tbl_opd');
      $opd_record = $opd_record[0];
      $opd_arrays = [];

          $this->db->where('opd_id', $opd_record['opd_id']);
          $opd_arrays['disease'] = $this->db->get('tbl_opd_disease', null,  'opd_disease');

          $this->db->where('opd_id', $opd_record['opd_id']);
          $opd_arrays['lab_results'] = $this->db->get('tbl_opd_lab_results', null, 'lab_result');

          if (isset($opd_record['doctor_id'])) {
          $this->db->where('user_id',$opd_record['doctor_id']);
          $doctor_name = $this->db->get('tbl_users', null, 'CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS name');
          $opd_record['doctor_name'] = $doctor_name[0]['name'];
          }

          if (isset($opd_record['preliminary_checkup_done_by'])) {
          $this->db->where('user_id',$opd_record['preliminary_checkup_done_by']);
          $prelim_name = $this->db->get('tbl_users', null, 'CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS name');
          $opd_record['preliminary_checkup_done_by_name'] = $prelim_name[0]['name'];
          }

      if ($opd_record) {
        echo json_encode(array('status' => 'success',
                                  'record' => $opd_record,
                                  'array' => $opd_arrays,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      // print_r($payload); return;
      // foreach($payload as $opd_record) {
        // $opd_record = (array) $opd_record;
        $opd_record = (array) $payload;

        $opd_record['opd_id'] = $this->db->insert('tbl_opd', $opd_record);

        if ($opd_record['opd_id']) {
          $opd_record['record_id'] = $opd_record['opd_id'];
          unset($opd_record['opd_id']);

          $opd_record['date'] = $opd_record['checkup_date'];
          unset($opd_record['checkup_date']);

          echo json_encode(array('status' => 'success',
                                    'data' => $opd_record,
                                    'method' => 'POST'
                                  ));
        } else {
          echo json_encode(array('status' => 'fail',
                                    'message' => 'Failed to add record',
                                    'method' => 'POST'
                                  ));
          return;
        }
      // }
    }

    public function httpPut($payload)
    {
      $payload = (array) $payload;

      $payload['opd_id'] = $payload['record_id'];
      unset($payload['record_id']);

      //EDIT OPD RECORD

      $disease_array = [];
      if (isset($payload['disease'])) {
        //Remove existing disease records
        $this->db->where('opd_id', $payload['opd_id']);
        $this->db->delete('tbl_opd_disease');

        //Replace records
        foreach ($payload['disease'] as $disease) {
          $disease = (array) $disease;
          $disease['opd_id'] = $payload['opd_id'];
          $disease['date_added'] = $payload['checkup_date'];
          $disease['opd_disease_id'] = $this->db->insert('tbl_opd_disease', $disease);

          if ($disease['opd_disease_id']) {
            array_push($disease_array, $disease);
          }
        }
      }
      unset($payload['disease']);

      $lab_results_array = [];
      if (isset($payload['lab_results'])) {
        //Remove existing disease records
        $this->db->where('opd_id', $payload['opd_id']);
        $this->db->delete('tbl_opd_lab_results');

        //Replace records
        foreach ($payload['lab_results'] as $lab_result) {
          $lab_result = (array) $lab_result;
          $lab_result['opd_id'] = $payload['opd_id'];
          $lab_result['lab_result_id'] = $this->db->insert('tbl_opd_lab_results', $lab_result);

          if ($lab_result['lab_result_id']) {
            array_push($lab_results_array, $lab_result);
          }
        }
      }

      unset($payload['lab_results']);

      $this->db->where('opd_id', $payload['opd_id']);
      $opd_record = $this->db->update('tbl_opd', $payload);

      if ($opd_record) {
        $this->db->where('user_id', $payload['preliminary_checkup_done_by']);
        $name = $this->db->get('tbl_users', null, 'CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS name');
        $payload['preliminary_checkup_done_by_name'] = $name[0]['name'];

        $this->db->where('user_id', $payload['doctor_id']);
        $name = $this->db->get('tbl_users', null, 'CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS name');
        $payload['doctor_name'] = $name[0]['name'];

        $opd_arrays = [];
        $opd_arrays['lab_results'] = $lab_results_array;
        $opd_arrays['disease'] = $disease_array;

        echo json_encode(array('status' => 'success',
                                'record' => $payload,
                                'array' => $opd_arrays,
                                'method' => 'PUT'
                              ));
      }


    }

    public function httpDelete($payload)
    {

        $this->db->where('opd_id', $_GET['record_id']);
        $delete_user = $this->db->update('tbl_opd', array('status' => 1));

        if ($delete_user) {
            echo json_encode(array('status' => 'success',
                                'message' => 'Record successfully removed',
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
