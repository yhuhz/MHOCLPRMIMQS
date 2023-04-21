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
      // print_r($payload);

      if (isset($payload['record_type'])) {
        //OPD
        if ($payload['record_type'] === "OPD") {
          $this->db->join('tbl_patient_info p', 'p.patient_id=opd.patient_id', 'LEFT');

          if (isset($payload['record_id'])) {
            $this->db->where('opd_id', $payload['record_id']);
          }

          if (isset($payload['patient_id'])) {
            $this->db->where('opd.patient_id', $payload['patient_id']);
          }

          if (isset($payload['status'])) {
            $this->db->where('opd.status', $payload['status'], 'IN');
          } else {
            $this->db->where('opd.status', 0 );
          }

          $this->db->orderBy('checkup_date', 'ASC');
          $record = $this->db->get('tbl_opd opd', null, 'opd_id as record_id, checkup_date as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');

        //DENTAL
        } else if ($payload['record_type'] === "Dental") {
          $this->db->join('tbl_patient_info p', 'p.patient_id=d.patient_id', 'LEFT');

          if (isset($payload['record_id'])) {
            $this->db->where('dental_id', $payload['record_id']);
          }

          if (isset($payload['patient_id'])) {
            $this->db->where('d.patient_id', $payload['patient_id']);
          }

          if (isset($payload['status'])) {
            $this->db->where('d.status', $payload['status'], 'IN');
          } else {
            $this->db->where('d.status', 0 );
          }

          $this->db->orderBy('checkup_date', 'ASC');
          $record = $this->db->get('tbl_dental d', null, 'dental_id as record_id, checkup_date as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');

        //PRENTAL
        } else if ($payload['record_type'] === "Prenatal") {

          $this->db->join('tbl_patient_info p', 'p.patient_id=pnl.patient_id', 'LEFT');

          if (isset($payload['record_id'])) {
            $this->db->where('prenatal_id', $payload['record_id']);
          }

          if (isset($payload['patient_id'])) {
            $this->db->where('pnl.patient_id', $payload['patient_id']);
          }
          if (isset($payload['status'])) {
            $this->db->where('pnl.status', $payload['status'], 'IN');
          } else {
            $this->db->where('pnl.status', 0 );
          }

          $this->db->orderBy('date_added', 'ASC');
          $record = $this->db->get('tbl_prenatal pnl', null, 'prenatal_id as record_id, date_added as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');

        //IMMUNIZATION
        } else if ($payload['record_type'] === "Immunization") {
          $this->db->join('tbl_patient_info p', 'p.patient_id=i.patient_id', 'LEFT');

          if (isset($payload['record_id'])) {
            $this->db->where('immunization_id', $payload['record_id']);
          }

          if (isset($payload['patient_id'])) {
            $this->db->where('i.patient_id', $payload['patient_id']);
          }


          if (isset($payload['status'])) {
            $this->db->where('i.status', $payload['status'], 'IN');
          } else {
            $this->db->where('i.status', 0 );
          }

          $this->db->orderBy('immunization_date', 'ASC');
          $record = $this->db->get('tbl_immunization i', null, 'immunization_id as record_id, immunization_date as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');
        }

        if ($record != []) {
          echo json_encode(array('status' => 'success',
                                    'data' => $record,
                                    'method' => 'GET'
                                  ));
        }

      } else if (isset($payload['department'])) {

        //OPD
        if ($payload['department'] === "OPD") {
          $this->db->join('tbl_patient_info p', 'p.patient_id=opd.patient_id', 'LEFT');

          if(isset($payload['search_string']) && $payload['search_string'] !== '' && $payload['search_string'] !== null) {
            if ($payload['search_by'] === 'Name') {
              $this->db->where("CONCAT_WS(' ', REPLACE(p.first_name, ' ', ''), REPLACE(p.middle_name, ' ', ''), REPLACE(p.last_name, ' ', ''), REPLACE(p.suffix, ' ', '')) LIKE '%" . $payload['search_string'] . "%'");
            } else if ($payload['search_by'] === 'Patient ID') {
              $this->db->where('opd.patient_id', $payload['search_string']);
            } else if ($payload['search_by'] === 'Record ID') {
              $this->db->where('opd_id', $payload['search_string']);
            }
          }

          $this->db->where('opd.status', 0);

          $this->db->orderBy('checkup_date', 'ASC');
          $record = $this->db->get('tbl_opd opd', null, 'opd_id as record_id, checkup_date as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');

        //DENTAL
        } else if ($payload['department'] === "Dental") {
          $this->db->join('tbl_patient_info p', 'p.patient_id=d.patient_id', 'LEFT');

          if(isset($payload['search_string']) && $payload['search_string'] !== '' && $payload['search_string'] !== null) {
            if ($payload['search_by'] === 'Name') {
              $this->db->where("CONCAT_WS(' ', REPLACE(p.first_name, ' ', ''), REPLACE(p.middle_name, ' ', ''), REPLACE(p.last_name, ' ', ''), REPLACE(p.suffix, ' ', '')) LIKE '%" . $payload['search_string'] . "%'");
            } else if ($payload['search_by'] === 'Patient ID') {
              $this->db->where('d.patient_id', $payload['search_string']);
            } else if ($payload['search_by'] === 'Record ID') {
              $this->db->where('dental_id', $payload['search_string']);
            }
          }

          $this->db->where('d.status', 0);

          $this->db->orderBy('checkup_date', 'ASC');
          $record = $this->db->get('tbl_dental d', null, 'dental_id as record_id, checkup_date as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');

        //PRENTAL
        } else if ($payload['department'] === "Prenatal") {

          $this->db->join('tbl_patient_info p', 'p.patient_id=pnl.patient_id', 'LEFT');

          if(isset($payload['search_string']) && $payload['search_string'] !== '' && $payload['search_string'] !== null) {
            if ($payload['search_by'] === 'Name') {
              $this->db->where("CONCAT_WS(' ', REPLACE(p.first_name, ' ', ''), REPLACE(p.middle_name, ' ', ''), REPLACE(p.last_name, ' ', ''), REPLACE(p.suffix, ' ', '')) LIKE '%" . $payload['search_string'] . "%'");
            } else if ($payload['search_by'] === 'Patient ID') {
              $this->db->where('pnl.patient_id', $payload['search_string']);
            } else if ($payload['search_by'] === 'Record ID') {
              $this->db->where('prenatal_id', $payload['search_string']);
            }
          }

          $this->db->where('pnl.status', 0);

          $this->db->orderBy('pnl.date_added', 'ASC');
          $record = $this->db->get('tbl_prenatal pnl', null, 'prenatal_id as record_id, pnl.date_added as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');

        //IMMUNIZATION
        } else if ($payload['department'] === "Immunization") {
          $this->db->join('tbl_patient_info p', 'p.patient_id=i.patient_id', 'LEFT');

          if(isset($payload['search_string']) && $payload['search_string'] !== '' && $payload['search_string'] !== null) {
            if ($payload['search_by'] === 'Name') {
              $this->db->where("CONCAT_WS(' ', REPLACE(p.first_name, ' ', ''), REPLACE(p.middle_name, ' ', ''), REPLACE(p.last_name, ' ', ''), REPLACE(p.suffix, ' ', '')) LIKE '%" . $payload['search_string'] . "%'");
            } else if ($payload['search_by'] === 'Patient ID') {
              $this->db->where('i.patient_id', $payload['search_string']);
            } else if ($payload['search_by'] === 'Record ID') {
              $this->db->where('immunization_id', $payload['search_string']);
            }
          }

          $this->db->where('i.status', 0);

          $this->db->orderBy('immunization_date', 'ASC');
          $record = $this->db->get('tbl_immunization i', null, 'immunization_id as record_id, immunization_date as date, p.first_name, p.middle_name, p.last_name, p.suffix, p.patient_id');
        }

        if ($record != []) {
          echo json_encode(array('status' => 'success',
                                    'data' => $record,
                                    'method' => 'GET'
                                  ));
        }

      }
    }

    public function httpPost($payload)
    {

    }

    public function httpPut($payload)
    {



    }

    public function httpDelete()
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
