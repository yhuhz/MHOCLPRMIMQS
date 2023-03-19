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
        $this->db = new MysqliDB('localhost', 'root', '', 'capstone');
    }

    public function httpGet($payload)
    {
      if (isset($_GET['patient_id'])) {

        //SEARCH PATIENT BY ID
        $this->db->where('patient_id', $_GET['patient_id']);
        $this->db->where('is_deleted', 0);
        $patient = $this->db->get('tbl_patient_info');

        if ($patient) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patient,
                                    'method' => 'GET'
                                  ));
        }

      } else if (isset($_GET['household_id'])) {

        //SEARCH PATIENT BY HOUSEHOLD
        $this->db->where('household_id', $_GET['household_id']);
        $this->db->where('is_deleted', 0);
        $patient = $this->db->get('tbl_patient_info');

        if ($patient) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patient,
                                    'method' => 'GET'
                                  ));
        }

      } else {
        //GET PATIENT INFOS
        $this->db->where('is_deleted', 0);
        $patient = $this->db->get('tbl_patient_info');

        if ($patient) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patient,
                                    'method' => 'GET'
                                  ));
        }
      }


    }

    public function httpPost($payload)
    {
      $payload = (array) $payload;

      //ADD TO HOUSEHOLD
      $this->db->where('household_id', $payload['household_id']);
      $count = $this->db->getValue ("tbl_patient_info", "count(*)");

      $id_array = range('A', 'Z');
      $payload['patient_id'] = $payload['household_id'].$id_array[$count];

      $payload['date_added'] = date("Y-m-d");
      $patient = $this->db->insert('tbl_patient_info', $payload);

      if ($patient) {
        echo json_encode(array('status' => 'success',
                                  'data' => $payload,
                                  'method' => 'POST'
                                ));
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
        $payload['is_deleted'] = 1;
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
