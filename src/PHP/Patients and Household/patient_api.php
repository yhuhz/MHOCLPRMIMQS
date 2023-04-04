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

      if (isset($payload['record_type'])) {

        $this->db->where('patient_id', $payload['patient_id']);

        if ($payload['record_type'] === "OPD") {
          $record = $this->db->get('tbl_opd', null, 'opd_id as record_id, checkup_date as date');
        } else if ($payload['record_type'] === "Dental") {
          $record = $this->db->get('tbl_dental', null, 'dental_id as record_id, checkup_date as date');
        } else if ($payload['record_type'] === "Prenatal") {
          $record = $this->db->get('tbl_prenatal', null, 'prenatal_id as record_id, date_added as date');
        } else if ($payload['record_type'] === "Immunization") {
          $record = $this->db->get('tbl_immunization', null, 'immunization_id as record_id, immunization_date as date');
        }

        if ($record != []) {
          echo json_encode(array('status' => 'success',
                                    'data' => $record,
                                    'method' => 'GET'
                                  ));
        }
      } else if (isset($payload['patient_id'])) {
        $this->db->join('tbl_pwd pw', 'pw.patient_id=p.patient_id', 'LEFT');
        $this->db->join('tbl_senior_citizen sc', 'sc.patient_id=p.patient_id', 'LEFT');
        $this->db->where('p.patient_id',$payload['patient_id']);
        $patient = $this->db->get('tbl_patient_info p', null, 'p.patient_id, first_name, middle_name, last_name, suffix, household_id, sex, birthdate, FLOOR(DATEDIFF(CURRENT_DATE, birthdate)/365) as age, phone_number, p.status, barangay, address, pw.pwd_id, pw.disability, sc.senior_citizen_id');

        if ($patient != []) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patient,
                                    'method' => 'GET'
                                  ));
        }
      } else {
        //check if there are parameters
        if (isset($payload['search_by'])) {
          $search_by = (array) $payload['search_by'];

          if ($search_by['search_string'] != null) {

            //SEARCH BY NAME
            if ($search_by['search_category'] === 'Name') {

              // echo $search_by['search_string']; return;
              $this->db->where("CONCAT_WS(' ', REPLACE(first_name, ' ', ''), REPLACE(middle_name, ' ', ''), REPLACE(last_name, ' ', ''), REPLACE(suffix, ' ', '')) LIKE '%" . $search_by['search_string'] . "%'");


            //SEARCH BY PATIENT ID
            } else if ($search_by['search_category'] === 'Patient ID') {

              $this->db->where('patient_id', strval($search_by['search_string']));

            //SEARCH BY HOUSEHOLD ID
            } else if ($search_by['search_category'] === 'Household ID') {

              $this->db->where('household_id', strval($search_by['search_string']));

            //SEARCH BY PHONE NUMBER
            } else if (array_keys($search_by)[0] === 'Phone Number') {

              $this->db->where('phone_number', '%'.strval($search_by['search_string']).'%', 'LIKE');

            }
          }
        }

        //FILTER
        if (isset($payload['filter'])) {
          $filter = (array) $payload['filter'];

          //Age filter
          if (isset($filter['age']) && $filter['age'] != [])
          $this->db->where('DATEDIFF(CURRENT_DATE, birthdate)', Array (($filter['age'][0]*365), ($filter['age'][1]*365)), 'BETWEEN');

          //Date Added filter
          if (isset($filter['date_added']) && $filter['date_added'] != []) {
            $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
          }

          //Sex filter
          $this->db->where('sex', $filter['sex'], 'IN');

          //Status filter
          $this->db->where('p.status', $filter['status'], 'IN');

          //Barangays filter
          if ($filter['barangay']) {
            $this->db->where('barangay', $filter['barangay'], 'IN');
          }
        }

        $this->db->join('tbl_household hh', 'hh.household_id=p.household_id', 'LEFT');
        $patients = $this->db->get('tbl_patient_info p', null, 'patient_id, concat(first_name, " ", last_name, " ", coalesce(suffix, "")) as name, first_name, middle_name, last_name, suffix, hh.household_name, p.household_id, sex, birthdate, FLOOR(DATEDIFF(CURRENT_DATE, birthdate)/365) as age, phone_number, p.status, barangay, address');

        if ($patients) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patients,
                                    'method' => 'GET'
                                  ));
        }
      }



    }

    public function httpPost($payload)
    {
      // print_r($payload); return;
      foreach($payload as $patient_info) {
        $patient_info = (array) $patient_info;

        $patient_info['date_added'] = date("Y-m-d");

        //ID number = date added + number of patients added that day +1
        $this->db->where('date_added', $patient_info['date_added']);
        $count = $this->db->getValue ("tbl_patient_info", "count(*)");
        if ($count >= 9) {
          $patient_info['patient_id'] = date("mdy") . $count + 1;
        } else {
          $patient_info['patient_id'] = date("mdy") . '0' . $count + 1;
        }


        $patient = $this->db->insert('tbl_patient_info', $patient_info);


        if ($patient) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patient_info,
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

        //EDIT PATIENT INFO
        $this->db->where('patient_id', $payload['patient_id']);
        $patient = $this->db->update('tbl_patient_info', $payload);

        if ($patient) {
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
        $delete_user = $this->db->update('tbl_patient_info', array('status' => 2));

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
