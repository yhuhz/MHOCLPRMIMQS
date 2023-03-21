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

    public function httpGet()
    {

      //check if there are parameters
      if (isset($_GET['search_by'])) {
        $search_by = (array) json_decode($_GET['search_by']);

         //SEARCH BY NAME
         if (array_keys($search_by)[0] === 'name') {

          $this->db->where('concat_ws(first_name, middle_name, last_name, suffix)', '%'.$search_by[array_keys($search_by)[0]].'%', 'LIKE');

        //SEARCH BY PHONE NUMBER
        } else if (array_keys($search_by)[0] === 'phone_number') {

          $this->db->where(array_keys($search_by)[0], '%'.$search_by[array_keys($search_by)[0]].'%', 'LIKE');

        } else {

          $this->db->where(array_keys($search_by)[0], $search_by[array_keys($search_by)[0]]);

        }
      }

      //FILTER
      if (isset($_GET['filter'])) {
        $filter = (array) json_decode($_GET['filter']);

        //Age filter
        $this->db->where('DATEDIFF(CURRENT_DATE, birthdate)', Array (($filter['age_from']*365), ($filter['age_to']*365)), 'BETWEEN');

        //Date Added filter
        if (isset($filter['date_added'])) {
          $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
        }


        //Sex filter
        $this->db->where('sex', $filter['sex'], 'IN');

        //Status filter
        $this->db->where('status', $filter['status'], 'IN');

        //Barangays filter
        if ($filter['barangay'][0] !== 'all') {
          $this->db->where('barangay', $filter['barangay'], 'IN');
        }
      }


      $patients = $this->db->get('tbl_patient_info');

      if ($patients) {
        echo json_encode(array('status' => 'success',
                                  'data' => $patients,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      $payload = (array) $payload;

      // //ADD TO HOUSEHOLD
      // $this->db->where('household_id', $payload['household_id']);
      // $count = $this->db->getValue ("tbl_patient_info", "count(*)");

      // $id_array = range('A', 'Z');
      // $payload['patient_id'] = $payload['household_id'].$id_array[$count];

      $payload['date_added'] = date("Y-m-d");

      //ID number = date added + number of patients added that day +1
      $this->db->where('date_added', $payload['date_added']);
      $count = $this->db->getValue ("tbl_patient_info", "count(*)");
      $payload['patient_id'] = date("md") . $count + 1;

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
