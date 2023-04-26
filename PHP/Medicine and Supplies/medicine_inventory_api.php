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
      if (isset($_GET['medicine_id'])) {
        //GET MEDICINE DETAILS

        $this->db->where('medicine_id', $_GET['medicine_id']);
        $medicine_details = $this->db->get('tbl_medicine_inventory');
        $medicine_details = $medicine_details[0];

        $this->db->where('medicine_id', $_GET['medicine_id']);
        $this->db->where('status', 0);
        $medicine_release = $this->db->getValue('tbl_medicine_release', 'CAST(SUM(quantity) as int)');
        $medicine_details['quantity_released'] = $medicine_release != null ? $medicine_release : 0;

        echo json_encode(array('status' => 'success',
                                  'data' => $medicine_details,
                                  'method' => 'GET'
                                ));

      } else if (isset($_GET['release_filter'])) {

        //GET MEDICINE RELEASE
        $release_filter = (array) json_decode($_GET['release_filter']);

        if (isset($release_filter['department'])) {
          $this->db->where('department', $release_filter['department'], 'IN');
        }

        if (isset($release_filter['released_to'])) {
          if ($release_filter['released_to'][0] === 0 && count($release_filter['released_to']) === 1) {
            $this->db->where('patient_id', null, 'IS NOT');
          } else if ($release_filter['released_to'][0] === 1 && count($release_filter['released_to']) === 1) {
            $this->db->where('doctor_id', null, 'IS NOT');
          }
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

        $this->db->where('medicine_id', $release_filter['medicine_id']);
        $medicine_release = $this->db->get('tbl_medicine_release');
        $medicine_release_array = [];

        foreach($medicine_release as $release) {
          if (isset($release['patient_id'])) {
            $this->db->where('patient_id', $release['patient_id']);
            $name = $this->db->get('tbl_patient_info', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $release['patient_name'] = $name[0]['name'];
            array_push($medicine_release_array, $release);
          } else {
            $this->db->where('user_id', $release['doctor_id']);
            $name = $this->db->get('tbl_users', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $release['doctor_name'] = $name[0]['name'];
            array_push($medicine_release_array, $release);
          }
        }


        echo json_encode(array('status' => 'success',
                                  'data' => $medicine_release_array,
                                  'method' => 'GET'
                                ));

      } else if (isset($_GET['patient_id'])) {

          //GET MEDICINE RELEASE PER PATIENT
          $this->db->where('patient_id', $_GET['patient_id']);
          $this->db->where('mr.status', 0);

          $this->db->join('tbl_medicine_inventory mi', 'mr.medicine_id=mi.medicine_id', 'LEFT');

          $medicine_release_array = $this->db->get('tbl_medicine_release mr', null, 'med_release_id, mr.medicine_id, generic_name, brand_name, mr.quantity, mr.release_date');


          echo json_encode(array('status' => 'success',
                                    'data' => $medicine_release_array,
                                    'method' => 'GET'
                                  ));
      } else {
        //GET MEDICINE INVENTORY
        $payload = (array) json_decode($_GET['payload']);

        //check if there are parameters
        if (isset($payload['search_by'])) {
          $search_by = (array) $payload['search_by'];

          if (isset($search_by['search_string']) && ($search_by['search_string'] != '')) {
            if ($search_by['search_category'] === "Brand Name") {
              $this->db->where('brand_name', '%'.$search_by['search_string'].'%', 'LIKE');

            } else if ($search_by['search_category'] === "Generic Name") {
              $this->db->where('generic_name', '%'.$search_by['search_string'].'%', 'LIKE');

            } else if ($search_by['search_category'] === "Medicine ID") {
              $this->db->where('medicine_id', $search_by['search_string']);

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

        $medicine_inventory = $this->db->get('tbl_medicine_inventory');
        $medicine_array = [];

        foreach($medicine_inventory as $medicine) {
          $this->db->where('medicine_id', $medicine['medicine_id']);
          $this->db->where('status', 0);
          $medicine['quantity_released'] = $this->db->getValue('tbl_medicine_release', 'CAST(SUM(quantity) as int)');

          if (isset($filter['in_stock']) && ($filter['in_stock'][0] != '') && ($filter['in_stock'][1] != '')) {
            if ($medicine['quantity'] - $medicine['quantity_released'] >= $filter['in_stock'][0] && $medicine['quantity'] - $medicine['quantity_released'] <= $filter['in_stock'][1]) {
              array_push($medicine_array, $medicine);
            }
          } else {
            array_push($medicine_array, $medicine);
          }
        }


          echo json_encode(array('status' => 'success',
                                    'data' => $medicine_array,
                                    'method' => 'GET'
                                  ));
      }

    }

    public function httpPost($payload)
    {
      $payload = (array) $payload;

      if (isset($payload['department'])) {
        //ADD MEDICINE RELEASE RECORD
        $payload['med_release_id'] = $this->db->insert('tbl_medicine_release', $payload);

        if ($payload['med_release_id']) {

          if (isset($payload['patient_id'])) {

            $this->db->where('patient_id', $payload['patient_id']);
            $name = $this->db->get('tbl_patient_info', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $payload['patient_name'] = $name[0]['name'];
          } else {
            $this->db->where('user_id', $payload['doctor_id']);
            $name = $this->db->get('tbl_users', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $payload['doctor_name'] = $name[0]['name'];
          }

          echo json_encode(array('status' => 'success',
                                    'data' => $payload,
                                    'method' => 'POST'
                                  ));
        }

      } else {
        //ADD MEDICINE RECORD
        $payload['medicine_id'] = $this->db->insert('tbl_medicine_inventory', $payload);
        $payload['quantity'] = (int) $payload['quantity'];
        $payload['in_stock'] = (int) $payload['quantity'];

        if ($payload['medicine_id']) {
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
        //EDIT MEDICINE RELEASE RECORD
        $this->db->where('med_release_id', $payload['med_release_id']);
        $medicine_release = $this->db->update('tbl_medicine_release', $payload);

        if ($medicine_release) {

          if (isset($payload['patient_id'])) {
            $this->db->where('patient_id', $payload['patient_id']);
            $name = $this->db->get('tbl_patient_info', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $payload['patient_name'] = $name[0]['name'];
          } else {
            $this->db->where('user_id', $payload['doctor_id']);
            $name = $this->db->get('tbl_users', null, 'concat(first_name, " ", last_name, IFNULL(CONCAT(" ", suffix), "")) as name');

            $payload['doctor_name'] = $name[0]['name'];
          }

          echo json_encode(array('status' => 'success',
                                  'data' => $payload,
                                  'method' => 'PUT'
                                ));
        }

      } else {
        //EDIT MEDICINE RECORD
        $this->db->where('medicine_id', $payload['medicine_id']);
        $medicine = $this->db->update('tbl_medicine_inventory', $payload);

        if ($medicine) {

          $this->db->where('medicine_id', $payload['medicine_id']);
          $count = $this->db->getValue('tbl_medicine_release', 'SUM(quantity)');
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
      if (isset($_GET['medicine_id'])) {
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
      } else if (isset($_GET['med_release_id'])) {
        $this->db->where('med_release_id', $_GET['med_release_id']);
        $delete_medicine = $this->db->update('tbl_medicine_release', array('status' => 1));

        if ($delete_medicine) {
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
