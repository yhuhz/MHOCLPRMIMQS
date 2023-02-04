<?php
// Tells the browser to allow code from any origin to access
header("Access-Control-Allow-Origin: *");
// Tells browsers whether to expose the response to the frontend JavaScript code when the request's credentials mode (Request.credentials) is include
header("Access-Control-Allow-Credentials: true");
// Specifies one or more methods allowed when accessing a resource in response to a preflight request
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
// Used in response to a preflight request which includes the Access-Control-Request-Headers to indicate which HTTP headers can be used during the actual request
header("Access-Control-Allow-Headers: Content-Type");

require_once('MysqliDb.php');

class API
{
    public function __construct()
    {
        $this->db = new MysqliDB('localhost', 'root', '', 'capstone');
    }

    public function httpGet($payload)
    {
      if (isset($_GET['username'])) {

        $this->db->where('username', $_GET['username']);
        $attempt = $this->db->get('user_login');

        if ($attempt === []) {
          echo json_encode(array('status' => 'fail',
                                  'message' => 'User login not found',
                                  'method' => 'GET'
                                ));
        } else {
          echo json_encode(array('status' => 'success',
                                  'method' => 'GET'
                                ));
        }
      }

      if (isset($_GET['dept'])) {
        $dept = $this->db->get('department');

        echo json_encode(array('status' => 'success',
                                  'data' => $dept,
                                  'method' => 'GET'
                                ));
      }
    }

    public function httpPost($payload)
    {
      $payload = (array) $payload;
      print_r($payload);

        //Random Generated Password
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-@=+_';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 10; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        $pass = implode($pass);

        $username = [];
        array_push($username, $payload['department']);
        $username = implode($username);
        echo $username;
    }

    public function httpPut($payload)
    {
        $projects = (array) $payload;

        if (empty($projects['project_name'])
            || empty($projects['description'])
            || empty($projects['deadline'])) {
            echo json_encode(array('status' => 'fail',
                                    'message' => 'Required field was not filled',
                                    'method' => 'PUT'));
        } else {
            $payload_id = $projects["id"];
            $this->db->where('id', $payload_id);
            $projects_response = $this->db->update('tbl_projects', $projects);


            if ($projects_response) {
                echo json_encode(array('status' => 'success',
                                    'data' => $projects,
                                    'method' => 'PUT'
              ));
            } else {
                echo json_encode(array('status' => 'fail'));
            }
        }
    }

    public function httpDelete($payload)
    {
        $projects = (array) $payload;

        $this->db->where('id', $_GET['id']);
        $projects_response = $this->db->delete('tbl_projects');

        if ($projects_response) {
            echo json_encode(array('status' => 'success',
                                'message' => 'Project successfully removed',
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
