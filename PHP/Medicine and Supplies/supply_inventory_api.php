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
      if (isset($_GET['supply_id'])) {
        //GET SUPPLY DETAILS

        $this->db->where('supply_id', $_GET['supply_id']);
        $supply_details = $this->db->get('tbl_supplies_inventory');
        $supply_details = $supply_details[0];

        $this->db->where('supply_id', $_GET['supply_id']);
        $this->db->where('status', 0);
        $supply_release = $this->db->getValue('tbl_supply_release', 'CAST(SUM(quantity) as int)');
        $supply_details['quantity_released'] = $supply_release != null ? $supply_release : 0;

        echo json_encode(array('status' => 'success',
                                  'data' => $supply_details,
                                  'method' => 'GET'
                                ));

      } else if (isset($_GET['release_filter'])) {
        $release_filter = (array) json_decode($_GET['release_filter']);

        if (isset($release_filter['department'])) {
          $this->db->where('department', $release_filter['department'], 'IN');
        }

        if (isset($release_filter['status'])) {
          $this->db->where('status', $release_filter['status'], 'IN');
        }

        if (isset($release_filter['quantity_released']) && ($release_filter['quantity_released'][0] != '') && ($release_filter['quantity_released'][1] != '')) {
          $this->db->where('quantity', $release_filter['quantity_released'], 'BETWEEN');
        }

        if (isset($release_filter['date_released']) && ($release_filter['date_released'][0] != '') && ($release_filter['quantity_released'][1] != '')) {
          $this->db->where('release_date', $release_filter['date_released'], 'BETWEEN');
        }

        $this->db->where('supply_id', $release_filter['supply_id']);

        $supply_release = $this->db->get('tbl_supply_release');
        $supply_release_array = [];

        foreach($supply_release as $release) {

            $this->db->where('user_id', $release['user_id']);
            $name = $this->db->get('tbl_users', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $release['user_name'] = $name[0]['name'];
            array_push($supply_release_array, $release);
          }



        echo json_encode(array('status' => 'success',
                                  'data' => $supply_release_array,
                                  'method' => 'GET'
                                ));

      } else {
        //GET SUPPLY INVENTORY
      $payload = (array) json_decode($_GET['payload']);

      //check if there are parameters
      if (isset($payload['search_by'])) {
        $search_by = (array) $payload['search_by'];

        if (isset($search_by['search_string']) && ($search_by['search_string'] != '')) {
          if ($search_by['search_category'] === "Supply Name") {
            $this->db->where('supply_name', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "Supply ID") {
            $this->db->where('supply_id', $search_by['search_string']);

          } else if ($search_by['search_category'] === "Supply Type") {
            $this->db->where('supply_type', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "Quantity Type") {
            $this->db->where('quantity_type', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "Procured By") {
            $this->db->where('procured_by', '%'.$search_by['search_string'].'%', 'LIKE');
          }
        }
      }

      //FILTER

      if (isset($payload['filter'])) {
        $filter = (array) $payload['filter'];

        //Status filter
        if (isset($filter['status'])) {
          $this->db->where('status', $filter['status'], 'IN');
        }

        //Date Added filter
        if (isset($filter['date_added'][0]) && isset($filter['date_added'][1])) {
          $this->db->where('date_added', $filter['date_added'], 'BETWEEN');
        }

        //Manufacturing Date filter
        if (isset($filter['mfg_date'][0]) && isset($filter['mfg_date'][1])) {
          $this->db->where('mfg_date', $filter['mfg_date'], 'BETWEEN');
        }

        // //Expiry Date filter
        if (isset($filter['exp_date'][0]) && isset($filter['exp_date'][1])) {
          $this->db->where('exp_date', $filter['exp_date'], 'BETWEEN');
        }
      }

      $supply_inventory = $this->db->get('tbl_supplies_inventory');
      $supply_array = [];

      foreach($supply_inventory as $supply) {
        $this->db->where('supply_id', $supply['supply_id']);
        $this->db->where('status', 0);
        $count = $this->db->getValue('tbl_supply_release', 'CAST(SUM(quantity) as int)');
        $supply['quantity_released'] = $count;

        if (isset($filter['in_stock']) && ($filter['in_stock'][0] != '') && ($filter['in_stock'][1] != '')) {
          if ($supply['quantity'] - $supply['quantity_released'] >= $filter['in_stock'][0] && $supply['quantity'] - $supply['quantity_released'] <= $filter['in_stock'][1]) {
            array_push($supply_array, $supply);
          }
        } else {
          array_push($supply_array, $supply);
        }
      }


        echo json_encode(array('status' => 'success',
                                  'data' => $supply_array,
                                  'method' => 'GET'
                                ));
      }

    }

    public function httpPost($payload)
    {
      $payload = (array) $payload;

      if (isset($payload['department'])) {
        //ADD SUPPLY RELEASE RECORD
        $payload['supply_release_id'] = $this->db->insert('tbl_supply_release', $payload);

        if ($payload['supply_release_id']) {


            $this->db->where('user_id', $payload['user_id']);
            $name = $this->db->get('tbl_users', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $payload['user_name'] = $name[0]['name'];


          echo json_encode(array('status' => 'success',
                                    'data' => $payload,
                                    'method' => 'POST'
                                  ));
        }

      } else {
        //ADD SUPPLY RECORD
        $payload['supply_id'] = $this->db->insert('tbl_supplies_inventory', $payload);
        $payload['in_stock'] = $payload['quantity'];

        if ($payload['supply_id']) {
          echo json_encode(array('status' => 'success',
                                    'data' => $payload,
                                    'method' => 'POST'
                                  ));
        }
      }



    }

    public function httpPut($payload)
    {
      $payload = (array) $payload;

      if(isset($payload['department'])) {
        //EDIT SUPPLY RELEASE RECORD
        $this->db->where('supply_release_id', $payload['supply_release_id']);
        $supply_release = $this->db->update('tbl_supply_release', $payload);

        if ($supply_release) {

          $this->db->where('user_id', $payload['user_id']);
          $name = $this->db->get('tbl_users', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

          $payload['user_name'] = $name[0]['name'];


          echo json_encode(array('status' => 'success',
                                  'data' => $payload,
                                  'method' => 'PUT'
                                ));
        }

      } else {
        //EDIT SUPPLY RECORD
        $this->db->where('supply_id', $payload['supply_id']);
        $household = $this->db->update('tbl_supplies_inventory', $payload);

        if ($household) {

          $this->db->where('supply_id', $payload['supply_id']);
          $count = $this->db->getValue('tbl_supply_release', 'CAST(SUM(quantity) as int)');
          $payload['quantity_released'] = $count;

          echo json_encode(array('status' => 'success',
                                  'data' => $payload,
                                  'method' => 'PUT'
                                ));
        }
      }




    }

    public function httpDelete($payload)
    {
      if (isset($_GET['supply_id'])) {
        $this->db->where('supply_id', $_GET['supply_id']);
        $delete_supply = $this->db->update('tbl_supplies_inventory', array('status' => 1));

        if ($delete_supply) {
            echo json_encode(array('status' => 'success',
                                'message' => 'Medicine record successfully removed',
                                'method' => 'DELETE'
          ));
        } else {
            echo json_encode(array('status' => 'failed'));
        }
      } else if (isset($_GET['supply_release_id'])) {
        $this->db->where('supply_release_id', $_GET['supply_release_id']);
        $delete_supply = $this->db->update('tbl_supply_release', array('status' => 1));

        if ($delete_supply) {
            echo json_encode(array('status' => 'success',
                                'message' => 'Medicine release record successfully removed',
                                'method' => 'DELETE'
          ));
        } else {
            echo json_encode(array('status' => 'failed'));
        }
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
