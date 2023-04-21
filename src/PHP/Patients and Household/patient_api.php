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

      } else if (isset($payload['patient_id'])) {
        $this->db->join('tbl_pwd pw', 'pw.patient_id=p.patient_id', 'LEFT');
        $this->db->join('tbl_senior_citizen sc', 'sc.patient_id=p.patient_id', 'LEFT');
        $this->db->where('p.patient_id',$payload['patient_id']);

        $this->db->orderBy('first_name', 'ASC');
        $patient = $this->db->get('tbl_patient_info p', null, 'p.patient_id, first_name, middle_name, last_name, suffix, household_id, sex, birthdate, FLOOR(DATEDIFF(CURRENT_DATE, birthdate)/365) as age, phone_number, p.status, barangay, address, pw.pwd_id, pw.disability, sc.senior_citizen_id');

        if ($patient != []) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patient,
                                    'method' => 'GET'
                                  ));
        }

      } else if (isset($payload['pwd'])) {
        $search_by = (array) $payload['search_by'];
        // print_r($search_by);

        if (isset($search_by['search_string']) && ($search_by['search_string'] != '')) {
          //SEARCH BY NAME
          if ($search_by['search_category'] === 'Name') {

          // echo $search_by['search_string']; return;
          $this->db->where("CONCAT_WS(' ', REPLACE(first_name, ' ', ''), REPLACE(middle_name, ' ', ''), REPLACE(last_name, ' ', ''), REPLACE(suffix, ' ', '')) LIKE '%" . $search_by['search_string'] . "%'");

          //SEARCH BY PATIENT ID
          } else if ($search_by['search_category'] === 'Patient ID') {

            $this->db->where('p.patient_id', strval($search_by['search_string']));

          //SEARCH BY PWD ID
          } else if ($search_by['search_category'] === 'PWD ID') {
            $this->db->where('pwd_id', strval($search_by['search_string']));
          }
        }

        //FILTER
        if (isset($search_by['filters'])) {
          $filter = (array) $search_by['filters'];

          //Age filter
          if (isset($filter['age']) && $filter['age'] != [] && $filter['age'][0] != '' && $filter['age'][1] != '')
          $this->db->where('DATEDIFF(CURRENT_DATE, birthdate)', Array (($filter['age'][0]*365), ($filter['age'][1]*365)), 'BETWEEN');

          //Date Added filter
          if (isset($filter['date_added']) && $filter['date_added'] != [] && $filter['date_added'][0] != '' && $filter['date_added'][1] != '') {
            $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
          }

          //Sex filter
          if(isset($filter['sex']) && isset($filter['sex'][0])) {
            $this->db->where('sex', $filter['sex'], 'IN');
          }

          //Status filter
          if(isset($filter['status']) && isset($filter['status'][0])) {
            $this->db->where('p.status', $filter['status'], 'IN');
          }

          //Barangays filter
          if ($filter['barangay']) {
            $this->db->where('barangay', $filter['barangay'], 'IN');
          }
        }

        $this->db->join('tbl_patient_info p', 'p.patient_id=pw.patient_id', 'LEFT');
        $this->db->join('tbl_household hh', 'hh.household_id=p.household_id', 'LEFT');

        $this->db->orderBy('first_name', 'ASC');
        $patients = $this->db->get('tbl_pwd pw', null, 'pw.patient_id, concat(first_name, " ", last_name, " ", coalesce(suffix, "")) as name, first_name, middle_name, last_name, suffix, hh.household_name, p.household_id, sex, birthdate, FLOOR(DATEDIFF(CURRENT_DATE, birthdate)/365) as age, phone_number, p.status, pw.pwd_id, pw.disability, barangay, address');

        if ($patients) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patients,
                                    'method' => 'GET'
                                  ));
        }

      } else if (isset($payload['sc'])) {
        $search_by = (array) $payload['search_by'];
        // print_r($payload);

        if (isset($search_by['search_string']) && ($search_by['search_string'] != '')) {
          //SEARCH BY NAME
        if ($search_by['search_category'] === 'Name') {

          // echo $search_by['search_string']; return;
          $this->db->where("CONCAT_WS(' ', REPLACE(first_name, ' ', ''), REPLACE(middle_name, ' ', ''), REPLACE(last_name, ' ', ''), REPLACE(suffix, ' ', '')) LIKE '%" . $search_by['search_string'] . "%'");

          //SEARCH BY PATIENT ID
          } else if ($search_by['search_category'] === 'Patient ID') {

            $this->db->where('p.patient_id', strval($search_by['search_string']));

          //SEARCH BY PWD ID
          } else if ($search_by['search_category'] === 'Senior Citizen ID') {
            $this->db->where('senior_citizen_id', strval($search_by['search_string']));
          }
        }

        // print_r($search_by);
         //FILTER
         if (isset($search_by['filters'])) {
          $filter = (array) $search_by['filters'];


          //Age filter
          if (isset($filter['age']) && $filter['age'] != [] && $filter['age'][0] != '' && $filter['age'][1] != '') {
            $this->db->where('DATEDIFF(CURRENT_DATE, birthdate)', Array (($filter['age'][0]*365), ($filter['age'][1]*365)), 'BETWEEN');
          }

          //Date Added filter
          if (isset($filter['date_added']) && $filter['date_added'] != [] && $filter['date_added'][0] != '' && $filter['date_added'][1] != '') {
            $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
          }

          //Sex filter
          if(isset($filter['sex']) && isset($filter['sex'][0])) {
            $this->db->where('sex', $filter['sex'], 'IN');
          }

          //Status filter
          if(isset($filter['status']) && isset($filter['status'][0])) {
            $this->db->where('p.status', $filter['status'], 'IN');
          }

          //Barangays filter
          if ($filter['barangay']) {
            $this->db->where('barangay', $filter['barangay'], 'IN');
          }
        }

        $this->db->join('tbl_patient_info p', 'p.patient_id=sc.patient_id', 'LEFT');
        $this->db->join('tbl_household hh', 'hh.household_id=p.household_id', 'LEFT');

        $this->db->orderBy('first_name', 'ASC');
        $patients = $this->db->get('tbl_senior_citizen sc', null, 'sc.patient_id, concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name, first_name, middle_name, last_name, suffix, hh.household_name, p.household_id, sex, birthdate, FLOOR(DATEDIFF(CURRENT_DATE, birthdate)/365) as age, phone_number, p.status, sc.senior_citizen_id, barangay, address');

        if ($patients) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patients,
                                    'method' => 'GET'
                                  ));
        }

      } else if (isset($payload['prenatal'])) {
        $search_by = (array) $payload['search_by'];
        // print_r($payload);

        if (isset($search_by['search_string']) && ($search_by['search_string'] != '')) {
          //SEARCH BY NAME
        if ($search_by['search_category'] === 'Name') {

          // echo $search_by['search_string']; return;
          $this->db->where("CONCAT_WS(' ', REPLACE(first_name, ' ', ''), REPLACE(middle_name, ' ', ''), REPLACE(last_name, ' ', ''), REPLACE(suffix, ' ', '')) LIKE '%" . $search_by['search_string'] . "%'");

          //SEARCH BY PATIENT ID
          } else if ($search_by['search_category'] === 'Patient ID') {

            $this->db->where('p.patient_id', strval($search_by['search_string']));

          //SEARCH BY PWD ID
          } else if ($search_by['search_category'] === 'Prenatal ID') {
            $this->db->where('prenatal_id', strval($search_by['search_string']));
          }
        }

        // print_r($search_by);
         //FILTER
         if (isset($search_by['filters'])) {
          $filter = (array) $search_by['filters'];


          //Age filter
          if (isset($filter['age']) && $filter['age'] != [] && $filter['age'][0] != '' && $filter['age'][1] != '') {
            $this->db->where('DATEDIFF(CURRENT_DATE, birthdate)', Array (($filter['age'][0]*365), ($filter['age'][1]*365)), 'BETWEEN');
          }

          //Date Added filter
          if (isset($filter['date_added']) && $filter['date_added'] != [] && $filter['date_added'][0] != '' && $filter['date_added'][1] != '') {
            $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
          }

          //Status filter
          if(isset($filter['status']) && isset($filter['status'][0])) {
            $this->db->where('p.status', $filter['status'], 'IN');
          }

          //Barangays filter
          if ($filter['barangay']) {
            $this->db->where('barangay', $filter['barangay'], 'IN');
          }
        }

        $this->db->join('tbl_patient_info p', 'p.patient_id=pn.patient_id', 'LEFT');
        $this->db->join('tbl_household hh', 'hh.household_id=p.household_id', 'LEFT');
        $patients = $this->db->get('tbl_prenatal pn', null, 'pn.prenatal_id, pn.patient_id, concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name, first_name, middle_name, last_name, suffix, hh.household_name, p.household_id, birthdate, FLOOR(DATEDIFF(CURRENT_DATE, birthdate)/365) as age, phone_number, pn.status, barangay, address, previous_full_term, previous_premature, midwifes_notes, pn.date_added');

        if ($patients) {
          echo json_encode(array('status' => 'success',
                                    'data' => $patients,
                                    'method' => 'GET'
                                  ));
        }

      } else if (isset($payload['name_string'])) {

        $this->db->where("CONCAT_WS(' ', REPLACE(first_name, ' ', ''), REPLACE(middle_name, ' ', ''), REPLACE(last_name, ' ', ''), REPLACE(suffix, ' ', '')) LIKE '%" . $payload['name_string'] . "%'");

        $patients = $this->db->get('tbl_patient_info', null, 'patient_id, concat(first_name, IFNULL(CONCAT(" ", middle_name), ""), " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

        echo json_encode(array('status' => 'success',
                                    'data' => $patients,
                                    'method' => 'GET'
                                  ));

      } else if (isset($payload['id_string'])) {

        $this->db->where('patient_id', '%'. $payload['id_string'] . '%', 'LIKE');

        $patients = $this->db->get('tbl_patient_info', null, 'patient_id, concat(first_name, IFNULL(CONCAT(" ", middle_name), ""), " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

        echo json_encode(array('status' => 'success',
                                    'data' => $patients,
                                    'method' => 'GET'
                                  ));
      } else {
        //check if there are parameters
        if (isset($payload['search_by'])) {
          $search_by = (array) $payload['search_by'];

          if ($search_by['search_string'] != null && ($search_by['search_string'] != '')) {

            //SEARCH BY NAME
            if ($search_by['search_category'] === 'Name') {

              // echo $search_by['search_string']; return;
              $this->db->where("CONCAT_WS(' ', REPLACE(first_name, ' ', ''), REPLACE(middle_name, ' ', ''), REPLACE(last_name, ' ', ''), REPLACE(suffix, ' ', '')) LIKE '%" . $search_by['search_string'] . "%'");


            //SEARCH BY PATIENT ID
            } else if ($search_by['search_category'] === 'Patient ID') {

              $this->db->where('patient_id', strval($search_by['search_string']));

            //SEARCH BY HOUSEHOLD ID
            } else if ($search_by['search_category'] === 'Household ID') {

              $this->db->where('p.household_id', strval($search_by['search_string']));

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
          if (isset($filter['age']) && $filter['age'] != [] && $filter['age'][0] != '' && $filter['age'][1] != '')
          $this->db->where('DATEDIFF(CURRENT_DATE, birthdate)', Array (($filter['age'][0]*365), ($filter['age'][1]*365)), 'BETWEEN');

          //Date Added filter
          if (isset($filter['date_added']) && $filter['date_added'] != [] && $filter['date_added'][0] != '' && $filter['date_added'][1] != '') {
            $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
          }

          //Sex filter
          if(isset($filter['sex']) && isset($filter['sex'][0])) {
            $this->db->where('sex', $filter['sex'], 'IN');
          }


          //Status filter
          if(isset($filter['status']) && isset($filter['status'][0])) {
            $this->db->where('p.status', $filter['status'], 'IN');
          }


          //Barangays filter
          if ($filter['barangay']) {
            $this->db->where('barangay', $filter['barangay'], 'IN');
          }
        }

        $this->db->join('tbl_household hh', 'hh.household_id=p.household_id', 'LEFT');

        $this->db->orderBy('first_name', 'ASC');
        $patients = $this->db->get('tbl_patient_info p', null, 'patient_id, concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name, first_name, middle_name, last_name, suffix, hh.household_name, p.household_id, sex, birthdate, FLOOR(DATEDIFF(CURRENT_DATE, birthdate)/365) as age, phone_number, p.status, barangay, address');

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
        $payload = (array) $payload;
        $patient_info = (array) $payload['personal_info'];
        $pwd = (array) $payload['pwd'];
        $senior_citizen['senior_citizen_id'] = $payload['senior_citizen'];


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

        if (isset($pwd['pwd_id'])) {
          $pwd['patient_id'] = $patient_info['patient_id'];
          $this->db->insert('tbl_pwd', $pwd);
        }

        if (isset($senior_citizen['senior_citizen_id'])) {
          $senior_citizen['patient_id'] = $patient_info['patient_id'];
          $this->db->insert('tbl_senior_citizen', $senior_citizen);
        }

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

    public function httpPut($payload)
    {
      $payload = (array) $payload;
      $patient_info = (array) $payload['personal_info'];
      $pwd = (array) $payload['pwd'];
      $senior_citizen['senior_citizen_id'] = $payload['senior_citizen'];

        //EDIT PATIENT INFO
        $this->db->where('patient_id', $patient_info['patient_id']);
        $patient = $this->db->update('tbl_patient_info', $patient_info);

        if (isset($pwd['pwd_id'])) {
          $pwd['patient_id'] = $patient_info['patient_id'];

          $this->db->where('pwd_id', $pwd['pwd_id']);
          $pwd_check = $this->db->get('tbl_pwd');

          if ($pwd_check != []) {
            $this->db->where('pwd_id', $pwd['pwd_id']);
            $this->db->update('tbl_pwd', $pwd);
          } else {
            $this->db->insert('tbl_pwd', $pwd);
          }
        } else {
          $this->db->where('patient_id', $patient_info['patient_id']);
          $this->db->delete('tbl_pwd');
        }

        if (isset($senior_citizen['senior_citizen_id'])) {
          $senior_citizen['patient_id'] = $patient_info['patient_id'];


          $this->db->where('senior_citizen_id', $senior_citizen['senior_citizen_id']);
          $sc_check = $this->db->get('tbl_senior_citizen');

          if ($sc_check != []) {
            $this->db->where('senior_citizen_id', $senior_citizen['senior_citizen_id']);
            $this->db->update('tbl_senior_citizen', $senior_citizen);
          } else {
            $this->db->insert('tbl_senior_citizen', $senior_citizen);
          }
        } else {
          $this->db->where('patient_id', $patient_info['patient_id']);
          $this->db->delete('tbl_senior_citizen');
        }

        $this->db->where('household_id', $patient_info['household_id']);
        $hh_name = $this->db->get('tbl_household', null, 'household_name');
        $patient_info['household_name'] = $hh_name[0]['household_name'];
        $age = (date_diff(date_create($patient_info['birthdate']), date_create()));
        $patient_info['age'] = $age->format("%y");
        if ($patient) {
          echo json_encode(array('status' => 'success',
                                  'data' => $patient_info,
                                  'method' => 'PUT'
                                ));
        }


    }

    public function httpDelete()
    {
        $this->db->where('patient_id', $_GET['patient_id']);
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
