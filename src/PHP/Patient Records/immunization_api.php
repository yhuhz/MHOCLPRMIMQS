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
      $immunization_records = $this->db->get('tbl_immunization');

      if ($immunization_records) {
        echo json_encode(array('status' => 'success',
                                  'data' => $immunization_records,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      foreach($payload as $immunization_record) {
        $immunization_record = (array) $immunization_record;

          $immunization_record['immunization_id'] = $this->db->insert('tbl_immunization', $immunization_record);

          if ($immunization_record['immunization_id']) {
            echo json_encode(array('status' => 'success',
                                      'data' => $immunization_record,
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

      $this->db->where('immunization_id', $payload['immunization_id']);
      $immunization_record = $this->db->update('tbl_immunization', $payload);

      echo json_encode(array('status' => 'success',
                              'data' => $payload,
                              'method' => 'PUT'
                            ));
    }

    public function httpDelete($payload)
    {
      $payload = (array) $payload;

      //DELETE DENTAL RECORD
      if (isset($payload['immunization_id'])) {

        $this->db->where('immunization_id', $payload['immunization_id']);
        $dental_record = $this->db->update('tbl_immunization', array('status' => 1));

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
