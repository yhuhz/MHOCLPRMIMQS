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
      //GET MEDICINE INVENTORY

      //check if there are parameters
      if (isset($_GET['search_by'])) {
        $search_by = (array) json_decode($_GET['search_by']);

        $this->db->where(array_keys($search_by)[0], $search_by[array_keys($search_by)[0]]);
      }

      //FILTER
      if (isset($_GET['filter'])) {
        $filter = (array) json_decode($_GET['filter']);

        //Stock filter
        // $this->db->where('quantity', $filter['in_stock'], 'BETWEEN');

        //Date Added filter
        if (isset($filter['date_added'])) {
          $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
        }

        //Manufacturing Date filter
        if (isset($filter['mfg_date'])) {
          $this->db->where('mfg_date', $filter['mfg_date'], 'BETWEEN');
        }

        //Expiry Date filter
        if (isset($filter['exp_date'])) {
          $this->db->where('exp_date', $filter['exp_date'], 'BETWEEN');
        }
      }

      $medicine_inventory = $this->db->get('tbl_medicine_inventory');

      if ($medicine_inventory) {
        echo json_encode(array('status' => 'success',
                                  'data' => $medicine_inventory,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      foreach($payload as $household) {
        $household = (array) $household;

        //RESET AUTO INCREMENT
        // $this->db->query("SET  @num := 0");
        // $this->db->query("UPDATE tbl_medicine_inventory SET household_id = @num := (@num+1)");
        // $this->db->query("ALTER TABLE tbl_medicine_inventory AUTO_INCREMENT = 1");
        // return;

        //ADD HOUSEHOLD
        $household['household_id'] = $this->db->insert('tbl_medicine_inventory', $household);

        if ($household['household_id']) {
          echo json_encode(array('status' => 'success',
                                    'data' => $household,
                                    'method' => 'POST'
                                  ));
        }
      }
    }

    public function httpPut($payload)
    {
        $payload = (array) $payload;
        // $user_id = $payload['user_id'];

        //EDIT HOUSEHOLD INFO
        $this->db->where('household_id', $payload['household_id']);
        $household = $this->db->update('tbl_medicine_inventory', $payload);

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

        $this->db->where('household_id', $payload['household_id']);
        $payload['status'] = 1;
        $delete_user = $this->db->update('tbl_medicine_inventory', $payload);

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
