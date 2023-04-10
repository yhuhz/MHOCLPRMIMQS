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
        $this->db->where('prenatal_id', $payload['record_id']);
      }
      $this->db->where('pn.status', 0);

      $this->db->join('tbl_users u', 'u.user_id=pn.midwife_id', 'LEFT');
      $prenatal_records = $this->db->get('tbl_prenatal pn', null, 'prenatal_id, midwife_id, patient_id, last_menstruation, previous_full_term, previous_premature, midwifes_notes, pn.date_added, concat(first_name, " ", last_name,  " ", coalesce(suffix, "")) as midwife_name');
      $prenatal_checkup = [];

      foreach ($prenatal_records as $prenatal) {
        $this->db->where('prenatal_id', $prenatal['prenatal_id']);
        $this->db->where('status', 0);

        array_push($prenatal_checkup, $this->db->get('tbl_prenatal_checkup'));
      }

      if ($prenatal_records) {
        echo json_encode(array('status' => 'success',
                                  'record' => $prenatal_records,
                                  'array' => $prenatal_checkup,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      foreach($payload as $prenatal_record) {
        $prenatal_record = (array) $prenatal_record;

        //INSERT PRENATAL RECORDS
        if (isset($prenatal_record['patient_id'])) {

          $prenatal_record['prenatal_id'] = $this->db->insert('tbl_prenatal', $prenatal_record);

          if ($prenatal_record['prenatal_id']) {
            echo json_encode(array('status' => 'success',
                                      'data' => $prenatal_record,
                                      'method' => 'POST'
                                    ));
          } else {
            echo json_encode(array('status' => 'fail',
                                      'message' => 'Failed to add record',
                                      'method' => 'POST'
                                    ));
            return;
          }

        //INSERT PRENATAL CHECKUP RECORDS
        } else if (isset($prenatal_record['prenatal_id'])) {

          $prenatal_record['prenatal_checkup_id'] = $this->db->insert('tbl_prenatal_checkup', $prenatal_record);

          if ($prenatal_record['prenatal_checkup_id']) {
            echo json_encode(array('status' => 'success',
                                      'data' => $prenatal_record,
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
    }

    public function httpPut($payload)
    {
      $payload = (array) $payload;

      $prenatal_checkup = $payload['prenatal_checkup'];
      unset($payload['prenatal_checkup']);

      foreach ($prenatal_checkup as $checkup) {
        $checkup = (array) $checkup;

        $this->db->where('prenatal_checkup_id', $checkup['prenatal_checkup_id']);
        $this->db->update('tbl_prenatal_checkup', $checkup);
      }

      $this->db->where('prenatal_id', $payload['prenatal_id']);
      $prenatal_record = $this->db->update('tbl_prenatal', $payload);

      $payload['prenatal_checkup'] = $prenatal_checkup;

      echo json_encode(array('status' => 'success',
                              'data' => $payload,
                              'method' => 'PUT'
                            ));
    }

    public function httpDelete($payload)
    {
      $payload = (array) $payload;

      //DELETE DENTAL RECORD
      if (isset($payload['prenatal_id'])) {

        $this->db->where('prenatal_id', $payload['prenatal_id']);
        $dental_record = $this->db->update('tbl_prenatal', array('status' => 1));

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
