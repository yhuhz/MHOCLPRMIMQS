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

    public function httpGet($payload)
    {
      //GET DEPARTMENTS
      if (isset($_GET['dept'])) {
        $dept = $this->db->get('tbl_department');

        echo json_encode(array('status' => 'success',
                                  'data' => $dept,
                                  'method' => 'GET'
                                ));

      //GET ALL USERS
      } else {
        $this->db->where('is_deleted', 0);
        $users = $this->db->get('tbl_users', null, 'user_id, username, last_name, first_name, middle_name, suffix, department, permission_level, date_added');
        if ($users) {
          echo json_encode(array('status' => 'success',
                                'data' => $users,
                                'method' => 'GET'
        ));
        }
      }
    }

    public function httpPost($payload)
    {
      $payload = (array) $payload;

      //CHECK LOGIN CREDENTIALS
      if (isset($payload['username'])) {

        $this->db->where('username', $payload['username']);
        $this->db->where('is_deleted', 0);
        $attempt = $this->db->get('tbl_users');


        if ($attempt === []) {
          echo json_encode(array('status' => 'fail',
                                  'message' => 'Username not found',
                                  'method' => 'POST'
                                ));
        } else {
          if (password_verify($payload['password'], $attempt[0]['password'])) {
              unset($attempt[0]['password']);
              unset($attempt[0]['is_deleted']);
              echo json_encode(array('status' => 'success',
                                  'data' => $attempt,
                                  'method' => 'POST'
                                ));
          } else {
            echo json_encode(array('status' => 'fail',
                                  'message' => 'Incorrect password!',
                                  'method' => 'POST'
                                ));
          }

        }

      //CREATE NEW USER
      } else {

        //Random Generated Password
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-@=+_';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 10; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        $password = implode($pass);
        $payload['password'] = password_hash($password, PASSWORD_DEFAULT);

        $payload['date_added'] = date('Y-m-d');

        $this->db->where('dept_id', $payload['department']);
        $dept = $this->db->get('tbl_department', null, 'dept_code');
        $dept = $dept[0]['dept_code'];



        $payload['user_id'] = $this->db->insert('tbl_users', $payload);

        if ($payload['user_id']) {

          //set username
          $username = array('username' => strtolower(trim($payload['last_name'].substr($payload['first_name'], 0, 1).(isset($payload['middle_name']) ? substr($payload['middle_name'], 0, 1) : null), " ")) . strtoupper(trim($dept)) . $payload['user_id']);

          //update username based on user_id
          $this->db->where('user_id', $payload['user_id']);
          $update_username = $this->db->update('tbl_users', $username);

          //response message
          $response = ['username'=>$username['username'], 'password'=>$password];
          echo json_encode(array('status' => 'success',
                                'data' => $response,
                                'method' => 'POST'
                              ));
        } else {
          $this->db->where('user_id', $user_id);
          $this->db->delete('tbl_users');
          echo json_encode(array('status' => 'failed',
                                'method' => 'POST'
                              ));
        }
      }
    }

    public function httpPut($payload)
    {
        $payload = (array) $payload;
        $user_id = $payload['user_id'];

        //FORGET PASSWORD
        if (isset($payload['mode'])) {

          unset($payload['mode']);

          //Random Generated Password
          $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-@=+_';
          $pass = array(); //remember to declare $pass as an array
          $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
          for ($i = 0; $i < 10; $i++) {
              $n = rand(0, $alphaLength);
              $pass[] = $alphabet[$n];
          }
          $password = implode($pass);
          $payload['password'] = password_hash($password, PASSWORD_DEFAULT);

          $this->db->where('user_id', $user_id);
          $update_pass = $this->db->update('tbl_users', $payload);

          if ($update_pass) {
              echo json_encode(array('status' => 'success',
                                      'data' => 'Password has been reset to ' . $password,
                                      'method' => 'PUT'
                      ));
          } else {
            echo json_encode(array('status' => 'failed',
                                    'message' => 'Password reset failed',
                                    'method' => 'PUT'
                      ));
          }

        //SET PASSWORD
        } else if (isset($payload['password'])) {

          $password = array('password' => password_hash($payload['password'], PASSWORD_DEFAULT));
          $this->db->where('user_id', $user_id);
          $set_password = $this->db->update('tbl_users', $password);

          if ($set_password) {
            echo json_encode(array('status' => 'success',
                                'message' => 'Password has been changed to ' . $payload['password'],
                                'method' => 'PUT'
                              ));
          } else {
            echo json_encode(array('status' => 'fail',
                                'message' => 'Error changing password',
                                'method' => 'PUT'
                              ));
          }

        //EDIT USER ACCOUNT
        } else {
          $this->db->where('user_id', $user_id);
          $update_user = $this->db->update('tbl_users', $payload);

          if ($update_user) {
            echo json_encode(array('status' => 'success',
                                'data' => $payload,
                                'method' => 'PUT'
                              ));
          } else {
            echo json_encode(array('status' => 'failed',
                                'method' => 'PUT'
                              ));
          }

        }

    }

    public function httpDelete($payload)
    {
        $payload = (array) $payload;

        $this->db->where('user_id', $payload['user_id']);
        $payload['is_deleted'] = 1;
        $delete_user = $this->db->update('tbl_users', $payload);

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
