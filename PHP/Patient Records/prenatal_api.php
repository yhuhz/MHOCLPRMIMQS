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
      $prenatal_records = $this->db->get('tbl_prenatal pn', null, 'prenatal_id, midwife_id, patient_id, last_menstruation, previous_full_term, previous_premature, midwifes_notes, pn.date_added, CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS midwife_name');
      $prenatal_checkup = [];

      foreach ($prenatal_records as $prenatal) {
        $this->db->where('prenatal_id', $prenatal['prenatal_id']);
        $this->db->where('status', 0);

        array_push($prenatal_checkup, $this->db->get('tbl_prenatal_checkup'));
      }

      if ($prenatal_records) {
        echo json_encode(array('status' => 'success',
                                  'record' => $prenatal_records[0],
                                  'array' => $prenatal_checkup[0],
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      $prenatal_record = (array) $payload;

      $prenatal_record['prenatal_id'] = $this->db->insert('tbl_prenatal', $prenatal_record);

      if ($prenatal_record['prenatal_id']) {

        $prenatal_record['record_id'] = $prenatal_record['prenatal_id'];
        unset($prenatal_record['prenatal_id']);

        $prenatal_record['date'] = $prenatal_record['date_added'];
        unset($prenatal_record['date_added']);

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

    public function httpPut($payload)
    {
      $payload = (array) $payload;
      $prenatal = (array) $payload['prenatal'];
      $prenatal_checkup = (array) $payload['checkup'];

      foreach ($prenatal_checkup as $checkup) {
        $checkup = (array) $checkup;

        if (isset($checkup['prenatal_checkup_id'])) {
          $this->db->where('prenatal_checkup_id', $checkup['prenatal_checkup_id']);
          $this->db->update('tbl_prenatal_checkup', $checkup);
        } else {
          $this->db->insert('tbl_prenatal_checkup', $checkup);
        }

      }

      $this->db->where('prenatal_id', $prenatal['prenatal_id']);
      $prenatal_record = $this->db->update('tbl_prenatal', $prenatal);

      if ($prenatal_record) {
        $this->db->where('user_id', $prenatal['midwife_id']);
        $name = $this->db->get('tbl_users', null, 'CONCAT(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) AS name');
        $prenatal['midwife_name'] = $name[0]['name'];
        // print_r($prenatal); return;


        echo json_encode(array('status' => 'success',
                              'record' => $prenatal,
                              'array' => $prenatal_checkup,
                              'method' => 'PUT'
                            ));
      }

    }

    public function httpDelete($payload)
    {
      $this->db->where('prenatal_id', $_GET['record_id']);
        $delete_user = $this->db->update('tbl_prenatal', array('status' => 1));

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
