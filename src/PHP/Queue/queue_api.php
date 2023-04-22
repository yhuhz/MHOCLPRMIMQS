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

        $this->db->join('tbl_patient_info p', 'p.patient_id=q.patient_id', 'LEFT');

        $this->db->where('department', $_GET['department']);
        $queue = $this->db->get('tbl_queue q', null, 'queue_id, queue_number, q.patient_id, q.department, q.is_current, q.is_priority, p.first_name, p.middle_name, p.last_name, p.suffix');

          echo json_encode(array('status' => 'success',
                                    'data' => $queue,
                                    'method' => 'GET'
                                  ));

      } else if (isset($_GET['priority'])) {

        if (isset($_GET['department_specific'])) {
          $this->db->where('department', $_GET['department_specific']);
        }

        $this->db->where('is_priority', $_GET['priority']);
        $this->db->orderBy('queue_id', 'DESC');
        $queue = $this->db->get('tbl_queue', null, 'queue_number');

        if ($queue != []) {
          $queue = $queue[0]['queue_number'];
          if(substr($queue, 0, 1) === 'P') {
            $queue = trim($queue, 'Priority ');
            $queue = intVal($queue) + 1;
          } else {
            $queue = intVal($queue) + 1;
          }

        } else {
          $queue = 1;
        }

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

          //CHECK IF NO OTHER PERSON IN THE QUEUE
          $this->db->where('department', $payload['department']);
          $current_queue = $this->db->get('tbl_queue');

          //ADD TO QUEUE
          if ($payload['is_priority'] === 1) {
            $payload['queue_number'] = 'Priority ' . $payload['queue_number'];
          }

          if($current_queue === []) {
            $payload['is_current'] = 1;
          }

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


        $this->db->where('queue_id', $payload['next_patient']);
        $this->db->update('tbl_queue', array('is_current' => 1));

        if ($payload['current_patient'] !== null) {
          $this->db->where('queue_id', $payload['current_patient']);
          $this->db->delete('tbl_queue');
        }

          echo json_encode(array('status' => 'success',
                                  'data' => $payload,
                                  'method' => 'PUT'
                                ));


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
