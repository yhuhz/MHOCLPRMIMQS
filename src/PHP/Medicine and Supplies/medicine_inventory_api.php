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
      $payload = (array) json_decode($_GET['payload']);
      // print_r($payload); return;

      //check if there are parameters
      if (isset($payload['search_by'])) {
        $search_by = (array) $payload['search_by'];

        if (isset($search_by['search_string']) && ($search_by['search_string'] != '')) {
          if ($search_by['search_category'] === "Brand Name") {
            $this->db->where('brand_name', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "Generic Name") {
            $this->db->where('generic_name', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "Medicine ID") {
            $this->db->where('mi.medicine_id', $search_by['search_string']);

          } else if ($search_by['search_category'] === "Classification") {
            $this->db->where('med_classification', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "Dosage Strength") {
            $this->db->where('dosage_strength', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "Dosage Form") {
            $this->db->where('dosage_form', '%'.$search_by['search_string'].'%', 'LIKE');

          } else if ($search_by['search_category'] === "PTR Number") {
            $this->db->where('ptr_number', $search_by['search_string']);

          } else if ($search_by['search_category'] === "Batch/Lot Number") {
            $this->db->where('batch_lot_number', $search_by['search_string']);

          } else if ($search_by['search_category'] === "Procured By") {
            $this->db->where('procured_by', '%'.$search_by['search_string'].'%', 'LIKE');
          }
        }
      }

      //FILTER
      $this->db->join('tbl_medicine_release mr', 'mr.medicine_id=mi.medicine_id', 'LEFT');

      if (isset($payload['filter'])) {
        $filter = (array) $payload['filter'];

        //Stock filter
        if (isset($filter['in_stock'])) {
          $this->db->where('mi.quantity - IFNULL(mr.quantity, 0)', $filter['in_stock'], 'BETWEEN');
        }

        //Status filter
        if (isset($filter['status'])) {
          $this->db->where('mi.status', $filter['status'], 'IN');
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

      $medicine_inventory = $this->db->get('tbl_medicine_inventory mi', null, 'mi.medicine_id, generic_name, brand_name, med_classification, dosage_strength, dosage_form, ptr_number, batch_lot_number, mfg_date, exp_date, mi.quantity, (mi.quantity - IFNULL(mr.quantity, 0)) as in_stock , procured_by, date_added, added_by, mi.status');


        echo json_encode(array('status' => 'success',
                                  'data' => $medicine_inventory,
                                  'method' => 'GET'
                                ));


    }

    public function httpPost($payload)
    {
      $payload = (array) $payload;

      //ADD MEDICINE RECORD
      $payload['medicine_id'] = $this->db->insert('tbl_medicine_inventory', $payload);
      $payload['in_stock'] = $payload['quantity'];

      if ($payload['medicine_id']) {
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
      $this->db->where('medicine_id', $payload['medicine_id']);
      $household = $this->db->update('tbl_medicine_inventory', $payload);

      if ($household) {

        $this->db->where('medicine_id', $payload['medicine_id']);
        $count = $this->db->getValue('tbl_medicine_release', 'SUM(quantity)');
        $payload['in_stock'] = $count === null ? $payload['quantity'] : ($count[0] - $payload['quantity']);

        echo json_encode(array('status' => 'success',
                                'data' => $payload,
                                'method' => 'PUT'
                              ));
      }


    }

    public function httpDelete($payload)
    {
      $this->db->where('medicine_id', $_GET['medicine_id']);
      $delete_medicine = $this->db->update('tbl_medicine_inventory', array('status' => 1));

      if ($delete_medicine) {
          echo json_encode(array('status' => 'success',
                              'message' => 'Medicine record successfully removed',
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
