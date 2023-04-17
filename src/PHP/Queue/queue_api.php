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
      if (isset($_GET['department'])) {
        // print_r($_GET['department']); return;

        $this->db->where('department', $_GET['department']);
        $queue = $this->db->get('tbl_queue');

          echo json_encode(array('status' => 'success',
                                    'data' => $queue,
                                    'method' => 'GET'
                                  ));

      } else {
        $this->db->where('department', 1);
        $this->db->orderBy('queue_number', 'asc');
        $queue['OPD'] = $this->db->get('tbl_queue');

        $this->db->where('department', 2);
        $this->db->orderBy('queue_number', 'asc');
        $queue['Dental'] = $this->db->get('tbl_queue');

        $this->db->where('department', 3);
        $this->db->orderBy('queue_number', 'asc');
        $queue['Prenatal'] = $this->db->get('tbl_queue');

        $this->db->where('department', 7);
        $this->db->orderBy('queue_number', 'asc');
        $queue['Immunization'] = $this->db->get('tbl_queue');

        if ($queue) {
          echo json_encode(array('status' => 'success',
                                    'data' => $queue,
                                    'method' => 'GET'
                                  ));
        }
      }


    }

    public function httpPost($payload)
    {
        $payload = (array) $payload;

        //RESET AUTO INCREMENT
        // $this->db->query("SET  @num := 0");
        // $this->db->query("UPDATE tbl_household SET household_id = @num := (@num+1)");
        // $this->db->query("ALTER TABLE tbl_household AUTO_INCREMENT = 1");
        // return;

        //CHECK IF PATIENT ALREADY ON QUEUE FOR SAME DEPT

        $this->db->where('department', $payload['department']);
        $this->db->where('patient_id', $payload['patient_id']);
        $check_queue = $this->db->get('tbl_queue');
        // print_r($check_queue); return;

        if ($check_queue === []) {
          $this->db->where('department', $payload['department']);
        $queue = $this->db->get('tbl_queue');

        // print_r($queue[array_key_last($queue)]); return;

        //ADD TO QUEUE
        $payload['queue_number'] = ($queue !== [] ? $queue[array_key_last($queue)]['queue_number'] +1 : 1) ;
        $this->db->insert('tbl_queue', $payload);


          echo json_encode(array('status' => 'success',
                                    'data' => $payload,
                                    'method' => 'POST'
                                  ));
        } else {
          echo json_encode(array('status' => 'fail',
                                    'data' => 'Patient already on queue',
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

        $this->db->where('household_id', $payload['household_id']);
        $payload['patient_count'] = $this->db->getValue('tbl_patient_info', 'count(*)');

        if ($household) {
          echo json_encode(array('status' => 'success',
                                  'data' => $payload,
                                  'method' => 'PUT'
                                ));
        }


    }

    public function httpDelete()
    {
      if (isset($_GET['queue_id'])) {
        $this->db->where('queue_id', $_GET['queue_id']);
      }

      if (isset($_GET['department'])) {
        $this->db->where('department', $_GET['department']);
      }

      $this->db->delete('tbl_queue');

      echo json_encode(array('status' => 'success',
                            'message' => 'Patient successfully removed from queue',
                            'method' => 'DELETE'
      ));

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
