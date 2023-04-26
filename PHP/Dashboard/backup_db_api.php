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

    public function exportDatabase($folderPath)
    {
        // Database credentials
        $host = 'localhost';
        $user = 'root';
        $password = '';

        // Get the name of the database
        $databaseName = 'mhoclprmimqs';

        // Create a backup filename based on the current date and time
        $backupFilename = $databaseName . '_' . date('Ymd_His') . '.sql';

        // Create the full path to the backup file in the specified folder
        $backupFilePath = $folderPath . '/' . $backupFilename;

        // Use mysqldump to create a backup of the database
        $command = sprintf('mysqldump -u%s -p%s -h%s %s > %s',
        $user,
        $password,
        $host,
        $databaseName,
        $backupFilePath
        );

        exec($command);

        // Return the path to the backup file
        return $backupFilePath;
    }

    public function httpGet()
    {
        // // Export the database to a folder
        // $backupFilePath = $this->exportDatabase('../sql');

        // // Return a JSON response with the path to the backup file
        // header('Content-Type: application/json');
        // echo json_encode(array('backup_file_path' => $backupFilePath));


      $connection = mysqli_connect('localhost','root','','mhoclprmimqs');

      $tables = array();
      $result = mysqli_query($connection,"SHOW TABLES");
      while($row = mysqli_fetch_row($result)){
        $tables[] = $row[0];
      }

      $return = '';
      foreach($tables as $table){
        $result = mysqli_query($connection,"SELECT * FROM ".$table);
        $num_fields = mysqli_num_fields($result);

        $return .= 'DROP TABLE '.$table.';';
        $row2 = mysqli_fetch_row(mysqli_query($connection,"SHOW CREATE TABLE ".$table));
        $return .= "\n\n".$row2[1].";\n\n";

        for($i=0;$i<$num_fields;$i++){
          while($row = mysqli_fetch_row($result)){
            $return .= "INSERT INTO ".$table." VALUES(";
            for($j=0;$j<$num_fields;$j++){
              $row[$j] = addslashes($row[$j]);
              if(isset($row[$j])){ $return .= '"'.$row[$j].'"';}
              else{ $return .= '""';}
              if($j<$num_fields-1){ $return .= ',';}
            }
            $return .= ");\n";
          }
        }
        $return .= "\n\n\n";
      }

      // Get the name of the database
      $databaseName = 'mhoclprmimqs';

      // Create a backup filename based on the current date and time
      // $backupFilename = $databaseName . '_' . date('Ymd_His') . '.sql';
      $backupFilename = 'mhoclprmimqs_backup.sql';

      // Create the full path to the backup file in the specified folder
      $backupFilePath = '../sql' . '/' . $backupFilename;

      //save file
      $handle = fopen($backupFilePath,"w+");
      fwrite($handle,$return);
      fclose($handle);
      echo "Successfully backed up";

    }

    public function httpPost($payload)
    {
      $connection = mysqli_connect('localhost','root','','mhoclprmimqs');
      $filename = 'mhoclprmimqs_backup.sql';
      $handle = fopen($filename,"r+");
      $contents = fread($handle,filesize($filename));
      $sql = explode(';',$contents);
      foreach($sql as $query){
        $result = mysqli_query($connection,$query);
        if($result){
            echo '<tr><td><br></td></tr>';
            echo '<tr><td>'.$query.' <b>SUCCESS</b></td></tr>';
            echo '<tr><td><br></td></tr>';
        }
      }
      fclose($handle);
      echo 'Successfully imported';
    }

    public function httpPut($payload)
    {

    }

    public function httpDelete($payload)
    {

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
